"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { isAdmin } from "@/lib/firebase/admin-whitelist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { SiGoogle } from 'react-icons/si'

interface AdminAuthGateProps {
    children: React.ReactNode;
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [signingIn, setSigningIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            // If user is signed in but not admin, show error
            if (currentUser && !isAdmin(currentUser.email)) {
                setError("Access denied. Your email is not whitelisted for admin access.");
            } else {
                setError(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        setSigningIn(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Check if user is admin
            if (!isAdmin(result.user.email)) {
                setError("Access denied. Your email is not whitelisted for admin access.");
                await auth.signOut();
            }
        } catch (err: any) {
            console.error("Sign in error:", err);
            setError(err.message || "Failed to sign in. Please try again.");
        } finally {
            setSigningIn(false);
        }
    };

    const handleSignOut = async () => {
        await auth.signOut();
        router.push("/");
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-surface-lighter font-mono">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Not signed in or access denied
    if (!user || error) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-black">Admin Access Required</CardTitle>
                        <CardDescription>
                            This area is restricted to authorized administrators only
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border-2 border-red-500 p-4 rounded-md">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                                {user && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSignOut}
                                        className="mt-2"
                                    >
                                        Sign Out
                                    </Button>
                                )}
                            </div>
                        )}

                        {!user && (
                            <>
                                {/* <div className="bg-surface/5 p-4 rounded-md text-center">
                                    <p className="text-surface-lighter text-sm">
                                        Sign in with your whitelisted Google account to access the admin dashboard.
                                    </p>
                                </div> */}
                                <Button
                                    variant="brutalist"
                                    size="lg"
                                    onClick={handleGoogleSignIn}
                                    disabled={signingIn}
                                    className="w-full"
                                >
                                    <SiGoogle className="mr-2 h-5 w-5" />
                                    {signingIn ? "Signing in..." : "Sign in with Google"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                    className="w-full"
                                >
                                    Return to Home
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // User is authenticated and is admin
    return <>{children}</>;
}
