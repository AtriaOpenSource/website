"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGoogle } from "react-icons/si";

interface AuthGateProps {
    formTitle: string;
}

export function AuthGate({ formTitle }: AuthGateProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Sign in error:", error);
            setError("Authentication failed. Please check your connection or try a different account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center py-12 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                <Lock className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-3xl font-black text-ink mb-3 uppercase tracking-tight">
                Secure Access
            </h1>

            <div className="space-y-4 mb-8">
                <p className="text-lg font-medium text-ink">
                    Authentication required for <span className="font-bold text-primary">{formTitle}</span>.
                </p>
                <p className="text-ink/60 text-sm leading-relaxed max-w-sm mx-auto px-2 sm:px-0">
                    To prevent duplicate entries and ensure security, please verify your identity via Google.
                </p>
            </div>

            {/* <div className="flex items-start gap-4 p-4 bg-surface/5 rounded-md border-2 border-surface/10 text-left mb-6">
                <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                <div className="text-sm">
                    <p className="font-bold text-ink">Identity Verification</p>
                    <p className="text-ink/75">Google sign-in is required to continue.</p>
                </div>
            </div> */}

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 border-2 border-red-500 rounded-md flex items-center gap-3 mb-4 text-left"
                    >
                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                        <p className="text-xs font-bold text-red-700">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4 px-4">
                <Button
                    variant="brutalist"
                    size="lg"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full sm:w-auto sm:px-10 group"
                >
                    <SiGoogle className="mr-3 h-5 w-5" />
                    {loading ? "Authenticating..." : "Continue with Google"}
                </Button>
                <p className="text-[10px] text-center text-ink/75 font-(family-name:--font-jetbrains) uppercase tracking-widest">
                    Fast, Secure, and Private
                </p>
            </div>
        </div>
    );
}
