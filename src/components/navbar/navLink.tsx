import React from "react"
import { Link } from "gatsby"
import { cn } from "@/lib/utils"

interface Props {
  partiallyActive: boolean
  to: string
  children: React.ReactNode
}

const NavLink = ({ partiallyActive, to, children }: Props) => (
  <Link
    className={cn(
      "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
      "hover:bg-accent hover:text-accent-foreground hover:translate-x-1",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      partiallyActive
        ? "bg-primary text-primary-foreground shadow-glow"
        : "text-muted-foreground hover:text-foreground"
    )}
    to={to}
  >
    {children}
  </Link>
)

export default NavLink
