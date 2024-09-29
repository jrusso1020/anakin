import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Location from "content/assets/location.svg"
import Github from "content/assets/github.svg"
import LinkedIn from "content/assets/linkedIn.svg"

const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author } = data.site.siteMetadata
        return (
          <div className="flex flex-row mb-10 md:flex-col pt-20 px-4 md:px-0 md:pt-0">
            <div className="mb-0 mr-4 md:mr-0 md:mb-7 flex justify-center">
              <GatsbyImage
                className="rounded-full"
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
              />
            </div>
            <div>
              <h3 className="text-keppel text-2xl font-bold ml-0 mt-0 mb-4">
                {author}
              </h3>
              <h5 className="text-keppel mb-4">Software Engineer</h5>
              <p className="text-keppel text-xs mb-4 md:mb-8 leading-loose">
                Fullstack engineer who tries their best at design.
                <br />
                Example: this website.
              </p>
              <ul className="list-none pl-0 text-base">
                <li className="flex items-center">
                  <Location className="h-5 relative top-0 mr-2" />
                  New York, NY
                </li>
                <li className="flex items-center">
                  <Github className="h-5 relative top-0 mr-2" />
                  <a
                    className="text-current shadow-swans-down hover:shadow-keppel"
                    rel="noopener noreferrer"
                    href="https://github.com/jrusso1020"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li className="flex items-center">
                  <LinkedIn className="h-5 relative top-0 mr-2" />
                  <a
                    className="text-current shadow-swans-down hover:shadow-keppel"
                    href="https://www.linkedin.com/in/james-russo-56026897/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 100, height: 100)
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
