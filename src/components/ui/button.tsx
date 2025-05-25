import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-black uppercase tracking-wider border-4 border-black transition-all duration-75 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px]",
        outline:
          "bg-background text-foreground shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px]",
        ghost: "bg-transparent border-transparent text-foreground hover:bg-muted shadow-none",
        link: "bg-transparent border-transparent text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
)
Button.displayName = "Button"

export { Button, buttonVariants } 