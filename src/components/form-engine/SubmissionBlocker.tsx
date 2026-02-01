"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Home, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SubmissionBlockerProps {
    formTitle: string;
}

export function SubmissionBlocker({ formTitle }: SubmissionBlockerProps) {
    return (
        <Card className="border-4 border-accent shadow-[8px_8px_0_0_rgba(249,115,22,1)] overflow-hidden">
            <div className="h-2 bg-accent w-full" />
            <CardHeader className="pt-10 pb-6 text-center border-b-2 border-surface/10 mx-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent/20">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl font-black text-ink uppercase tracking-tight">
                    Already Registered
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                    You've successfully submitted your details
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 pb-10">
                <div className="bg-surface/5 p-6 rounded-md border-2 border-surface/10">
                    <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-4 w-4 text-accent" />
                        <h3 className="font-bold text-ink uppercase text-xs tracking-widest">{formTitle}</h3>
                    </div>
                    <p className="text-surface-lighter text-sm font-medium leading-relaxed">
                        Our records show that your entry for this event has already been recorded.
                        To maintain fair participation, we only allow one submission per account.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button variant="brutalist" asChild className="w-full">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="https://github.com/AtriaOpenSource" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Explore Community GitHub
                        </Link>
                    </Button>
                </div>

                <p className="text-center text-[10px] text-surface-lighter font-mono uppercase tracking-widest">
                    Need to change your response? Contact an admin.
                </p>
            </CardContent>
        </Card>
    );
}
