import React from "react"
import { Link } from "gatsby"

import Navbar from "./navbar"
import H1 from "./H1"

const StyledLink = ({
  children,
  to,
}: {
  children: React.ReactNode
  color?: string
  to: string
}) => (
  <Link
    className={`no-underline text-keppel shadow-none hover:shadow-keppel`}
    to={to}
  >
    {children}
  </Link>
)

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
        <StyledLink to={"/"}>{title}</StyledLink>
      </H1>
    )
  } else {
    header = (
      <h3 className="mt-0 text-xl mb-6">
        <StyledLink to={"/"}>{title}</StyledLink>
      </h3>
    )
  }
  return (
    <div>
      <Navbar location={location} />
      <div className="md:ml-80 md:mr-auto max-w-7xl p-6 mx-0">
        <header>{header}</header>
        <main>{children}</main>
        <footer className="text-mirage">
          © {new Date().getFullYear()} James Russo. All Rights Reserved, Built
          with{" "}
          <a
            className="text-keppel"
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
