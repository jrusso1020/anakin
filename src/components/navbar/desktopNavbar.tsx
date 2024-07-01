import React from "react"

import NavLink from "./navLink"

interface Props {
  location: Location
}

const DesktopNavbar = ({ location }: Props) => {
  return (
    <nav>
      <ul className="list-none">
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
    </nav>
  )
}

export default DesktopNavbar
