import { ShieldX } from "lucide-react";

interface EmailNotWhitelistedProps {
    userEmail: string;
}

export function EmailNotWhitelisted({ userEmail }: EmailNotWhitelistedProps) {
    return (
        <div className="text-center py-12 px-6 space-y-6">
            <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto">
                <ShieldX className="h-8 w-8 text-red-500" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-ink mb-2 uppercase tracking-tight">
                    Access Restricted
                </h2>
                <p className="text-ink/70 text-base leading-relaxed max-w-md mx-auto">
                    You are not allowed to fill this form. Your email <span className="font-bold text-ink">({userEmail})</span> is not on the whitelist.
                </p>
            </div>
            <p className="text-xs text-ink/40 font-(family-name:--font-jetbrains) uppercase tracking-widest">
                403_EMAIL_NOT_WHITELISTED
            </p>
        </div>
    );
}
