import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProps {
  children: React.ReactNode
  content: string
  className?: string
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
      <div 
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        ref={ref}
        {...props}
      >
        {children}
        {isVisible && (
          <div className={cn(
            "absolute z-50 px-3 py-2 text-xs font-bold uppercase tracking-wide text-black bg-white border-4 border-black shadow-[4px_4px_0px_black] whitespace-nowrap",
            "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
            "before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2",
            "before:border-l-[8px] before:border-r-[8px] before:border-t-[8px]",
            "before:border-l-transparent before:border-r-transparent before:border-t-black",
            className
          )}>
            {content}
          </div>
        )}
      </div>
    )
  }
)

Tooltip.displayName = "Tooltip"

export { Tooltip } 