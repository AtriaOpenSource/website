"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createUserDocument, getUserRole, UserData, getUserData } from "@/lib/firebase/users";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/lib/auth/cookies";

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithGithub: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    loginWithGoogle: async () => { },
    loginWithGithub: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const getAdminUsernames = () =>
        process.env.NEXT_PUBLIC_ADMIN_USERNAMES
            ?.split(",")
            .map((u) => u.trim().toLowerCase())
            .filter(Boolean) || [];

    const resolveRoleForUsername = async (githubUsername: string | null) => {
        if (!githubUsername) return "contributor" as const;
        const adminUsernames = getAdminUsernames();
        const normalized = githubUsername.toLowerCase();
        if (adminUsernames.includes(normalized)) return "admin" as const;
        const { isWhitelisted } = await import("@/lib/firebase/whitelist");
        const whitelisted = await isWhitelisted(githubUsername);
        return whitelisted ? ("maintainer" as const) : ("contributor" as const);
    };

    const setAuthCookie = (token?: string) => {
        if (typeof document === "undefined") return;
        const secure = typeof window !== "undefined" && window.location.protocol === "https:";
        if (!token) {
            document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure ? "; Secure" : ""}`;
            return;
        }
        const encoded = encodeURIComponent(token);
        document.cookie = `${AUTH_COOKIE_NAME}=${encoded}; Path=/; Max-Age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const token = await user.getIdToken();
                setAuthCookie(token);
                // Fetch or create user document
                await createUserDocument(user);
                const data = await getUserData(user.uid);
                if (data?.githubUsername) {
                    const resolvedRole = await resolveRoleForUsername(data.githubUsername);
                    if (data.role !== resolvedRole) {
                        await createUserDocument(user, { role: resolvedRole, githubUsername: data.githubUsername });
                        const refreshed = await getUserData(user.uid);
                        setUserData(refreshed);
                    } else {
                        setUserData(data);
                    }
                } else {
                    setUserData(data);
                }
            } else {
                setUser(null);
                setUserData(null);
                setAuthCookie();
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const loginWithGithub = async () => {
        try {
            const provider = new GithubAuthProvider();
            // Request access to read user data and potentially repos if needed later
            provider.addScope('read:user');
            provider.addScope('user:email');
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // @ts-ignore - Accessing additional provider data
            const githubUsername = result._tokenResponse?.screenName;

            if (githubUsername) {
                // Check if whitelisted as maintainer
                const { isWhitelisted } = await import('@/lib/firebase/whitelist'); // Dynamic import to avoid circular dep if any
                const whitelisted = await isWhitelisted(githubUsername);

                // Check if admin whitelist
                const isAdmin = getAdminUsernames().includes(githubUsername.toLowerCase());

                let newRole = 'contributor';
                if (isAdmin) {
                    newRole = 'admin';
                } else if (whitelisted) {
                    newRole = 'maintainer';
                }

                // Only update role if it's currently contributor or if we're upgrading to maintainer
                // We don't want to downgrade an admin unless forced
                const currentData = await getUserData(user.uid);

                // Always update if role changed significantly
                if (currentData?.role !== newRole) {
                    await createUserDocument(user, { githubUsername, role: newRole as any });
                } else if (!currentData?.githubUsername) {
                    await createUserDocument(user, { githubUsername });
                }

                // Refresh user data to get the role and updated info
                const data = await getUserData(user.uid);
                setUserData(data);
            }

        } catch (error) {
            console.error("Error signing in with GitHub", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, loginWithGoogle, loginWithGithub, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
