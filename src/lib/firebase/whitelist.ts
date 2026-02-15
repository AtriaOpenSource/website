import { db } from './config';
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';

export interface WhitelistedMaintainer {
    id?: string;
    githubUsername: string;
    addedBy: string; // Admin UID
    createdAt: unknown;
}

export const addToWhitelist = async (githubUsername: string, adminUid: string) => {
    // Check if already exists
    const q = query(collection(db, 'maintainer_whitelist'), where("githubUsername", "==", githubUsername));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        throw new Error("User already whitelisted");
    }

    try {
        await addDoc(collection(db, 'maintainer_whitelist'), {
            githubUsername,
            addedBy: adminUid,
            createdAt: new Date()
        });
    } catch (error) {
        console.error("Error adding to whitelist: ", error);
        throw error;
    }
};

export const getWhitelistedMaintainers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'maintainer_whitelist'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WhitelistedMaintainer));
    } catch (error) {
        console.error("Error getting whitelist: ", error);
        return [];
    }
};

export const removeFromWhitelist = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'maintainer_whitelist', id));
    } catch (error) {
        console.error("Error removing from whitelist: ", error);
        throw error;
    }
};

export const isWhitelisted = async (githubUsername: string): Promise<boolean> => {
    try {
        const q = query(collection(db, 'maintainer_whitelist'), where("githubUsername", "==", githubUsername));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking whitelist: ", error);
        return false;
    }
}
