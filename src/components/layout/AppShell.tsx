"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { PublicFooter } from "./PublicLayout";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");
    const isFormPage = pathname?.startsWith("/forms/");

    // Dashboard and form pages have their own layouts
    if (isDashboard || isFormPage) {
        return (
            <div className="min-h-screen bg-surface text-ink font-sans selection:bg-primary selection:text-surface flex flex-col">
                {children}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface text-ink font-sans selection:bg-primary selection:text-surface flex flex-col">
            <Navbar />
            <main className="flex-1 relative">
                {/* Global Grid Background for consistency across all pages */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-surface-lighter)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-surface-lighter)_1px,transparent_1px)] bg-size-[40px_40px] opacity-30 pointer-events-none -z-10" />
                {children}
            </main>
            <PublicFooter />
        </div>
    );

}
