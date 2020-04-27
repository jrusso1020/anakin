import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "src/components/layout"
import H1 from "src/components/H1"
import SEO from "src/components/seo"
import { colors } from "src/utils/colors"

const P = styled.p`
  color: ${colors.mirage};
`

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
      <SEO title="404: Not Found" />
      <H1>Not Found</H1>
      <P>You just hit a route that doesn&#39;t exist... the sadness.</P>
    </Layout>
  )
}

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
