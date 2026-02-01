"use client";

import { motion } from "framer-motion";
import { GradientText } from "../animations/GradientText";
import { Button } from "../ui/button";
import { ArrowRight, Github, Code2, Users } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[48px_48px]" />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center space-y-8">
                    {/* Eye-catching Pre-heading */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                    >
                        <div className="inline-flex items-center gap-2 bg-surface text-white px-4 py-2 border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                            <Code2 className="h-4 w-4 text-accent" />
                            <span className="font-mono text-sm font-bold tracking-wider">OPEN SOURCE EVENT 2026</span>
                        </div>
                    </motion.div>

                    {/* Main Heading - Brutalist Typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-ink uppercase leading-[0.9]"
                    >
                        Open Source
                        <GradientText className="block">ATRIA</GradientText>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl md:text-2xl text-surface-lighter max-w-3xl mx-auto font-medium"
                    >
                        The premier platform for our institution's largest open-source collaboration.
                        <br />
                        <span className="text-ink font-bold">Join the movement. Build the future.</span>
                    </motion.p>

                    {/* Coming Soon / Countdown Placeholder */}
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="py-12 relative group"
                    >
                        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none select-none
                            text-ink [text-shadow:4px_4px_0_var(--color-accent)] md:[text-shadow:8px_8px_0_var(--color-accent)]
                            hover:translate-x-[-4px] hover:translate-y-[-4px] hover:[text-shadow:8px_8px_0_var(--color-accent)] md:hover:[text-shadow:12px_12px_0_var(--color-accent)]
                            transition-all duration-200"
                        >
                            Coming Soon
                        </h2>
                    </motion.div> */}

                    {/* Stats Bar - Brutalist Blocks */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto py-8"
                    >
                        <div className="bg-white border-4 border-ink p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                            <div className="text-4xl font-black text-primary">500+</div>
                            <div className="text-sm font-mono text-surface uppercase tracking-wider mt-2">Contributors</div>
                        </div>
                        <div className="bg-white border-4 border-ink p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                            <div className="text-4xl font-black text-accent">1000+</div>
                            <div className="text-sm font-mono text-surface uppercase tracking-wider mt-2">Pull Requests</div>
                        </div>
                        <div className="bg-white border-4 border-ink p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                            <div className="text-4xl font-black text-primary">50+</div>
                            <div className="text-sm font-mono text-surface uppercase tracking-wider mt-2">Projects</div>
                        </div>
                    </motion.div> */}

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button variant="brutalist" size="xl" asChild>
                            <Link href="/forms/apply">
                                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="xl" asChild>
                            <Link href="https://github.com/AtriaOpenSource" target="_blank">
                                <Github className="mr-2 h-5 w-5" /> View on GitHub
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Powered By Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="pt-12"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface/5 border-2 border-surface/10">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="text-sm font-mono text-surface uppercase">
                                Powered by <span className="text-primary font-bold">Apex Community</span> × <span className="text-blue-500 font-bold">OSCode</span>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-ink rounded-full flex justify-center p-2"
                >
                    <motion.div className="w-1 h-3 bg-primary rounded-full" />
                </motion.div>
            </motion.div> */}
        </section>
    );
}
