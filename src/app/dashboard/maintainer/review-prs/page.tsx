"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertModal, useAlert } from "@/components/ui/alert-modal";
import { getMaintainerRepositories, Repository } from "@/lib/firebase/repos";
import { getMaintainerPullRequests, PullRequest, syncPullRequest, updatePullRequestStatus } from "@/lib/firebase/prs";
import { fetchRepoPRs } from "@/lib/github/api";
import { ExternalLink, Loader2, RefreshCw } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const toDate = (value: unknown): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "object" && value !== null && "seconds" in value) {
        const seconds = (value as { seconds?: number }).seconds;
        if (typeof seconds === "number") return new Date(seconds * 1000);
    }
    return null;
};

type SortOrder = "newest" | "oldest";
type ReviewStatus = "merged" | "rejected" | "changes" | "review";

export default function MaintainerReviewPRsPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [prs, setPrs] = useState<PullRequest[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string>("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPR, setSelectedPR] = useState<PullRequest | null>(null);
    const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("merged");
    const [scores, setScores] = useState({ quality: 0, docs: 0, practices: 0, complexity: 0 });
    const [feedback, setFeedback] = useState("");

    const { alertState, showAlert, closeAlert } = useAlert();

    const fetchData = useCallback(async () => {
        if (!user) return;
        const repoData = await getMaintainerRepositories(user.uid, userData?.githubUsername);
        setRepos(repoData);

        const repoNames = repoData.map((repo) => `${repo.owner}/${repo.name}`);
        if (repoNames.length === 0) {
            setPrs([]);
            return;
        }

        const prData = await getMaintainerPullRequests(repoNames);
        setPrs(prData);
    }, [user, userData?.githubUsername]);

    useEffect(() => {
        const bootstrap = async () => {
            setLoading(true);
            try {
                await fetchData();
            } finally {
                setLoading(false);
            }
        };
        if (userData?.role === "maintainer") {
            bootstrap();
        }
    }, [userData, fetchData]);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const syncOps = repos.map(async (repo) => {
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
                            avatar_url: pr.user.avatar_url,
                        },
                    });
                }
            });
            await Promise.all(syncOps);
            await fetchData();
            showAlert("success", "Sync Complete", "PRs were synced from GitHub.");
        } catch (error) {
            console.error(error);
            showAlert("error", "Sync Failed", "Failed to sync PRs from GitHub.");
        } finally {
            setSyncing(false);
        }
    };

    const filteredPRs = useMemo(() => {
        const repoFiltered = selectedRepo === "all"
            ? prs
            : prs.filter((pr) => pr.repoName === selectedRepo);

        return [...repoFiltered].sort((a, b) => {
            const aDate = toDate(a.updatedAt) ?? toDate(a.submittedAt) ?? new Date(0);
            const bDate = toDate(b.updatedAt) ?? toDate(b.submittedAt) ?? new Date(0);
            return sortOrder === "newest"
                ? bDate.getTime() - aDate.getTime()
                : aDate.getTime() - bDate.getTime();
        });
    }, [prs, selectedRepo, sortOrder]);

    const openReviewDialog = (pr: PullRequest) => {
        setSelectedPR(pr);
        setReviewStatus(
            pr.status === "merged" || pr.status === "rejected" || pr.status === "changes" || pr.status === "review"
                ? pr.status
                : "merged"
        );
        setScores({
            quality: pr.criteriaScores?.quality || 0,
            docs: pr.criteriaScores?.docs || 0,
            practices: pr.criteriaScores?.practices || 0,
            complexity: pr.criteriaScores?.complexity || 0,
        });
        setFeedback(pr.feedback || "");
        setDialogOpen(true);
    };

    const submitReview = async () => {
        if (!selectedPR) return;
        const totalPoints = Object.values(scores).reduce((acc, value) => acc + value, 0);

        try {
            await updatePullRequestStatus(selectedPR.id, {
                status: reviewStatus,
                points: totalPoints,
                feedback,
                criteriaScores: scores,
            });
            setDialogOpen(false);
            await fetchData();
            showAlert("success", "Review Saved", "PR review status and grading were updated.");
        } catch (error) {
            console.error(error);
            showAlert("error", "Save Failed", "Failed to save PR review.");
        }
    };

    if (authLoading || loading) return <PageLoadingState message="Loading PR review queue..." />;
    if (!userData || userData.role !== "maintainer") return <AccessDenied />;

    return (
        <>
            <div className="space-y-8">
                <PageHeader
                    title="Review PRs"
                    description="Filter and review pull requests across your assigned repositories."
                    actions={{
                        label: syncing ? "Syncing..." : "Sync PRs",
                        onClick: handleSync,
                        variant: "outline",
                        icon: syncing ? Loader2 : RefreshCw,
                    }}
                />

                <Card className="border-2 border-surface-lighter">
                    <CardContent className="pt-6 grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="repoFilter">Filter By Repository</Label>
                            <select
                                id="repoFilter"
                                value={selectedRepo}
                                onChange={(event) => setSelectedRepo(event.target.value)}
                                className="w-full border-2 border-surface-lighter bg-surface px-3 py-2 text-sm"
                            >
                                <option value="all">All repositories</option>
                                {repos.map((repo) => {
                                    const repoName = `${repo.owner}/${repo.name}`;
                                    return (
                                        <option key={repo.id} value={repoName}>
                                            {repoName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sortOrder">Sort Order</Label>
                            <select
                                id="sortOrder"
                                value={sortOrder}
                                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                                className="w-full border-2 border-surface-lighter bg-surface px-3 py-2 text-sm"
                            >
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    {filteredPRs.length === 0 ? (
                        <Card className="border-2 border-dashed border-surface-lighter">
                            <CardContent className="py-12 text-center text-ink/70">
                                No PRs found for the selected filters.
                            </CardContent>
                        </Card>
                    ) : (
                        filteredPRs.map((pr) => (
                            <Card key={pr.id} className="border-2 border-surface-lighter">
                                <CardHeader>
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <CardTitle className="text-lg line-clamp-1">
                                                <Link href={pr.html_url} target="_blank" className="hover:text-primary">
                                                    {pr.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription className="font-(family-name:--font-jetbrains) text-xs mt-1">
                                                {pr.repoName} #{pr.prNumber} by @{pr.user.login}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline" className="font-(family-name:--font-jetbrains) text-[10px] uppercase self-start md:self-center">
                                            {pr.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="text-xs text-ink/60">
                                        Updated: {(toDate(pr.updatedAt) ?? toDate(pr.submittedAt))?.toLocaleString() || "Unknown"}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={pr.html_url} target="_blank">
                                                Open PR <ExternalLink className="h-4 w-4 ml-1" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="brutalist" onClick={() => openReviewDialog(pr)}>
                                            Grade & Review
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[560px]">
                    <DialogHeader>
                        <DialogTitle>Review Pull Request</DialogTitle>
                        <DialogDescription>
                            Grade this PR and set a decision. This updates contributor recent activity.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="status">Review Decision</Label>
                            <select
                                id="status"
                                value={reviewStatus}
                                onChange={(event) => setReviewStatus(event.target.value as ReviewStatus)}
                                className="w-full border-2 border-surface-lighter bg-surface px-3 py-2 text-sm"
                            >
                                <option value="merged">Merge</option>
                                <option value="rejected">Reject</option>
                                <option value="changes">Modify Requested</option>
                                <option value="review">Marked For Review</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="quality">Code Quality (0-10)</Label>
                                <Input id="quality" type="number" min="0" max="10" value={scores.quality} onChange={(e) => setScores({ ...scores, quality: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="docs">Documentation (0-10)</Label>
                                <Input id="docs" type="number" min="0" max="10" value={scores.docs} onChange={(e) => setScores({ ...scores, docs: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="practices">Best Practices (0-10)</Label>
                                <Input id="practices" type="number" min="0" max="10" value={scores.practices} onChange={(e) => setScores({ ...scores, practices: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="complexity">Innovation (0-10)</Label>
                                <Input id="complexity" type="number" min="0" max="10" value={scores.complexity} onChange={(e) => setScores({ ...scores, complexity: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea
                                id="feedback"
                                placeholder="Share review notes for the contributor..."
                                value={feedback}
                                onChange={(event) => setFeedback(event.target.value)}
                            />
                        </div>

                        <div className="text-right text-sm font-semibold">
                            Total Points: {Object.values(scores).reduce((acc, value) => acc + value, 0)}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button variant="brutalist" onClick={submitReview}>Save Review</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertModal
                isOpen={alertState.isOpen}
                onClose={closeAlert}
                onConfirm={alertState.onConfirm}
                type={alertState.type}
                title={alertState.title}
                message={alertState.message}
            />
        </>
    );
}
