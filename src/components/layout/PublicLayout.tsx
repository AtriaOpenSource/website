import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Instagram, Linkedin, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Props for the PublicHeader component
 */
export interface PublicHeaderProps {
    /**
     * Icon to display in the header badge
     */
    icon?: LucideIcon;

    /**
     * Label text for the header badge (e.g., "LEGAL", "FORM")
     */
    badgeLabel?: string;

    /**
     * Custom href for the back button (defaults to "/")
     */
    backHref?: string;

    /**
     * Custom content to display instead of default user info
     */
    rightContent?: ReactNode;

    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * Reusable sticky header for public-facing pages (forms, legal pages)
 * 
 * Features:
 * - Sticky positioning with backdrop blur
 * - Back to home button with hover animation
 * - Badge with icon and label
 * - Customizable right-side content
 * 
 * @example
 * ```tsx
 * <PublicHeader
 *   icon={Shield}
 *   badgeLabel="LEGAL"
 * />
 * ```
 */
export function PublicHeader({
    icon: Icon,
    badgeLabel,
    backHref = "/",
    rightContent,
    className = "",
}: PublicHeaderProps) {
    return (
        <header className={`sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-surface-lighter ${className}`}>
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={backHref} className="flex items-center gap-2 group">
                    <ArrowLeft className="h-4 w-4 text-primary group-hover:-translate-x-1 transition-transform" />
                    <span className="font-black tracking-tighter text-xl">
                        A<span className="text-primary">S</span>oC
                    </span>
                </Link>

                {rightContent ? (
                    rightContent
                ) : (
                    <div className="flex items-center gap-3">
                        {badgeLabel && (
                            <span className="text-xs font-(family-name:--font-jetbrains) text-ink/75 hidden sm:inline">
                                {badgeLabel}
                            </span>
                        )}
                        {Icon && (
                            <div className="h-8 w-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                                <Icon className="h-4 w-4 text-primary" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

/**
 * Props for the PublicHero component
 */
export interface PublicHeroProps {
    /**
     * Badge text (small label above title)
     */
    badge?: string;

    /**
     * Main title
     */
    title: string | ReactNode;

    /**
     * Description text below title
     */
    description?: string | ReactNode;

    /**
     * Footer text (e.g., "Last Updated: ...")
     */
    footer?: string;

    /**
     * Custom badge color (defaults to primary)
     */
    badgeColor?: "primary" | "accent";

    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * Reusable hero section for public-facing pages
 * 
 * Features:
 * - Animated background gradients
 * - Badge, title, description layout
 * - Motion animations
 * - Responsive sizing
 * 
 * @example
 * ```tsx
 * <PublicHero
 *   badge="Community Guidelines"
 *   title="Code of Conduct"
 *   description="Our commitment to fostering an open, welcoming environment."
 *   footer="Last Updated: February 1, 2026"
 *   badgeColor="accent"
 * />
 * ```
 */
export function PublicHero({
    badge,
    title,
    description,
    footer,
    badgeColor = "primary",
    className = "",
}: PublicHeroProps) {
    const badgeColorClass = badgeColor === "accent" ? "border-accent bg-accent/5 text-accent" : "border-primary bg-primary/5 text-primary";

    return (
        <section className={`relative bg-paper text-ink py-20 px-4 overflow-hidden ${className}`}>
            {/* Grid Background - matching HeroSection */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {badge && (
                        <div className={`inline-flex items-center gap-2 border-2 px-4 py-1.5 mb-6 ${badgeColorClass}`}>
                            <span className="font-(family-name:--font-jetbrains) text-xs font-bold tracking-widest uppercase">{badge}</span>
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-ink">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-ink/90 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
                            {description}
                        </p>
                    )}
                    {footer && (
                        <p className="text-ink/60 mt-6 font-(family-name:--font-jetbrains) text-sm">
                            {footer}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Props for the PublicFooter component
 */
export interface PublicFooterProps {
    /**
     * Optional contact email to display
     */
    contactEmail?: string;

    /**
     * Optional contact label text
     */
    contactLabel?: string;

    /**
     * Custom copyright text (defaults to "Atria Open Source Community")
     */
    copyrightText?: string;

    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * Reusable footer for public-facing pages
 * 
 * Features:
 * - Consistent styling with top border
 * - Optional contact email
 * - Copyright text with current year
 * - Configurable max-width
 * 
 * @example
 * ```tsx
 * <PublicFooter
 *   contactEmail="opensource@atria.edu"
 *   contactLabel="Need help? Reach out at"
 *   maxWidth="5xl"
 * />
 * ```
 */
export function PublicFooter({
    contactEmail,
    contactLabel = "Questions? Contact us at",
    copyrightText = "Atria Open Source Community. All rights reserved.",
    className = "",
}: PublicFooterProps) {
    const maxWidthClass = "max-w-7xl"; // Always match header width

    return (
        <footer className={`py-8 border-t border-ink/10 bg-surface-light ${className}`}>
            <div className={`${maxWidthClass} w-full mx-auto px-4 sm:px-6 lg:px-8`}>
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                    {/* About Section - Takes more space */}
                    <div className="md:col-span-5">
                        <h3 className="font-black text-lg mb-3 uppercase tracking-tight text-ink">
                            A<span className="text-primary">S</span>oC
                        </h3>
                        <p className="text-ink/70 text-sm leading-relaxed">
                            The premier open-source event for innovators and builders at Atria Institute of Technology.
                        </p>
                    </div>

                    {/* Legal & Resources */}
                    <div className="md:col-span-4">
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-ink/80">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/brand-kit" className="text-ink/70 hover:text-primary text-sm transition-colors">
                                    Brand Kit
                                </a>
                            </li>
                            <li>
                                <a href="/legal/code-of-conduct" className="text-ink/70 hover:text-primary text-sm transition-colors">
                                    Code of Conduct
                                </a>
                            </li>
                            <li>
                                <a href="/legal/terms-of-participation" className="text-ink/70 hover:text-primary text-sm transition-colors">
                                    Terms of Participation
                                </a>
                            </li>
                            <li>
                                <a href="/legal/contribution-guidelines" className="text-ink/70 hover:text-primary text-sm transition-colors">
                                    Contribution Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-ink/80">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/AtriaOpenSource"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-primary transition-colors border-2 border-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/atriaopensource/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-blue-500 transition-colors border-2 border-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/atria_opensource/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-pink-500 transition-colors border-2 border-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://chat.whatsapp.com/DmWJm7XyQjeAg1psXWUj6K?mode=gi_t"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-[#25D366] transition-colors border-2 border-ink shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-ink/10">
                    {contactEmail && (
                        <p className="text-ink/60 text-xs mb-2 text-center">
                            {contactLabel}{" "}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="text-primary hover:underline font-medium"
                            >
                                {contactEmail}
                            </a>
                        </p>
                    )}
                    <p className="text-ink/60 text-[10px] text-center font-(family-name:--font-jetbrains) uppercase tracking-wider">
                        © {new Date().getFullYear()} {copyrightText}
                    </p>
                </div>
            </div>
        </footer>
    );
}

/**
 * Props for the PublicPageLayout component
 */
export interface PublicPageLayoutProps {
    /**
     * Header configuration
     */
    header?: PublicHeaderProps;

    /**
     * Hero section configuration
     */
    hero?: PublicHeroProps;

    /**
     * Footer configuration
     */
    footer?: PublicFooterProps;

    /**
     * Main content
     */
    children: ReactNode;

    /**
     * Content max width
     */
    contentMaxWidth?: "3xl" | "5xl" | "7xl";

    /**
     * Whether to animate content with motion
     */
    animateContent?: boolean;

    /**
     * Additional className for main content
     */
    contentClassName?: string;
}

/**
 * Complete layout wrapper for public-facing pages
 * 
 * Combines PublicHeader, PublicHero, content area, and PublicFooter
 * into a single convenient component.
 * 
 * @example
 * ```tsx
 * <PublicPageLayout
 *   header={{ icon: Shield, badgeLabel: "LEGAL" }}
 *   hero={{
 *     badge: "Community Guidelines",
 *     title: "Code of Conduct",
 *     description: "Our commitment to fostering an open environment."
 *   }}
 *   footer={{ contactEmail: "conduct@atria.edu" }}
 *   contentMaxWidth="5xl"
 * >
 *   <div className="prose prose-lg">
 *     // Your content here
 *   </div>
 * </PublicPageLayout>
 * ```
 */
export function PublicPageLayout({
    header,
    hero,
    footer,
    children,
    contentMaxWidth = "5xl",
    animateContent = true,
    contentClassName = "",
}: PublicPageLayoutProps) {
    const maxWidthClass = `max-w-${contentMaxWidth}`;

    const contentWrapper = animateContent ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            {children}
        </motion.div>
    ) : (
        children
    );

    return (
        <div className="min-h-screen bg-paper flex flex-col">
            {header && <PublicHeader {...header} />}

            {hero && <PublicHero {...hero} />}

            <main className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-12 grow ${contentClassName}`}>
                {contentWrapper}
            </main>

            {footer !== undefined && <PublicFooter {...footer} />}
        </div>
    );
}
