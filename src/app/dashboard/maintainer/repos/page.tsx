"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMaintainerRepositories, Repository } from "@/lib/firebase/repos";
import { ExternalLink, Github } from "lucide-react";

export default function MaintainerReposPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        const fetchRepos = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const data = await getMaintainerRepositories(user.uid);
                setRepos(data);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.role === "maintainer") {
            fetchRepos();
        }
    }, [user, userData]);

    if (authLoading || loading) return <PageLoadingState message="Loading assigned repositories..." />;
    if (!userData || userData.role !== "maintainer") return <AccessDenied />;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Assigned Repositories"
                description="Repositories currently assigned to you for review and scoring."
            />

            <div className="grid gap-4 md:grid-cols-2">
                {repos.length === 0 ? (
                    <Card className="border-2 border-dashed border-surface-lighter md:col-span-2">
                        <CardContent className="py-12 text-center text-ink/70">
                            <Github className="h-10 w-10 mx-auto mb-3 text-ink/40" />
                            <p className="font-semibold">No repositories assigned yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    repos.map((repo) => (
                        <Card key={repo.id} className="border-2 border-surface-lighter">
                            <CardHeader>
                                <CardTitle>{repo.owner}/{repo.name}</CardTitle>
                                <CardDescription>{repo.description || "No description provided."}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Badge variant="outline" className="font-(family-name:--font-jetbrains) text-[10px] uppercase">
                                    {repo.tier || "standard"}
                                </Badge>
                                <Link href={repo.html_url} target="_blank" className="inline-flex items-center text-sm text-primary hover:underline">
                                    Open GitHub Repo <ExternalLink className="h-4 w-4 ml-1" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
