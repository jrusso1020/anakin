import React from 'react'
import { Link } from 'gatsby'
import styled, {css} from 'styled-components'

import Navbar from './navbar'
import { rhythm, scale } from 'src/utils/typography'
import { mobile } from 'src/utils/media'

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

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `#3AAFA9`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div>
      <Navbar location={location} />
      <BodyContainer>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} James Russo. All Rights Reserved, Built with
          {` `}
          <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">Gatsby</a>
        </footer>
      </BodyContainer>
    </div>
  )
}

export default Layout
