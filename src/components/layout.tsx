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
    className="text-primary hover:text-primary/80 transition-all duration-200 hover:-translate-y-0.5 font-semibold bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent hover:from-gradient-to hover:to-gradient-from"
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
      <div className="text-center mb-16 mt-16 lg:mt-0">
        <H1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent animate-float">
          <StyledLink to={"/"}>{title}</StyledLink>
        </H1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Fullstack engineer who tries their best at design. <br />
          <span className="bg-gradient-to-r from-warm to-cool bg-clip-text text-transparent font-medium">
            Example: this website.
          </span>
        </p>
      </div>
    )
  } else {
    header = (
      <div className="mb-12">
        <h3 className="text-2xl font-bold">
          <StyledLink to={"/"}>{title}</StyledLink>
        </h3>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="gradient-mesh w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/50 to-background/80" />
      </div>

      <Navbar location={location} />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="lg:ml-96 max-w-4xl mx-auto lg:mx-0">
          {/* Main Content */}
          <div>
            <header className="pt-8 lg:pt-16">{header}</header>

            <main className="animate-fade-in-up">{children}</main>

            <footer className="mt-24 py-12 border-t border-border/50 text-center">
              <div className="glass rounded-xl p-6 max-w-md mx-auto">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} James Russo. All Rights Reserved
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Built with{" "}
                  <a
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                    href="https://www.gatsbyjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gatsby
                  </a>{" "}
                  & <span className="text-warm">❤️</span>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
