"use client";

import { useAuth } from "@/context/auth";
import { AdminView } from "@/components/dashboard/views/AdminView";
import { PageLoadingState } from "@/components/layout/PageHeader";
import { AccessDenied } from "@/components/dashboard/AccessDenied";

export default function AdminDashboardPage() {
    const { userData, loading } = useAuth();

    if (loading) {
        return <PageLoadingState message="Loading dashboard..." />;
    }

    if (!userData || userData.role !== "admin") {
        return <AccessDenied />;
    }

    return <AdminView />;
}
