"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form } from "@/lib/types/form";
import { getForm } from "@/lib/firebase/forms";
import { checkDuplicateSubmission } from "@/lib/firebase/submissions";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { FormRenderer } from "@/components/form-engine/FormRenderer";
import { AuthGate } from "@/components/form-engine/AuthGate";
import { SubmissionBlocker } from "@/components/form-engine/SubmissionBlocker";
import { FormClosedNotice } from "@/components/form-engine/FormClosedNotice";
import { EmailNotWhitelisted } from "@/components/form-engine/EmailNotWhitelisted";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoadingState } from "@/components/layout/PageHeader";
import { PublicHero } from "@/components/layout/PublicLayout";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FormPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [form, setForm] = useState<Form | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isEmailWhitelisted, setIsEmailWhitelisted] = useState(true);
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
                    // Check email whitelist
                    if (user && formData.whitelistedEmails?.length) {
                        setIsEmailWhitelisted(formData.whitelistedEmails.includes(user.email || ""));
                    } else {
                        setIsEmailWhitelisted(true);
                    }
                }
            } catch {
                setError("Error loading form");
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [slug, user]);

    if (loading) {
        return <PageLoadingState message="Loading form environment..." />;
    }

    if (error || !form) {
        return (
            <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-md w-full space-y-6">
                    <div className="w-16 h-16 border-2 border-ink rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="h-8 w-8 text-ink" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-ink mb-2 uppercase tracking-tight">
                            {error === "Form not found" ? "Form Not Found" : "Error Loading Form"}
                        </h1>
                        <p className="text-ink/70 text-lg font-medium leading-relaxed">
                            {error === "Form not found"
                                ? "This form doesn't exist or has been removed."
                                : "We couldn't load this form right now."}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="brutalist" asChild>
                            <Link href="/">Return Home</Link>
                        </Button>
                        {error !== "Form not found" && (
                            <Button variant="outline" onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        )}
                    </div>

                    <p className="text-xs text-ink/40 font-(family-name:--font-jetbrains) uppercase tracking-widest pt-8">
                        {error === "Form not found" ? "404_FORM_MISSING" : "500_FETCH_FAILURE"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper flex flex-col">
            {/* <PublicHeader
                icon={Search}
                badgeLabel="FORM"
                backHref="/"
            /> */}

            <PublicHero
                badge="Registration Form"
                title={form.title}
                description={form.description}
            />

            {/* Main Form Content */}
            <main className="py-12 px-4 grow">
                <div className="max-w-3xl mx-auto">
                    {form.isPaused ? (
                        <Card>
                            <CardContent className="p-0">
                                <FormClosedNotice formTitle={form.title} />
                            </CardContent>
                        </Card>
                    ) : !user ? (
                        <Card>
                            <CardContent className="p-0">
                                <AuthGate formTitle={form.title} />
                            </CardContent>
                        </Card>
                    ) : hasSubmitted ? (
                        <Card>
                            <CardContent className="p-0">
                                <SubmissionBlocker formTitle={form.title} />
                            </CardContent>
                        </Card>
                    ) : !isEmailWhitelisted ? (
                        <Card>
                            <CardContent className="p-0">
                                <EmailNotWhitelisted userEmail={user.email || ""} />
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

            {/* <PublicFooter
                contactEmail="opensource@atria.edu"
                copyrightText="Atria Open Source Movement"
            /> */}
        </div>
    );
}
