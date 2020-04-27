import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

import Navbar from "./navbar"
import H1 from "./H1"
import { rhythm } from "src/utils/typography"
import { mobile } from "src/utils/media"
import { colors } from "src/utils/colors"

const BodyContainer = styled.div`
  margin-left: calc(320px - 1em);
  margin-right: auto;
  max-width: ${rhythm(28)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  ${mobile(css`
    margin-left: 0;
    margin-right: 0;
  `)}
`

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${(props) => (props.color ? props.color : colors.keppel)};
`

const H3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`

const Footer = styled.footer`
  color: ${(props) => (props.color ? props.color : colors.mirage)};
`

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <H1>
        <StyledLink to={`/`}>{title}</StyledLink>
      </H1>
    )
  } else {
    header = (
      <H3>
        <StyledLink to={`/`}>{title}</StyledLink>
      </H3>
    )
  }
  return (
    <div>
      <Navbar location={location} />
      <BodyContainer>
        <header>{header}</header>
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()} James Russo. All Rights Reserved, Built
          with
          {` `}
          <a
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
        </Footer>
      </BodyContainer>
    </div>
  )
}

export default Layout
