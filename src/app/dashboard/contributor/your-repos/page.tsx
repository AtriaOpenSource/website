"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRepositories, Repository } from "@/lib/firebase/repos";
import { fetchRepoForkByUser } from "@/lib/github/api";
import { GitBranch, ExternalLink } from "lucide-react";

interface ForkedRepoView {
    baseRepo: string;
    forkFullName: string;
    forkUrl: string;
    updatedAt?: string;
}

export default function ContributorYourReposPage() {
    const { userData, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [forkedRepos, setForkedRepos] = useState<ForkedRepoView[]>([]);

    useEffect(() => {
        const fetchForkedRepos = async () => {
            if (!userData?.githubUsername) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const repos = await getRepositories();
                const checks = await Promise.all(
                    repos.map(async (repo: Repository) => {
                        const fork = await fetchRepoForkByUser(repo.owner, repo.name, userData.githubUsername!);
                        if (!fork) return null;
                        return {
                            baseRepo: `${repo.owner}/${repo.name}`,
                            forkFullName: fork.full_name,
                            forkUrl: fork.html_url,
                            updatedAt: fork.updated_at,
                        } as ForkedRepoView;
                    })
                );
                setForkedRepos(checks.filter((repo): repo is ForkedRepoView => repo !== null));
            } finally {
                setLoading(false);
            }
        };

        if (userData?.role === "contributor") {
            fetchForkedRepos();
        }
    }, [userData]);

    const sortedRepos = useMemo(() => {
        return [...forkedRepos].sort((a, b) => {
            const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            return bTime - aTime;
        });
    }, [forkedRepos]);

    if (authLoading || loading) return <PageLoadingState message="Loading your forked repositories..." />;
    if (!userData || userData.role !== "contributor") return <AccessDenied />;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Your Repos"
                description="Forks owned by you that originate from repositories tracked by admins."
            />

            <div className="grid gap-4 md:grid-cols-2">
                {sortedRepos.length === 0 ? (
                    <Card className="border-2 border-dashed border-surface-lighter md:col-span-2">
                        <CardContent className="py-12 text-center text-ink/70">
                            <GitBranch className="h-10 w-10 mx-auto mb-3 text-ink/40" />
                            <p className="font-semibold">No tracked forks found.</p>
                            <p className="text-sm mt-1">Fork one of the listed event repositories and it will appear here.</p>
                        </CardContent>
                    </Card>
                ) : (
                    sortedRepos.map((repo) => (
                        <Card key={`${repo.baseRepo}_${repo.forkFullName}`} className="border-2 border-surface-lighter">
                            <CardHeader>
                                <CardTitle className="text-lg">{repo.forkFullName}</CardTitle>
                                <CardDescription className="font-(family-name:--font-jetbrains) text-xs">
                                    Forked from {repo.baseRepo}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Badge variant="outline" className="font-(family-name:--font-jetbrains) text-[10px] uppercase">
                                    Tracked Fork
                                </Badge>
                                <Link
                                    href={repo.forkUrl}
                                    target="_blank"
                                    className="inline-flex items-center text-sm text-primary hover:underline"
                                >
                                    Open Repository <ExternalLink className="h-4 w-4 ml-1" />
                                </Link>
                                <p className="text-xs text-ink/60">
                                    Last updated: {repo.updatedAt ? new Date(repo.updatedAt).toLocaleString() : "Unknown"}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
