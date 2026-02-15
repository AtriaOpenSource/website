"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Github, Code2, Cpu, Terminal, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    const calculateTimeLeft = (targetDate: number) => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };
    const targetDate = new Date("2026-03-11T00:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(() => calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-surface text-ink">
            {/* Texture Overlay */}
            <div className="texture-grain opacity-20 pointer-events-none" />

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-surface-lighter)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-surface-lighter)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20" />

            {/* Abstract Circuit / Brutalist Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Top Left Circuit */}
                <svg className="absolute top-10 left-10 w-64 h-64 text-primary/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M0 20 H20 V40 H50 V80 H80" />
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                    <circle cx="80" cy="80" r="2" fill="currentColor" />
                    <rect x="40" y="30" width="10" height="10" stroke="currentColor" />
                </svg>

                {/* Bottom Right Wireframe */}
                <div className="absolute bottom-20 right-20 w-80 h-80 border border-primary/30 rotate-12 opacity-40">
                    <div className="absolute inset-2 border border-secondary/30 -rotate-6" />
                    <div className="absolute inset-4 border border-accent/30 rotate-3" />
                </div>

                {/* Floating Dashed Lines */}
                <div className="absolute top-1/3 right-1/4 w-40 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
                <div className="absolute bottom-1/3 left-1/4 w-px h-40 bg-linear-to-b from-transparent via-secondary to-transparent opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Event Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/50 backdrop-blur-sm px-4 py-1.5 rounded-none">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span className="font-(family-name:--font-jetbrains) text-sm font-bold tracking-widest text-primary uppercase">MAR - MAY 2026</span>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <div className="relative mb-6">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                        className="text-8xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem] font-black tracking-tighter uppercase leading-[0.78] text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-700 relative z-20"
                    >
                        Atria
                        <span className="font-(family-name:--font-meow) text-secondary inline-block -rotate-6 text-8xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[13rem] tracking-wide -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 xl:-mt-40 relative z-10 capitalize bottom-10 sm:bottom-20" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                        <span className="font-(family-name:--font-jetbrains) text-5xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-8xl text-slate-800 tracking-tight block -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-12 normal-case relative z-0 bottom-12 sm:bottom-20">of &lt;CODE&gt;</span>
                    </motion.h1>

                    {/* Retro Glow / misalignment effect */}
                    <div className="absolute inset-0 text-8xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[14rem] font-black tracking-tighter uppercase leading-[0.78] text-primary/10 blur-[2px] translate-x-1 translate-y-1 -z-10 select-none pointer-events-none">
                        Atria
                        <span className="font-(family-name:--font-meow) text-secondary/30 inline-block -rotate-6 text-8xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[13rem] tracking-wide -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 xl:-mt-40 relative z-10 capitalize bottom-10 sm:bottom-20" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                        <span className="font-(family-name:--font-jetbrains) text-slate-800/30 text-5xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-8xl tracking-tight block -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-12 normal-case relative z-0 bottom-12 sm:bottom-20">of &lt;CODE&gt;</span>
                    </div>
                </div>

                {/* Pre-launch Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-12 flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-accent/30" />
                        <span className="font-(family-name:--font-jetbrains) text-sm font-bold tracking-[0.2em] text-accent uppercase">
                            Pre-launch in
                        </span>
                        <div className="h-px w-8 bg-accent/30" />
                    </div>
                    {timeLeft ? (
                        <div className="flex gap-3 sm:gap-4 font-(family-name:--font-jetbrains)">
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Mins", value: timeLeft.minutes },
                                { label: "Secs", value: timeLeft.seconds },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center bg-white border-2 border-slate-900 px-3 py-2 sm:px-4 sm:py-3 min-w-17.5 sm:min-w-22.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                                        {String(item.value).padStart(2, '0')}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mt-1">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-19 sm:h-24" />
                    )}
                </motion.div>

                {/* Subheading / Data Vis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <p className="text-base md:text-xl lg:text-2xl text-ink/80 font-(family-name:--font-jetbrains) font-medium leading-relaxed">
                        <span className="text-primary">&gt;</span> Join the movement. Build the future.<br />
                        The premier open-source event for <span className="text-accent underline decoration-2 underline-offset-4">innovators</span> and <span className="text-accent underline decoration-2 underline-offset-4">builders</span>.
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 mt-12"
                >
                    <Button variant="brutalist" size="xl" className="group" asChild>
                        <Link href="/forms/apply" target="_blank">
                            <Zap className="mr-2 h-5 w-5 fill-current" />
                            Apply
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="xl" className="border-ink/20 hover:border-primary hover:bg-primary/10 hover:text-primary text-ink" asChild>
                        <Link href="https://github.com/AtriaOpenSource" target="_blank">
                            <Github className="mr-2 h-5 w-5" />
                            GitHub Org
                        </Link>
                    </Button>
                </motion.div>

                {/* Floating decorative elements - UPDATED & ADDED */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-4 md:left-10 lg:left-20 hidden md:block"
                >
                    <Cpu className="w-16 h-16 md:w-20 md:h-20 text-secondary/20" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 left-10 hidden lg:block"
                >
                    <Code2 className="w-12 h-12 text-primary/20" />
                </motion.div>

                {/* New Techy Elements */}
                <div className="absolute top-1/4 left-10 w-24 h-24 border border-ink/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-20 h-20 border-t-2 border-primary/40 rounded-full" />
                </div>
                <div className="absolute bottom-1/4 right-20 w-16 h-16 border border-ink/10 rotate-45 flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent/20" />
                </div>

                {/* Right-side animated SVG accents */}
                <motion.svg
                    viewBox="0 0 120 120"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -14, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-24 right-6 lg:right-20 w-24 h-24 lg:w-32 lg:h-32 text-primary/40 hidden md:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="60" cy="60" r="44" strokeDasharray="6 6" />
                    <circle cx="60" cy="60" r="24" />
                    <path d="M16 60H40M80 60H104M60 16V40M60 80V104" />
                </motion.svg>

                <motion.svg
                    viewBox="0 0 140 140"
                    animate={{ opacity: [0.25, 0.55, 0.25], x: [0, 8, 0], y: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute top-1/2 right-2 lg:right-10 w-20 h-20 lg:w-28 lg:h-28 text-secondary/50 hidden md:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                >
                    <path d="M12 24H70V52H128" />
                    <path d="M12 72H54V108H128" />
                    <circle cx="12" cy="24" r="3" fill="currentColor" />
                    <circle cx="128" cy="52" r="3" fill="currentColor" />
                    <circle cx="12" cy="72" r="3" fill="currentColor" />
                    <circle cx="128" cy="108" r="3" fill="currentColor" />
                    <rect x="60" y="42" width="18" height="18" />
                </motion.svg>

                <motion.svg
                    viewBox="0 0 180 80"
                    animate={{ opacity: [0.2, 0.45, 0.2], y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                    className="absolute bottom-24 right-4 lg:right-24 w-36 h-16 lg:w-44 lg:h-20 text-accent/50 hidden lg:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M0 40 Q20 18 40 40 T80 40 T120 40 T160 40 T180 40" />
                    <path d="M0 52 Q20 30 40 52 T80 52 T120 52 T160 52 T180 52" opacity="0.7" />
                    <path d="M0 64 Q20 42 40 64 T80 64 T120 64 T160 64 T180 64" opacity="0.45" />
                </motion.svg>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02)_50%,transparent_50%)] bg-size-[100%_4px] pointer-events-none z-20" />
        </section>
    );
}
