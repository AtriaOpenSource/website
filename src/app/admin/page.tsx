"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { PageLoadingState } from "@/components/layout/PageHeader";
import { Github } from "lucide-react";

export default function AdminLoginPage() {
    const { user, userData, loading, logout, loginWithGithub } = useAuth();
    const router = useRouter();
    const hasHandledSessionRef = useRef(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        if (loading || !user || !userData || hasHandledSessionRef.current) return;
        hasHandledSessionRef.current = true;

        if (userData.role === "admin") {
            router.replace("/dashboard/admin");
            return;
        }

        setStatusMessage("This account is not an admin. You have been signed out.");
        void logout();
    }, [loading, logout, router, user, userData]);

    useEffect(() => {
        if (!user) {
            hasHandledSessionRef.current = false;
        }
    }, [user]);

    const handleAdminLogin = async () => {
        try {
            setStatusMessage(null);
            setIsSigningIn(true);
            await loginWithGithub();
        } finally {
            setIsSigningIn(false);
        }
    };

    if (loading) {
        return <PageLoadingState message="Checking access..." />;
    }

    return (
        <div className="mx-auto flex min-h-[70vh] w-full max-w-xl items-center justify-center p-6">
            <div className="w-full rounded-lg border-2 border-surface-lighter bg-surface-light p-8 text-center">
                <h1 className="text-2xl font-black uppercase tracking-tight text-ink">Admin Access</h1>
                <p className="mt-3 text-sm text-ink/80">
                    Only admin accounts can stay signed in. Non-admin logins are signed out automatically.
                </p>
                <Button
                    variant="brutalist"
                    className="mt-6 w-full"
                    onClick={handleAdminLogin}
                    disabled={isSigningIn || (Boolean(user) && !userData)}
                >
                    <Github className="mr-2 h-4 w-4" />
                    {isSigningIn ? "Signing in..." : "Continue with GitHub"}
                </Button>
                {statusMessage ? (
                    <p className="mt-3 text-sm font-medium text-destructive">{statusMessage}</p>
                ) : null}
                <Button asChild variant="link" className="mt-4">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}
