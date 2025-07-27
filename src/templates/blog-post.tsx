import React from "react"
import { Link, graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"

import Layout from "src/components/layout"
import SEO from "src/components/seo"
import H1 from "src/components/H1"
import Tags from "src/components/tags"
import BlogDateAndTime from "src/components/blogDateAndTime"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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

  return (
    <Layout location={location} title={siteTitle}>
      <article className="animate-fade-in-up">
        {/* Single unified card for header and content */}
        <Card className="mb-12 overflow-hidden">
          {/* Post Header */}
          <div className="relative">
            <div className="absolute inset-0 gradient-mesh opacity-30" />
            <CardHeader className="relative bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm border-b border-border/50">
              <div className="space-y-4">
                <H1 className="text-4xl md:text-5xl font-black leading-normal bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent pb-2">
                  {post.frontmatter.title}
                </H1>

                <div className="space-y-4">
                  <BlogDateAndTime
                    date={post.frontmatter.date}
                    timeToRead={post.timeToRead}
                  />
                  <Tags tags={post.frontmatter.tags} />
                </div>
              </div>
            </CardHeader>
          </div>

          {/* Post Content */}
          <CardContent className="p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:font-medium prose-a:no-underline
                hover:prose-a:text-primary/80
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        {(previous || next) && (
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {previous && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-2">
                      Previous Post
                    </span>
                    <Link
                      className="group flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                      to={previous.fields.slug}
                      rel="prev"
                    >
                      <svg
                        className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {previous.frontmatter.title}
                      </span>
                    </Link>
                  </div>
                )}

                {next && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-2 md:text-right">
                      Next Post
                    </span>
                    <Link
                      className="group flex items-center justify-between space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                      to={next.fields.slug}
                      rel="next"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {next.frontmatter.title}
                      </span>
                      <svg
                        className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comments */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Comments</h3>
          </CardHeader>
          <CardContent>
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </CardContent>
        </Card>
      </article>
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
    keywords={post.frontmatter.tags}
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
      }
    }
  }
`
