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
      "block px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
      partiallyActive
        ? "bg-primary/10 text-primary border-l-2 border-primary"
        : "text-muted-foreground hover:text-foreground"
    )}
    to={to}
  >
    {children}
  </Link>
)

export default NavLink
