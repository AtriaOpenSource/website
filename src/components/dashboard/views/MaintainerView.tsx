"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMaintainerRepositories } from "@/lib/firebase/repos";
import { getMaintainerPullRequests, PullRequest } from "@/lib/firebase/prs";
import { dashboardRoutes } from "@/lib/routes/dashboard";
import { Activity, GitBranch, GitPullRequest, ShieldCheck } from "lucide-react";

const toDate = (value: unknown): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "object" && value !== null && "seconds" in value) {
        const seconds = (value as { seconds?: number }).seconds;
        if (typeof seconds === "number") return new Date(seconds * 1000);
    }
    return null;
};

const getActivityLabel = (pr: PullRequest): string => {
    const submittedAt = toDate(pr.submittedAt);
    const updatedAt = toDate(pr.updatedAt);
    if (submittedAt && updatedAt && Math.abs(updatedAt.getTime() - submittedAt.getTime()) > 60_000) {
        return "Updated";
    }
    return "Created";
};

export function MaintainerView() {
    const { user, userData, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [prs, setPrs] = useState<PullRequest[]>([]);
    const [repoCount, setRepoCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const repos = await getMaintainerRepositories(user.uid);
                setRepoCount(repos.length);

                const repoNames = repos.map((repo) => `${repo.owner}/${repo.name}`);
                if (repoNames.length === 0) {
                    setPrs([]);
                    return;
                }
                const maintainerPrs = await getMaintainerPullRequests(repoNames);
                setPrs(maintainerPrs);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.role === "maintainer") {
            fetchData();
        }
    }, [user, userData]);

    const stats = useMemo(() => {
        const merged = prs.filter((pr) => pr.status === "merged").length;
        const rejected = prs.filter((pr) => pr.status === "rejected").length;
        const reviewed = prs.filter((pr) => pr.status !== "pending").length;
        return {
            total: prs.length,
            reviewed,
            merged,
            rejected,
        };
    }, [prs]);

    const recentActivity = useMemo(() => {
        return [...prs]
            .sort((a, b) => {
                const aDate = toDate(a.updatedAt) ?? toDate(a.submittedAt) ?? new Date(0);
                const bDate = toDate(b.updatedAt) ?? toDate(b.submittedAt) ?? new Date(0);
                return bDate.getTime() - aDate.getTime();
            })
            .slice(0, 10);
    }, [prs]);

    if (authLoading || loading) return <PageLoadingState message="Loading maintainer overview..." />;
    if (!userData || userData.role !== "maintainer") return <AccessDenied />;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Maintainer Overview"
                description="Monitor review throughput, outcomes, and recent repository activity."
                // actions={{
                //     label: "Review PRs",
                //     href: dashboardRoutes.maintainer.reviewPRs,
                //     variant: "brutalist",
                // }}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-xs uppercase tracking-wider text-ink/60">PRs Reviewed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-primary">{stats.reviewed}</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-xs uppercase tracking-wider text-ink/60">PRs Merged</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-green-600">{stats.merged}</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-xs uppercase tracking-wider text-ink/60">PRs Rejected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-red-600">{stats.rejected}</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-xs uppercase tracking-wider text-ink/60">Total PRs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-ink">{stats.total}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border border-surface-lighter">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-ink/70 text-sm">
                            <GitBranch className="h-4 w-4 text-primary" />
                            Assigned Repositories
                        </div>
                        <p className="text-3xl font-black mt-2">{repoCount}</p>
                    </CardContent>
                </Card>
                <Card className="border border-surface-lighter">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-ink/70 text-sm">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            Pending Reviews
                        </div>
                        <p className="text-3xl font-black mt-2">{prs.filter((pr) => pr.status === "pending").length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-surface-lighter">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Recent Activity
                    </CardTitle>
                    <Button asChild variant="outline" size="sm">
                        <Link href={dashboardRoutes.maintainer.reviewPRs}>Open Review Queue</Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentActivity.length === 0 ? (
                        <div className="text-sm text-ink/70 font-(family-name:--font-jetbrains) border border-dashed border-surface-lighter p-4">
                            No activity yet. New PRs will appear here once synced.
                        </div>
                    ) : (
                        recentActivity.map((pr) => {
                            const when = toDate(pr.updatedAt) ?? toDate(pr.submittedAt);
                            return (
                                <Link
                                    key={pr.id}
                                    href={pr.html_url}
                                    target="_blank"
                                    className="block border border-surface-lighter p-3 hover:border-primary transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm line-clamp-1">{pr.title}</p>
                                            <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) mt-1">
                                                {pr.repoName} #{pr.prNumber} by @{pr.user.login}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="font-(family-name:--font-jetbrains) text-[10px] uppercase">
                                            {getActivityLabel(pr)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-[11px] text-ink/60">
                                        <span>{when ? when.toLocaleString() : "Time unavailable"}</span>
                                        <span className="flex items-center gap-1">
                                            <GitPullRequest className="h-3 w-3" />
                                            {pr.status}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
