import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { colors } from "src/utils/colors"

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
`

const TagContainer = styled.div`
  border-radius: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: ${colors.mirage};
  margin-right: 5px;
  background-color: ${colors.mirage};
  margin-top: 10px;
`

const Tag = styled(Link)`
  padding: 2px 20px;
  box-shadow: none;
  color: ${colors.keppel};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

interface Props {
  location: Location
  data: {
    allMarkdownRemark: {
      group: any
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const TagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}: Props) => (
  <Layout location={location} title={title}>
    <div>
      <h1>Tags</h1>
      <Tags>
        {group.map((tag, index) => (
          <TagContainer key={`container-${index}`}>
            <Tag
              key={`tag-${index}`}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          </TagContainer>
        ))}
      </Tags>
    </div>
  </Layout>
)

export const Head = () => (
  <SEO
    title="All tags"
    keywords={[
      `boredhacking`,
      `bored hacking`,
      `bored`,
      `hacking`,
      `james russo`,
      `james`,
      `russo`,
      `blog`,
      `gatsby`,
      `javascript`,
      `react`,
      `tags`,
    ]}
  />
)

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
