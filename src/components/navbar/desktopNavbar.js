import React from 'react'
import styled from 'styled-components'

import NavLink from './navLink'

const NavList = styled.ul`
  list-style-type: none;
`

const NavListItem = styled.li`
  marginBottom: 0;
`
const DesktopNavbar = ({ location }) => {
  return <nav>
    <NavList>
      <NavListItem>
        <NavLink
          partiallyActive={location.pathname !== '/about'}
          to={`/`}>
          Blog
        </NavLink>
      </NavListItem>
      <NavListItem>
        <NavLink
          partiallyActive={location.pathname === '/about'}
          to={`/about`}>
          About
        </NavLink>
      </NavListItem>
    </NavList>
  </nav>
}

export default DesktopNavbar
