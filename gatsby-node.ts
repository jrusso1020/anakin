import type { GatsbyNode } from "gatsby"

import path from "path"

type AllMarkdownRemark = {
  postsRemark: {
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          tags: string[]
        }
      }
    }[]
  }
  tagsGroup: {
    group: {
      fieldValue: string
    }[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  const blogPost = path.resolve("./src/templates/blog-post.tsx")
  const tagTemplate = path.resolve("src/templates/tags.tsx")
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `)
  // handle errors
  if (result.errors) {
    throw result.errors
  }
  // Create blog posts pages.
  const data = result.data as AllMarkdownRemark
  const posts = data.postsRemark.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
  const kebabCase = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase()
  // Extract tag data from query
  const tags = data.tagsGroup.group
  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
