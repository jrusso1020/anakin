import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import { rhythm } from 'src/utils/typography'
import { colors } from 'src/utils/colors'

const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${colors.keppel};
`

const H3 = styled.h3`
  margin-bottom: ${rhythm( 1 /4 )};
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title='All posts'
          keywords={[`boredhacking`, `bored hacking`, `bored`, `hacking`, `james russo`,
            `james`, `russo`, `blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <H3>
                <StyledLink to={node.fields.slug}>
                  {title}
                </StyledLink>
              </H3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
