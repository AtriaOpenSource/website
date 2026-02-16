"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { PageLoadingState } from "@/components/layout/PageHeader";
import { Github, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
    const { user, userData, loading, loginWithGithub, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && userData?.role === "admin") {
            router.replace("/dashboard/admin");
        }
    }, [loading, router, userData]);

    if (loading) {
        return <PageLoadingState message="Checking admin access..." />;
    }

    return (
        <div className="mx-auto flex min-h-[70vh] w-full max-w-xl items-center justify-center p-6">
            <div className="w-full rounded-lg border-2 border-surface-lighter bg-surface-light p-8 text-center">
                <h1 className="text-2xl font-black uppercase tracking-tight text-ink">Admin Access</h1>
                {!user ? (
                    <>
                        <p className="mt-3 text-sm text-ink/80">
                            Sign in with GitHub using an approved admin account.
                        </p>
                        <Button onClick={loginWithGithub} variant="brutalist" className="mt-6 w-full">
                            <Github className="mr-2 h-4 w-4" />
                            Continue with GitHub
                        </Button>
                    </>
                ) : userData?.role === "admin" ? (
                    <PageLoadingState message="Redirecting to admin dashboard..." />
                ) : (
                    <>
                        <div className="mt-6 flex items-center justify-center gap-2 text-destructive">
                            <ShieldAlert className="h-5 w-5" />
                            <p className="text-sm font-semibold uppercase tracking-wide">Not an admin account</p>
                        </div>
                        <p className="mt-2 text-sm text-ink/80">
                            This account does not have admin access.
                        </p>
                        <Button
                            onClick={logout}
                            variant="outline"
                            className="mt-6 w-full"
                        >
                            Log out
                        </Button>
                    </>
                )}
                <Button asChild variant="link" className="mt-4">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}
