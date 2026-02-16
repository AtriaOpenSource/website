"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, XCircle, Info, X } from "lucide-react";
import { Button } from "./button";

export type AlertType = "success" | "error" | "warning" | "info" | "confirm";

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    type: AlertType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    confirm: AlertCircle,
};

const colorMap = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
    confirm: "text-primary",
};

const bgColorMap = {
    success: "bg-green-50",
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-50",
    confirm: "bg-primary/5",
};

export function AlertModal({
    isOpen,
    onClose,
    onConfirm,
    type,
    title,
    message,
    confirmText = "OK",
    cancelText = "Cancel",
}: AlertModalProps) {
    const Icon = iconMap[type];
    const isConfirmType = type === "confirm";

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 h-full"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="pointer-events-auto w-full max-w-md"
                        >
                            <div className="bg-surface border-4 border-ink shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 text-ink/50 hover:text-ink transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-full ${bgColorMap[type]} flex items-center justify-center mb-4`}>
                                        <Icon className={`h-6 w-6 ${colorMap[type]}`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black mb-2 text-ink">
                                        {title}
                                    </h3>

                                    {/* Message */}
                                    <p className="text-ink/70 mb-6">
                                        {message}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-3 justify-end">
                                        {isConfirmType && (
                                            <Button
                                                variant="outline"
                                                onClick={onClose}
                                            >
                                                {cancelText}
                                            </Button>
                                        )}
                                        <Button
                                            variant="brutalist"
                                            onClick={handleConfirm}
                                        >
                                            {confirmText}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

// Hook for using alerts
export function useAlert() {
    const [alertState, setAlertState] = React.useState<{
        isOpen: boolean;
        type: AlertType;
        title: string;
        message: string;
        onConfirm?: () => void;
    }>({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
    });

    const showAlert = (
        type: AlertType,
        title: string,
        message: string,
        onConfirm?: () => void
    ) => {
        setAlertState({
            isOpen: true,
            type,
            title,
            message,
            onConfirm,
        });
    };

    const closeAlert = () => {
        setAlertState((prev) => ({ ...prev, isOpen: false }));
    };

    return {
        alertState,
        showAlert,
        closeAlert,
    };
}

// Import React for the hook
import React from "react";
