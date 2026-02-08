"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addToWhitelist, getWhitelistedMaintainers, removeFromWhitelist, WhitelistedMaintainer } from "@/lib/firebase/whitelist";
import { PageHeader } from "@/components/layout/PageHeader";
import { Trash2, UserPlus, Github } from "lucide-react";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { AlertModal, useAlert } from "@/components/ui/alert-modal";

import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageLoadingState } from "@/components/layout/PageHeader";

export default function AdminMaintainersPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const [maintainers, setMaintainers] = useState<WhitelistedMaintainer[]>([]);
    const [newUsername, setNewUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { alertState, showAlert, closeAlert } = useAlert();

    useEffect(() => {
        if (userData?.role === 'admin') {
            fetchMaintainers();
        }
    }, [userData]);

    if (authLoading) return <PageLoadingState message="Checking permissions..." />;
    if (!userData || userData.role !== 'admin') return <AccessDenied />;

    const fetchMaintainers = async () => {
        const data = await getWhitelistedMaintainers();
        setMaintainers(data);
    };

    const handleAddMaintainer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            await addToWhitelist(newUsername, user.uid);
            setNewUsername("");
            fetchMaintainers();
            showAlert("success", "Maintainer Added", `Successfully whitelisted ${newUsername} as a maintainer.`);
        } catch (error: any) {
            console.error("Error adding maintainer:", error);
            const errorMsg = error.message || "Failed to add maintainer";
            setError(errorMsg);
            showAlert("error", "Failed to Add Maintainer", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id: string, username: string) => {
        showAlert(
            "confirm",
            "Remove Maintainer",
            `Are you sure you want to remove ${username}? They will lose maintainer access upon next login.`,
            async () => {
                await removeFromWhitelist(id);
                fetchMaintainers();
                showAlert("success", "Maintainer Removed", `${username} has been removed from the whitelist.`);
            }
        );
    };

    return (
        <>
            <div className="space-y-6 md:space-y-8 p-4 md:p-0">
                <PageHeader
                    title="Manage Maintainers"
                    description="Whitelist GitHub users as maintainers."
                />

                <Card className="border-2 border-ink/10 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Whitelist New Maintainer</CardTitle>
                        <CardDescription className="text-sm">Enter the GitHub username to grant maintainer access.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddMaintainer} className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="grid w-full sm:max-w-sm items-center gap-1.5">
                                <label htmlFor="username" className="text-sm font-medium leading-none">GitHub Username</label>
                                <Input
                                    id="username"
                                    placeholder="e.g. octocat"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={loading} variant="brutalist" className="w-full sm:w-auto">
                                {loading ? "Adding..." : <><UserPlus className="mr-2 h-4 w-4" /> Whitelist User</>}
                            </Button>
                        </form>
                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    </CardContent>
                </Card>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {maintainers.map((maintainer) => (
                        <Card key={maintainer.id} className="border-2 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Github className="h-5 w-5 text-ink/70" />
                                        <CardTitle className="text-base md:text-lg font-bold">
                                            {maintainer.githubUsername}
                                        </CardTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50 hover:text-red-700 -mr-2"
                                        onClick={() => maintainer.id && handleRemove(maintainer.id, maintainer.githubUsername)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-xs text-ink/60">
                                    Added: {maintainer.createdAt?.seconds ? new Date(maintainer.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                                </div>
                                <Link
                                    href={`https://github.com/${maintainer.githubUsername}`}
                                    target="_blank"
                                    className="text-xs text-primary hover:underline block font-medium"
                                >
                                    View GitHub Profile →
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {maintainers.length === 0 && (
                    <div className="text-center py-12 text-ink/60 border-2 border-dashed border-ink/20 rounded-lg">
                        <Github className="h-12 w-12 mx-auto mb-3 text-ink/30" />
                        <p className="font-medium">No maintainers whitelisted yet.</p>
                        <p className="text-sm mt-1">Add your first maintainer above to get started.</p>
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
