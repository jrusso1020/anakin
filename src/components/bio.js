/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Location from '../../content/assets/location.svg'
import Github from '../../content/assets/github.svg'
import LinkedIn from '../../content/assets/linkedIn.svg'
import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div
            style={{
              marginBottom: rhythm(2.5),
            }}
          >
            <div style={{
              display: `flex`,
              justifyContent: `center`,
              marginBottom: rhythm(1),
              textAlign: `left`
            }}>
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  minWidth: 100,
                  borderRadius: `100%`,
                  margin: `auto 0`
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </div>
            <h3>{author}</h3>
            <p style={{
              fontSize: `0.8em`
            }}>
              Fullstack engineer who knows absolutely nothing
              about writing. A collection of ramblings
              on things I find interesting.
            </p>
            <ul style={{
              listStyle: `none`,
              paddingLeft: `none`,
              fontSize: `1em`
            }}
            >
              <li><Location style={{height: `1em`}}/>New York, NY</li>
              <li>
                <Github style={{height: `1em`}}/>
                <a
                  style={{
                    color: `currentColor`
                  }}
                  rel="noopener noreferrer"
                  href="https://github.com/jrusso1020"
                  target="_blank">
                  Github
                </a>
              </li>
              <li>
                <LinkedIn style={{height: `1em`}}/>
                <a
                  style={{
                    color: `currentColor`
                  }}
                  href="https://www.linkedin.com/in/james-russo-56026897/"
                  rel="noopener noreferrer"
                  target="_blank">
                  LinkedIn
                </a>
              </li>
            </ul>
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
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
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
