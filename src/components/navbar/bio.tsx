import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import Location from "content/assets/location.svg"
import Github from "content/assets/github.svg"
import LinkedIn from "content/assets/linkedIn.svg"
import { rhythm } from "src/utils/typography"
import { mobile } from "src/utils/media"
import { colors } from "src/utils/colors"

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

const StyledImage = styled(GatsbyImage)`
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
    margin-top: 0;
  `)}
`

const H5 = styled.h5`
  color: ${colors.keppel};
  margin-top: 0;
  ${mobile(css`
    margin-left: ${rhythm(1)};
    margin-bottom: ${rhythm(0.5)};
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
    margin-left: 1.75rem;
  `)}
`

const LocationSvg = styled(Location)`
  height: 1em;
  top: 0.05em;
  position: relative;
`

const GithubSvg = styled(Github)`
  height: 1em;
  top: 0.1em;
  position: relative;
`

const LinkedInSvg = styled(LinkedIn)`
  height: 1em;
  top: 0.1em;
  position: relative;
`

const StyledLink = styled.a`
  color: currentColor;
  box-shadow: 0 1px 0 0 ${colors.swansDown};
`

const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author } = data.site.siteMetadata
        return (
          <Container>
            <ImageContainer>
              <StyledImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                alt={author}
                imgStyle={{
                  borderRadius: "50%",
                }}
              />
            </ImageContainer>
            <div>
              <H3>{author}</H3>
              <H5>
                Engineering at{" "}
                <StyledLink
                  rel="noopener noreferrer"
                  href="https://brex.com"
                  target="_blank"
                >
                  Brex
                </StyledLink>
              </H5>
              <P>
                Fullstack engineer who knows nothing about design.
                <br />
                Example: this website.
              </P>
              <List>
                <li>
                  <LocationSvg />
                  New York, NY
                </li>
                <li>
                  <GithubSvg />
                  <StyledLink
                    rel="noopener noreferrer"
                    href="https://github.com/jrusso1020"
                    target="_blank"
                  >
                    Github
                  </StyledLink>
                </li>
                <li>
                  <LinkedInSvg />
                  <StyledLink
                    href="https://www.linkedin.com/in/james-russo-56026897/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </StyledLink>
                </li>
              </List>
            </div>
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
