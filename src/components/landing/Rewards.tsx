'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Crown, Gift, Star, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/animations/GradientText";

const podiumPrizes = [
    {
        rank: "01",
        place: "1st Place",
        reward: "TBD",
        border: "border-[#d4af37]",
        shadow: "shadow-[4px_4px_0_0_#d4af37]",
        icon: Trophy,
        iconColor: "text-[#b8860b]",
        rankTone: "text-[#b8860b]",
        cardAccent: "bg-[#d4af37]/5",
        order: "md:order-2 md:-translate-y-8 scale-105 z-10",
        special: true,
    },
    {
        rank: "02",
        place: "2nd Place",
        reward: "TDB",
        border: "border-slate-200",
        shadow: "shadow-[4px_4px_0_0_#e2e8f0]",
        icon: Crown,
        iconColor: "text-slate-400",
        rankTone: "text-slate-500",
        cardAccent: "bg-slate-50",
        order: "md:order-1",
    },
    {
        rank: "03",
        place: "3rd Place",
        reward: "TBD",
        border: "border-[#cd7f32]",
        shadow: "shadow-[4px_4px_0_0_#cd7f32]",
        icon: Award,
        iconColor: "text-[#a05a2c]",
        rankTone: "text-[#8b4d23]",
        cardAccent: "bg-[#cd7f32]/5",
        order: "md:order-3",
    },
];

const contributorRewards = [
    {
        title: "Exclusive Swag",
        description: "Stickers and goodies for top contributors who merge significant PRs.",
        border: "border-primary/20",
        shadow: "shadow-[4px_4px_0_0_rgba(79,70,229,0.1)]",
        icon: Gift,
        iconColor: "text-primary",
        badge: "Limited Edition",
        cardAccent: "bg-primary/5",
    },
    {
        title: "Internship Opportunities",
        description: "Perform exceptionally well and get a chance to interview with our partner companies.",
        border: "border-accent/20",
        shadow: "shadow-[4px_4px_0_0_rgba(124,58,237,0.1)]",
        icon: Award,
        iconColor: "text-accent",
        badge: "Career Growth",
        cardAccent: "bg-accent/5",
    },
    {
        title: "Certificates",
        description: "Official certificates of contribution for everyone who merges at least one PR.",
        border: "border-secondary/20",
        shadow: "shadow-[4px_4px_0_0_rgba(255,69,0,0.1)]",
        icon: Star,
        iconColor: "text-secondary",
        badge: "Recognition",
        cardAccent: "bg-secondary/5",
    },
];

export const Rewards = () => {
    return (
        <section className="py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden relative">
            {/* Subtle Risograph Pattern */}
            <div className="absolute inset-0 pattern-halftone opacity-10 pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24 relative z-10"
            >
                <h2 className="text-5xl sm:text-7xl font-black mb-4 uppercase tracking-tighter text-ink leading-none">
                    Rewards & <GradientText>Prizes</GradientText>
                </h2>
                <p className="font-(family-name:--font-jetbrains) text-ink/60 uppercase tracking-widest text-sm flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-ink/20" />
                    Recognition for the builders
                    <span className="h-px w-8 bg-ink/20" />
                </p>
            </motion.div>

            <div className="mb-24 relative z-10">
                <div className="flex items-center justify-between mb-12 border-b-2 border-ink/10 pb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-primary" />
                        Performance Ranks
                    </h3>
                    <div className="hidden sm:block font-(family-name:--font-jetbrains) text-[10px] uppercase text-ink/40 font-bold tracking-[0.2em]">
                        {"// SECTOR_01_RANKS"}
                    </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-12 pt-8">
                    {podiumPrizes.map((prize, idx) => {
                        const Icon = prize.icon;

                        return (
                            <motion.div
                                key={prize.place}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={prize.order}
                            >
                                <Card
                                    className={`relative h-full bg-surface border-2 ${prize.border} ${prize.shadow} ${prize.cardAccent} hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-ink)] transition-all duration-300 rounded-none group overflow-hidden`}
                                >
                                    {/* Background Rank Number - Risograph style */}
                                    <span className="absolute -left-2 -bottom-4 text-9xl font-black text-ink/5 select-none transition-transform group-hover:-translate-y-4 group-hover:translate-x-4 duration-700 font-(family-name:--font-jetbrains)">
                                        {prize.rank}
                                    </span>

                                    {prize.special && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="w-12 h-12 border border-ink/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                                <Sparkles className="h-6 w-6 text-[#d4af37]" />
                                            </div>
                                        </div>
                                    )}

                                    <CardHeader className="relative z-10">
                                        <div className={`p-4 w-fit bg-surface-light mb-6 border border-ink/10 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)]`}>
                                            <Icon className={`h-8 w-8 ${prize.iconColor}`} />
                                        </div>
                                        <CardTitle className={`text-2xl font-black ${prize.rankTone} uppercase tracking-tighter`}>
                                            {prize.place}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative z-10">
                                        <p className="text-xl font-black text-ink mb-2">
                                            {prize.reward}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            <p className="text-ink/50 font-(family-name:--font-jetbrains) text-[10px] uppercase tracking-wider">
                                                {prize.special ? "MISSION_CRITICAL_OBJECTIVE" : "RESOURCE_ALLOCATION"}
                                            </p>
                                        </div>
                                    </CardContent>
                                    
                                    {/* Bottom Decorative Bar */}
                                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r from-transparent via-ink/20 to-transparent`} />
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-12 border-b-2 border-ink/10 pb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                        <Star className="h-6 w-6 text-accent" />
                        Standard Issue
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {contributorRewards.map((reward, idx) => {
                        const Icon = reward.icon;

                        return (
                            <motion.div
                                key={reward.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                            >
                                <Card
                                    className="h-full bg-surface-light border border-ink/20 shadow-[2px_2px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-all duration-300 rounded-none relative group"
                                >
                                    {reward.badge && (
                                        <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
                                            [{reward.badge}]
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className={`h-12 w-12 flex items-center justify-center border border-ink/10 bg-surface mb-6 transition-transform group-hover:scale-110`}>
                                            <Icon className={`h-6 w-6 ${reward.iconColor}`} />
                                        </div>
                                        <CardTitle className="text-xl font-black text-ink uppercase tracking-tighter leading-tight">
                                            {reward.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-ink/60 font-(family-name:--font-jetbrains) text-xs leading-relaxed border-l-2 border-primary/20 pl-4">
                                            {reward.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
