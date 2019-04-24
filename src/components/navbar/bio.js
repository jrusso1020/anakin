/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled, { css } from 'styled-components'

import Location from 'content/assets/location.svg'
import Github from 'content/assets/github.svg'
import LinkedIn from 'content/assets/linkedIn.svg'
import { rhythm } from 'src/utils/typography'
import { mobile } from 'src/utils/media'
import { colors } from 'src/utils/colors'

const Container = styled.div`
  margin-bottom: ${rhythm(2.5)};
  ${mobile(css`
    padding: ${rhythm(3)} ${rhythm(3 / 4)};
    padding-bottom: 0;
    margin-bottom: 0;
    display: flex;
  `)}
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${rhythm(1)};
  text-align: left;
`

const StyledImage = styled(Image)`
  min-width: 100;
  border-radius: 100%;
  margin: auto 0;
  ${mobile(css`
    min-width: 50;
  `)}
`

const H3 = styled.h3`
  color: ${colors.keppel};
  ${mobile(css`
    margin-left: ${rhythm(1)};
  `)}
`

const P = styled.p`
  font-size: 0.8em;
  ${mobile(css`
    display: none;
  `)}
`

const List = styled.ul`
  list-style: none;
  padding-left: none;
  font-size: 1em;
  ${mobile(css`
    display: none;
  `)}
`

const LocationSvg = styled(Location)`
  height: 1em;
`

const GithubSvg = styled(Github)`
  height: 1em;
`

const LinkedInSvg = styled(LinkedIn)`
  height: 1em;
`

const StyledLink = styled.a`
  color: currentColor;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <Container>
            <ImageContainer>
              <StyledImage
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </ImageContainer>
            <H3>{author}</H3>
            <P>
              Fullstack engineer who knows nothing about design.
              <br />
              Example: this website.
            </P>
            <List >
              <li><LocationSvg />New York, NY</li>
              <li>
                <GithubSvg />
                <StyledLink
                  rel="noopener noreferrer"
                  href="https://github.com/jrusso1020"
                  target="_blank">
                  Github
                </StyledLink>
              </li>
              <li>
                <LinkedInSvg />
                <StyledLink
                  href="https://www.linkedin.com/in/james-russo-56026897/"
                  rel="noopener noreferrer"
                  target="_blank">
                  LinkedIn
                </StyledLink>
              </li>
            </List>
          </Container>
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
