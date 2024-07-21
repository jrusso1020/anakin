import React from "react"
import { Link } from "gatsby"
import { badgeVariants } from "@/components/ui/badge"

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
      <Link
        key={`tag-${index}`}
        to={`/tags/${kebabCase(tag)}/`}
        className={`mr-1 mt-1 ${badgeVariants({ variant: "default" })}`}
      >
        {tag}
      </Link>
    ))}
  </div>
)

export default TagsComponent
