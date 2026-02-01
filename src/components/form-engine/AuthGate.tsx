"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, ShieldCheck, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        } catch (error: any) {
            console.error("Sign in error:", error);
            setError("Authentication failed. Please check your connection or try a different account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="pt-10 pb-6 text-center border-b-2 border-surface/10 mx-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black text-ink uppercase tracking-tight">
                    Secure Access
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                    Authentication required for <span className="text-primary">{formTitle}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 pb-10">
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-surface/5 rounded-md border-2 border-surface/10">
                        <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                        <div className="text-sm">
                            <p className="font-bold text-ink">Identity Verification</p>
                            <p className="text-surface-lighter">To prevent duplicate entries and ensure security, please verify your identity via Google.</p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 border-2 border-red-500 rounded-md flex items-center gap-3"
                            >
                                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                                <p className="text-xs font-bold text-red-700">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    <Button
                        variant="brutalist"
                        size="xl"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full group"
                    >
                        <Chrome className="mr-3 h-5 w-5" />
                        {loading ? "Authenticating..." : "Continue with Google"}
                    </Button>
                    <p className="text-[10px] text-center text-surface-lighter font-mono uppercase tracking-widest">
                        Fast, Secure, and Private
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
