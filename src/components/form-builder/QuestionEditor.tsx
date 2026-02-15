"use client";

import { FormField, FieldType } from "@/lib/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UploadFileTypeKey, UPLOAD_FILE_TYPE_OPTIONS } from "@/lib/utils/upload-types";

interface QuestionEditorProps {
    field: FormField;
    index: number;
    onUpdate: (updates: Partial<FormField>) => void;
}

export function QuestionEditor({ field, index, onUpdate }: QuestionEditorProps) {
    const addOption = () => {
        const options = field.options || [];
        onUpdate({ options: [...options, ""] });
    };

    const updateOption = (optIndex: number, value: string) => {
        const options = [...(field.options || [])];
        options[optIndex] = value;
        onUpdate({ options });
    };

    const removeOption = (optIndex: number) => {
        const options = field.options?.filter((_, i) => i !== optIndex);
        onUpdate({ options });
    };

    const getTypeLabel = (type: FieldType) => {
        const labels = {
            text: "Short Text",
            paragraph: "Paragraph",
            radio: "Multiple Choice",
            checkbox: "Checkboxes",
            select: "Dropdown",
            upload: "File Upload",
        };
        return labels[type];
    };

    const toggleUploadType = (typeKey: UploadFileTypeKey) => {
        const current = new Set(field.acceptedFileTypes || []);
        if (current.has(typeKey)) {
            current.delete(typeKey);
        } else {
            current.add(typeKey);
        }
        onUpdate({ acceptedFileTypes: Array.from(current) });
    };

    return (
        <div className="space-y-4">
            {/* Question Number and Type */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-(family-name:--font-jetbrains) text-ink/60">
                    Question {index + 1} • {getTypeLabel(field.type)}
                </span>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => onUpdate({ required: e.target.checked })}
                        className="rounded border-surface/30"
                    />
                    <span className="font-(family-name:--font-jetbrains)">Required</span>
                </label>
            </div>

            {/* Question Label */}
            <Input
                placeholder="Question text"
                value={field.label}
                onChange={(e) => onUpdate({ label: e.target.value })}
                className="text-base font-medium"
            />

            {/* Options for radio/checkbox/select */}
            {(field.type === "radio" || field.type === "checkbox" || field.type === "select") && (
                <div className="space-y-2 pl-4 border-l-2 border-surface/20">
                    <p className="text-xs font-(family-name:--font-jetbrains) text-ink/60 uppercase">Options</p>
                    {field.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                            <span className="text-sm text-ink/60">{optIndex + 1}.</span>
                            <Input
                                placeholder={`Option ${optIndex + 1}`}
                                value={option}
                                onChange={(e) => updateOption(optIndex, e.target.value)}
                                className="flex-1"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(optIndex)}
                                className="flex-shrink-0 h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="ghost" onClick={addOption} size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Option
                    </Button>
                </div>
            )}

            {field.type === "upload" && (
                <div className="space-y-2 pl-4 border-l-2 border-surface/20">
                    <p className="text-xs font-(family-name:--font-jetbrains) text-ink/60 uppercase">Supported File Types</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                        {UPLOAD_FILE_TYPE_OPTIONS.map((option) => {
                            const checked = field.acceptedFileTypes?.includes(option.key) || false;
                            return (
                                <label key={option.key} className="flex items-center gap-2 text-sm p-2 border border-surface-lighter rounded-sm bg-surface">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleUploadType(option.key)}
                                        className="rounded border-surface/30"
                                    />
                                    <span className="font-(family-name:--font-jetbrains) text-xs">{option.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Preview */}
            <div className="bg-surface/5 p-4 rounded-md border border-surface/10">
                <p className="text-xs font-(family-name:--font-jetbrains) text-ink/60 mb-2 uppercase">Preview</p>
                <p className="font-medium mb-3">
                    {field.label || "Question text will appear here"}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </p>
                {field.type === "text" && (
                    <Input placeholder="Short answer text" disabled className="bg-white/50" />
                )}
                {field.type === "paragraph" && (
                    <Textarea placeholder="Long answer text" disabled className="bg-white/50" rows={3} />
                )}
                {field.type === "radio" && (
                    <div className="space-y-2">
                        {field.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input type="radio" name={`preview-${field.id}`} disabled />
                                <span>{opt || `Option ${i + 1}`}</span>
                            </label>
                        ))}
                    </div>
                )}
                {field.type === "checkbox" && (
                    <div className="space-y-2">
                        {field.options?.map((opt, i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input type="checkbox" disabled />
                                <span>{opt || `Option ${i + 1}`}</span>
                            </label>
                        ))}
                    </div>
                )}
                {field.type === "select" && (
                    <select disabled className="w-full h-10 px-3 border-2 rounded-md bg-white/50">
                        <option>Choose an option</option>
                        {field.options?.map((opt, i) => (
                            <option key={i}>{opt || `Option ${i + 1}`}</option>
                        ))}
                    </select>
                )}
                {field.type === "upload" && (
                    <div className="w-full border-2 border-dashed border-surface-lighter rounded-md bg-surface-light px-4 py-6 text-center text-sm text-ink/60">
                        Drag and drop a file here, or click to upload
                    </div>
                )}
            </div>
        </div>
    );
}
