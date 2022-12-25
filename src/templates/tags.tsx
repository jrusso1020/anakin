import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "src/components/layout"
import SEO from "src/components/seo"
import PostPreview from "src/components/postPreview"
import { rhythm } from "src/utils/typography"
import { colors } from "src/utils/colors"

const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${colors.keppel};
`

const H3 = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

interface Props {
  location: Location
  data: {
    markdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  pageContext: any
}

const Tags = ({ pageContext, data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout location={location} title={siteTitle}>
      <h1>{tagHeader}</h1>
      {edges.map(({ node }, index) => (
        <PostPreview key={`postPreview-${index}`} node={node} />
      ))}
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export const Head = () => (
  <SEO
    title="Tags"
    description="Tags used on blog posts for boredhacking.com"
  />
)

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
