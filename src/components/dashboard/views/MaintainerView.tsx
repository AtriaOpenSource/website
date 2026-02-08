"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { getMaintainerRepositories, Repository } from "@/lib/firebase/repos";
import { syncPullRequest, updatePullRequestStatus, PullRequest, getMaintainerPullRequests } from "@/lib/firebase/prs";
import { fetchRepoPRs } from "@/lib/github/api";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, AlertCircle, RefreshCw, GitPullRequest } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// This code was moved from src/app/maintainer/page.tsx
export function MaintainerView() {
    const { user, userData, loading: authLoading } = useAuth();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [prs, setPrs] = useState<PullRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    // Grading State
    const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);
    const [scores, setScores] = useState({ quality: 0, docs: 0, practices: 0, complexity: 0 });
    const [feedback, setFeedback] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        }
    }, [user, authLoading]);

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Get assigned repos
            const maintainerRepos = await getMaintainerRepositories(user.uid);
            // If checking by username is needed:
            // const maintainerRepos = await getMaintainerRepositoriesByUsername(userData?.githubUsername);
            setRepos(maintainerRepos);

            // Get PRs for these repos form Firestore
            const repoNames = maintainerRepos.map(r => `${r.owner}/${r.name}`);
            if (repoNames.length > 0) {
                const storedPRs = await getMaintainerPullRequests(repoNames);
                setPrs(storedPRs);
            }
        } catch (error) {
            console.error("Error fetching maintainer data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const syncPromises = repos.map(async (repo) => {
                const githubPRs = await fetchRepoPRs(repo.owner, repo.name);
                for (const pr of githubPRs) {
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
            });
            await Promise.all(syncPromises);

            // Refresh local state
            const repoNames = repos.map(r => `${r.owner}/${r.name}`);
            if (repoNames.length > 0) {
                const storedPRs = await getMaintainerPullRequests(repoNames);
                setPrs(storedPRs);
            }
            alert("Synced PRs from GitHub!");
        } catch (error) {
            console.error("Error syncing PRs:", error);
            alert("Failed to sync PRs.");
        } finally {
            setSyncing(false);
        }
    };

    const handleGradePR = async () => {
        if (!selectedPR) return;

        const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

        try {
            await updatePullRequestStatus(selectedPR.id, {
                points: totalPoints,
                feedback: feedback,
                criteriaScores: scores,
                status: 'merged' // We'll just mark as merged for now when graded.
            });

            setDialogOpen(false);
            fetchData(); // Refresh to show updated status

            // Reset form
            setScores({ quality: 0, docs: 0, practices: 0, complexity: 0 });
            setFeedback("");
        } catch (error) {
            console.error("Error grading PR:", error);
            alert("Failed to save grade.");
        }
    };

    const openGradeDialog = (pr: PullRequest) => {
        setSelectedPR(pr);
        setScores(pr.criteriaScores as any || { quality: 0, docs: 0, practices: 0, complexity: 0 });
        setFeedback(pr.feedback || "");
        setDialogOpen(true);
    };

    if (authLoading || loading) {
        return <PageLoadingState message="Loading maintainer dashboard..." />;
    }

    if (!userData || userData.role !== 'maintainer') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-bold">Access Denied</h2>
                <p>You do not have maintainer privileges.</p>
                <Button asChild><Link href="/">Return Home</Link></Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <PageHeader
                    title="Maintainer Dashboard"
                    description="Manage your repositories and grade pull requests."
                />
                <Button onClick={handleSync} disabled={syncing} variant="outline" className="w-full sm:w-auto">
                    <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                    Sync with GitHub
                </Button>
            </div>

            {/* Repos List */}
            <Card className="border-2 border-surface-lighter bg-surface-light rounded-none shadow-md">
                <CardHeader>
                    <CardTitle className="text-ink uppercase tracking-tight">Assigned Repositories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {repos.map(repo => (
                            <Link key={repo.id} href={repo.html_url} target="_blank" className="flex items-center gap-2 p-3 bg-surface border border-surface-lighter rounded-none hover:border-primary transition-colors group">
                                <Github className="h-5 w-5 text-ink group-hover:text-primary" />
                                <span className="font-mono font-medium text-ink">{repo.owner}/{repo.name}</span>
                            </Link>
                        ))}
                        {repos.length === 0 && <p className="text-ink/60 font-mono">No repositories assigned.</p>}
                    </div>
                </CardContent>
            </Card>

            {/* PRs List */}
            <h3 className="text-2xl font-black mt-8 text-ink uppercase tracking-tight">Pending Pull Requests</h3>
            <div className="grid gap-4">
                {prs.length === 0 && (
                    <Card className="border-dashed border-2 border-surface-lighter bg-surface/5 rounded-none">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-ink/75">
                            <GitPullRequest className="h-10 w-10 mb-4 opacity-50" />
                            <p className="font-mono">No pull requests found. Try syncing with GitHub.</p>
                        </CardContent>
                    </Card>
                )}

                {prs.map(pr => (
                    <Card key={pr.id} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow bg-surface-light rounded-none border-y border-r border-surface-lighter">
                        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={`font-mono text-[10px] uppercase border-none ${pr.status === 'merged' ? 'bg-primary/20 text-primary' :
                                        pr.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                                            'bg-secondary/20 text-secondary'
                                        }`}>
                                        {pr.status}
                                    </Badge>
                                    <span className="text-xs text-ink/75 font-mono">{pr.repoName} #{pr.prNumber}</span>
                                </div>
                                <h4 className="font-bold text-lg hover:text-primary transition-colors text-ink">
                                    <Link href={pr.html_url} target="_blank">{pr.title}</Link>
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-ink/60 font-mono">
                                    <img src={pr.user.avatar_url} alt={pr.user.login} className="h-5 w-5 rounded-none" />
                                    <span>{pr.user.login}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                                {pr.points > 0 && (
                                    <div className="text-2xl font-black text-accent drop-shadow-[0_0_5px_rgba(0,123,167,0.5)]">
                                        {pr.points} <span className="text-xs font-normal text-ink/75 font-mono">pts</span>
                                    </div>
                                )}
                                <Button onClick={() => openGradeDialog(pr)} size="sm" variant={pr.status === 'merged' ? 'outline' : 'default'} className="rounded-none font-bold uppercase tracking-wider">
                                    {pr.status === 'merged' ? 'Update Grade' : 'Grade PR'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Grading Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Grade Pull Request</DialogTitle>
                        <DialogDescription>
                            Assign points based on the following criteria. Total points will be calculated automatically.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quality" className="text-right col-span-2">
                                Code Quality (0-10)
                            </Label>
                            <Input
                                id="quality"
                                type="number"
                                min="0" max="10"
                                value={scores.quality}
                                onChange={(e) => setScores({ ...scores, quality: parseInt(e.target.value) || 0 })}
                                className="col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="docs" className="text-right col-span-2">
                                Documentation (0-10)
                            </Label>
                            <Input
                                id="docs"
                                type="number"
                                min="0" max="10"
                                value={scores.docs}
                                onChange={(e) => setScores({ ...scores, docs: parseInt(e.target.value) || 0 })}
                                className="col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="practices" className="text-right col-span-2">
                                Best Practices (0-10)
                            </Label>
                            <Input
                                id="practices"
                                type="number"
                                min="0" max="10"
                                value={scores.practices}
                                onChange={(e) => setScores({ ...scores, practices: parseInt(e.target.value) || 0 })}
                                className="col-span-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="complexity" className="text-right col-span-2">
                                Innovation (0-10)
                            </Label>
                            <Input
                                id="complexity"
                                type="number"
                                min="0" max="10"
                                value={scores.complexity}
                                onChange={(e) => setScores({ ...scores, complexity: parseInt(e.target.value) || 0 })}
                                className="col-span-2"
                            />
                        </div>

                        <div className="space-y-2 mt-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea
                                id="feedback"
                                placeholder="Optional feedback for the contributor..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>

                        <div className="text-right text-lg font-bold">
                            Total: {Object.values(scores).reduce((a, b) => a + b, 0)} Points
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" onClick={handleGradePR}>Save Grade & Merge</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
