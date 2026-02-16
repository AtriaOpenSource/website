'use client';
import { MapPin, Calendar, Rocket, Sparkles, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/animations/GradientText";

export const Timeline = () => {
    const events = [
        {
            date: "March 11, 2026",
            title: "Pre-Launch", 
            description: "Join us for the opening ceremony and register for the program!",
            location: "Atria Institute of Technology & Online",
            icon: Rocket,
            color: "text-primary",
            borderColor: "border-primary",
            shadowColor: "shadow-primary",
        },
        {
            date: "March 18, 2026",
            title: "Repositories Reveal",
            description: "Discover the exciting projects and repositories available for contribution.",
            location: "Atria Institute of Technology & Online",
            icon: Sparkles,
            color: "text-accent",
            borderColor: "border-accent",
            shadowColor: "shadow-accent",
        },
        {
            date: "March 23 - May 8, 2026",
            title: "Contribution Period",
            description: "Start contributing, collaborate with others, submit PRs, earn points, attend workshops, and engage with mentors to maximize your impact.",
            location: "Online",
            icon: Calendar,
            color: "text-secondary",
            borderColor: "border-secondary",
            shadowColor: "shadow-secondary",
        },
        {
            date: "May 13, 2026",
            title: "Closing Ceremony & Awards",
            description: "Celebrate your achievements and receive recognition for your contributions.",
            location: "Atria Institute of Technology & Online",
            icon: Flag,
            color: "text-primary",
            borderColor: "border-primary",
            shadowColor: "shadow-primary",
        }
    ];

    return (
        <section className="py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-surface text-ink overflow-hidden relative">
            {/* Texture background */}
            <div className="absolute inset-0 pattern-halftone opacity-5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24 relative z-10"
            >
                <h2 className="text-5xl sm:text-7xl font-black mb-4 uppercase tracking-tighter text-ink leading-none">
                    Mission <GradientText>Timeline</GradientText>
                </h2>
                <p className="font-(family-name:--font-jetbrains) text-ink/60 uppercase tracking-widest text-sm flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-ink/20" />
                    The roadmap of ten thousand commits
                    <span className="h-px w-8 bg-ink/20" />
                </p>
            </motion.div>

            <div className="relative border-l-2 border-ink/10 ml-4 sm:ml-12 space-y-16 z-10">
                {events.map((event, index) => {
                    const Icon = event.icon;
                    
                    return (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-10 sm:pl-16 group"
                        >
                            {/* Timeline Node - Minimalized */}
                            <div className={`absolute -left-2.25 top-8 h-4 w-4 rounded-none bg-surface border-2 border-ink z-10 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-125 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)]`} />

                            {/* Event Card */}
                            <div 
                                className={`bg-surface-light p-8 rounded-none border border-ink/10 hover:border-ink/30 hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 relative overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,0.02)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.05)] group/card`}
                            >
                                {/* Background Icon - Subtle Risograph feel */}
                                <Icon className="absolute -right-6 -bottom-6 h-40 w-40 text-ink/3 rotate-12 select-none pointer-events-none transition-transform duration-700 group-hover/card:scale-110 group-hover/card:rotate-0" />

                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div className={`text-[10px] font-(family-name:--font-jetbrains) font-bold ${event.color} bg-ink/5 px-3 py-1 tracking-[0.2em] uppercase flex items-center gap-2 w-fit border border-ink/5 shadow-[2px_2px_0_0_rgba(0,0,0,0.03)]`}>
                                            <span className={`w-1.5 h-1.5 ${event.color.replace('text-', 'bg-')} animate-pulse`} />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 border border-ink/10 bg-surface px-3 py-1 font-(family-name:--font-jetbrains) text-[10px] font-bold uppercase tracking-widest text-ink/40">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {event.location || "Online"}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-ink flex items-center gap-3">
                                        <Icon className={`h-6 w-6 ${event.color} transition-transform group-hover/card:scale-110`} />
                                        {event.title}
                                    </h3>
                                    
                                    <p className="text-ink/60 font-(family-name:--font-jetbrains) text-xs leading-relaxed max-w-prose border-l-2 border-ink/5 pl-4 py-1">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Corner decoration - Techy/Minimal */}
                                <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r border-ink/10 group-hover/card:border-ink/30 transition-colors`} />
                                <div className={`absolute bottom-0 left-0 w-8 h-8 border-b border-l border-ink/10 group-hover/card:border-ink/30 transition-colors`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Background Decorative SVG */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
                <svg width="200" height="400" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M0 20 H50 V180 H100" />
                    <circle cx="50" cy="20" r="2" fill="currentColor" />
                    <rect x="40" y="90" width="20" height="20" stroke="currentColor" />
                </svg>
            </div>
        </section>
    );
};
