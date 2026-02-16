"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "./PageHeader";

interface LegalLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    badge?: string;
    lastUpdated?: string;
}

export function LegalLayout({
    children,
    title,
    description,
    lastUpdated
}: LegalLayoutProps) {
    return (
        <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen"
        >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <PageHeader
                    title={title}
                    description={description}
                />
            </div>

            {/* Main Content */}
            <main className="grow relative z-10">
                <div className="max-w-6xl mx-auto py-4">
                    {lastUpdated && (
                        <div className="flex items-center gap-2 text-ink/40 font-(family-name:--font-jetbrains) text-[10px] uppercase tracking-widest mb-12 border-b border-ink/5 pb-4">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            Last Updated: {lastUpdated}
                        </div>
                    )}
                    <div className="prose prose-lg prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-p:text-ink/80 prose-li:text-ink/80 max-w-none">
                        {children}
                    </div>
                </div>
            </main>
        </motion.div>
    );
}
