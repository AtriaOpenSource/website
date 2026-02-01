"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-paper overflow-hidden relative">
            {/* Sidebar for Desktop */}
            <div className="hidden md:block h-full border-r-4 border-white/10 shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-70 w-64 md:hidden"
                        >
                            <Sidebar onClose={() => setIsSidebarOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 overflow-y-auto flex flex-col h-full relative">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b-4 border-white/10 sticky top-0 z-50">
                    <h1 className="text-xl font-black text-white tracking-tighter">
                        OS<span className="text-accent">ATRIA</span>
                    </h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-white hover:bg-white/10"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                <div className="p-4 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
