"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getForm } from "@/lib/firebase/forms";
import { getSubmissions, deleteSubmission } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, PageLoadingState, PageEmptyState } from "@/components/layout/PageHeader";
import { BarChart3, Trash2, FileSpreadsheet } from "lucide-react";
import { exportToXLSX } from "@/lib/utils/export";
import { AlertModal, AlertType } from "@/components/ui/alert-modal";

import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { dashboardRoutes } from "@/lib/routes/dashboard";

export default function FormResponsesPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const { userData, loading: authLoading } = useAuth();

    const [form, setForm] = useState<Form | null>(null);
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

    const fetchData = useCallback(async () => {
        const isPermissionDenied = (error: unknown) =>
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            String((error as { code?: unknown }).code) === "permission-denied";

        try {
            setPermissionError(null);
            const [formData, submissionsData] = await Promise.allSettled([
                getForm(slug),
                getSubmissions(slug),
            ]);

            if (formData.status === "fulfilled") {
                setForm(formData.value);
            } else {
                setForm(null);
                console.error("Error fetching form:", formData.reason);
            }

            if (submissionsData.status === "fulfilled") {
                setSubmissions(submissionsData.value);
            } else {
                setSubmissions([]);
                console.error("Error fetching submissions:", submissionsData.reason);
                if (isPermissionDenied(submissionsData.reason)) {
                    setPermissionError(
                        "Submission access is blocked by Firestore rules for this account. Verify users/{uid}.role is 'admin' and redeploy rules."
                    );
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (userData?.role === 'admin') {
            fetchData();
        }
    }, [userData, fetchData]);

    if (authLoading) return <PageLoadingState message="Checking permissions..." />;
    if (!userData || userData.role !== 'admin') return <AccessDenied />;

    const handleExportXLSX = async () => {
        // ... (existing code)
        if (!form) return;
        if (submissions.length === 0) {
            showAlert({
                type: "warning",
                title: "No Data",
                message: "There are no responses to export yet. Please wait for some submissions!",
                confirmText: "Close",
            });
            return;
        }
        await exportToXLSX(submissions, form.fields, `${form.slug}_responses.xlsx`);
    };

    const handleDeleteResponse = (submissionId: string, userName: string) => {
        showAlert({
            type: "confirm",
            title: "Delete Response",
            message: `Are you sure you want to delete ${userName}'s response? This action cannot be undone.`,
            confirmText: "Delete",
            onConfirm: async () => {
                await deleteSubmission(submissionId);
                await fetchData(); // Refresh data
            },
        });
    };

    if (loading) {
        return <PageLoadingState />;
    }

    if (!form) {
        return (
            <div className="text-center py-20">
                <div className="max-w-md mx-auto px-4">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-surface/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="h-10 w-10 text-ink/75" />
                        </div>
                        <h2 className="text-2xl font-black text-ink mb-2">Form Not Found</h2>
                        <p className="text-ink/75 mb-4">
                            This form does not exist or has not been created yet.
                        </p>
                        <p className="text-sm text-ink/75 mb-6">
                            Create a form in the <strong>Form Builder</strong> first, then you can view its responses here.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="brutalist" onClick={() => router.push(dashboardRoutes.admin.builder)} className="w-full sm:w-auto">
                            Create New Form
                        </Button>
                        <Button variant="outline" onClick={() => router.push(dashboardRoutes.admin.responses)} className="w-full sm:w-auto">
                            View All Forms
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title={form.title}
                description={`${submissions.length} total responses saved`}
                backButton={{
                    label: "Back to Responses",
                    href: dashboardRoutes.admin.responses,
                }}
                actions={{
                    label: "Export to XLSX",
                    onClick: handleExportXLSX,
                    variant: "brutalist",
                    icon: FileSpreadsheet
                }}
            />

            {permissionError && (
                <Card className="border-2 border-red-500/30 bg-red-50">
                    <CardContent className="py-4 text-sm font-medium text-red-700">
                        {permissionError}
                    </CardContent>
                </Card>
            )}

            {/* Responses List */}
            {submissions.length === 0 ? (
                <Card className="border-4 border-dashed shadow-none border-surface/20 bg-surface/5">
                    <CardContent>
                        <PageEmptyState
                            icon={BarChart3}
                            title="No responses yet"
                            description="Send your form link to start collecting data!"
                            action={{
                                label: "Open Public Form",
                                onClick: () => router.push(`/forms/${form.slug}`),
                                variant: "outline"
                            }}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {submissions.map((submission) => (
                        <Card key={submission.id} className="border-2 border-surface/10 hover:border-surface/30 transition-colors">
                            <CardHeader className="pb-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <CardTitle className="text-lg font-black">{submission.userName}</CardTitle>
                                        <CardDescription className="text-sm font-(family-name:--font-jetbrains) truncate max-w-62.5">{submission.userEmail}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[10px] text-ink/75 font-(family-name:--font-jetbrains) bg-surface/5 px-2 py-1 rounded">
                                            {submission.submittedAt instanceof Date
                                                ? submission.submittedAt.toLocaleString()
                                                : new Date(submission.submittedAt.seconds * 1000).toLocaleString()}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteResponse(submission.id!, submission.userName)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                    {form.fields.map((field) => {
                                        const value = submission.responses[field.id];
                                        return (
                                            <div key={field.id} className="bg-surface/5 p-3 rounded-sm border-l-4 border-primary/40">
                                                <p className="text-[10px] font-black text-ink/75 uppercase tracking-widest mb-1">
                                                    {field.label}
                                                </p>
                                                <p className="text-sm font-medium line-clamp-3">
                                                    {Array.isArray(value)
                                                        ? value.join(", ")
                                                        : value && typeof value === "object" && "url" in value ? (
                                                            <a
                                                                href={(value as { url: string; name?: string }).url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-primary hover:underline break-all"
                                                            >
                                                                {(value as { url: string; name?: string }).name || (value as { url: string; name?: string }).url}
                                                            </a>
                                                        ) : (value as string) || <span className="text-ink/75 italic">No answer</span>}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

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
