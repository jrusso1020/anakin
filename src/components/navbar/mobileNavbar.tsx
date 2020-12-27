import React, { useState } from "react"
import styled, { css } from "styled-components"
import { CSSTransition } from "react-transition-group"

import { rhythm } from "src/utils/typography"
import { mobile } from "src/utils/media"
import { colors } from "src/utils/colors"
import Hamburger from "content/assets/hamburger.svg"
import NavLink from "./navLink"
import Bio from "./bio"

const NavList = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-bottom: 0;
  margin-top: 28px;
  background-color: ${colors.mirage};
  width: 100%;
  &.slide-enter {
    transform: translateY(-100%);
    transition: 0.3s cubic-bezier(0, 1, 0.5, 1);
  }

  &.slide-enter-active {
    transform: translateY(0%);
  }

  &.slide-exit {
    transform: translateY(0%);
    transition: 0.3s ease-in-out;
  }

  &.slide-exit-active {
    transform: translateY(-100%);
  }
`

const NavListItem = styled.li`
  margin-bottom: 0;
  padding: 20px;
`

const Nav = styled.nav`
  padding-top: ${rhythm(1)};
  padding-bottom: ${rhythm(1)};
  background-color: ${colors.mirage};
  height: ${rhythm(2)};
  position: fixed;
  width: 100%;
  z-index: 1;
`

const Container = styled.div`
  display: none;
  color: ${colors.keppel};
  ${mobile(css`
    display: block;
  `)}
`

const HamburgerMenu = styled(Hamburger)`
  position: absolute;
  top: 12px;
  right: 0;
  margin-right: 20px;
`

interface Props {
  location: Location
}

const MobileNavbar = ({ location }: Props) => {
  const [showNav, setShowNav] = useState(false)
  return (
    <Container>
      <Nav>
        <HamburgerMenu onClick={() => setShowNav(!showNav)} />
        <CSSTransition
          in={showNav}
          classNames="slide"
          timeout={300}
          unmountOnExit
        >
          {() => (
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
          )}
        </CSSTransition>
      </Nav>
      <Bio />
    </Container>
  )
}

export default MobileNavbar
