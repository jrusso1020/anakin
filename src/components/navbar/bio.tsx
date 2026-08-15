import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { LocationIcon, GithubIcon, LinkedInIcon } from "../icons"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 96, height: 96)
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
    <Card className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-5">
          {/* Avatar */}
          <Avatar className="h-24 w-24 ring-2 ring-border transition-all hover:ring-primary/50 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <GatsbyImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
                className="w-full h-full"
                imgStyle={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </Avatar>

          {/* Bio Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">{author}</h3>
            <p className="text-base font-medium text-muted-foreground">
              Software Engineer
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Fullstack engineer who tries their best at design.
              <br />
              <span className="text-primary font-medium">
                Example: this website.
              </span>
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <LocationIcon />
              <span>New York, NY</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <a
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group"
                rel="noopener noreferrer"
                href="https://github.com/jrusso1020"
                target="_blank"
              >
                <GithubIcon />
                <span className="group-hover:text-primary">GitHub</span>
              </a>

              <a
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group"
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
