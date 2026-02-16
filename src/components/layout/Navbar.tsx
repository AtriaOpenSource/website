"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Github, LogOut, LayoutDashboard, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDashboardBase } from "@/lib/routes/dashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
    const { user, userData, loginWithGithub, logout, loading } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogin = async () => {
        await loginWithGithub();
    };

    const getDashboardLink = () => {
        if (!userData) return "/";
        // console.log(userData);
        return getDashboardBase(userData.role);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-surface-lighter bg-surface/80 backdrop-blur-md text-ink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-black tracking-tighter text-2xl">
                        A<span className="text-primary group-hover:text-accent transition-colors">S</span>oC
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/repositories" className="hover:text-primary transition-colors">Repositories</Link>
                    <Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link>
                    <Link href="/team" className="hover:text-primary transition-colors">Team</Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {loading ? (
                        <div className="h-8 w-20 bg-surface/10 animate-pulse rounded hidden md:block" />
                    ) : user ? (
                        <div className="hidden md:flex">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-ink p-0 overflow-hidden hover:opacity-80">
                                        <Image
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`}
                                            alt="Avatar"
                                            width={40}
                                            height={40}
                                            className="h-full w-full object-cover"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{userData?.githubUsername || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardLink()} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="https://github.com/settings/profile" target="_blank" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            GitHub Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            await logout();
                                            router.push("/");
                                        }}
                                        className="text-destructive cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <Button onClick={handleLogin} variant="brutalist" size="sm" className="hidden md:inline-flex">
                            <Github className="mr-2 h-4 w-4" /> Login
                        </Button>
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={`text-ink transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}>
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="p-4 border-l-2 border-surface-lighter w-72 bg-surface-light text-ink"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <p className="font-black text-lg tracking-tight uppercase text-ink">Menu</p>
                                    </div>
                                    <nav className="flex flex-col gap-3 font-bold text-sm uppercase tracking-wider">
                                        <Link href="/" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Home</Link>
                                        <Link href="/repositories" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Repositories</Link>
                                        <Link href="/leaderboard" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Leaderboard</Link>
                                        <Link href="/team" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Team</Link>
                                    </nav>

                                    <div className="mt-auto pt-6 border-t border-surface-lighter">
                                        {loading ? (
                                            <div className="h-9 w-full bg-surface/10 animate-pulse rounded" />
                                        ) : user ? (
                                            <div className="space-y-3">
                                                <Button asChild variant="outline" className="w-full">
                                                    <Link href={getDashboardLink()} onClick={() => setOpen(false)}>
                                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                                        Dashboard
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={async () => {
                                                        await logout();
                                                        setOpen(false);
                                                        router.push("/");
                                                    }}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log out
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={async () => {
                                                await handleLogin();
                                                setOpen(false);
                                            }} variant="brutalist" className="w-full">
                                                <Github className="mr-2 h-4 w-4" /> Login
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
