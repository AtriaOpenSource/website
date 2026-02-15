"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { getDashboardBase } from "@/lib/routes/dashboard";

export function AccessDenied({ message = "You do not have permission to view this page." }: { message?: string }) {
    const { userData } = useAuth();
    const dashboardHref = userData ? getDashboardBase(userData.role) : "/";

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p>{message}</p>
            <Button asChild><Link href={dashboardHref}>Return to Dashboard</Link></Button>
        </div>
    );
}
