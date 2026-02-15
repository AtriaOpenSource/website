"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import {
    LayoutDashboard,
    GitBranch,
    Users,
    FormInput,
    BarChart3,
    LogOut,
    Menu,
    UserCircle2,
    GitPullRequestArrow,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { ComponentType, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dashboardRoutes } from "@/lib/routes/dashboard";

interface SidebarProps {
    role: "admin" | "maintainer" | "contributor";
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
}

interface SidebarRoute {
    href: string;
    label: string;
    icon: ComponentType<{ className?: string }>;
}

interface SidebarContentProps {
    currentRoutes: SidebarRoute[];
    pathname: string | null;
    baseRoutes: Set<string>;
    onNavigate?: () => void;
    onLogout: () => Promise<void>;
    isCollapsed?: boolean;
}

function SidebarContent({ currentRoutes, pathname, baseRoutes, onNavigate, onLogout, isCollapsed = false }: SidebarContentProps) {
    return (
        <div className="flex flex-col h-full p-4 overflow-hidden">
            <div className={`flex items-center gap-3 px-2 mb-10 mt-2 ${isCollapsed ? "justify-center" : ""}`}>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-black text-xl tracking-tighter uppercase text-ink whitespace-nowrap"
                    >
                        ASoC
                    </motion.span>
                )}
            </div>

            <nav className="space-y-1 flex-1">
                {currentRoutes.map((route) => {
                    const isBaseRoute = baseRoutes.has(route.href);
                    const isActive = pathname === route.href || (!isBaseRoute && pathname?.startsWith(`${route.href}/`));
                    return (
                        <Button
                            key={route.href}
                            variant="ghost"
                            title={isCollapsed ? route.label : undefined}
                            className={`w-full mb-1 ${isCollapsed ? "justify-center px-0" : "justify-start"} ${isActive
                                ? "bg-primary/10 text-primary font-bold border-r-2 border-primary rounded-none"
                                : "font-(family-name:--font-jetbrains) text-ink/60 hover:text-primary hover:bg-surface-lighter/50 rounded-none"
                                }`}
                            asChild
                        >
                            <Link href={route.href} onClick={onNavigate} className="overflow-hidden">
                                <route.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-primary" : "text-ink/40 group-hover:text-primary"} ${!isCollapsed ? "mr-3" : ""}`} />
                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="whitespace-nowrap overflow-hidden"
                                        >
                                            {route.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </Button>
                    );
                })}
            </nav>

            <div className={`mt-auto pt-6 border-t border-surface-lighter ${isCollapsed ? "flex flex-col items-center" : ""}`}>
                <Button
                    variant="ghost"
                    title={isCollapsed ? "Logout" : undefined}
                    className={`w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-none font-(family-name:--font-jetbrains) uppercase text-xs tracking-wider ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
                    onClick={onLogout}
                >
                    <LogOut className={`h-4 w-4 shrink-0 ${!isCollapsed ? "mr-3" : ""}`} />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="whitespace-nowrap overflow-hidden"
                        >
                            Logout
                        </motion.span>
                    )}
                </Button>
            </div>
        </div>
    );
}

export function DashboardSidebar({ role, isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const routes = {
        admin: [
            { href: dashboardRoutes.admin.base, label: "Overview", icon: LayoutDashboard },
            { href: dashboardRoutes.admin.repos, label: "Repositories", icon: GitBranch },
            { href: dashboardRoutes.admin.users, label: "Users & Maintainers", icon: Users },
            { href: dashboardRoutes.admin.builder, label: "Form Builder", icon: FormInput },
            { href: dashboardRoutes.admin.responses, label: "Responses", icon: BarChart3 },
        ],
        maintainer: [
            { href: dashboardRoutes.maintainer.base, label: "Overview", icon: LayoutDashboard },
            { href: dashboardRoutes.maintainer.repos, label: "Repos", icon: GitBranch },
            { href: dashboardRoutes.maintainer.reviewPRs, label: "Review PRs", icon: GitPullRequestArrow },
            { href: dashboardRoutes.maintainer.profile, label: "Profile", icon: UserCircle2 },
        ],
        contributor: [
            { href: dashboardRoutes.contributor.base, label: "Overview", icon: LayoutDashboard },
            { href: dashboardRoutes.contributor.yourRepos, label: "Your Repos", icon: GitBranch },
            { href: dashboardRoutes.contributor.profile, label: "Profile", icon: UserCircle2 },
        ],
    };

    const currentRoutes = (routes[role] || routes.contributor) as SidebarRoute[];
    const baseRoutes = new Set([
        dashboardRoutes.admin.base,
        dashboardRoutes.maintainer.base,
        dashboardRoutes.contributor.base,
    ]);
    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.div
                className="hidden md:block fixed inset-y-0 left-0 z-50 bg-surface-light border-r border-surface-lighter"
                animate={{ width: isCollapsed ? 80 : 256 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="relative h-full">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="absolute -right-3 top-10 bg-primary text-white rounded-none p-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] z-60 hover:scale-110 active:scale-95 transition-transform"
                    >
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>

                    <SidebarContent
                        currentRoutes={currentRoutes}
                        pathname={pathname}
                        baseRoutes={baseRoutes}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </motion.div>

            {/* Mobile Sidebar */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-surface-lighter bg-surface-light sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <span className="font-black text-lg tracking-tight uppercase text-ink">ASoC</span>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className={`text-ink transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="p-0 border-r-2 border-surface-lighter w-64 bg-surface-light text-ink"
                    >
                        <SidebarContent
                            currentRoutes={currentRoutes}
                            pathname={pathname}
                            baseRoutes={baseRoutes}
                            onNavigate={() => setOpen(false)}
                            onLogout={handleLogout}
                            isCollapsed={false}
                        />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
