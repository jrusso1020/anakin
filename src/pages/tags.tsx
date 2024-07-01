import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "src/components/layout"
import SEO from "src/components/seo"

interface QueryResult {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    group: {
      fieldValue: string
      totalCount: number
    }[]
  }
}

interface Props {
  location: Location
  data: QueryResult
}

const kebabCase = (str: string) =>
  str
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
      <h1 className="text-xl font-bold">Tags</h1>
      <div className="flex flex-wrap mb-6">
        {group.map((tag, index) => (
          <div
            className="rounded-full border-2 border-mirage mr-1 bg-mirage mt-2"
            key={`container-${index}`}
          >
            <Link
              className="px-5 py-0.5 shadow-none text-keppel cursor-pointer hover:underline"
              key={`tag-${index}`}
              to={`/tags/${kebabCase(tag.fieldValue)}/`}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </div>
        ))}
      </div>
    </div>
  </Layout>
)

export const Head = () => (
  <SEO
    title="All tags"
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
      "tags",
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
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
