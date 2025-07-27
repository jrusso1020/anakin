import React from "react"
import { Link } from "gatsby"
import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  tags: string[]
}

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const TagsComponent = ({ tags }: Props) => (
  <div className="flex flex-wrap gap-3">
    {tags.map((tag, index) => (
      <Link
        key={`tag-${index}`}
        to={`/tags/${kebabCase(tag)}/`}
        className={cn(
          badgeVariants({ variant: "outline" }),
          "transition-all duration-200 hover:scale-105 hover:shadow-soft hover:bg-gradient-to-r hover:from-gradient-from hover:to-gradient-to hover:text-primary-foreground hover:border-transparent bg-gradient-to-r from-gradient-from/10 to-gradient-to/10 border-primary/30"
        )}
      >
        {tag}
      </Link>
    ))}
  </div>
)

export default TagsComponent
