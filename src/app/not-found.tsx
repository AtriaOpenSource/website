import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full space-y-8">
                <div className="w-24 h-24 bg-ink/5 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-ink/10">
                    <Ghost className="h-12 w-12 text-ink/80" />
                </div>

                <div>
                    <h1 className="text-8xl font-black text-ink mb-2 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-ink mb-4 uppercase tracking-widest">
                        Page Not Found
                    </h2>
                    <p className="text-ink/60 text-lg leading-relaxed max-w-sm mx-auto">
                        The page you are looking for doesn&apos;t exist or has been moved to another dimension.
                    </p>
                </div>

                <div className="flex justify-center pt-4">
                    <Button variant="brutalist" size="lg" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Return Home
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t-2 border-ink/5">
                    <p className="text-xs text-ink/40 font-(family-name:--font-jetbrains) uppercase tracking-[0.2em]">
                        Error Code: 404_NOT_FOUND
                    </p>
                </div>
            </div>

            {/* Background Grid */}
            <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>
    );
}
