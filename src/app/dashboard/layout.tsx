"use client";

import { useAuth } from "@/context/auth";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { PageLoadingState } from "@/components/layout/PageHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { userData, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <PageLoadingState message="Loading dashboard..." />
            </div>
        );
    }

    // Default to contributor if no role (or waiting for update)
    const role = userData?.role || 'contributor';

    return (
        <div className="flex h-screen bg-surface overflow-hidden flex-col md:flex-row">
            <DashboardSidebar role={role as any} />
            <main className="flex-1 overflow-y-auto relative md:ml-64">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
