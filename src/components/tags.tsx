import React from "react"
import { Link } from "gatsby"

interface Props {
  tags: string[]
}

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const TagsComponent = ({ tags }: Props) => (
  <div className="flex flex-wrap mb-1">
    {tags.map((tag, index) => (
      <div
        className="rounded-full border-2 border-mirage mr-1 bg-mirage text-xs mt-1"
        key={`container-${index}`}
      >
        <Link
          className="px-5 py-0.5 shadow-none text-keppel cursor-pointer hover:underline"
          key={`tag-${index}`}
          to={`/tags/${kebabCase(tag)}/`}
        >
          {tag}
        </Link>
      </div>
    ))}
  </div>
)

export default TagsComponent
