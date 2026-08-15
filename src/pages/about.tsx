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
        hover:prose-a:decoration-primary hover:prose-a:text-primary/80
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:text-muted-foreground prose-li:text-muted-foreground"
      >
        <p>
          Hi I&apos;m James Russo and this is where I&apos;ll be writing down my
          thoughts and experiences mostly involving software and web
          development. However, fair warning any number of other topics can pop
          up into this blog. This is my first attempt at a blog, and as an
          engineer I apologize in advance for my writing and design skills.
          Hopefully they will improve as I work on this more and more.
        </p>

        <h2>What I&apos;m up to now</h2>
        <p>
          Currently building cool stuff at{" "}
          <a
            href="https://www.heygen.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            HeyGen
          </a>
          , an AI Video Generator for Fast, Studio-Quality Video Creation.
        </p>

        <h2>My journey so far</h2>
        <p>Here&apos;s where I&apos;ve been building things:</p>

        <ul>
          <li>
            <strong>
              <a
                href="https://secure.rocketsofawesome.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rockets of Awesome
              </a>
            </strong>{" "}
            - Fullstack engineer in NYC for this children&apos;s clothing
            subscription service and ecommerce brand
          </li>

          <li>
            <strong>
              <a
                href="https://iteratelabs.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Iterate Labs
              </a>
            </strong>{" "}
            - First engineer at this IoT and Analytics startup using data-driven
            insights to develop safer and more comfortable workplaces
          </li>

          <li>
            <strong>
              <a
                href="https://brex.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brex
              </a>
            </strong>{" "}
            - a modern finance platform, where I:
            <ul>
              <li>
                Started on the{" "}
                <a
                  href="https://www.brex.com/product/business-account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brex Business Account
                </a>{" "}
                product, building modern technology to replace antiquated
                banking systems
              </li>
              <li>
                Transitioned to internal developer tooling, helping scale from
                tens to hundreds of engineers building:
                <ul>
                  <li>
                    CLI using{" "}
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
                  </li>
                  <li>
                    Developer portal using{" "}
                    <a
                      href="https://backstage.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Backstage
                    </a>
                  </li>
                  <li>
                    Modern microservices testing platform using{" "}
                    <a
                      href="https://www.signadot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Signadot
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Worked on the{" "}
                <a
                  href="https://www.brex.com/product/bill-pay"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brex Bill Pay
                </a>{" "}
                product, helping businesses manage their accounts payable
              </li>
            </ul>
          </li>

          <li>
            <strong>
              <a
                href="https://www.empirical.health/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Empirical Health
              </a>
            </strong>{" "}
            - A proactive primary care provider utilizing wearable devices and
            AI to help patients manage their health
          </li>
        </ul>

        <h2>Where I learned the fundamentals</h2>
        <p>
          In 2017, I graduated from{" "}
          <a
            href="https://cornell.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cornell University
          </a>{" "}
          with a B.S. in Computer Science, where I:
        </p>
        <ul>
          <li>Concentrated in Machine Learning</li>
          <li>
            Researched Systems, Security, and Blockchain technologies under{" "}
            <a
              href="http://hackingdistributed.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emin Gun Sirer
            </a>{" "}
            and{" "}
            <a
              href="http://www.soumyabasu.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Soumya Basu
            </a>
          </li>
        </ul>

        <h2>What keeps me informed</h2>
        <p>
          I&apos;m always reading to stay current. Here are my go-to sources:
        </p>

        <h3>Daily browsing</h3>
        <ul>
          <li>
            <a
              href="https://news.ycombinator.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hacker News
            </a>
          </li>
          <li>
            <a
              href="https://techcruch.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TechCrunch
            </a>
          </li>
        </ul>

        <h3>AI & Tech newsletters</h3>
        <ul>
          <li>
            <a
              href="https://www.therundown.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Rundown AI
            </a>
          </li>
          <li>
            <a
              href="https://tldr.tech/ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              TLDR AI
            </a>
          </li>
          <li>
            <a
              href="https://bensbites.beehiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ben&apos;s Bites
            </a>
          </li>
          <li>
            <a
              href="https://labnotes.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lab Notes
            </a>
          </li>
          <li>
            <a
              href="http://softwareleadweekly.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Software Lead Weekly
            </a>
          </li>
          <li>
            <a
              href="https://www.tldrnewsletter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TLDR
            </a>
          </li>
        </ul>

        <h3>Programming language newsletters</h3>
        <ul>
          <li>
            <a
              href="https://javascriptweekly.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Javascript Weekly
            </a>
          </li>
          <li>
            <a
              href="https://rubyweekly.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ruby Weekly
            </a>
          </li>
          <li>
            <a
              href="https://elixirweekly.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Elixir Weekly
            </a>
          </li>
        </ul>

        <h3>Startup & business</h3>
        <ul>
          <li>
            <a
              href="http://www.founderweekly.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Founder Weekly
            </a>
          </li>
          <li>
            <a
              href="https://tldr.tech/founders"
              target="_blank"
              rel="noopener noreferrer"
            >
              TLDR Founders
            </a>
          </li>
          <li>
            <a
              href="https://thisweekinfintech.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              This Week in Fintech
            </a>
          </li>
        </ul>

        <h3>General news</h3>
        <ul>
          <li>
            <a
              href="https://signup.axios.com/2019/mikeallen.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Axios AM
            </a>
          </li>
          <li>
            <a
              href="https://www.theskimm.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Daily Skimm
            </a>
          </li>
        </ul>
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
