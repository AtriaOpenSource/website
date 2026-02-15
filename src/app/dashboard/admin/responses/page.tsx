"use client";

import { useEffect, useState } from "react";
import { getAllForms, deleteForm } from "@/lib/firebase/forms";
import { getAllSubmissions } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { BarChart3, Trash2, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AlertModal, AlertType } from "@/components/ui/alert-modal";

import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { dashboardRoutes } from "@/lib/routes/dashboard";

export default function ResponsesPage() {
    const { userData, loading: authLoading } = useAuth();
    const [forms, setForms] = useState<Form[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        type: AlertType;
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm?: () => void;
    }>({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        confirmText: "OK",
        cancelText: "Cancel",
    });

    const showAlert = (options: {
        type: AlertType;
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm?: () => void;
    }) => {
        setAlertState({
            isOpen: true,
            type: options.type,
            title: options.title,
            message: options.message,
            confirmText: options.confirmText ?? "OK",
            cancelText: options.cancelText ?? "Cancel",
            onConfirm: options.onConfirm,
        });
    };

    const closeAlert = () => {
        setAlertState((prev) => ({ ...prev, isOpen: false }));
    };
    const fetchData = async () => {
        const isPermissionDenied = (error: unknown) =>
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            String((error as { code?: unknown }).code) === "permission-denied";

        try {
            setPermissionError(null);
            const [formsData, submissionsData] = await Promise.allSettled([
                getAllForms(),
                getAllSubmissions(),
            ]);

            if (formsData.status === "fulfilled") {
                setForms(formsData.value);
            } else {
                setForms([]);
                console.error("Error fetching forms:", formsData.reason);
            }

            if (submissionsData.status === "fulfilled") {
                setSubmissions(submissionsData.value);
            } else {
                setSubmissions([]);
                console.error("Error fetching submissions:", submissionsData.reason);
                if (isPermissionDenied(submissionsData.reason)) {
                    setPermissionError(
                        "Responses are blocked by Firestore rules for this account. Verify users/{uid}.role is 'admin' and redeploy rules."
                    );
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userData?.role === 'admin') {
            fetchData();
        }
    }, [userData]);

    if (authLoading) return <PageLoadingState message="Checking permissions..." />;
    if (!userData || userData.role !== 'admin') return <AccessDenied />;

    const handleDeleteForm = (slug: string, title: string) => {
        // ... (existing logic)
        const formSubmissions = submissions.filter((s) => s.formSlug === slug);

        showAlert({
            type: "confirm",
            title: "Delete Form",
            message: `Are you sure you want to delete "${title}"? This will permanently delete the form and all ${formSubmissions.length} responses. This action cannot be undone.`,
            confirmText: "Delete Form",
            onConfirm: async () => {
                await deleteForm(slug);
                await fetchData(); // Refresh data
            },
        });
    };

    if (loading) {
        return <PageLoadingState message="Loading responses..." />;
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Form Responses"
                description="View and manage your forms and submissions"
                actions={{
                    label: "Create New Form",
                    href: dashboardRoutes.admin.builder,
                    variant: "brutalist"
                }}
            />

            {permissionError && (
                <Card className="border-2 border-red-500/30 bg-red-50">
                    <CardContent className="py-4 text-sm font-medium text-red-700">
                        {permissionError}
                    </CardContent>
                </Card>
            )}

            {/* Forms List */}
            <div className="grid gap-6">
                {forms.length === 0 ? (
                    <Card className="border-2 border-surface/10">
                        <CardContent className="py-12 text-center">
                            <BarChart3 className="h-12 w-12 text-ink/75 mx-auto mb-4" />
                            <p className="text-ink/75">No forms created yet</p>
                            <Button variant="outline" asChild className="mt-4">
                                <Link href={dashboardRoutes.admin.builder}>Create Your First Form</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    forms.map((form) => {
                        const formSubmissions = submissions.filter((s) => s.formSlug === form.slug);
                        return (
                            <Card
                                key={form.slug}
                                className="border-2 border-surface/20 hover:border-primary transition-all overflow-hidden"
                            >
                                <CardHeader className="bg-surface/5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CardTitle className="text-xl font-black">{form.title}</CardTitle>
                                                <Link
                                                    href={`/forms/${form.slug}`}
                                                    target="_blank"
                                                    className="text-ink/75 hover:text-primary transition-colors"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </div>
                                            <CardDescription className="line-clamp-1">{form.description}</CardDescription>
                                            <p className="text-[10px] font-(family-name:--font-jetbrains) text-ink/75 mt-2 bg-surface/10 inline-block px-2 py-0.5 rounded">
                                                ID: {form.slug}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-primary">
                                                {formSubmissions.length}
                                            </div>
                                            <p className="text-[10px] text-ink/75 uppercase font-black tracking-widest">
                                                Responses
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button variant="brutalist" asChild className="flex-1 w-full justify-start sm:justify-center">
                                            <Link href={`${dashboardRoutes.admin.responses}/${form.slug}`}>
                                                <BarChart3 className="mr-2 h-4 w-4" />
                                                View Responses
                                            </Link>
                                        </Button>
                                        <div className="flex gap-3 flex-1">
                                            <Button variant="outline" asChild className="flex-1 w-full justify-start sm:justify-center">
                                                <Link href={`${dashboardRoutes.admin.builder}?edit=${form.slug}`}>
                                                    <Edit3 className="mr-2 h-4 w-4" />
                                                    Edit Form
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDeleteForm(form.slug, form.title)}
                                                className="shrink-0 border-red-500/20 text-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            <AlertModal
                isOpen={alertState.isOpen}
                onClose={closeAlert}
                onConfirm={alertState.onConfirm}
                type={alertState.type}
                title={alertState.title}
                message={alertState.message}
                confirmText={alertState.confirmText}
                cancelText={alertState.cancelText}
            />
        </div>
    );
}
