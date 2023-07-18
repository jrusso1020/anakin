import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import { colors } from "src/utils/colors"

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

const TagContainer = styled.div`
  border-radius: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: ${colors.mirage};
  margin-right: 5px;
  background-color: ${colors.mirage};
  font-size: 0.8em;
  margin-top: 5px;
`

const Tag = styled(Link)`
  padding: 2px 20px;
  box-shadow: none;
  color: ${colors.keppel};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    box-shadow: none;
  }
`

interface Props {
  tags: string[]
}

const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const TagsComponent = ({ tags }: Props) => (
  <Tags>
    {tags.map((tag, index) => (
      <TagContainer key={`container-${index}`}>
        <Tag key={`tag-${index}`} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      </TagContainer>
    ))}
  </Tags>
)

export default TagsComponent
