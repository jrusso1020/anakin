import React from "react"
import { cn } from "@/lib/utils"

const H1 = ({
  children,
  color,
  className,
}: {
  children: React.ReactNode
  color?: string
  className?: string
}) => (
  <h1
    className={cn(
      "text-4xl font-bold mb-6 mt-0 leading-normal",
      color ? `text-${color}` : "text-primary",
      className
    )}
  >
    {children}
  </h1>
)

export default H1
