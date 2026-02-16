"use client";

import { useEffect, useState } from "react";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { UserData } from "@/lib/firebase/users";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LeaderboardPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Fetch top 100 users for now
                const q = query(collection(db, "users"), orderBy("points", "desc"), limit(100));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => doc.data() as UserData);
                setUsers(data.filter(u => (u.points || 0) > 0));
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading) {
        return <PageLoadingState message="Loading leaderboard..." />;
    }

    if (users.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <PageHeader
                        title="Leaderboard"
                        description="Top contributors making an impact."
                    />
                </div>
                <div className="text-center py-20 bg-surface-light rounded-none border-2 border-dashed border-surface-lighter">
                    <p className="text-ink/60 font-medium font-(family-name:--font-jetbrains)">Leaderboard isn&apos;t active yet.</p>
                </div>
            </motion.div>
        );
    }

    const top3 = users.slice(0, 3);
    const rest = users.slice(3);
    const totalPages = Math.ceil(rest.length / USERS_PER_PAGE);

    // Pagination logic
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = rest.slice(startIndex, startIndex + USERS_PER_PAGE);

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
                className="text-center space-y-4 max-w-3xl mx-auto"
            >
                <PageHeader
                    title="Leaderboard"
                    description="Top contributors making an impact."
                />
            </motion.div>

            {/* Podium Section */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4 pt-8"
            >
                {/* 2nd Place */}
                {top3[1] && <PodiumUser user={top3[1]} rank={2} color="text-slate-400" bgColor="bg-slate-400/10" borderColor="border-slate-400" height="h-32 md:h-48" />}

                {/* 1st Place */}
                {top3[0] && <PodiumUser user={top3[0]} rank={1} color="text-yellow-500" bgColor="bg-yellow-500/10" borderColor="border-yellow-500" height="h-40 md:h-64" isFirst />}

                {/* 3rd Place */}
                {top3[2] && <PodiumUser user={top3[2]} rank={3} color="text-orange-500" bgColor="bg-orange-500/10" borderColor="border-orange-500" height="h-24 md:h-36" />}
            </motion.div>

            {/* Table Section */}
            {rest.length > 0 && (
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* <h3 className="text-2xl font-black uppercase text-ink mb-6 text-center md:text-left">Honorable Mentions</h3> */}
                    <div className="grid gap-2">
                        {currentUsers.map((user, i) => (
                            <motion.div
                                key={user.uid}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.02 * i, duration: 0.25, ease: "easeOut" }}
                                className="flex items-center justify-between p-4 bg-surface-light border border-surface-lighter hover:border-primary transition-colors group rounded-none"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-(family-name:--font-jetbrains) text-ink/75 w-8">#{startIndex + i + 4}</span>
                                    <Image
                                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.githubUsername || 'User'}&background=random`}
                                        alt={user.githubUsername || 'User'}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full bg-surface-lighter border border-surface-lighter object-cover"
                                    />
                                    <span className="font-bold text-ink group-hover:text-primary transition-colors">{user.githubUsername || 'Anonymous'}</span>
                                </div>
                                <span className="font-(family-name:--font-jetbrains) font-bold text-ink">{user.points || 0} pts</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-(family-name:--font-jetbrains) text-sm self-center px-4 text-ink/70">Page {currentPage} of {totalPages}</span>
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}

interface PodiumUserProps {
    user: UserData;
    rank: number;
    color: string;
    bgColor: string;
    borderColor: string;
    height: string;
    isFirst?: boolean;
}

function PodiumUser({ user, rank, color, bgColor, borderColor, height, isFirst = false }: PodiumUserProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex flex-col items-center w-full md:w-1/3 ${isFirst ? 'order-first md:order-0 z-10' : ''}`}
        >

            <div className="relative mb-4">
                <Image
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.githubUsername || 'User'}&background=random`}
                    alt={user.githubUsername || 'User'}
                    width={isFirst ? 96 : 80}
                    height={isFirst ? 96 : 80}
                    className={`rounded-full border-4 ${borderColor} ${isFirst ? 'w-24 h-24 shadow-xl' : 'w-20 h-20 shadow-lg'} object-cover bg-surface-lighter`}
                />
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded-full text-[10px] font-black uppercase ${color} border-2 ${borderColor} whitespace-nowrap`}>
                    {rank === 1 ? 'Champion' : rank === 2 ? 'Runner Up' : '3rd Place'}
                </div>
            </div>

            <div className={`w-full ${height} ${bgColor} border-t-4 border-l border-r ${borderColor} flex flex-col items-center justify-start py-4 relative group transition-all hover:brightness-105`}>
                <div className={`text-5xl font-black ${color} opacity-20 absolute bottom-2`}>{rank}</div>
                <div className="font-bold text-xl text-ink z-10">{user.githubUsername || 'Anonymous'}</div>
                <div className="font-(family-name:--font-jetbrains) text-ink/60 font-medium z-10">{user.points || 0} pts</div>
            </div>
        </motion.div>
    )
}
