import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white shadow hover:bg-primary/90 hover:shadow-lg hover:scale-105",
                destructive:
                    "bg-red-500 text-white shadow-sm hover:bg-red-600",
                outline:
                    "border-2 border-primary bg-transparent text-primary hover:bg-primary/10",
                secondary:
                    "bg-accent text-white shadow-sm hover:bg-accent/90 hover:shadow-lg hover:scale-105",
                ghost: "hover:bg-primary/10 hover:text-primary",
                link: "text-primary underline-offset-4 hover:underline",
                brutalist:
                    "bg-primary text-white border-2 border-primary shadow-[4px_4px_0_0_var(--color-secondary)] hover:shadow-[2px_2px_0_0_var(--color-secondary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold uppercase tracking-wider hover:bg-primary/90",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 rounded-md px-4 text-xs",
                lg: "h-12 rounded-md px-8 text-base",
                xl: "h-14 rounded-md px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
