import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'src/components/layout'
import H1 from 'src/components/H1'
import SEO from 'src/components/seo'
import { colors } from 'src/utils/colors'

const P = styled.p`
  color: ${colors.mirage}
`

interface Props {
  location: Location
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    };
  }
}

const About = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title='About'
        keywords={[`boredhacking`, `bored hacking`, `bored`, `hacking`, `james russo`,
          `james`, `russo`, `blog`, `gatsby`, `javascript`, `react`]}
      />
      <H1>About Me</H1>
      <P>
        Hi I'm James Russo and this is where I'll be writing down
        my thoughts and experiences in topics such as software, web development, and technology.
        However, fairwarning any number of other topics can pop up into this blog.
        This is my first attempt at a blog, and as an engineer I apologize in advance for my
        writing and design skills.
        Hopefully they will improve as I work on this more and more.
        <br/>
        <br/>
        I was previously a fullstack engineer working full time in NYC for
        <a href='https://secure.rocketsofawesome.com' target='_blank' rel='noopener noreferrer'> Rockets of Awesome</a>,
        a child clothing subscription service and ecommerce brand.
        Recently I started working full time on a startup called
        <a href='https://iteratelabs.co' target='_blank' rel='noopener noreferrer'> Iterate Labs </a>
        which is a pre-seed startup that wants
        to use data-driven insights to develop safer and more comfortable workplaces.
        I graduated from <a href='https://cornell.edu' target='_blank' rel='noopener noreferrer'> Cornell University </a>
        in 2017 with a B.S. in Computer Science,
        where I concentrated in Machine Learning and also did research in Systems, Security,
        and Blockchain under
        <a href='http://hackingdistributed.com/' target='_blank' rel='noopener noreferrer'> Emin Gun Sirer </a> and
        <a href='http://www.soumyabasu.com/' target='_blank' rel='noopener noreferrer'> Soumya Basu </a>.
        Now adays I mostly use technologies such as Ruby on Rails, Flask and Python, React + Redux, Next.js,
        Postgresql, AWS, Kubernetes, and Docker to name a few but I'm constantly
        evaluating and learning about new tehcnologies. Some of my favorite websites to read and stay up to date
        with tech and web development are
        <a href='https://news.ycombinator.com/' target='_blank' rel='noopener noreferrer'> Hacker News </a>
        and <a href='https://techcruch.com' target='_blank' rel='noopener noreferrer'> TechCrunch</a>.
      </P>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
