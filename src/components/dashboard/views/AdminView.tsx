"use client";

import { useEffect, useState, type ComponentType } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput, Users, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { getAllForms } from "@/lib/firebase/forms";
import { getAllSubmissions } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";
import { dashboardRoutes } from "@/lib/routes/dashboard";

// This code was moved from src/app/admin/page.tsx
export function AdminView() {
    const [forms, setForms] = useState<Form[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [permissionError, setPermissionError] = useState<string | null>(null);

    useEffect(() => {
        const isPermissionDenied = (error: unknown) =>
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            String((error as { code?: unknown }).code) === "permission-denied";

        const fetchData = async () => {
            try {
                setPermissionError(null);

                const [formsResult, submissionsResult] = await Promise.allSettled([
                    getAllForms(),
                    getAllSubmissions(),
                ]);

                if (formsResult.status === "fulfilled") {
                    setForms(formsResult.value);
                } else {
                    setForms([]);
                    console.error("Error fetching forms:", formsResult.reason);
                }

                if (submissionsResult.status === "fulfilled") {
                    setSubmissions(submissionsResult.value);
                } else {
                    setSubmissions([]);
                    console.error("Error fetching submissions:", submissionsResult.reason);
                    if (isPermissionDenied(submissionsResult.reason)) {
                        setPermissionError(
                            "Submission access is blocked by Firestore rules for this account. Verify users/{uid}.role is 'admin' in production and redeploy rules."
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ... (keep logic for uniqueContributors, growth, recentSubmissions)
    const uniqueContributors = new Set(submissions.map(s => s.userEmail)).size;
    const growth = submissions.length > 0 ? "+..." : "0%";
    const recentSubmissions = submissions
        .sort((a, b) => {
            const dateA = a.submittedAt instanceof Date ? a.submittedAt : new Date(a.submittedAt.seconds * 1000);
            const dateB = b.submittedAt instanceof Date ? b.submittedAt : new Date(b.submittedAt.seconds * 1000);
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5);


    if (loading) {
        return <PageLoadingState message="Loading dashboard..." />;
    }

    return (
        <div className="space-y-12">
            <PageHeader
                title="Admin Dashboard"
                description="Welcome to ASoC Admin Panel"
                titleSize="lg"
            />

            {permissionError && (
                <Card className="border-2 border-red-500/30 bg-red-50">
                    <CardContent className="py-4 text-sm font-medium text-red-700">
                        {permissionError}
                    </CardContent>
                </Card>
            )}

            {/* ... (rest of the content with improved grid spacing) */}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* ... (Stats Cards - Keep content but ensure styling is consistent) */}
                <StatsCard title="Total Forms" value={forms.length} label="Active forms" icon={FormInput} />
                <StatsCard title="Submissions" value={submissions.length} label="Total responses" icon={BarChart3} accent />
                <StatsCard title="Contributors" value={uniqueContributors} label="Active users" icon={Users} />
                <StatsCard title="Growth" value={growth} label="This month" icon={TrendingUp} accent />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <Card className="h-full border-2 border-surface-lighter shadow-[8px_8px_0_0_var(--color-surface-lighter)] bg-surface-light rounded-none">
                        <CardHeader>
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-ink">Quick Actions</CardTitle>
                            <CardDescription className="text-ink/60 font-(family-name:--font-jetbrains)">Manage your platform resources</CardDescription>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <ActionBtn href={dashboardRoutes.admin.repos} label="Manage Repositories" />
                            <ActionBtn href={dashboardRoutes.admin.users} label="Manage Maintainers" />
                            <ActionBtn href={dashboardRoutes.admin.builder} label="Create New Form" />
                            <ActionBtn href={dashboardRoutes.admin.responses} label="View All Responses" />
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div>
                    <Card className="h-full border-2 border-surface-lighter bg-surface-light rounded-none">
                        <CardHeader>
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-ink">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentSubmissions.length === 0 ? (
                                <div className="text-center py-8 text-ink/40 opacity-50 font-(family-name:--font-jetbrains)">No submissions yet</div>
                            ) : (
                                <div className="space-y-4">
                                    {recentSubmissions.map((submission) => (
                                        <ActivityItem key={submission.id} submission={submission} forms={forms} />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Helper Components for cleaner code
interface StatsCardProps {
    title: string;
    value: string | number;
    label: string;
    icon: ComponentType<{ className?: string }>;
    accent?: boolean;
}

const StatsCard = ({ title, value, label, icon: Icon, accent }: StatsCardProps) => (
    <Card className={`border-2 ${accent ? 'border-accent shadow-[4px_4px_0_0_var(--color-accent)]' : 'border-primary shadow-[4px_4px_0_0_var(--color-primary)]'} hover:-translate-y-1 transition-transform bg-surface-light rounded-none group`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-bold uppercase tracking-wider ${accent ? 'text-accent' : 'text-primary'}`}>{title}</CardTitle>
            <Icon className={`h-5 w-5 ${accent ? 'text-accent' : 'text-primary'} group-hover:scale-110 transition-transform`} />
        </CardHeader>
        <CardContent>
            <div className={`text-4xl font-black ${accent ? 'text-accent' : 'text-primary'}`}>{value}</div>
            <p className="text-xs font-bold text-ink/60 mt-1 uppercase font-(family-name:--font-jetbrains)">{label}</p>
        </CardContent>
    </Card>
);

const ActionBtn = ({ href, label }: { href: string, label: string }) => (
    <Button variant="outline" asChild className="h-auto py-4 text-lg justify-start border-surface-lighter text-ink hover:bg-primary hover:text-surface hover:border-primary transition-all rounded-none font-black uppercase tracking-tight">
        <Link href={href}>{label}</Link>
    </Button>
);

const ActivityItem = ({ submission, forms }: { submission: Submission, forms: Form[] }) => {
    const timeAgo = getTimeAgo(submission.submittedAt instanceof Date ? submission.submittedAt : new Date(submission.submittedAt.seconds * 1000));
    return (
        <div className="flex gap-3 pb-3 border-b border-surface-lighter last:border-0 last:pb-0">
            <div className="h-2 w-2 bg-primary rounded-none rotate-45 mt-2 shrink-0" />
            <div>
                <p className="font-bold text-sm leading-tight text-ink">
                    New submission to <span className="text-primary">&quot;{forms.find(f => f.slug === submission.formSlug)?.title || submission.formSlug}&quot;</span>
                </p>
                <p className="text-xs text-ink/75 font-(family-name:--font-jetbrains) mt-1">
                    {submission.userEmail} • {timeAgo}
                </p>
            </div>
        </div>
    );
};

function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
}
