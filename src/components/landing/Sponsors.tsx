'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GradientText } from "@/components/animations/GradientText";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface Sponsor {
    name: string;
    website?: string;
    logo?: string;
    tier: "Gold" | "Silver" | "Partner";
}

const SPONSORS: Sponsor[] = [
    { name: "Unstop", logo: "/sponsors/Unstop.jpg", tier: "Gold" },
];

export const Sponsors = () => {
    return (
        <section className="py-32 px-6 sm:px-12 max-w-7xl mx-auto my-10 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 pattern-halftone opacity-10 pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center mb-24"
            >
                <h2 className="text-5xl sm:text-7xl font-black mb-4 uppercase tracking-tighter text-ink leading-none">
                    Mission <GradientText>Allies</GradientText>
                </h2>
                <p className="text-ink/50 font-(family-name:--font-jetbrains) max-w-2xl mx-auto mb-8 text-[10px] uppercase tracking-[0.3em] leading-relaxed flex items-center justify-center gap-4">
                    <span className="h-px w-6 bg-ink/10" />
                    STRATEGIC PARTNERS & OPERATIVES
                    <span className="h-px w-6 bg-ink/10" />
                </p>
            </motion.div>

            <div className="relative z-10">
                <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20">
                    {SPONSORS.map((sponsor, idx) => (
                        <motion.div 
                            key={sponsor.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="flex flex-col items-center gap-6">
                                <div className="h-40 w-64 border border-ink/10 bg-surface-light rounded-none flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.02)] group-hover:border-ink/30 group-hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.05)] group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                                    {/* Halftone Overlay for Grid feel */}
                                    <div className="absolute inset-0 pattern-halftone opacity-5 group-hover:opacity-10 transition-opacity" />
                                    
                                    {sponsor.logo ? (
                                        <Image
                                            src={sponsor.logo}
                                            alt={`${sponsor.name} logo`}
                                            width={256}
                                            height={96}
                                            className="h-24 w-auto object-contain p-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 bg-current rounded-none rotate-45 opacity-10 group-hover:rotate-90 transition-transform duration-500" />
                                    )}

                                    {/* Techy corner marks */}
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-ink/10" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-ink/10" />
                                </div>
                                <div className="flex items-center gap-2 bg-surface border border-ink/10 text-ink/40 px-4 py-1.5 font-(family-name:--font-jetbrains) text-[9px] font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0_0_rgba(0,0,0,0.02)] group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                    <ShieldCheck className="h-3 w-3 opacity-50" />
                                    {sponsor.tier} Sponsor
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-32"
                >
                    <div className="inline-block relative">
                        <Button
                            variant="outline"
                            className="h-14 px-10 border border-ink/20 bg-surface text-ink hover:bg-primary hover:text-surface-light hover:border-primary hover:shadow-[8px_8px_0_0_rgba(79,70,229,0.2)] active:translate-y-0.5 active:shadow-none transition-all duration-300 font-bold uppercase tracking-[0.25em] text-[11px] flex items-center gap-3 rounded-none relative z-10"
                            asChild
                        >
                            <Link href="mailto:realdarshan@outlook.com">
                                <Mail className="h-4 w-4" />
                                Join the Alliance
                            </Link>
                        </Button>
                        
                        {/* Decorative dashed boundary */}
                        <div className="absolute -inset-4 border border-dashed border-ink/5 rounded-none pointer-events-none" />
                    </div>
                </motion.div>
            </div>
            
            {/* Background Decorative Elements - Minimalized */}
            <div className="absolute top-1/4 -left-10 h-64 w-64 border border-ink/5 rotate-12 pointer-events-none" />
            <div className="absolute bottom-1/4 -right-10 h-64 w-64 border border-ink/5 -rotate-12 pointer-events-none" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-linear-to-r from-transparent via-ink/5 to-transparent -rotate-12 pointer-events-none" />
        </section>
    );
};
