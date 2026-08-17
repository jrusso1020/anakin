import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { pageUrl } from "src/lib/urls"

interface Props {
  description?: string
  keywords?: string[]
  title: string
  image?: string
  pathname?: string
  twitterCard?: "summary" | "summary_large_image"
  children?: React.ReactNode
}

const SEO = ({
  description,
  keywords = [],
  title,
  image,
  pathname,
  twitterCard = "summary",
  children,
}: Props) => {
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
  // Use provided image or fall back to default
  const ogImage = image || site.siteMetadata.defaultImage
  const siteImage = ogImage.startsWith("http")
    ? ogImage
    : `${site.siteMetadata.siteUrl}/${ogImage.startsWith("/") ? ogImage.slice(1) : ogImage}`
  const canonicalUrl = pathname
    ? pageUrl(site.siteMetadata.siteUrl, pathname)
    : undefined

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="image" content={siteImage} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {(keywords || []).length > 0 && (
        <meta name="keywords" content={keywords?.join(", ")} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </>
  )
}

export default SEO
