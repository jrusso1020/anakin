import type { GatsbyNode } from "gatsby"

import path from "path"
// @ts-ignore
const {
  createOpenGraphImage,
} = require("gatsby-plugin-dynamic-open-graph-images")

type AllMarkdownRemark = {
  postsRemark: {
    edges: {
      node: {
        excerpt: string
        timeToRead: number
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          description?: string
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

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  // Create default OG image for the homepage
  const defaultOgImage = createOpenGraphImage(createPage, {
    component: path.resolve("src/templates/og-image-default.tsx"),
    size: {
      width: 1200,
      height: 630,
    },
    context: {
      id: "home",
      title: "Bored Hacking",
      description:
        "Blog discussing software engineering, web development, technology, and life",
    },
  })

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
            excerpt(pruneLength: 160)
            timeToRead
            fields {
              slug
            }
            frontmatter {
              title
              description
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

    // Create Open Graph image for this post
    const ogImage = createOpenGraphImage(createPage, {
      component: path.resolve("src/templates/og-image-template.tsx"),
      size: {
        width: 1200,
        height: 630,
      },
      context: {
        id: post.node.fields.slug,
        title: post.node.frontmatter.title,
        description: post.node.frontmatter.description || post.node.excerpt,
        timeToRead: post.node.timeToRead,
        tags: post.node.frontmatter.tags,
      },
    })

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        ogImage,
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
