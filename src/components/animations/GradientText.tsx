"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function GradientText({ children, className, animate = true }: GradientTextProps) {
    return (
        <motion.span
            className={cn(
                "bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient inline-block",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.span>
    );
}
