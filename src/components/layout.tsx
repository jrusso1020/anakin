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
    className="text-foreground hover:underline decoration-primary decoration-2 underline-offset-4 transition-all duration-200 font-bold group"
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
        <H1 className="text-5xl md:text-6xl font-black mb-4">
          <StyledLink to={"/"}>
            <span className="font-sans">Bored</span>{" "}
            <span className="font-mono text-primary group-hover:text-primary/80">
              &lt;Hacking/&gt;
            </span>
          </StyledLink>
        </H1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Fullstack engineer who tries their best at design. <br />
          <span className="text-primary font-medium">
            Example: this website.
          </span>
        </p>
      </div>
    )
  } else {
    header = (
      <div className="mb-12">
        <h3 className="text-2xl font-bold">
          <StyledLink to={"/"}>
            <span className="font-sans">Bored</span>{" "}
            <span className="font-mono text-primary group-hover:text-primary/80">
              &lt;Hacking/&gt;
            </span>
          </StyledLink>
        </h3>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar location={location} />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="lg:ml-96 max-w-4xl mx-auto lg:mx-0">
          {/* Main Content */}
          <div>
            <header className="pt-8 lg:pt-16">{header}</header>

            <main className="animate-fade-in-up">{children}</main>

            <footer className="mt-24 py-12 border-t border-border text-center">
              <div className="max-w-md mx-auto space-y-2">
                <p className="text-muted-foreground text-sm">
                  © {new Date().getFullYear()} James Russo. All Rights Reserved
                </p>
                <p className="text-muted-foreground text-sm">
                  Built with{" "}
                  <a
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                    href="https://www.gatsbyjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gatsby
                  </a>
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
