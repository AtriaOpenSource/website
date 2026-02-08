"use client";

import { useEffect, useState } from "react";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, GitFork } from "lucide-react";
import Link from "next/link";
import { RepoCard } from "@/components/ui/repo-card";
import { getRepositories, Repository } from "@/lib/firebase/repos";

export default function RepositoriesPage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const data = await getRepositories();
                setRepos(data);
            } catch (error) {
                console.error("Error fetching repos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    if (loading) {
        return <PageLoadingState message="Loading repositories..." />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <PageHeader
                    title="Repositories"
                    description="Contribute to high-impact open source projects. Earn points based on the repository tier."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>

            {repos.length === 0 && (
                <div className="text-center py-20 bg-surface-light rounded-none border-2 border-dashed border-surface-lighter">
                    <p className="text-ink/60 font-medium font-mono">Repositories aren't active yet.</p>
                </div>
            )}
        </div>
    );
}
