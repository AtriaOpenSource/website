"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth";
import { AccessDenied } from "@/components/dashboard/AccessDenied";
import { PageHeader, PageLoadingState } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function MaintainerProfilePage() {
    const { user, userData, loading } = useAuth();

    if (loading) return <PageLoadingState message="Loading profile..." />;
    if (!userData || userData.role !== "maintainer") return <AccessDenied />;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Profile"
                description="General account and maintainer details."
            />

            <Card className="border-2 border-surface-lighter">
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        {user?.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={userData.githubUsername || "Profile"}
                                width={56}
                                height={56}
                                className="h-14 w-14 border border-surface-lighter object-cover"
                            />
                        ) : (
                            <div className="h-14 w-14 border border-surface-lighter flex items-center justify-center font-black">
                                {(userData.githubUsername || "U").slice(0, 1).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-semibold">{userData.githubUsername || "Maintainer"}</p>
                            <p className="text-sm text-ink/60">{userData.email || "No email available"}</p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="border border-surface-lighter p-4">
                            <p className="text-xs uppercase font-(family-name:--font-jetbrains) text-ink/60">Role</p>
                            <p className="text-lg font-bold capitalize">{userData.role}</p>
                        </div>
                        <div className="border border-surface-lighter p-4">
                            <p className="text-xs uppercase font-(family-name:--font-jetbrains) text-ink/60">Joined</p>
                            <p className="text-lg font-bold">
                                {(userData.createdAt as any)?.seconds ? new Date((userData.createdAt as any).seconds * 1000).toLocaleString() : "Unknown"}
                            </p>
                        </div>
                        <div className="border border-surface-lighter p-4">
                            <p className="text-xs uppercase font-(family-name:--font-jetbrains) text-ink/60">Last Login</p>
                            <p className="text-lg font-bold">
                                {(userData.lastLoginAt as any)?.seconds ? new Date((userData.lastLoginAt as any).seconds * 1000).toLocaleString() : "Unknown"}
                            </p>
                        </div>
                    </div>

                    {userData.githubUsername && (
                        <Button asChild variant="outline">
                            <Link href={`https://github.com/${userData.githubUsername}`} target="_blank">
                                View GitHub Profile <ExternalLink className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
