import React from "react"
import { Link, graphql } from "gatsby"
import { badgeVariants } from "@/components/ui/badge"

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
          <Link
            key={`tag-${index}`}
            to={`/tags/${kebabCase(tag.fieldValue)}/`}
            className={`mr-1 mt-2 ${badgeVariants({ variant: "default" })}`}
          >
            {tag.fieldValue} ({tag.totalCount})
          </Link>
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
