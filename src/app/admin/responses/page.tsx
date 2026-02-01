"use client";

import { useEffect, useState } from "react";
import { getAllForms, deleteForm } from "@/lib/firebase/forms";
import { getAllSubmissions } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Trash2, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";

export default function ResponsesPage() {
    const [forms, setForms] = useState<Form[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const { confirm, Dialog } = useConfirmDialog();
    const router = useRouter();

    const fetchData = async () => {
        try {
            const [formsData, submissionsData] = await Promise.all([
                getAllForms(),
                getAllSubmissions(),
            ]);
            setForms(formsData);
            setSubmissions(submissionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteForm = (slug: string, title: string) => {
        const formSubmissions = submissions.filter((s) => s.formSlug === slug);

        confirm({
            title: "Delete Form",
            description: `Are you sure you want to delete "${title}"? This will permanently delete the form and all ${formSubmissions.length} responses. This action cannot be undone.`,
            variant: "destructive",
            confirmText: "Delete Form",
            onConfirm: async () => {
                await deleteForm(slug);
                await fetchData(); // Refresh data
            },
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-surface-lighter font-mono">Loading responses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Dialog />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-ink tracking-tighter">Form Responses</h1>
                    <p className="text-surface-lighter mt-2">View and manage your forms and submissions</p>
                </div>
                <Button variant="brutalist" asChild>
                    <Link href="/admin/builder">Create New Form</Link>
                </Button>
            </div>

            {/* Forms List */}
            <div className="grid gap-6">
                {forms.length === 0 ? (
                    <Card className="border-2 border-surface/10">
                        <CardContent className="py-12 text-center">
                            <BarChart3 className="h-12 w-12 text-surface-lighter mx-auto mb-4" />
                            <p className="text-surface-lighter">No forms created yet</p>
                            <Button variant="outline" asChild className="mt-4">
                                <Link href="/admin/builder">Create Your First Form</Link>
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
                                                    className="text-surface-lighter hover:text-primary transition-colors"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </div>
                                            <CardDescription className="line-clamp-1">{form.description}</CardDescription>
                                            <p className="text-[10px] font-mono text-surface-lighter mt-2 bg-surface/10 inline-block px-2 py-0.5 rounded">
                                                ID: {form.slug}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-primary">
                                                {formSubmissions.length}
                                            </div>
                                            <p className="text-[10px] text-surface-lighter uppercase font-black tracking-widest">
                                                Responses
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button variant="brutalist" asChild className="flex-1 w-full justify-start sm:justify-center">
                                            <Link href={`/admin/responses/${form.slug}`}>
                                                <BarChart3 className="mr-2 h-4 w-4" />
                                                View Responses
                                            </Link>
                                        </Button>
                                        <div className="flex gap-3 flex-1">
                                            <Button variant="outline" asChild className="flex-1 w-full justify-start sm:justify-center">
                                                <Link href={`/admin/builder?edit=${form.slug}`}>
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
        </div>
    );
}
