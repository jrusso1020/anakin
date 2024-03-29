import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Tags from "src/components/tags"
import BlogDateAndTime from "src/components/blogDateAndTime"
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
  node: any
}

const PostPreview = ({ node }: Props) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <div key={node.fields.slug}>
      <H3>
        <StyledLink to={node.fields.slug}>{title}</StyledLink>
      </H3>
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
