"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export interface PageHeaderAction {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "brutalist" | "default" | "outline" | "ghost" | "destructive";
    icon?: LucideIcon;
    disabled?: boolean;
    loading?: boolean;
}

export interface PageHeaderProps {
    /**
     * Main title of the page
     */
    title: string | ReactNode;

    /**
     * Optional subtitle/description
     */
    description?: string | ReactNode;

    /**
     * Optional back button configuration
     */
    backButton?: {
        label?: string;
        href?: string;
        onClick?: () => void;
    };

    /**
     * Primary action button(s) on the right side
     */
    actions?: PageHeaderAction | PageHeaderAction[];

    /**
     * Custom className for the header container
     */
    className?: string;

    /**
     * Size variant for the title
     */
    titleSize?: "sm" | "md" | "lg" | "xl";

    /**
     * Custom content to render in the header (overrides default layout)
     */
    children?: ReactNode;
}

/**
 * Reusable page header component with back button, title, description, and actions
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="Form Responses"
 *   description="View and manage your forms"
 *   backButton={{ label: "Back to Dashboard", href: "/dashboard/admin" }}
 *   actions={{
 *     label: "Create New Form",
 *     href: "/dashboard/admin/builder",
 *     variant: "brutalist"
 *   }}
 * />
 * ```
 */
export function PageHeader({
    title,
    description,
    backButton,
    actions,
    className = "",
    titleSize = "lg",
    children,
}: PageHeaderProps) {
    const router = useRouter();

    const titleSizeClasses = {
        sm: "text-2xl md:text-3xl",
        md: "text-3xl md:text-4xl",
        lg: "text-4xl md:text-5xl",
        xl: "text-5xl md:text-6xl",
    };

    const handleBackClick = () => {
        if (backButton?.onClick) {
            backButton.onClick();
        } else if (backButton?.href) {
            router.push(backButton.href);
        } else {
            router.back();
        }
    };

    const renderAction = (action: PageHeaderAction, index: number) => {
        const Icon = action.icon;
        const content = (
            <>
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {action.label}
            </>
        );

        if (action.href) {
            return (
                <Button
                    key={index}
                    variant={action.variant || "brutalist"}
                    disabled={action.disabled || action.loading}
                    asChild
                    className="w-full md:w-auto"
                >
                    <a href={action.href}>{content}</a>
                </Button>
            );
        }

        return (
            <Button
                key={index}
                variant={action.variant || "brutalist"}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                className="w-full md:w-auto"
            >
                {content}
            </Button>
        );
    };

    // If custom children provided, render them instead
    if (children) {
        return <div className={`space-y-2 ${className}`}>{children}</div>;
    }

    const actionArray = actions ? (Array.isArray(actions) ? actions : [actions]) : [];

    return (
        <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 ${className}`}>
            <div className="flex-1">
                {backButton && (
                    <Button
                        variant="ghost"
                        onClick={handleBackClick}
                        className="mb-4 -ml-4 h-8 text-xs font-(family-name:--font-jetbrains) uppercase text-ink/70 hover:text-primary hover:bg-transparent"
                    >
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        {backButton.label || "Back"}
                    </Button>
                )}

                <h1 className={`${titleSizeClasses[titleSize]} font-black text-slate-900 tracking-tighter uppercase`}>
                    {title}
                </h1>

                {description && (
                    <p className="text-ink/70 mt-1 text-sm md:text-base font-(family-name:--font-jetbrains)">
                        {description}
                    </p>
                )}
            </div>

            {actionArray.length > 0 && (
                <div className="shrink-0 flex flex-col md:flex-row gap-2">
                    {actionArray.map((action, index) => renderAction(action, index))}
                </div>
            )}
        </div>
    );
}

/**
 * Reusable empty state component for pages with no data
 */
export interface PageEmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: PageHeaderAction;
    className?: string;
}

export function PageEmptyState({
    icon: Icon,
    title,
    description,
    action,
    className = "",
}: PageEmptyStateProps) {
    return (
        <div className={`py-16 text-center ${className}`}>
            {Icon && (
                <Icon className="h-12 w-12 text-ink/75 mx-auto mb-4 opacity-20" />
            )}
            <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
            {description && (
                <p className="text-ink/60 font-medium mb-6 font-(family-name:--font-jetbrains)">{description}</p>
            )}
            {action && (
                <Button
                    variant={action.variant || "outline"}
                    onClick={action.onClick}
                    disabled={action.disabled || action.loading}
                    className="border-surface-lighter text-ink hover:border-primary hover:text-primary"
                >
                    {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                    {action.label}
                </Button>
            )}
        </div>
    );
}

/**
 * Reusable loading state component
 */
export interface PageLoadingStateProps {
    message?: string;
    className?: string;
}

export function PageLoadingState({
    message = "Loading...",
    className = "",
}: PageLoadingStateProps) {
    return (
        <div className={`flex items-center justify-center py-20 ${className}`}>
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-ink/70 font-(family-name:--font-jetbrains) animate-pulse">{message}</p>
            </div>
        </div>
    );
}
