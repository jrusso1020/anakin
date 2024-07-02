import React from "react"
import { Link } from "gatsby"

import Tags from "src/components/tags"
import BlogDateAndTime from "src/components/blogDateAndTime"

interface Props {
  node: any
}

const PostPreview = ({ node }: Props) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div key={node.fields.slug}>
      <h3 className="mb-1 mt-6 text-xl">
        <Link
          className="no-underline text-keppel shadow-none hover:shadow-keppel"
          to={node.fields.slug}
        >
          {title}
        </Link>
      </h3>
      <small>
        <BlogDateAndTime
          date={node.frontmatter.date}
          timeToRead={node.timeToRead}
        />
      </small>
      <Tags tags={node.frontmatter.tags} />
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </div>
  )
}

export default PostPreview
