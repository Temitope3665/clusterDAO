import { cn } from "@/libs/utils"
import * as React from "react"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex font-normal min-h-[120px] text-dark dark:text-white w-full rounded-md border-[#CCCCCC99] border dark:border-[#292929] dark:focus:border-primary bg-white dark:bg-dark px-3 py-2 text-sm ring-offset-background placeholder:font-normal  focus:border-primary dark:placeholder:text-[#666666] placeholder:text-[#AAAAAA] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
