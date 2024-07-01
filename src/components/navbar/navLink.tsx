import React from "react"

import { Link } from "gatsby"

interface NavLinkProps {
  children: React.ReactNode
  partiallyActive?: boolean
  to: string
}

const NavLink = ({ children, partiallyActive, to }: NavLinkProps) => (
  <Link
    className={`no-underline text-keppel border-b-2 border-transparent hover:shadow-keppel ${
      partiallyActive ? "font-bold shadow-swans-down" : "font-light shadow-none"
    }`}
    to={to}
  >
    {children}
  </Link>
)
export default NavLink
