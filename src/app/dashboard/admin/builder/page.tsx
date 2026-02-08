"use client";

import { useState, useEffect, Suspense } from "react";
import { FormField, FieldType } from "@/lib/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Plus, Trash2, GripVertical, Save, Loader2 } from "lucide-react";
import { QuestionEditor } from "@/components/form-builder/QuestionEditor";
import { useSearchParams, useRouter } from "next/navigation";
import { getForm, createForm, updateForm } from "@/lib/firebase/forms";
import { auth } from "@/lib/firebase/config";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { dashboardRoutes } from "@/lib/routes/dashboard";
import { DEFAULT_UPLOAD_FILE_TYPES } from "@/lib/utils/upload-types";

interface QuestionTypeSelectorProps {
    onSelect: (type: FieldType) => void;
}

function QuestionTypeSelector({ onSelect }: QuestionTypeSelectorProps) {
    const types: { value: FieldType; label: string }[] = [
        { value: "text", label: "Short Text" },
        { value: "paragraph", label: "Paragraph" },
        { value: "radio", label: "Multiple Choice" },
        { value: "checkbox", label: "Checkboxes" },
        { value: "select", label: "Dropdown" },
        { value: "upload", label: "File Upload" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {types.map((type) => (
                <Button
                    key={type.value}
                    variant="outline"
                    onClick={() => onSelect(type.value)}
                    className="h-auto py-4 flex flex-col gap-2 border-surface-lighter text-ink hover:border-primary hover:text-primary"
                >
                    <span className="text-sm font-mono">{type.label}</span>
                </Button>
            ))}
        </div>
    );
}

import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";

function FormBuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { userData, loading: authLoading } = useAuth();
    const { confirm, Dialog } = useConfirmDialog();
    const editSlug = searchParams.get("edit");

    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formSlug, setFormSlug] = useState("");
    const [fields, setFields] = useState<FormField[]>([]);
    const [showTypeSelector, setShowTypeSelector] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!editSlug);

    useEffect(() => {
        if (editSlug) {
            const fetchFormData = async () => {
                try {
                    const existingForm = await getForm(editSlug);
                    if (existingForm) {
                        setFormTitle(existingForm.title);
                        setFormDescription(existingForm.description);
                        setFormSlug(existingForm.slug);
                        setFields(existingForm.fields);
                    } else {
                        confirm({
                            title: "Error",
                            description: "Form not found for editing",
                            variant: "destructive",
                            confirmText: "Back to Dashboard",
                            cancelText: null,
                            onConfirm: () => router.push(dashboardRoutes.admin.responses),
                        });
                    }
                } catch (error) {
                    console.error("Error fetching form:", error);
                    confirm({
                        title: "Error",
                        description: "Failed to load form data. Please try again.",
                        variant: "destructive",
                        confirmText: "Retry",
                        cancelText: "Home",
                        onConfirm: () => window.location.reload(),
                    });
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchFormData();
        }
    }, [editSlug, router, confirm]);

    const addField = (type: FieldType) => {
        const newField: FormField = {
            id: `field_${Date.now()}`,
            type,
            label: "",
            required: false,
            options: type === "radio" || type === "checkbox" || type === "select" ? [""] : undefined,
            acceptedFileTypes: type === "upload" ? [...DEFAULT_UPLOAD_FILE_TYPES] : undefined,
        };
        setFields([...fields, newField]);
        setShowTypeSelector(false);
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
    };

    const deleteField = (id: string) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const handleSave = async () => {
        if (!formTitle.trim()) {
            confirm({
                title: "Validation Error",
                description: "Be sure to enter a creative form title!",
                variant: "warning",
                confirmText: "Got it",
                cancelText: null,
                onConfirm: () => { },
            });
            return;
        }
        if (!formSlug.trim()) {
            confirm({
                title: "Validation Error",
                description: "A form slug (URL) is required for identifying your form.",
                variant: "warning",
                confirmText: "Got it",
                cancelText: null,
                onConfirm: () => { },
            });
            return;
        }
        if (fields.length === 0) {
            confirm({
                title: "Empty Form",
                description: "A form without questions is like a car without tires. Add at least one question!",
                variant: "warning",
                confirmText: "Add Question",
                cancelText: null,
                onConfirm: () => setShowTypeSelector(true),
            });
            return;
        }

        setLoading(true);
        try {
            // Clean fields to remove undefined values and empty options
            const cleanedFields = fields.map(field => {
                const cleanField: FormField = {
                    id: field.id,
                    type: field.type,
                    label: field.label || "",
                    required: field.required || false,
                };

                // Only add options if they exist and have non-empty values
                if (field.options && field.options.filter(opt => opt.trim()).length > 0) {
                    cleanField.options = field.options.filter(opt => opt.trim());
                }
                if (field.type === "upload" && field.acceptedFileTypes?.length) {
                    cleanField.acceptedFileTypes = field.acceptedFileTypes;
                }

                return cleanField;
            });

            const formData = {
                slug: formSlug,
                title: formTitle,
                description: formDescription || "",
                fields: cleanedFields,
            };

            if (editSlug) {
                await updateForm(editSlug, formData);
                confirm({
                    title: "Success",
                    description: `Form "${formTitle}" updated successfully!`,
                    variant: "success",
                    confirmText: "View Responses",
                    cancelText: "Continue Editing",
                    onConfirm: () => router.push(dashboardRoutes.admin.responses),
                });
            } else {
                await createForm(formData, auth.currentUser?.email || "admin");
                confirm({
                    title: "Published",
                    description: `Form "${formTitle}" is now live and ready for responses!`,
                    variant: "success",
                    confirmText: "View Responses",
                    cancelText: "Edit Further",
                    onConfirm: () => router.push(dashboardRoutes.admin.responses),
                });
                router.push(`${dashboardRoutes.admin.builder}?edit=${formSlug}`);
            }
        } catch (error) {
            console.error("Save error:", error);
            confirm({
                title: "Save Failed",
                description: "Something went wrong while saving. Please try again.",
                variant: "destructive",
                confirmText: "Retry",
                cancelText: null,
                onConfirm: () => { },
            });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <PageLoadingState message="Fetching form configuration..." />;
    }

    if (authLoading) return <PageLoadingState message="Checking permissions..." />;
    if (!userData || userData.role !== 'admin') return <AccessDenied />;

    return (
        <div className="space-y-8">
            <Dialog />

            <PageHeader
                title={editSlug ? "Edit Form" : "Form Builder"}
                description={editSlug ? `Modifying: ${editSlug}` : "Create a new form with custom fields"}
            />

            {/* Form Settings */}
            <Card className="border-2 border-surface-lighter shadow-[4px_4px_0_0_var(--color-surface-lighter)] bg-surface-light">
                <CardHeader>
                    <CardTitle className="font-mono uppercase text-sm">Form Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-xs font-black mb-2 uppercase tracking-wider text-ink/60">Form Title *</label>
                        <Input
                            placeholder="e.g., Beta Testing Registration"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            className="text-lg font-bold border-2 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black mb-2 uppercase tracking-wider text-ink/60">Description</label>
                        <Textarea
                            placeholder="Brief description of this form..."
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            rows={3}
                            className="border-2 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black mb-2 uppercase tracking-wider text-ink/60">
                            Form Slug * <span className="text-ink/60 text-[10px] normal-case tracking-normal">(Unique URL path)</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-ink/60 w-auto text-nowrap text-sm font-mono">osatria.in/forms/</span>
                            <Input
                                placeholder="beta-testing"
                                value={formSlug}
                                disabled={!!editSlug}
                                onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                className="font-mono border-2 disabled:opacity-50 disabled:bg-surface/5"
                            />
                        </div>
                        {editSlug && (
                            <p className="text-[10px] text-accent mt-1 font-mono uppercase">Slug cannot be changed after creation</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Form Fields */}
            <div className="space-y-4">
                <h2 className="text-2xl font-black text-ink uppercase tracking-tight">Questions</h2>

                {fields.map((field, index) => (
                    <Card key={field.id} className="border-2 border-surface-lighter group hover:border-primary transition-colors bg-surface-light">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 mt-2">
                                    <GripVertical className="h-5 w-5 text-ink/40 cursor-move" />
                                </div>
                                <div className="flex-1">
                                    <QuestionEditor
                                        field={field}
                                        index={index}
                                        onUpdate={(updates) => updateField(field.id, updates)}
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteField(field.id)}
                                    className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add Question Button */}
                {!showTypeSelector ? (
                    <Button
                        variant="outline"
                        onClick={() => setShowTypeSelector(true)}
                        className="w-full h-16 border-2 border-dashed hover:border-ink hover:bg-surface/5"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Question
                    </Button>
                ) : (
                    <Card className="border-2 border-primary/30 bg-primary/5">
                        <CardContent className="pt-6 text-center">
                            <h3 className="text-xs font-black text-ink uppercase tracking-widest mb-4">Select Question Type</h3>
                            <QuestionTypeSelector onSelect={addField} />
                            <Button variant="ghost" onClick={() => setShowTypeSelector(false)} className="mt-4 text-xs font-mono uppercase">
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 sticky bottom-6 bg-paper/80 backdrop-blur-md py-4 border-t-4 border-ink px-4 -mx-4">
                <Button
                    variant="brutalist"
                    size="lg"
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1"
                >
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                        <Save className="h-5 w-5 mr-2" />
                    )}
                    {editSlug ? "Update Form" : "Create & Save Form"}
                </Button>
                {/* <Button variant="outline" size="lg" asChild className="hidden sm:flex">
                    <Link href={formSlug ? `/forms/${formSlug}` : "#"} target="_blank">
                        <Eye className="h-5 w-5 mr-2" />
                        Preview
                    </Link>
                </Button> */}
            </div>
        </div>
    );
}

export default function FormBuilder() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        }>
            <FormBuilderContent />
        </Suspense>
    );
}
