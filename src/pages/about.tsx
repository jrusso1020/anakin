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

const About = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <H1>About Me</H1>
      <div
        className="prose prose-lg max-w-none
        prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:font-semibold prose-a:underline
        prose-a:decoration-primary/60 prose-a:underline-offset-3
        hover:prose-a:decoration-primary hover:prose-a:text-gradient-to
        prose-strong:text-foreground prose-strong:font-semibold"
      >
        <p>
          Hi I&apos;m James Russo and this is where I&apos;ll be writing down my
          thoughts and experiences mostly involving software and web
          development. However, fairwarning any number of other topics can pop
          up into this blog. This is my first attempt at a blog, and as an
          engineer I apologize in advance for my writing and design skills.
          Hopefully they will improve as I work on this more and more.
          <br />
          <br />I am currently working at{" "}
          <a
            href="https://www.empirical.health/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Empirical Health{" "}
          </a>
          a proactive primary care provider utilizing wearable devices and AI to
          help patients manage their health.
          <br />
          <br />
          Previously I worked at{" "}
          <a href="https://brex.com" target="_blank" rel="noopener noreferrer">
            Brex
          </a>
          , where I initially worked on the{" "}
          <a
            href="https://www.brex.com/product/business-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brex Business Account
          </a>{" "}
          product, building modern technology to replace antiquated banking
          systems. Later, I transitioned to internal developer tooling, helping
          to scale from tens to hundreds of engineers building tools like a CLI
          using{" "}
          <a
            href="https://golang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Golang
          </a>{" "}
          +{" "}
          <a
            href="https://github.com/spf13/cobra"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cobra
          </a>
          , a developer portal using{" "}
          <a
            href="https://backstage.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Backstage
          </a>
          , and a modern microservices testing platform using{" "}
          <a
            href="https://www.signadot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Signadot
          </a>
          . Lastly, I worked on the{" "}
          <a
            href="https://www.brex.com/product/bill-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brex Bill Pay
          </a>{" "}
          product, helping businesses manage their accounts payable.
          <br />
          <br />
          Before Brex, I worked as a fullstack engineer in NYC for
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://secure.rocketsofawesome.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Rockets of Awesome
          </a>
          , a childrens clothing subscription service and ecommerce brand. I
          also was the first engineer at an IoT and Analytics startup called
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://iteratelabs.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Iterate Labs{" "}
          </a>
          which wants to use data-driven insights to develop safer and more
          comfortable workplaces.
          <br />
          <br />
          In 2017, I graduated from{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://cornell.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Cornell University{" "}
          </a>
          with a B.S. in Computer Science, where I concentrated in Machine
          Learning and also researched Systems, Security, and Blockchain
          technologies under
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="http://hackingdistributed.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Emin Gun Sirer{" "}
          </a>{" "}
          and
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="http://www.soumyabasu.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Soumya Basu{" "}
          </a>
          .
          <br />
          <br />
          Some of my favorite websites to read and stay up to date with tech and
          web development are
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://news.ycombinator.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Hacker News{" "}
          </a>
          and{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://techcruch.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            TechCrunch
          </a>
          . I also read the following newsletters on a weekly or daily basis for
          tech and software related news and information:{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://labnotes.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lab Notes
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="http://softwareleadweekly.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Software Lead Weekly
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="http://www.founderweekly.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Founder Weekly
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://javascriptweekly.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Javascript Weekly
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://rubyweekly.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ruby Weekly
          </a>
          , and{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://elixirweekly.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elixir Weekly
          </a>
          . A few other weekly or daily newsletters I follow are:{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://signup.axios.com/2019/mikeallen.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Axios AM
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://www.theskimm.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Daily Skimm
          </a>
          ,{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://www.tldrnewsletter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TLDR
          </a>
          , and{" "}
          <a
            className="no-underline text-keppel shadow-none hover:shadow-keppel"
            href="https://thisweekinfintech.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            This Week in Fintech
          </a>
          .
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <SEO
    title="About"
    keywords={[
      "boredhacking",
      "bored hacking",
      "bored",
      "hacking",
      "james russo",
      "james",
      "russo",
      "blog",
      "gatsby",
      "javascript",
      "react",
    ]}
  />
)

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
