import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { LocationIcon, GithubIcon, LinkedInIcon } from "../icons"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 120, height: 120)
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <Card className="glass border-border/30 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gradient-from to-gradient-to rounded-full opacity-20 animate-pulse" />
            <Avatar className="h-28 w-28 ring-4 ring-primary/20 transition-all hover:ring-primary/40 hover:scale-105">
              <GatsbyImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
                className="rounded-full object-cover"
              />
            </Avatar>
          </div>

          {/* Bio Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              {author}
            </h3>
            <p className="text-lg font-medium bg-gradient-to-r from-warm to-cool bg-clip-text text-transparent">
              Software Engineer
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Fullstack engineer who tries their best at design.
              <br />
              <span className="bg-gradient-to-r from-warm to-cool bg-clip-text text-transparent font-medium">
                Example: this website.
              </span>
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <LocationIcon />
              <span>New York, NY</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group"
                rel="noopener noreferrer"
                href="https://github.com/jrusso1020"
                target="_blank"
              >
                <GithubIcon />
                <span className="group-hover:text-primary">GitHub</span>
              </a>

              <a
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group"
                href="https://www.linkedin.com/in/james-russo-56026897/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
                <span className="group-hover:text-primary">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Bio
