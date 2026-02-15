"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { TeamCard, TeamMember } from "@/components/ui/team-card";
import { motion } from "framer-motion";

// Placeholder data - in a real app this might come from a config file or API
const CORE_TEAM: TeamMember[] = [
    {
        name: "Darshan B",
        role: "Program Lead",
        image: "/team/Darshan.webp",
        bio: "Building things that matter.",
        socials: {
            github: "https://github.com/Dqrshan",
            linkedin: "https://linkedin.com/in/darshanb05",
            instagram: "https://instagram.com/bruh.darshan",
            email: "realdarshan@outlook.com"
        }
    },
    {
        name: "Pratham S",
        role: "Program Lead",
        image: "/team/Pratham.webp", 
        bio: "---",
        socials: {
            github: "https://github.com/Prathu241",
            linkedin: "https://www.linkedin.com/in/pratham-is-a-dev/",
            email: "prathamspr@gmail.com"
        }
    },
    {
        name: "Aniket R",
        role: "Marketing Lead",
        image: "/team/Aniket.webp", 
        bio: "---",
        socials: {
            github: "https://github.com/theanikeeeeet",
            linkedin: "https://www.linkedin.com/in/aniket-rajj",
            instagram: "https://www.instagram.com/theanikeeeeet",
            email: "rajaniket6379@gmail.com"
        }
    },
    {
        name: 'Ashitha G Kanchan',
        role: 'Design Lead',
        image: undefined,
        bio: 'if it looks cute, I did that.',
        socials: {
            github: 'https://github.com/Ashitha-g-kanchan',
            linkedin: 'https://www.linkedin.com/in/ashitha-g-kanchan/',
            instagram: 'https://www.instagram.com/ashitha.kanchan',
            email: 'ashithakanchan25@gmail.com'
        }
    }
];

export default function TeamPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20"
        >
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
                className="text-center space-y-4 max-w-3xl mx-auto"
            >
                <PageHeader
                    title="Meet the Team"
                    description="The passionate individuals driving Open Source culture at Atria."
                />
            </motion.div>

            {/* Core Team Section */}
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
            >
                <div className="text-center relative">
                    <h2 className="text-3xl font-black uppercase tracking-tighter inline-block relative z-10 bg-surface px-4 text-ink">
                        Core Team
                    </h2>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-lighter z-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {CORE_TEAM.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * idx, duration: 0.3, ease: "easeOut" }}
                        >
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Organizing Team Section */}
            {/* <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
            >
                <div className="text-center relative">
                    <h2 className="text-3xl font-black uppercase tracking-tighter inline-block relative z-10 bg-surface px-4 text-ink">
                        Organizing Team
                    </h2>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-lighter z-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ORGANIZING_TEAM.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.04 * idx, duration: 0.28, ease: "easeOut" }}
                        >
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </motion.section> */}
        </motion.div>
    );
}
