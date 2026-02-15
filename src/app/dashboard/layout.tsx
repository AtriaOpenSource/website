"use client";

import { useState, type CSSProperties } from "react";
import { useAuth } from "@/context/auth";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { PageLoadingState } from "@/components/layout/PageHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { userData, loading } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <PageLoadingState message="Loading dashboard..." />
            </div>
        );
    }

    // Default to contributor if no role (or waiting for update)
    const role: "admin" | "maintainer" | "contributor" =
        userData?.role === "admin" || userData?.role === "maintainer" || userData?.role === "contributor"
            ? userData.role
            : "contributor";
    const sidebarStyle = { "--sidebar-width": isCollapsed ? "80px" : "256px" } as CSSProperties;

    return (
        <div 
            className="flex h-screen bg-surface overflow-hidden flex-col md:flex-row"
            style={sidebarStyle}
        >
            <DashboardSidebar 
                role={role}
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />
            <main className="flex-1 overflow-y-auto relative md:ml-(--sidebar-width) transition-[margin-left] duration-300 ease-in-out">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
