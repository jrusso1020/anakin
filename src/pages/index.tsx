import React from "react"
import { graphql } from "gatsby"

import Layout from "src/components/layout"
import SEO from "src/components/seo"
import PostPreview from "src/components/postPreview"

interface SiteMetadata {
  title: string
}

interface Frontmatter {
  date: string
  title: string
  description: string
  tags: string[]
}

interface Fields {
  slug: string
}

interface Node {
  timeToRead: number
  excerpt: string
  fields: Fields
  frontmatter: Frontmatter
}

interface AllMarkdownRemark {
  edges: {
    node: Node
  }[]
}

interface Query {
  site: {
    siteMetadata: SiteMetadata
  }
  allMarkdownRemark: AllMarkdownRemark
}

interface Props {
  location: Location
  data: Query
}

const BlogIndex = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      {posts.map(({ node }, index) => (
        <PostPreview key={`postPreview-${index}`} node={node} />
      ))}
    </Layout>
  )
}

export const Head = () => (
  <SEO
    title="All posts"
    keywords={[
      "boredhacking",
      "bored hacking",
      "bored",
      "hacking",
      "james russo",
      "james",
      "russo",
      "blog",
      "gatsby",
      "javascript",
      "react",
    ]}
  />
)

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
