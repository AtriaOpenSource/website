"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Lock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SOCIAL_LINKS } from "@/lib/constants/social";

interface FormClosedNoticeProps {
    formTitle: string;
}

export function FormClosedNotice({ formTitle }: FormClosedNoticeProps) {
    return (
        <div className="text-center py-12 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-ink/10">
                <Lock className="h-8 w-8 text-ink" />
            </div>

            <h1 className="text-3xl font-black text-ink mb-3 uppercase tracking-tight">
                Form Closed
            </h1>

            <div className="space-y-4 mb-8">
                <p className="text-lg font-medium text-ink">
                    This form is closed and not accepting responses anymore.
                </p>
                <p className="text-ink/60 text-sm leading-relaxed max-w-md mx-auto">
                    We have paused submissions for <span className="font-bold text-primary">{formTitle}</span>. For updates, reach out to us on our social channels below.
                </p>
            </div>

            <div className="grid grid-cols-1 dep-sm:grid-cols-3 gap-3 max-w-lg mx-auto"> 
                {/* <Button variant="outline" asChild className="w-full">
                    <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-4 w-4" />
                        Instagram
                    </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                    <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                    </Link>
                </Button> */}
                <Button variant="outline" asChild className="w-full">
                    <Link href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                        <SiWhatsapp className="mr-2 h-4 w-4" />
                        WhatsApp
                    </Link>
                </Button>
            </div>
        </div>
    );
}
