"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getForm } from "@/lib/firebase/forms";
import { getSubmissions, deleteSubmission } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, BarChart3, Trash2, FileSpreadsheet } from "lucide-react";
import { exportToXLSX } from "@/lib/utils/export";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

export default function FormResponsesPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [form, setForm] = useState<Form | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const { confirm, Dialog } = useConfirmDialog();

    const fetchData = async () => {
        try {
            const [formData, submissionsData] = await Promise.all([
                getForm(slug),
                getSubmissions(slug),
            ]);
            setForm(formData);
            setSubmissions(submissionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    const handleExportXLSX = async () => {
        if (!form) return;
        if (submissions.length === 0) {
            confirm({
                title: "No Data",
                description: "There are no responses to export yet. Please wait for some submissions!",
                variant: "warning",
                confirmText: "Close",
                cancelText: null,
                onConfirm: () => { },
            });
            return;
        }
        await exportToXLSX(submissions, form.fields, `${form.slug}_responses.xlsx`);
    };

    const handleDeleteResponse = (submissionId: string, userName: string) => {
        confirm({
            title: "Delete Response",
            description: `Are you sure you want to delete ${userName}'s response? This action cannot be undone.`,
            variant: "destructive",
            confirmText: "Delete",
            onConfirm: async () => {
                await deleteSubmission(submissionId);
                await fetchData(); // Refresh data
            },
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-surface-lighter font-mono">Loading...</p>
                </div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="text-center py-20">
                <div className="max-w-md mx-auto px-4">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-surface/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="h-10 w-10 text-surface-lighter" />
                        </div>
                        <h2 className="text-2xl font-black text-ink mb-2">Form Not Found</h2>
                        <p className="text-surface-lighter mb-4">
                            This form doesn't exist or hasn't been created yet.
                        </p>
                        <p className="text-sm text-surface-lighter mb-6">
                            Create a form in the <strong>Form Builder</strong> first, then you can view its responses here.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="brutalist" onClick={() => router.push("/admin/builder")} className="w-full sm:w-auto">
                            Create New Form
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/admin/responses")} className="w-full sm:w-auto">
                            View All Forms
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Dialog />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/admin/responses")}
                        className="mb-4 -ml-4 h-8 text-xs font-mono uppercase"
                    >
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Responses
                    </Button>
                    <h1 className="text-3xl md:text-4xl font-black text-ink tracking-tighter wrap-break-word">{form.title}</h1>
                    <p className="text-surface-lighter mt-1 text-sm md:text-base">{submissions.length} total responses saved</p>
                </div>
                <div className="shrink-0">
                    <Button variant="brutalist" onClick={handleExportXLSX} className="w-full md:w-auto">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export to XLSX
                    </Button>
                </div>
            </div>

            {/* Responses List */}
            {submissions.length === 0 ? (
                <Card className="border-4 border-dashed border-surface/20 bg-surface/5">
                    <CardContent className="py-16 text-center">
                        <BarChart3 className="h-12 w-12 text-surface-lighter mx-auto mb-4 opacity-20" />
                        <p className="text-surface-lighter font-medium">No responses yet. Send your form link to start collecting data!</p>
                        <Button variant="outline" onClick={() => router.push(`/forms/${form.slug}`)} className="mt-4">
                            Open Public Form
                        </Button>
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
                                        <CardDescription className="text-sm font-mono truncate max-w-[250px]">{submission.userEmail}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-[10px] text-surface-lighter font-mono bg-surface/5 px-2 py-1 rounded">
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
                                                <p className="text-[10px] font-black text-surface-lighter uppercase tracking-widest mb-1">
                                                    {field.label}
                                                </p>
                                                <p className="text-sm font-medium line-clamp-3">
                                                    {Array.isArray(value) ? value.join(", ") : value || <span className="text-surface-lighter italic">No answer</span>}
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
        </div>
    );
}
