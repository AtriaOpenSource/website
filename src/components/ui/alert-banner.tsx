"use client";

import { CheckCircle2, AlertTriangle, AlertCircle, Megaphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AlertBannerProps {
    variant?: "info" | "success" | "warning" | "error";
}

export function AlertBanner({ variant = "info" }: AlertBannerProps) {
    const variantStyles = {
        info: "bg-primary text-white border-primary-600",
        success: "bg-green-500 text-white border-green-600",
        warning: "bg-accent text-white border-accent-600",
        error: "bg-red-500 text-white border-red-600",
    };

    const icons = {
        info: Megaphone,
        success: CheckCircle2,
        warning: AlertTriangle,
        error: AlertCircle,
    };

    const Icon = icons[variant];

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 ${variantStyles[variant]} border-b-4`}
        >
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">We are now hiring!</span>
                    <Link
                        href="/forms/apply"
                        className="underline font-semibold hover:opacity-80 transition-opacity"
                    >
                        Click here
                    </Link>
                    <span className="text-sm">to apply!</span>
                </div>
            </div>
        </motion.div>
    );
}
