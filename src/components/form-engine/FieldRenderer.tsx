"use client";

import { FormField } from "@/lib/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FieldRendererProps {
    field: FormField;
    register: any;
    errors: any;
    index: number;
}

export function FieldRenderer({ field, register, errors, index }: FieldRendererProps) {
    const fieldError = errors[field.id];

    return (
        <div className="space-y-3">
            {/* Question Label */}
            <label className="block">
                <span className="text-sm font-mono text-surface-lighter">Question {index}</span>
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
                                    className="w-5 h-5 text-primary border-2 border-surface/30 focus:ring-2 focus:ring-primary cursor-pointer"
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
                                    className="w-5 h-5 text-primary border-2 border-surface/30 rounded focus:ring-2 focus:ring-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary transition-colors">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {field.type === "select" && (
                    <select
                        {...register(field.id, { required: field.required })}
                        className="w-full h-12 px-4 border-2 border-surface/20 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                        <option value="">Choose an option</option>
                        {field.options?.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Error Message */}
            {fieldError && (
                <p className="text-sm text-red-500 font-medium">This field is required</p>
            )}
        </div>
    );
}
