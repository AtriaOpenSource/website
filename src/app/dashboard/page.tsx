"use client";

import { useAuth } from "@/context/auth";
import { PageLoadingState } from "@/components/layout/PageHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDashboardBase } from "@/lib/routes/dashboard";

export default function DashboardPage() {
    const { userData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && userData) {
            router.replace(getDashboardBase(userData.role));
        }
    }, [loading, router, userData]);

    if (loading) {
        return <PageLoadingState message="Loading dashboard..." />;
    }

    if (!userData) {
        return (
            <div className="p-8 text-center">
                Please login to access the dashboard.
            </div>
        );
    }

    return <PageLoadingState message="Redirecting to your dashboard..." />;
}
