import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "../theme-toggle"
import NavLink from "./navLink"

interface Props {
  location: Location
}

const DesktopNavbar = ({ location }: Props) => {
  return (
    <Card className="glass border-border/30 backdrop-blur-xl">
      <CardContent className="p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                partiallyActive={
                  !["/about/"].includes(location.pathname) &&
                  !location.pathname.includes("tags")
                }
                to={"/"}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                partiallyActive={location.pathname === "/about/"}
                to={"/about/"}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                partiallyActive={location.pathname.includes("tags")}
                to={"/tags/"}
              >
                Tags
              </NavLink>
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-border/50 flex justify-center">
            <ThemeToggle />
          </div>
        </nav>
      </CardContent>
    </Card>
  )
}

export default DesktopNavbar
