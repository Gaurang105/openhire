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
    const [isMobile, setIsMobile] = React.useState(false)
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
      // Detect if device is mobile
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
      }
      
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const showTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(true)
    }

    const hideTooltip = () => {
      if (isMobile) {
        // On mobile, hide after 3 seconds
        timeoutRef.current = setTimeout(() => setIsVisible(false), 3000)
      } else {
        setIsVisible(false)
      }
    }

    const handleClick = () => {
      if (isMobile) {
        if (isVisible) {
          setIsVisible(false)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
        } else {
          showTooltip()
        }
      }
    }

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    return (
      <div 
        className="relative inline-block"
        onMouseEnter={!isMobile ? showTooltip : undefined}
        onMouseLeave={!isMobile ? hideTooltip : undefined}
        onClick={handleClick}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? "tooltip" : undefined}
        ref={ref}
        {...props}
      >
        {children}
        {isVisible && (
          <div 
            id="tooltip"
            role="tooltip"
            className={cn(
              "absolute z-50 px-3 py-2 font-bold uppercase tracking-wide text-black bg-white border-4 border-black shadow-[4px_4px_0px_black]",
              "text-xs sm:text-xs md:text-sm",
              "md:bottom-full md:left-1/2 md:transform md:-translate-x-1/2 md:mb-2",
              "max-md:top-full max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:mt-2",
              "md:whitespace-nowrap max-md:max-w-[280px] max-md:text-center max-md:break-words",
              "md:before:content-[''] md:before:absolute md:before:top-full md:before:left-1/2 md:before:transform md:before:-translate-x-1/2",
              "md:before:border-l-[8px] md:before:border-r-[8px] md:before:border-t-[8px]",
              "md:before:border-l-transparent md:before:border-r-transparent md:before:border-t-black",
              "max-md:after:content-[''] max-md:after:absolute max-md:after:bottom-full max-md:after:left-1/2 max-md:after:transform max-md:after:-translate-x-1/2",
              "max-md:after:border-l-[8px] max-md:after:border-r-[8px] max-md:after:border-b-[8px]",
              "max-md:after:border-l-transparent max-md:after:border-r-transparent max-md:after:border-b-black",
              className
            )}
          >
            {content}
            {isMobile && (
              <div className="text-[10px] opacity-70 mt-1">
                Tap to dismiss
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

Tooltip.displayName = "Tooltip"

export { Tooltip } 