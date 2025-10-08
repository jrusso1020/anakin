import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { HamburgerIcon, GithubIcon, LinkedInIcon } from "../icons"
import NavLink from "./navLink"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { ThemeToggle } from "../theme-toggle"

interface Props {
  location: Location
}

const MobileNavbar = ({ location }: Props) => {
  const [showNav, setShowNav] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const data = useStaticQuery(graphql`
    query MobileBioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 64, height: 64)
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  // Handle scroll detection for theme toggle visibility on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show only when at top (within 50px), hide when scrolled down
      if (currentScrollY < 50) {
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when navigation is open
  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showNav])

  return (
    <div className="block lg:hidden">
      {/* Mobile Header */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <Card
          className={`glass border-border/30 backdrop-blur-xl transition-all duration-300 ${
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <CardContent className="p-3">
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card className="glass border-border/30 backdrop-blur-xl">
          <CardContent className="p-3">
            <button
              onClick={() => setShowNav(!showNav)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle navigation"
            >
              <HamburgerIcon className="h-6 w-6" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Navigation Overlay */}
      {showNav && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in-up-fast"
            onClick={() => setShowNav(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowNav(false)}
            role="button"
            tabIndex={0}
            aria-label="Close navigation"
          />

          {/* Navigation Panel */}
          <div className="fixed inset-x-4 top-28 bottom-4 z-50 animate-fade-in-up-fast overflow-y-auto">
            <div className="space-y-4">
              {/* Navigation Links */}
              <Card className="glass border-border/30 backdrop-blur-xl">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <NavLink
                      partiallyActive={
                        !["/about/"].includes(location.pathname) &&
                        !location.pathname.includes("tags")
                      }
                      to={"/"}
                    >
                      Blog
                    </NavLink>
                    <NavLink
                      partiallyActive={location.pathname === "/about/"}
                      to={"/about/"}
                    >
                      About
                    </NavLink>
                    <NavLink
                      partiallyActive={location.pathname.includes("tags")}
                      to={"/tags/"}
                    >
                      Tags
                    </NavLink>
                  </nav>
                </CardContent>
              </Card>

              {/* Compact Bio */}
              <Card className="glass border-border/30 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-gradient-from to-gradient-to rounded-full opacity-20 animate-pulse" />
                      <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                        <GatsbyImage
                          image={data.avatar.childImageSharp.gatsbyImageData}
                          alt={data.site.siteMetadata.author}
                          className="rounded-full object-cover"
                        />
                      </Avatar>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent truncate">
                        {data.site.siteMetadata.author}
                      </h3>
                      <p className="text-sm bg-gradient-to-r from-warm to-cool bg-clip-text text-transparent font-medium">
                        Software Engineer
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <a
                          className="text-muted-foreground hover:text-primary transition-colors"
                          href="https://github.com/jrusso1020"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                        <a
                          className="text-muted-foreground hover:text-primary transition-colors"
                          href="https://www.linkedin.com/in/james-russo-56026897/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedInIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileNavbar
