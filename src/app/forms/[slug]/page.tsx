"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/lib/types/form";
import { getForm } from "@/lib/firebase/forms";
import { checkDuplicateSubmission } from "@/lib/firebase/submissions";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { FormRenderer } from "@/components/form-engine/FormRenderer";
import { AuthGate } from "@/components/form-engine/AuthGate";
import { SubmissionBlocker } from "@/components/form-engine/SubmissionBlocker";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FormPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [form, setForm] = useState<Form | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check auth state
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Check if user has already submitted
                const submitted = await checkDuplicateSubmission(currentUser.email!, slug);
                setHasSubmitted(submitted);
            }
        });

        return () => unsubscribe();
    }, [slug]);

    useEffect(() => {
        // Fetch form
        const fetchForm = async () => {
            try {
                const formData = await getForm(slug);
                if (!formData) {
                    setError("Form not found");
                } else {
                    setForm(formData);
                }
            } catch (err) {
                setError("Error loading form");
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-surface-lighter font-mono">Loading form environment...</p>
                </div>
            </div>
        );
    }

    if (error || !form) {
        return (
            <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <Card className="border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
                        <div className="h-2 bg-red-500 w-full" />
                        <CardContent className="pt-10 pb-10 text-center">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-red-500" />
                            </div>
                            <h1 className="text-3xl font-black text-ink mb-3 tracking-tighter uppercase">Form Not Found</h1>
                            <p className="text-surface-lighter mb-8 font-medium">
                                {error === "Form not found"
                                    ? "We couldn't find the registration form you're looking for. It might have been deleted or the link is incorrect."
                                    : "There was a technical glitch while trying to retrieve this form. Please try again later."}
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button variant="brutalist" asChild>
                                    <Link href="/">Return to Homepage</Link>
                                </Button>
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    Retry Access
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <p className="text-center mt-8 text-surface-lighter font-mono text-xs uppercase tracking-widest">
                        ERROR CODE: {error === "Form not found" ? "404_FORM_MISSING" : "500_FETCH_FAILURE"}
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper flex flex-col">
            {/* Minimal Header */}
            <header className="sticky top-0 z-40 w-full bg-paper/80 backdrop-blur-md border-b-4 border-ink">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-4 w-4 text-primary group-hover:-translate-x-1 transition-transform" />
                        <span className="font-black tracking-tighter text-xl">
                            OS<span className="text-primary">ATRIA</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-[10px] font-mono text-surface-lighter uppercase leading-none">Logged in as</span>
                                <span className="text-xs font-bold text-ink leading-tight">{user.email}</span>
                            </div>
                        )}
                        <div className="h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-xs font-black text-primary">
                                {user?.email?.[0].toUpperCase() || "A"}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section for the Form */}
            <section className="bg-ink text-paper py-16 px-4 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[100px]" />
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block px-3 py-1 bg-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                            Registration Form
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
                            {form.title}
                        </h1>
                        {form.description && (
                            <p className="text-paper/70 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                                {form.description}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Main Form Content */}
            <main className="py-12 px-4 grow">
                <div className="max-w-3xl mx-auto">
                    {!user ? (
                        <Card>
                            <CardContent className="p-0">
                                <AuthGate formTitle={form.title} />
                            </CardContent>
                        </Card>
                    ) : hasSubmitted ? (
                        <Card className="border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                            <CardContent className="p-0">
                                <SubmissionBlocker formTitle={form.title} />
                            </CardContent>
                        </Card>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <FormRenderer form={form} user={user} />
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 border-t-4 border-ink bg-surface/5">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="text-surface-lighter text-[10px]">
                        © {new Date().getFullYear()} Atria Open Source Community. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
