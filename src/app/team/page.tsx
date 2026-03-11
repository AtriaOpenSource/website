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
      github: "Dqrshan",
      linkedin: "darshanb05",
      instagram: "bruh.darshan",
      email: "realdarshan@outlook.com",
    },
  },
  {
    name: "Pratham S",
    role: "Program Lead",
    image: "/team/Pratham.webp",
    bio: "Leading ideas into reality.",
    socials: {
      github: "Prathu241",
      linkedin: "pratham-is-a-dev",
      email: "prathamspr@gmail.com",
    },
  },
  {
    name: "Aniket R",
    role: "Marketing Lead",
    image: "/team/Aniket.webp",
    bio: "Connecting creativity, brands and people.",
    socials: {
      github: "theanikeeeeet",
      linkedin: "aniket-rajj",
      instagram: "theanikeeeeet",
      email: "rajaniket6379@gmail.com",
    },
  },
  {
    name: "Disha S",
    role: "Operations Lead",
    image: "/team/Disha.webp",
    bio: "From planning to perfection.",
    socials: {
      github: "dishashiva",
      linkedin: "dishas05",
      instagram: "disha__1105",
      email: "disha.s.gowda05@gmail.com",
    },
  },
  {
    name: "Ashitha G Kanchan",
    role: "Design Lead",
    image: "/team/Ashitha.webp",
    bio: "If it looks cute, I did that.",
    socials: {
      github: "Ashitha-g-kanchan",
      linkedin: "ashitha-g-kanchan",
      instagram: "ashitha.kanchan",
      email: "ashithakanchan25@gmail.com",
    },
  },
  {
    name: "Aswin A",
    role: "Technical Lead",
    image: "/team/Aswin.webp",
    bio: "Production is live; send help.",
    socials: {
      github: "ashbuildsites",
      linkedin: "aswin-a-4678b928b",
      instagram: "builtbyashwin",
      email: "team@ashbuildsites.com",
    },
  },
  {
    name: "Harshini D",
    role: "Community Lead",
    image: "/team/Harshini.webp",
    bio: "Tech Enthusiast",
    socials: {
      linkedin: "harshini-d-789764357",
      email: "harshinidganu17@gmail.com",
    },
  }
];

const ORGANIZING_TEAM = [
  {
    name: "Dhyan V",
    role: "Community & Outreach Coordinator",
    image: "/team/organizing/Dhyan.webp",
    bio: "Bridge Builder. Change Maker.",
    socials: {
      github: "Gududhyan",
      linkedin: "dhyan-v-030298324",
      instagram: "_dhyan_v",
      email: "dhyanv2005@gmail.com",
    },
  },
  {
    name: "Mukesh",
    role: "Community & Outreach Coordinator",
    image: "/team/organizing/Mukesh.webp",
    bio: "Weaving networks, molding tomorrow.",
    socials: {
      linkedin: "mukesh--rao",
      instagram: "mukesh_s_rao",
      email: "mukeshrao1704@gmail.com",
    },
  },
  {
    name: "Abhijeet Krishna",
    role: "Documentation Coordinator",
    image: "/team/organizing/Abhijeet.webp",
    bio: "Working and building, creatively.",
    socials: {
      github: "abhijeet-0-0",
      linkedin: "abhijeet-krishna-76b80b339",
      instagram: "2006_abhijeet",
      email: "abhijeetkrishna304@gmail.com",
    },
  },
  {
    name: "Anjalee",
    role: "Documentation Coordinator",
    image: "/team/organizing/Anjalee.webp",
    bio: "Exploring tech and documenting ideas.",
    socials: {
      email: "anjaleemalhotra305@gmail.com",
    },
  },
  // Arghaneel
  // Chinmayee
  {
    name: "Paul Ebinezer S",
    role: "Event Operations Coordinator",
    image: "/team/organizing/Paul.webp",
    bio: "Community Builder",
    socials: {
      linkedin: "paul-ebinezer-s-46a775378",
      instagram: "paulebinezers",
      email: "paulebinezers007@gmail.com",
    },
  },
  {
    name: "Sanvi Reddy K",
    role: "Event Operations Coordinator",
    image: "/team/organizing/Sanvi.webp",
    bio: "Music. Moments. Memories.",
    socials: {
      linkedin: "sanvi-reddy-33191437b",
      email: "sanvireddyk204@gmail.com",
    },
  },
  // Vallabh
  // Om
  {
    name: "Aaditri Kumari Yadav",
    role: "Technical Coordinator",
    image: "/team/organizing/Aaditri.webp",
    bio: "Curious dev",
    socials: {
      github: "caetty01",
      linkedin: "aaditri-kumari-yadav",
      instagram: "aaditriiixx.io",
      email: "aaditri01@gmail.com",
    },
  },
  {
    name: "Anush G",
    role: "Technical Coordinator",
    image: "/team/organizing/Anush.webp",
    bio: "Dev exploring techs",
    socials: {
      github: "BakaHatake",
      instagram: "anush_._._.s_._.a",
      email: "aanush748@gmail.com",
    },
  },
  {
    name: "H Akash",
    role: "Technical Coordinator",
    image: "/team/organizing/Akash.webp",
    bio: "Te¢hie.",
    socials: {
      github: "Akashhogetapal",
      linkedin: "akash-h-887a98388",
      instagram: "akash_hogetapal",
      email: "akash85486@gmail.com",
    },
  },
  {
    name: "Atharav Pujari",
    role: "Technical Coordinator",
    image: "/team/organizing/Atharav.webp",
    bio: "Fuelled by curiosity, caffeine, and late-night debugging.",
    socials: {
      github: "AtharavPujari",
      linkedin: "atharav-pujari-a46b19282",
      instagram: "atharav._.pujari",
      email: "atharavpujari2005@gmail.com",
    },
  },
  {
    name: "Chirag R",
    role: "Technical Coordinator",
    image: "/team/organizing/Chirag.webp",
    bio: "Always learning, always exploring.",
    socials: {
      linkedin: "chirag-r-kumar-436494386",
      email: "chiragkumar42256@gmail.com",
    },
  },
  {
    name: "Karan Suthar",
    role: "Technical Coordinator",
    image: "/team/organizing/Karan.webp",
    bio: "Making Data Work Smarter!",
    socials: {
      github: "KaranJangid8656",
      linkedin: "karansuthar9565",
      instagram: "karan___jangid__",
      email: "karansuthar9565@gmail.com",
    },
  },
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
      <motion.section
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
              transition={{
                delay: 0.04 * idx,
                duration: 0.28,
                ease: "easeOut",
              }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
