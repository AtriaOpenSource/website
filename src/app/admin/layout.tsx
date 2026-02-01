import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AdminAuthGate>
            <DashboardLayout>{children}</DashboardLayout>
        </AdminAuthGate>
    );
}
