import React from 'react'
import styled, { css } from 'styled-components'

import { rhythm } from 'src/utils/typography'
import { mobile } from 'src/utils/media'
import { colors } from 'src/utils/colors'
import NavLink from './navLink'
import Bio from './bio'

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  margin-left: 0;
  margin-bottom: 0;
  align-items: center;
`

const NavListItem = styled.li`
  margin-bottom: 0;
  margin-right: ${rhythm(1)};
`

const Nav = styled.nav`
  padding-top: ${rhythm(1)};
  padding-bottom: ${rhythm(1)};
  background-color: ${colors.mirage};
  height: ${rhythm(2)};
  display: flex;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
`

const Container = styled.div`
  display: none;
  ${mobile(css`
    display: block;
  `)}
`
const MobileNavbar = ({ location }) => {
  return <Container>
    <Nav>
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
    </Nav>
    <Bio />
  </Container>
}

export default MobileNavbar
