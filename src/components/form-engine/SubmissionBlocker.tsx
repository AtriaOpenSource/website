"use client";

import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

interface SubmissionBlockerProps {
    formTitle: string;
}

export function SubmissionBlocker({ formTitle }: SubmissionBlockerProps) {
    return (
        <div className="text-center py-12 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-3xl font-black text-ink mb-3 uppercase tracking-tight">
                Already Registered
            </h1>

            <div className="space-y-4 mb-8">
                <p className="text-lg font-medium text-ink">
                    You have successfully submitted your details for <span className="font-bold text-primary">{formTitle}</span>.
                </p>
                <p className="text-ink/60 text-sm leading-relaxed max-w-sm mx-auto">
                    To maintain fair participation, we only allow one submission per account.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <Button variant="brutalist" asChild className="w-full">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back Home
                    </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                    <Link href="https://chat.whatsapp.com/DmWJm7XyQjeAg1psXWUj6K?mode=gi_t" target="_blank">
                        <SiWhatsapp className="mr-2 h-4 w-4" />
                        Join WhatsApp
                    </Link>
                </Button>
            </div>
        </div>
    );
}
