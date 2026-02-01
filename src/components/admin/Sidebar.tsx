"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import {
    LayoutDashboard,
    FormInput,
    BarChart3,
    LogOut,
    ChevronRight,
    X,
} from "lucide-react";

const adminRoutes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-primary",
    },
    {
        label: "Form Builder",
        icon: FormInput,
        href: "/admin/builder",
        color: "text-accent",
    },
    {
        label: "Responses",
        icon: BarChart3,
        href: "/admin/responses",
        color: "text-primary",
    },
];

interface SidebarProps {
    onClose?: () => void;
    className?: string;
}

export function Sidebar({ onClose, className }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { confirm, Dialog } = useConfirmDialog();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        confirm({
            title: "Sign Out",
            description: "Are you sure you want to end your session? You'll need to sign back in to access the admin panel.",
            variant: "warning",
            confirmText: "Sign Out",
            onConfirm: async () => {
                await auth.signOut();
                router.push("/");
            },
        });
    };

    return (
        <div className={cn("h-full bg-surface border-r-4 border-white/10 w-64 flex flex-col relative", className)}>
            <Dialog />

            {/* Close button for mobile */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white md:hidden"
                >
                    <X className="h-6 w-6" />
                </button>
            )}

            {/* Logo */}
            <div className="p-6 border-b-4 border-white/10">
                <Link href="/admin" onClick={onClose}>
                    <h1 className="text-2xl font-black text-white tracking-tighter">
                        OS<span className="text-accent">ATRIA</span>
                    </h1>
                    <p className="text-xs text-white/60 font-mono mt-1">ADMIN PANEL</p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {adminRoutes.map((route) => {
                    const isActive = route.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(route.href);

                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md transition-all group relative",
                                isActive
                                    ? "bg-white text-ink shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]"
                                    : "text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1"
                            )}
                        >
                            <route.icon className={cn("h-5 w-5", isActive ? route.color : "text-white/70")} />
                            <span className="font-medium font-mono text-sm">{route.label}</span>
                            {isActive && (
                                <ChevronRight className="h-4 w-4 ml-auto text-accent" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t-4 border-white/10 space-y-3 bg-surface-dark/30">
                <div className="px-4 py-3 bg-white/5 rounded-md border border-white/10">
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest leading-none mb-1">
                        Administrator
                    </p>
                    <p className="text-sm text-white font-medium truncate">
                        {user?.email || "Loading..."}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-md text-white/70 hover:text-white hover:bg-red-500/20 transition-all border border-red-500/30 group"
                >
                    <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm leading-none">Logout</span>
                </button>
            </div>
        </div>
    );
}
