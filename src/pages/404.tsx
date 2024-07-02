import React from "react"
import { graphql } from "gatsby"

import Layout from "src/components/layout"
import H1 from "src/components/H1"
import SEO from "src/components/seo"

interface Props {
  location: Location
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const NotFoundPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <H1>Not Found</H1>
      <p className="text-mirage">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </Layout>
  )
}

export const Head = () => <SEO title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
