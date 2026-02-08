"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { getRepositories, Repository } from "@/lib/firebase/repos";
import { getContributorPullRequests, PullRequest } from "@/lib/firebase/prs";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, GitFork, AlertCircle, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { fetchRepoPRs } from "@/lib/github/api";
import { syncPullRequest } from "@/lib/firebase/prs";

// This code was moved from src/app/contributor/page.tsx
export function ContributorView() {
    const { user, userData, loading: authLoading } = useAuth();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [myPrs, setMyPrs] = useState<PullRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Get all public repos
            const allRepos = await getRepositories();
            setRepos(allRepos);

            // Get my PRs
            if (userData?.githubUsername) {
                const prs = await getContributorPullRequests(userData.githubUsername);
                setMyPrs(prs);
            }
        } catch (error) {
            console.error("Error fetching contributor data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshStatus = async () => {
        if (!userData?.githubUsername) return;
        setRefreshing(true);
        try {
            // Check all repos for PRs from this user
            // This can be heavy if many repos, but okay for MVP
            const syncPromises = repos.map(async (repo) => {
                const githubPRs = await fetchRepoPRs(repo.owner, repo.name);
                // Filter specifically for this user's PRs? 
                // fetchRepoPRs already filters by #asoc.
                // We just need to make sure we sync them.
                for (const pr of githubPRs) {
                    if (pr.user.login.toLowerCase() === userData.githubUsername!.toLowerCase()) {
                        await syncPullRequest({
                            repoId: repo.id,
                            repoName: `${repo.owner}/${repo.name}`,
                            prNumber: pr.number,
                            title: pr.title,
                            html_url: pr.html_url,
                            user: {
                                login: pr.user.login,
                                avatar_url: pr.user.avatar_url
                            }
                        });
                    }
                }
            });
            await Promise.all(syncPromises);

            // Refresh list
            const prs = await getContributorPullRequests(userData.githubUsername);
            setMyPrs(prs);
            alert("Status refreshed from GitHub!");
        } catch (error) {
            console.error("Error refreshing status:", error);
        } finally {
            setRefreshing(false);
        }
    };

    if (authLoading || loading) {
        return <PageLoadingState message="Loading contributor dashboard..." />;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-bold">Access Denied</h2>
                <p>Please login to view this page.</p>
                <Button asChild><Link href="/">Return Home</Link></Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Contributor Dashboard"
                description={`Welcome back, ${userData?.githubUsername || 'Contributor'}! Track your contributions here.`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Repos to Contribute To */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-ink uppercase tracking-tight">
                        <Github className="h-5 w-5 text-primary" /> Available Repositories
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {repos.map(repo => (
                            <Card key={repo.id} className="border-2 border-surface-lighter shadow-[4px_4px_0_0_var(--color-surface-lighter)] hover:translate-y-[-2px] transition-transform bg-surface-light rounded-none group hover:border-primary hover:shadow-[4px_4px_0_0_var(--color-primary)]">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-bold text-ink group-hover:text-primary transition-colors">{repo.name}</CardTitle>
                                        <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary/80">{repo.owner}</Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2 min-h-[2.5em] text-ink/70 font-mono text-xs">{repo.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full font-bold uppercase tracking-wide rounded-none" variant="default">
                                        <Link href={repo.html_url} target="_blank">
                                            <GitFork className="mr-2 h-4 w-4" /> Fork & Contribute
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Column: My Stats & PRs */}
                <div className="space-y-6">
                    <Card className="bg-surface-light border-2 border-surface-lighter rounded-none shadow-[4px_4px_0_0_var(--color-surface-lighter)]">
                        <CardHeader>
                            <CardTitle className="text-ink uppercase tracking-tight">My Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <span className="text-4xl font-black text-primary block drop-shadow-[0_0_10px_rgba(99,102,241,0.35)]">{userData?.points || 0}</span>
                                <span className="text-sm text-ink/60 font-medium uppercase tracking-wider font-mono">Total Points</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-ink uppercase tracking-tight">
                            <GitPullRequest className="h-5 w-5 text-secondary" /> My PRs
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRefreshStatus}
                            disabled={refreshing}
                            className={`text-ink hover:text-primary ${refreshing ? "animate-pulse" : ""}`}
                        >
                            {refreshing ? "Checking..." : "Refresh Status"}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {myPrs.length === 0 ? (
                            <div className="text-center py-8 text-ink/75 border-2 border-dashed border-surface-lighter rounded-none font-mono text-sm">
                                No PRs tracked yet. Use <code className="bg-surface-lighter py-0.5 px-1 rounded text-primary">#asoc</code> in your PR description!
                            </div>
                        ) : (
                            myPrs.map(pr => (
                                <Card key={pr.id} className="border-l-4 border-l-secondary p-3 shadow-none hover:bg-surface-lighter/10 transition-colors bg-surface-light rounded-none border border-surface-lighter">
                                    <div className="flex justify-between items-start mb-1">
                                        <Badge variant="outline" className={`font-mono text-[10px] uppercase border-none ${pr.status === 'merged' ? 'bg-primary/20 text-primary' :
                                            pr.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                                                'bg-secondary/20 text-secondary'
                                            }`}>
                                            {pr.status}
                                        </Badge>
                                        <span className="text-xs text-ink/75 font-mono">{new Date(pr.submittedAt?.seconds * 1000).toLocaleDateString()}</span>
                                    </div>
                                    <Link href={pr.html_url} target="_blank" className="font-bold text-sm block mb-1 hover:text-primary transition-colors line-clamp-1 text-ink">
                                        {pr.title}
                                    </Link>
                                    <div className="text-xs text-ink/75 font-mono mb-2">
                                        {pr.repoName} #{pr.prNumber}
                                    </div>
                                    {pr.feedback && (
                                        <div className="text-xs bg-surface border border-surface-lighter p-2 rounded-none text-ink/80 mt-2 font-mono">
                                            <strong className="text-primary block mb-1">&gt; FEEDBACK_LOG:</strong> {pr.feedback}
                                        </div>
                                    )}
                                    {pr.points > 0 && (
                                        <div className="text-right font-black text-accent text-sm font-mono mt-2">
                                            +{pr.points} PTS
                                        </div>
                                    )}
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
