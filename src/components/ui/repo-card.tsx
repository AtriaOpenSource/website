"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Circle } from "lucide-react";
import Link from "next/link";
import { Repository } from "@/lib/firebase/repos";

interface RepoCardProps {
    repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
    const [stats, setStats] = useState({ stars: 0, forks: 0, language: "Unknown", topics: [], issues: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    setStats({
                        stars: data.stargazers_count,
                        forks: data.forks_count,
                        language: data.language,
                        topics: data.topics || [],
                        issues: data.open_issues_count
                    });
                }
            } catch (error) {
                console.error("Failed to fetch repo stats", error);
            }
        };

        fetchStats();
    }, [repo.owner, repo.name]);

    const tierColors = {
        gold: "border-yellow-500 shadow-[4px_4px_0_0_#eab308]",
        silver: "border-slate-500 shadow-[4px_4px_0_0_#64748b]",
        bronze: "border-orange-500 shadow-[4px_4px_0_0_#f97316]",
        default: "border-surface-lighter shadow-[4px_4px_0_0_var(--color-surface-lighter)]"
    };

    const borderColor = repo.tier ? tierColors[repo.tier] || tierColors.default : tierColors.default;

    return (
        <Card className={`border-2 ${borderColor} bg-surface-light hover:-translate-y-0.5 transition-transform h-full flex flex-col group rounded-none`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Github className="h-5 w-5 shrink-0 text-primary" />
                        <CardTitle className="text-lg font-bold truncate text-ink group-hover:text-primary transition-colors font-(family-name:--font-jetbrains)">
                            <Link href={repo.html_url} target="_blank">
                                {repo.owner}/{repo.name}
                            </Link>
                        </CardTitle>
                    </div>
                    {repo.tier && (
                        <Badge variant="outline" className={`uppercase text-[10px] tracking-wider font-black ${repo.tier === 'gold' ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500' :
                            repo.tier === 'silver' ? 'bg-slate-500/10 text-slate-300 border-slate-500' :
                                'bg-orange-500/10 text-orange-300 border-orange-500'
                            }`}>
                            {repo.tier}
                        </Badge>
                    )}
                </div>
                <CardDescription className="line-clamp-2 min-h-[2.5em] mt-2 text-ink/70">
                    {repo.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                    {stats.topics.slice(0, 3).map((topic: string) => (
                        <span key={topic} className="text-xs bg-primary/10 px-2 py-1 rounded-none text-primary font-(family-name:--font-jetbrains) border border-primary/20">
                            {topic}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-ink/60 font-(family-name:--font-jetbrains)">
                    {stats.language && (
                        <div className="flex items-center gap-1">
                            <Circle className="h-3 w-3 fill-current text-primary" />
                            <span>{stats.language}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{stats.forks}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs border-surface-lighter text-ink/60">
                            {stats.issues} Issues
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
