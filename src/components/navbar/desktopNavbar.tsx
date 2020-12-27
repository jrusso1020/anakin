import React from "react"
import styled from "styled-components"

import NavLink from "./navLink"

const NavList = styled.ul`
  list-style-type: none;
`

const NavListItem = styled.li`
  marginbottom: 0;
`

interface Props {
  location: Location
}

const DesktopNavbar = ({ location }: Props) => {
  return (
    <nav>
      <NavList>
        <NavListItem>
          <NavLink
            partiallyActive={
              !["/about/"].includes(location.pathname) &&
              !location.pathname.includes("tags")
            }
            to={`/`}
          >
            Blog
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            partiallyActive={location.pathname === "/about/"}
            to={`/about/`}
          >
            About
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink
            partiallyActive={location.pathname.includes("tags")}
            to={`/tags/`}
          >
            Tags
          </NavLink>
        </NavListItem>
      </NavList>
    </nav>
  )
}

export default DesktopNavbar
