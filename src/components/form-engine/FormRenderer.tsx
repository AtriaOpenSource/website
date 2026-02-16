"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/lib/types/form";
import { submitForm } from "@/lib/firebase/submissions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldRenderer } from "./FieldRenderer";
import { User } from "firebase/auth";
import { CheckCircle2, AlertCircle, ArrowRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

interface FormRendererProps {
    form: Form;
    user: User;
}

export function FormRenderer({ form, user }: FormRendererProps) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [submitError, setSubmitError] = useState<string | null>(null);

    type FormValues = Record<string, unknown>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<FormValues>();

    // Calculate progress
    const watchedFields = watch();

    useEffect(() => {
        const totalFields = form.fields.length;
        const filledFields = form.fields.filter((field) => {
            const value = watchedFields[field.id];
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            if (typeof value === "string") {
                return value.trim() !== "";
            }
            if (typeof value === "object" && "url" in value!) {
                return Boolean(value.url);
            }
            return value !== undefined && value !== null;
        }).length;
        setProgress(Math.round((filledFields / totalFields) * 100));
    }, [watchedFields, form.fields]);

    const onSubmit = async (data: FormValues) => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            await submitForm({
                formSlug: form.slug,
                userId: user.uid,
                userEmail: user.email!,
                userName: user.displayName || user.email!,
                responses: data,
            });
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("We couldn't submit your response. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center py-12"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-primary/20">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>

                <h2 className="text-4xl font-black text-ink mb-4 tracking-tighter uppercase">Submission Received</h2>

                <div className="space-y-4 mb-10 max-w-lg mx-auto">
                    <p className="text-xl font-medium text-ink">
                        Excellent! Your registration for <span className="font-bold text-primary">&quot;{form.title}&quot;</span> has been recorded.
                    </p>
                    <p className="text-ink/60 text-sm">
                        You&apos;re all set. Keep an eye on the WhatsApp group for further updates.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Button variant="brutalist" className="flex-1" onClick={() => router.push("/")}>
                        <Home className="mr-2 h-4 w-4" />
                        Back to Portal
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => window.open("https://chat.whatsapp.com/DmWJm7XyQjeAg1psXWUj6K?mode=gi_t", "_blank")}>
                        <SiWhatsapp className="mr-2 h-4 w-4" />
                        WhatsApp Group
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Progress Bar - Floating Style */}
            <div className="sticky top-0 z-30 backdrop-blur-md py-6 px-4 -mx-4 border-b-2 border-ink/10 mb-8">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-black tracking-widest uppercase text-ink/70">
                        <span>Completion Progress</span>
                        <span className={progress === 100 ? "text-primary transition-colors" : ""}>{progress}%</span>
                    </div>
                    <div className="h-2.5 bg-ink/5 rounded-full overflow-hidden border border-ink/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-linear-to-r from-primary via-indigo-500 to-accent transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="bg-red-50 border-2 border-red-500 p-4 rounded-md flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-700 text-sm font-bold">{submitError}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form Fields */}
            <div className="space-y-12">
                {form.fields.map((field, index) => (
                    <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <FieldRenderer
                            field={field}
                            register={register}
                            errors={errors}
                            index={index + 1}
                            setValue={setValue}
                            watch={watch}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Submit Block */}
            <Card className="border-t-2 border-ink/10 bg-inherit border-l-0 border-r-0 border-b-0 rounded-none shadow-none overflow-hidden">
                <CardContent className="p-8 text-center">
                    <p className="text-sm font-medium text-ink/70 mb-6">
                        Please review all your answers before submitting.
                        By clicking submit, you agree to our <a className="underline decoration-dotted hover:text-ink text-primary" target="_blank" href="/legal/terms-of-participation">terms of participation</a>.
                    </p>
                    <Button
                        type="submit"
                        variant="brutalist"
                        size="xl"
                        disabled={submitting}
                        className="w-full sm:w-auto px-12 group"
                    >
                        {submitting ? (
                            "Registering Details..."
                        ) : (
                            <>
                                Finalize & Submit
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
}
