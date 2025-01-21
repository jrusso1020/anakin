import React from "react"
import { Link, graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"

import Layout from "src/components/layout"
import SEO from "src/components/seo"
import H1 from "src/components/H1"
import Tags from "src/components/tags"
import BlogDateAndTime from "src/components/blogDateAndTime"

interface MarkdownRemarkI {
  id: string
  excerpt: string
  timeToRead: string
  html: string
  frontmatter: {
    title: string
    date: string
    description?: string
    tags: string[]
    keywords: string[]
  }
}
interface BlogPostBySlugQuery {
  site: {
    siteMetadata: {
      title: string
      author: string
    }
  }
  markdownRemark: MarkdownRemarkI
}

interface Props {
  location: Location
  data: BlogPostBySlugQuery
  pageContext: any
}

const BlogPostTemplate = ({ data, pageContext, location }: Props) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const disqusShortname = "boredhacking"
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  }

  const kebabCase = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase()

  return (
    <Layout location={location} title={siteTitle}>
      <H1>{post.frontmatter.title}</H1>
      <div className="mb-2 -mt-4">
        <BlogDateAndTime
          date={post.frontmatter.date}
          timeToRead={post.timeToRead}
        />
      </div>
      <Tags tags={post.frontmatter.tags} />
      <article
        className="prose lg:prose-xl mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr className="mb-4" />

      <ul className="flex flex-wrap justify-between list-none p-0">
        <li>
          {previous && (
            <Link
              className="no-underline text-keppel shadow-none hover:shadow-keppel"
              to={previous.fields.slug}
              rel="prev"
            >
              {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link
              className="no-underline text-keppel shadow-none hover:shadow-keppel"
              to={next.fields.slug}
              rel="next"
            >
              {next.frontmatter.title}
            </Link>
          )}
        </li>
      </ul>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

export const Head = ({
  data: { markdownRemark: post },
}: {
  data: { markdownRemark: MarkdownRemarkI }
}) => (
  <SEO
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
    tags={post.frontmatter.tags}
    keywords={post.frontmatter.keywords}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      timeToRead
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        keywords
      }
    }
  }
`
