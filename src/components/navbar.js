import React from "react"
import styled from 'styled-components'

import NavLink from './navLink'

const NavList = styled.ul`
  list-style-type: none;
`

const NavListItem = styled.li`
  marginBottom: 0;
`
const Navbar = ({ location }) => {
  console.log(NavLink)
  return <nav>
    <NavList>
      <NavListItem>
        <NavLink
          to={`/`}>
          Blog
        </NavLink>
      </NavListItem>
      <NavListItem>
        <NavLink
          to={`/about`}>
          About
        </NavLink>
      </NavListItem>
    </NavList>
  </nav>
}

export default Navbar
