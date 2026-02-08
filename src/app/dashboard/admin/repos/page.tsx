"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addRepository, getRepositories, deleteRepository, updateRepositoryMaintainer, Repository } from "@/lib/firebase/repos";
import { getWhitelistedMaintainers, WhitelistedMaintainer } from "@/lib/firebase/whitelist";
import { PageHeader } from "@/components/layout/PageHeader";
import { Trash2, ExternalLink, Plus, Github } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertModal, useAlert } from "@/components/ui/alert-modal";

import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageLoadingState } from "@/components/layout/PageHeader";

export default function AdminReposPage() {
    const { userData, loading: authLoading } = useAuth();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [maintainers, setMaintainers] = useState<WhitelistedMaintainer[]>([]);
    const [newRepoOwner, setNewRepoOwner] = useState("");
    const [newRepoName, setNewRepoName] = useState("");
    const [newRepoTier, setNewRepoTier] = useState<"gold" | "silver" | "bronze">("bronze");
    const [loading, setLoading] = useState(false);
    const [fetchingGithub, setFetchingGithub] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const { alertState, showAlert, closeAlert } = useAlert();

    useEffect(() => {
        if (userData?.role === 'admin') {
            fetchData();
        }
    }, [userData]);

    if (authLoading) return <PageLoadingState message="Checking permissions..." />;
    if (!userData || userData.role !== 'admin') return <AccessDenied />;

    const fetchData = async () => {
        const [reposData, maintainersData] = await Promise.all([
            getRepositories(),
            getWhitelistedMaintainers()
        ]);
        setRepos(reposData);
        setMaintainers(maintainersData);
    };

    const handleAddRepo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFetchingGithub(true);

        try {
            // Fetch metadata from GitHub
            const response = await fetch(`https://api.github.com/repos/${newRepoOwner}/${newRepoName}`);
            if (!response.ok) {
                throw new Error("Repository not found on GitHub");
            }
            const data = await response.json();

            await addRepository({
                owner: newRepoOwner,
                name: newRepoName,
                description: data.description || "No description provided",
                html_url: data.html_url,
                maintainerId: null,
                maintainerUsername: null,
                tier: newRepoTier
            });

            setNewRepoOwner("");
            setNewRepoName("");
            setNewRepoTier("bronze");
            fetchData();
            showAlert("success", "Repository Added", "The repository has been successfully added to the program.");
        } catch (error) {
            console.error("Error adding repo:", error);
            showAlert("error", "Failed to Add Repository", "Could not add the repository. Please check the owner/name and try again.");
        } finally {
            setLoading(false);
            setFetchingGithub(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeleteTarget(id);
        showAlert(
            "confirm",
            "Delete Repository",
            "Are you sure you want to delete this repository? This action cannot be undone.",
            async () => {
                await deleteRepository(id);
                fetchData();
                setDeleteTarget(null);
            }
        );
    };

    const handleAssignMaintainer = async (repoId: string, maintainerUsername: string) => {
        const maintainer = maintainers.find(m => m.githubUsername === maintainerUsername);

        try {
            await updateRepositoryMaintainer(repoId, "pending", maintainerUsername);
            setRepos(repos.map(r => r.id === repoId ? { ...r, maintainerUsername } : r));
            showAlert("success", "Maintainer Assigned", `Successfully assigned ${maintainerUsername || 'maintainer'} as maintainer.`);
        } catch (error) {
            console.error("Error assigning maintainer", error);
            showAlert("error", "Assignment Failed", "Could not assign the maintainer. Please try again.");
        }
    };

    const getTierBadgeColor = (tier: string) => {
        switch (tier) {
            case "gold": return "bg-yellow-400 text-yellow-900";
            case "silver": return "bg-gray-300 text-gray-900";
            case "bronze": return "bg-orange-400 text-orange-900";
            default: return "bg-gray-200 text-gray-900";
        }
    };

    return (
        <>
            <div className="space-y-6 md:space-y-8 p-4 md:p-0">
                <PageHeader
                    title="Manage Repositories"
                    description="Add and manage repositories for the program."
                />

                {/* Add Repository Card */}
                <Card className="border-2 border-ink/10 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Add New Repository</CardTitle>
                        <CardDescription className="text-sm">Enter the GitHub owner, repository name, and select a tier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddRepo} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="owner" className="text-sm font-medium leading-none">Owner/Org</label>
                                    <Input
                                        id="owner"
                                        placeholder="e.g. facebook"
                                        value={newRepoOwner}
                                        onChange={(e) => setNewRepoOwner(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="name" className="text-sm font-medium leading-none">Repository Name</label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. react"
                                        value={newRepoName}
                                        onChange={(e) => setNewRepoName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label htmlFor="tier" className="text-sm font-medium leading-none">Tier</label>
                                    <Select value={newRepoTier} onValueChange={(v: any) => setNewRepoTier(v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Tier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gold">Gold (High Points)</SelectItem>
                                            <SelectItem value="silver">Silver (Mid Points)</SelectItem>
                                            <SelectItem value="bronze">Bronze (Low Points)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end">
                                    <Button type="submit" disabled={loading} variant="brutalist" className="w-full">
                                        {loading ? "Adding..." : <><Plus className="mr-2 h-4 w-4" /> Add</>}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Repository Grid */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {repos.map((repo) => (
                        <Card key={repo.id} className="border-2 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-base md:text-lg font-bold truncate">
                                            {repo.owner}/{repo.name}
                                        </CardTitle>
                                        <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-bold uppercase ${getTierBadgeColor(repo.tier)}`}>
                                            {repo.tier}
                                        </span>
                                    </div>
                                    <Link href={repo.html_url} target="_blank" className="text-ink/75 hover:text-primary shrink-0">
                                        <Github className="h-5 w-5" />
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-ink/70 line-clamp-2 min-h-10">
                                    {repo.description}
                                </p>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-ink/75">Maintainer:</label>
                                    <Select
                                        value={repo.maintainerUsername || undefined}
                                        onValueChange={(value) => handleAssignMaintainer(repo.id, value)}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unassigned_placeholder" disabled>Select Maintainer</SelectItem>
                                            {maintainers.map(m => (
                                                <SelectItem key={m.id} value={m.githubUsername}>
                                                    {m.githubUsername}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 mt-2"
                                        onClick={() => handleDelete(repo.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {repos.length === 0 && (
                    <div className="text-center py-12 text-ink/60 border-2 border-dashed border-ink/20 rounded-lg">
                        <Github className="h-12 w-12 mx-auto mb-3 text-ink/30" />
                        <p className="font-medium">No repositories added yet.</p>
                        <p className="text-sm mt-1">Add your first repository above to get started.</p>
                    </div>
                )}
            </div>

            {/* Alert Modal */}
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
