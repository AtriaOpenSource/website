"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { getContributorPullRequests, PullRequest } from "@/lib/firebase/prs";
import { getLeaderboardUsers } from "@/lib/firebase/users";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { dashboardRoutes } from "@/lib/routes/dashboard";
import { BarChart3, Clock3, Medal, Trophy, Zap } from "lucide-react";

const toDate = (value: unknown): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "object" && value !== null && "seconds" in value) {
        const seconds = (value as { seconds?: number }).seconds;
        if (typeof seconds === "number") return new Date(seconds * 1000);
    }
    return null;
};

const describeStatus = (status: PullRequest["status"]): string => {
    switch (status) {
        case "merged":
            return "Merged";
        case "rejected":
            return "Rejected";
        case "review":
            return "Marked For Review";
        case "changes":
            return "Modify Requested";
        default:
            return "Pending Review";
    }
};

export function ContributorView() {
    const { userData, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [myPrs, setMyPrs] = useState<PullRequest[]>([]);
    const [leaderboardRank, setLeaderboardRank] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!userData?.githubUsername) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const [prs, leaderboard] = await Promise.all([
                    getContributorPullRequests(userData.githubUsername),
                    getLeaderboardUsers(250),
                ]);
                setMyPrs(prs);

                const rank = leaderboard.findIndex((entry) => entry.uid === userData.uid);
                setLeaderboardRank(rank >= 0 ? rank + 1 : null);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.role === "contributor") {
            fetchData();
        }
    }, [userData]);

    const stats = useMemo(() => {
        const merged = myPrs.filter((pr) => pr.status === "merged").length;
        const active = myPrs.filter((pr) => pr.status !== "merged" && pr.status !== "rejected").length;
        return {
            total: myPrs.length,
            merged,
            active,
        };
    }, [myPrs]);

    const recentUpdates = useMemo(() => {
        return [...myPrs]
            .sort((a, b) => {
                const aDate = toDate(a.updatedAt) ?? toDate(a.submittedAt) ?? new Date(0);
                const bDate = toDate(b.updatedAt) ?? toDate(b.submittedAt) ?? new Date(0);
                return bDate.getTime() - aDate.getTime();
            })
            .slice(0, 8);
    }, [myPrs]);

    if (authLoading || loading) {
        return <PageLoadingState message="Loading contributor overview..." />;
    }

    if (!userData || userData.role !== "contributor") return <AccessDenied />;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Contributor Overview"
                description={`Welcome, ${userData.githubUsername || "Contributor"}. Track your performance and recent outcomes.`}
                // actions={{
                //     label: "Your Repos",
                //     href: dashboardRoutes.contributor.yourRepos,
                //     variant: "outline",
                // }}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wider text-ink/70 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-primary" /> Total Points
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-primary">{userData.points || 0}</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wider text-ink/70 flex items-center gap-2">
                            <Medal className="h-4 w-4 text-accent" /> Leaderboard Rank
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-accent">
                            {leaderboardRank ? `#${leaderboardRank}` : "--"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-surface-lighter">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wider text-ink/70 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-secondary" /> Active PRs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-black text-secondary">{stats.active}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border border-surface-lighter">
                    <CardContent className="pt-6">
                        <p className="text-xs font-(family-name:--font-jetbrains) uppercase text-ink/60">Merged PRs</p>
                        <p className="text-3xl font-black text-primary">{stats.merged}</p>
                    </CardContent>
                </Card>
                <Card className="border border-surface-lighter">
                    <CardContent className="pt-6">
                        <p className="text-xs font-(family-name:--font-jetbrains) uppercase text-ink/60">Total PRs</p>
                        <p className="text-3xl font-black text-ink">{stats.total}</p>
                    </CardContent>
                </Card>
                <Card className="border border-surface-lighter">
                    <CardContent className="pt-6">
                        <p className="text-xs font-(family-name:--font-jetbrains) uppercase text-ink/60">Rejected PRs</p>
                        <p className="text-3xl font-black text-red-600">
                            {myPrs.filter((pr) => pr.status === "rejected").length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-surface-lighter">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <Clock3 className="h-5 w-5 text-primary" /> Recent Updates
                    </CardTitle>
                    <Button asChild variant="outline" size="sm">
                        <Link href={dashboardRoutes.contributor.yourRepos}>View Your Repos</Link>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentUpdates.length === 0 ? (
                        <div className="text-sm text-ink/70 font-(family-name:--font-jetbrains) border border-dashed border-surface-lighter p-4">
                            No updates yet. Start by opening a PR with <code>#asoc</code> in title/body.
                        </div>
                    ) : (
                        recentUpdates.map((pr) => {
                            const activityDate = toDate(pr.updatedAt) ?? toDate(pr.submittedAt);
                            return (
                                <Link
                                    key={pr.id}
                                    href={pr.html_url}
                                    target="_blank"
                                    className="block border border-surface-lighter p-3 hover:border-primary transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-sm text-ink line-clamp-1">{pr.title}</p>
                                            <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) mt-1">{pr.repoName} #{pr.prNumber}</p>
                                        </div>
                                        <Badge variant="outline" className="font-(family-name:--font-jetbrains) text-[10px] uppercase">
                                            {describeStatus(pr.status)}
                                        </Badge>
                                    </div>
                                    <p className="text-[11px] text-ink/60 mt-2">
                                        {activityDate ? activityDate.toLocaleString() : "Time unavailable"}
                                    </p>
                                </Link>
                            );
                        })
                    )}
                </CardContent>
            </Card>

            <Card className="border border-surface-lighter bg-surface/30">
                <CardContent className="pt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-ink/70">
                        <BarChart3 className="h-4 w-4" />
                        Track repos and profile from the side navigation tabs.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
