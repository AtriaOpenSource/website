"use client";

import { useRef, useState } from "react";
import { FormField } from "@/lib/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upload } from "@imagekit/javascript";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { getUploadAcceptList, isFileAllowedByType, UPLOAD_FILE_TYPE_OPTIONS } from "@/lib/utils/upload-types";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface FieldRendererProps {
    field: FormField;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    index: number;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;
}

const MAX_UPLOAD_SIZE_MB = 10;

export function FieldRenderer({ field, register, errors, index, setValue, watch }: FieldRendererProps) {
    const fieldError = errors[field.id];
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const currentUploadUrl: string | undefined = watch(field.id);

    const acceptedTypes = field.type === "upload" ? getUploadAcceptList(field.acceptedFileTypes) : [];
    const acceptedTypesText = field.type === "upload"
        ? UPLOAD_FILE_TYPE_OPTIONS
            .filter((opt) => field.acceptedFileTypes?.includes(opt.key))
            .map((opt) => opt.label)
            .join(", ")
        : "";

    const handleUpload = async (file?: File | null) => {
        if (!file) return;
        setUploadError(null);

        if (!isFileAllowedByType(file.name, field.acceptedFileTypes)) {
            setUploadError(`Unsupported file type. Allowed: ${acceptedTypesText || "Configured types only"}.`);
            return;
        }

        if (file.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
            setUploadError(`File size must be under ${MAX_UPLOAD_SIZE_MB}MB.`);
            return;
        }

        const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
        if (!publicKey) {
            setUploadError("ImageKit public key is missing. Please configure environment variables.");
            return;
        }

        setUploading(true);
        try {
            const authResponse = await fetch("/api/imagekit-auth");
            if (!authResponse.ok) {
                throw new Error("Failed to fetch ImageKit authentication parameters.");
            }
            const authData = await authResponse.json();

            const response = await upload({
                file,
                fileName: `${Date.now()}-${file.name}`,
                publicKey,
                token: authData.token,
                expire: authData.expire,
                signature: authData.signature,
                folder: "/osatria/forms",
                useUniqueFileName: true,
            });

            setValue(
                field.id,
                response.url,
                { shouldDirty: true, shouldValidate: true },
            );
        } catch (error) {
            console.error("ImageKit upload failed:", error);
            setUploadError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const clearUploadedFile = () => {
        setValue(field.id, "", { shouldDirty: true, shouldValidate: true });
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-3">
            {/* Question Label */}
            <label className="block">
                <span className="text-sm font-mono text-ink/60">Question {index}</span>
                <h3 className="text-lg font-semibold text-ink mt-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
            </label>

            {/* Field Input */}
            <div>
                {field.type === "text" && (
                    <Input
                        {...register(field.id, { required: field.required })}
                        placeholder="Your answer"
                        className={fieldError ? "border-red-500" : ""}
                    />
                )}

                {field.type === "paragraph" && (
                    <Textarea
                        {...register(field.id, { required: field.required })}
                        placeholder="Your answer"
                        rows={4}
                        className={fieldError ? "border-red-500" : ""}
                    />
                )}

                {field.type === "radio" && (
                    <div className="space-y-3">
                        {field.options?.map((option, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    value={option}
                                    {...register(field.id, { required: field.required })}
                                    className="w-5 h-5 text-primary border-2 border-surface-lighter focus:ring-2 focus:ring-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary transition-colors">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {field.type === "checkbox" && (
                    <div className="space-y-3">
                        {field.options?.map((option, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    value={option}
                                    {...register(field.id, { required: field.required })}
                                    className="w-5 h-5 text-primary border-2 border-surface-lighter rounded focus:ring-2 focus:ring-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary transition-colors">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {field.type === "select" && (
                    <select
                        {...register(field.id, { required: field.required })}
                        className="w-full h-12 px-4 border-2 border-surface-lighter rounded-md bg-surface-light text-ink focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                        <option value="">Choose an option</option>
                        {field.options?.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}

                {field.type === "upload" && (
                    <div className="space-y-3">
                        <input type="hidden" {...register(field.id, { required: field.required })} />
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept={acceptedTypes.join(",")}
                            onChange={(e) => void handleUpload(e.target.files?.[0])}
                        />

                        {currentUploadUrl ? (
                            <div className="flex items-center justify-between border-2 border-surface-lighter rounded-md p-3 bg-surface-light">
                                <a
                                    href={currentUploadUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-medium text-primary hover:underline truncate"
                                >
                                    View uploaded file
                                </a>
                                <Button type="button" variant="ghost" size="icon" onClick={clearUploadedFile}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div
                                role="button"
                                tabIndex={0}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    void handleUpload(e.dataTransfer.files?.[0]);
                                }}
                                onClick={() => fileInputRef.current?.click()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        fileInputRef.current?.click();
                                    }
                                }}
                                className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-surface-lighter bg-surface-light"}`}
                            >
                                <Upload className="mx-auto h-6 w-6 text-ink/75 mb-2" />
                                <p className="text-sm font-medium text-ink">
                                    {uploading ? "Uploading..." : "Drag and drop a file or click to upload"}
                                </p>
                                <p className="text-xs text-ink/60 mt-1">
                                    Supported: {acceptedTypesText || "Configured types"} | Max size: {MAX_UPLOAD_SIZE_MB}MB
                                </p>
                            </div>
                        )}

                        {uploadError && <p className="text-sm text-red-500 font-medium">{uploadError}</p>}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {fieldError && (
                <p className="text-sm text-red-500 font-medium">This field is required</p>
            )}
        </div>
    );
}
