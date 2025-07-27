import React from "react"
import { Link } from "gatsby"

import Tags from "src/components/tags"
import BlogDateAndTime from "src/components/blogDateAndTime"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  node: any
}

const PostPreview = ({ node }: Props) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card className="group hover:scale-[1.02] transition-all duration-300 animate-fade-in-up mb-8 hover:shadow-glow/20 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <BlogDateAndTime
              date={node.frontmatter.date}
              timeToRead={node.timeToRead}
            />
          </div>
          <CardTitle className="text-2xl font-bold leading-tight">
            <Link
              className="text-foreground hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group-hover:bg-gradient-to-r group-hover:from-gradient-from group-hover:to-gradient-to group-hover:bg-clip-text group-hover:text-transparent"
              to={node.fields.slug}
            >
              {title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex flex-wrap">
            <Tags tags={node.frontmatter.tags} />
          </div>

          <p
            className="text-muted-foreground leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />

          <div className="flex items-center pt-4">
            <Link
              to={node.fields.slug}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-all duration-200 hover:translate-x-1 group"
            >
              Read more
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </CardContent>
    </Card>
  )
}

export default PostPreview
