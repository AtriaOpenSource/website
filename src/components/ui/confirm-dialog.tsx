"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    variant?: "default" | "destructive" | "warning" | "success";
    confirmText?: string;
    cancelText?: string | null; // Null means no cancel button (alert mode)
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    variant = "default",
    confirmText = "Confirm",
    cancelText = "Cancel",
}: ConfirmDialogProps) {
    const [isConfirming, setIsConfirming] = useState(false);

    if (!open) return null;

    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            await onConfirm();
            onOpenChange(false);
        } finally {
            setIsConfirming(false);
        }
    };

    const icons = {
        default: Info,
        destructive: XCircle,
        warning: AlertTriangle,
        success: CheckCircle2,
    };

    const colors = {
        default: "text-primary",
        destructive: "text-red-500",
        warning: "text-accent",
        success: "text-green-500",
    };

    const Icon = icons[variant];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => onOpenChange(false)}
            />

            {/* Dialog */}
            <Card className="relative z-10 w-full max-w-sm border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
                <CardHeader className="pb-4">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className={`p-3 rounded-full bg-surface/5 border-2 border-surface/10 ${colors[variant]}`}>
                            <Icon className="h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-black uppercase tracking-tight">{title}</CardTitle>
                            <CardDescription className="text-sm font-medium leading-relaxed">
                                {description}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex gap-3 pt-2">
                    {cancelText && (
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isConfirming}
                            className="flex-1"
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        variant={variant === "destructive" ? "destructive" : "brutalist"}
                        onClick={handleConfirm}
                        disabled={isConfirming}
                        className="grow"
                    >
                        {isConfirming ? "Processing..." : confirmText}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

// Hook for easier usage
export function useConfirmDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<Omit<ConfirmDialogProps, "open" | "onOpenChange">>({
        onConfirm: () => { },
        title: "",
        description: "",
    });

    const confirm = (newConfig: Omit<ConfirmDialogProps, "open" | "onOpenChange">) => {
        setConfig(newConfig);
        setIsOpen(true);
    };

    const Dialog = () => (
        <ConfirmDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            {...config}
        />
    );

    return { confirm, Dialog, isOpen, setIsOpen };
}
