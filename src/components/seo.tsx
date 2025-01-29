import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description?: string
  keywords?: string[]
  title: string
  image?: string
  children?: React.ReactNode
}

const SEO = ({ description, keywords = [], title, image, children }: Props) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          defaultImage: image
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteImage = `${site.siteMetadata.siteUrl}${
    image || site.siteMetadata.defaultImage
  }`

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={siteImage} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {(keywords || []).length > 0 && (
        <meta name="keywords" content={keywords?.join(", ")} />
      )}
      {children}
    </>
  )
}

export default SEO
