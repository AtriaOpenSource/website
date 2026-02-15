"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { RepoCard } from "@/components/ui/repo-card";
import { getRepositories, Repository } from "@/lib/firebase/repos";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function RepositoriesPage() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

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

    const filteredRepos = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return repos;
        return repos.filter((repo) =>
            `${repo.owner}/${repo.name}`.toLowerCase().includes(q) ||
            (repo.description || "").toLowerCase().includes(q) ||
            (repo.tier || "").toLowerCase().includes(q)
        );
    }, [repos, query]);

    if (loading) {
        return <PageLoadingState message="Loading repositories..." />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
                className="text-center space-y-4 max-w-3xl mx-auto"
            >
                <PageHeader
                    title="Repositories"
                    description="Contribute to high-impact open source projects. Earn points based on the repository tier."
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
                className="max-w-xl mx-auto"
            >
                <div className="relative">
                    <Search className="h-4 w-4 text-ink/45 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by repo, owner, description, or tier..."
                        className="pl-9 border-2 border-surface-lighter focus-visible:border-primary"
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRepos.map((repo, idx) => (
                    <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * idx, duration: 0.35, ease: "easeOut" }}
                    >
                        <RepoCard repo={repo} />
                    </motion.div>
                ))}
            </div>

            {filteredRepos.length === 0 && (
                <div className="text-center py-20 bg-surface-light rounded-none border-2 border-dashed border-surface-lighter">
                    <p className="text-ink/60 font-medium font-(family-name:--font-jetbrains)">
                        {repos.length === 0 ? "Repositories aren't active yet." : "No repositories match your search."}
                    </p>
                </div>
            )}

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="pt-2 text-center"
            >
                <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains)">
                    Tier legend: <span className="text-yellow-600 font-semibold">Gold</span> high complexity,{" "}
                    <span className="text-slate-500 font-semibold">Silver</span> medium scope,{" "}
                    <span className="text-amber-700 font-semibold">Bronze</span> beginner-friendly.
                </p>
            </motion.footer>
        </motion.div>
    );
}
