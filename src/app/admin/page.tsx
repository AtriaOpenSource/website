"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput, Users, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllForms } from "@/lib/firebase/forms";
import { getAllSubmissions } from "@/lib/firebase/submissions";
import { Form, Submission } from "@/lib/types/form";

export default function AdminDashboard() {
    const [forms, setForms] = useState<Form[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [formsData, submissionsData] = await Promise.all([
                    getAllForms(),
                    getAllSubmissions(),
                ]);
                setForms(formsData);
                setSubmissions(submissionsData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate unique contributors
    const uniqueContributors = new Set(submissions.map(s => s.userEmail)).size;

    // Calculate growth (comparison with previous month would require more data)
    const growth = submissions.length > 0 ? "+..." : "0%";

    // Get recent submissions
    const recentSubmissions = submissions
        .sort((a, b) => {
            const dateA = a.submittedAt instanceof Date ? a.submittedAt : new Date(a.submittedAt.seconds * 1000);
            const dateB = b.submittedAt instanceof Date ? b.submittedAt : new Date(b.submittedAt.seconds * 1000);
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-surface-lighter font-mono">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-ink tracking-tighter">
                    Admin Dashboard
                </h1>
                <p className="text-surface-lighter mt-2">
                    Welcome to OSAtria Admin Panel
                </p>
            </div>

            {/* Stats Grid - Dynamic Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-mono uppercase">Total Forms</CardTitle>
                        <FormInput className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-primary">{forms.length}</div>
                        <p className="text-xs text-surface-lighter mt-1">Active forms</p>
                    </CardContent>
                </Card>

                <Card className="border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-mono uppercase">Submissions</CardTitle>
                        <BarChart3 className="h-5 w-5 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-accent">{submissions.length}</div>
                        <p className="text-xs text-surface-lighter mt-1">Total responses</p>
                    </CardContent>
                </Card>

                <Card className="border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-mono uppercase">Contributors</CardTitle>
                        <Users className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-primary">{uniqueContributors}</div>
                        <p className="text-xs text-surface-lighter mt-1">Active users</p>
                    </CardContent>
                </Card>

                <Card className="border-4 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-mono uppercase">Growth</CardTitle>
                        <TrendingUp className="h-5 w-5 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-accent">{growth}</div>
                        <p className="text-xs text-surface-lighter mt-1">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-2 border-surface/10">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4 flex-wrap">
                    <Button variant="brutalist" asChild>
                        <Link href="/admin/builder">Create New Form</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/responses">View All Responses</Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Recent Activity - Dynamic Data */}
            <Card className="border-2 border-surface/10">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest form submissions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    {recentSubmissions.length === 0 ? (
                        <div className="text-center py-8 text-surface-lighter">
                            No submissions yet
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentSubmissions.map((submission) => {
                                const submittedDate = submission.submittedAt instanceof Date
                                    ? submission.submittedAt
                                    : new Date(submission.submittedAt.seconds * 1000);

                                const timeAgo = getTimeAgo(submittedDate);

                                return (
                                    <div key={submission.id} className="flex items-center justify-between py-3 border-b border-surface/10 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 bg-primary rounded-full" />
                                            <div>
                                                <p className="font-medium text-sm">
                                                    New submission to "{forms.find(f => f.slug === submission.formSlug)?.title || submission.formSlug}"
                                                </p>
                                                <p className="text-xs text-surface-lighter">
                                                    {submission.userEmail} • {timeAgo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
}
