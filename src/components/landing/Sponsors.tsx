'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GradientText } from "@/components/animations/GradientText";
import Link from "next/link";
import { FileText, Handshake, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface Sponsor {
    name: string;
    website?: string;
    logo?: string;
    tier: "Platinum" | "Gold" | "Silver" | "Partner";
}

const SPONSORS: Sponsor[] = [
    { name: "Unstop", logo: "/sponsors/Unstop.jpg", tier: "Gold" },
];

const TIER_STYLES = {
    Platinum: {
        border: "border-primary/30",
        shadow: "shadow-[4px_4px_0_0_rgba(79,70,229,0.1)]",
        hoverBorder: "group-hover:border-primary",
        hoverShadow: "group-hover:shadow-[8px_8px_0_0_rgba(79,70,229,0.3)]",
        badgeBg: "bg-gradient-to-r from-primary to-indigo-600",
        iconColor: "text-primary",
        accentGradient: "from-primary/10 to-indigo-500/10",
    },
    Gold: {
        border: "border-[#d4af37]/30",
        shadow: "shadow-[4px_4px_0_0_rgba(212,175,55,0.1)]",
        hoverBorder: "group-hover:border-[#d4af37]",
        hoverShadow: "group-hover:shadow-[8px_8px_0_0_rgba(212,175,55,0.3)]",
        badgeBg: "bg-gradient-to-r from-[#d4af37] to-[#b8860b]",
        iconColor: "text-[#b8860b]",
        accentGradient: "from-[#d4af37]/10 to-[#b8860b]/10",
    },
    Silver: {
        border: "border-slate-300/30",
        shadow: "shadow-[4px_4px_0_0_rgba(203,213,225,0.1)]",
        hoverBorder: "group-hover:border-slate-400",
        hoverShadow: "group-hover:shadow-[8px_8px_0_0_rgba(148,163,184,0.3)]",
        badgeBg: "bg-gradient-to-r from-slate-300 to-slate-400",
        iconColor: "text-slate-500",
        accentGradient: "from-slate-200/10 to-slate-300/10",
    },
    Partner: {
        border: "border-ink/20",
        shadow: "shadow-[4px_4px_0_0_rgba(0,0,0,0.05)]",
        hoverBorder: "group-hover:border-ink/40",
        hoverShadow: "group-hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)]",
        badgeBg: "bg-gradient-to-r from-ink/80 to-ink/60",
        iconColor: "text-ink/60",
        accentGradient: "from-ink/5 to-ink/10",
    },
};

export const Sponsors = () => {
    return (
        <section className="py-32 px-6 sm:px-12 max-w-7xl mx-auto my-10 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pattern-halftone opacity-5 pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center mb-24"
            >
                <h2 className="text-5xl sm:text-7xl font-black mb-4 uppercase tracking-tighter text-ink leading-none">
                    Mission <GradientText>Allies</GradientText>
                </h2>
                <p className="font-(family-name:--font-jetbrains) text-ink/60 uppercase tracking-widest text-sm flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-ink/20" />
                    Strategic Partners & Operatives
                    <span className="h-px w-8 bg-ink/20" />
                </p>
            </motion.div>

            {/* Current Sponsors */}
            <div className="relative z-10 mb-32">
                <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
                    {SPONSORS.map((sponsor, idx) => {
                        const styles = TIER_STYLES[sponsor.tier];
                        return (
                            <motion.div 
                                key={sponsor.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="flex flex-col items-center gap-6">
                                    <div className={`h-48 w-80 border-2 ${styles.border} ${styles.hoverBorder} bg-surface-light rounded-none flex items-center justify-center ${styles.shadow} ${styles.hoverShadow} group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}>
                                        <div className={`absolute inset-0 bg-linear-to-br ${styles.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        <div className="absolute inset-0 pattern-halftone opacity-5 group-hover:opacity-10 transition-opacity" />
                                        
                                        {sponsor.logo ? (
                                            <Image
                                                src={sponsor.logo}
                                                alt={`${sponsor.name} logo`}
                                                width={320}
                                                height={120}
                                                className="h-28 w-auto object-contain p-6 relative z-10 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="h-16 w-16 bg-ink/10 rounded-none rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                                        )}

                                        {/* Corner accents */}
                                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-ink/10" />
                                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-ink/10" />
                                    </div>
                                    <div className={`flex items-center gap-2 ${styles.badgeBg} text-white px-6 py-2 font-bold uppercase tracking-wider text-xs shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] rounded-none`}>
                                        <ShieldCheck className="h-4 w-4" />
                                        {sponsor.tier} Sponsor
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center relative z-10"
            >
                <div className="inline-block relative">
                    <div className="bg-surface-light border-2 border-ink/20 rounded-none p-8 sm:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 pattern-halftone opacity-5 pointer-events-none" />
                        <span className="absolute -left-4 -bottom-8 text-9xl font-black text-ink/5 select-none font-(family-name:--font-jetbrains)">
                            SP
                        </span>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl sm:text-3xl font-black text-ink mb-4 uppercase tracking-tight">
                                Join the Alliance
                            </h3>
                            <p className="text-ink/60 mb-8 max-w-md mx-auto font-(family-name:--font-jetbrains) text-sm leading-relaxed">
                                Partner with us to empower the next generation of open-source developers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="brutalist"
                                    size="lg"
                                    className="group"
                                    asChild
                                >
                                    <Link target="_blank" href="/forms/sponsorship">
                                        <Handshake className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                                        Apply for Sponsorship
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-ink/20 hover:border-primary hover:bg-primary/5 hover:shadow-[4px_4px_0_0_rgba(79,70,229,0.2)] transition-all rounded-none"
                                    asChild
                                >
                                    <a href="/ASoC Prospectus.pdf" download>
                                        <FileText className="h-5 w-5 mr-2" />
                                        Download Prospectus
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative dashed boundary */}
                    <div className="absolute -inset-4 border border-dashed border-ink/10 rounded-none pointer-events-none" />
                </div>
            </motion.div>
            
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-10 h-64 w-64 border border-ink/5 rotate-12 pointer-events-none" />
            <div className="absolute bottom-1/4 -right-10 h-64 w-64 border border-ink/5 -rotate-12 pointer-events-none" />
        </section>
    );
};
