import { db } from './config';
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { User } from 'firebase/auth';

export type UserRole = 'admin' | 'maintainer' | 'contributor';

export interface UserData {
    uid: string;
    email: string | null;
    photoURL: string | null;
    githubUsername: string | null;
    role: UserRole;
    points: number;
    createdAt: unknown;
    lastLoginAt: unknown;
}

type AdditionalUserData = Partial<Pick<UserData, "githubUsername" | "role">> & Record<string, unknown>;

export const createUserDocument = async (user: User, additionalData?: AdditionalUserData) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { email, photoURL, providerData } = user;
        // Try to get GitHub username from provider data if available
        let githubUsername = null;
        const githubProvider = providerData.find(p => p.providerId === 'github.com');
        if (githubProvider) {
            // This is a best effort, sometimes displayName is the username, sometimes not.
            // Ideally we'd get this from the credential result, but here we just store what we have.
            githubUsername = additionalData?.githubUsername || null;
        }

        const userData: UserData = {
            uid: user.uid,
            email,
            photoURL,
            githubUsername,
            role: additionalData?.role || 'contributor', // Default role
            points: 0,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            ...additionalData,
        };

        try {
            await setDoc(userRef, userData);
        } catch (error) {
            console.error("Error creating user document", error);
        }
    } else {
        // Update last login and merge any provided data (role/githubUsername, etc.)
        const updatePayload = additionalData
            ? { ...additionalData, lastLoginAt: serverTimestamp() }
            : { lastLoginAt: serverTimestamp() };
        await setDoc(userRef, updatePayload, { merge: true });
    }

    return userRef;
};

export const getUserRole = async (uid: string): Promise<UserRole | null> => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data().role as UserRole;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user role", error);
        return null;
    }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data() as UserData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user data", error);
        return null;
    }
};

export const getLeaderboardUsers = async (maxUsers = 100): Promise<UserData[]> => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('points', 'desc'), limit(maxUsers));
        const userSnap = await getDocs(q);
        return userSnap.docs.map((snapshot) => snapshot.data() as UserData);
    } catch (error) {
        console.error("Error fetching leaderboard users", error);
        return [];
    }
};
