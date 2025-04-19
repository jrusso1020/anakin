---
title: "When to Build vs. Buy: A Guide for Engineers & Founders"
date: "2025-04-19"
description: Build vs. buy decisions can define your team’s roadmap and budget. Here’s how to navigate them with clarity, using real world examples and a framework you can reuse yourself.
tags: ["build vs buy", "technical decision making"]
---

“So should we pick the vendor or try and build it ourselves?” I distinctly remember the first time I faced that question. I had to craft an answer compelling enough to win over not just myself, but my manager, his manager, and every key decision-maker in charge of our budget. Build vs Buy analysis isn’t a core engineering skill—it’s not something most engineers encounter daily. Yet, whether you’re an individual contributor, a manager, or even a founder, mastering this skill can have a lasting impact on your company’s trajectory.

## Why are build vs buy decisions important?

Build vs buy decisions can shape your team’s roadmap for the coming quarters and determine how resources are allocated—whether it’s building and maintaining a new system or integrating with a third-party SaaS provider. These decisions directly affect your company’s or department's budget, potentially limiting future investments in hiring, product development, or other critical areas. In some cases, they can serve as a key differentiator that drives product-market fit; in others, they can be the difference between staying competitive and running out of money. In the sections that follow, I’ll share how my experiences at Brex have helped me develop a repeatable framework to tackle these high-stakes decisions.

## Real World Examples

Below are a series of real-world examples and the lessons I learned from multiple build vs. buy analyses at Brex. Each experience added to my understanding of making these critical decisions.

### Case Study 1: Cortex for Developer Scorecards

[Cortex](https://www.cortex.io/) was the first build vs. buy decision I was involved in at Brex. I was not only a core pilot implementer but also the main driver behind the decision. At the time, we were struggling to enforce best practices across our microservices for our rapidly growing team of engineers. We envisioned a scorecard—a system of best practices defined as rules—to guide our engineers when developing microservices. Initially, we estimated that building a simple system would take less than a quarter. However, we soon realized that the ongoing maintenance burden on our small team would quickly outweigh the initial build cost. Even though the upfront build estimate was roughly equivalent to paying for a third-party service, the cumulative maintenance effort and ongoing development would push the yearly cost well beyond the contract price. This taught me a crucial lesson: even if the initial development cost is low, the ongoing maintenance—and the resulting impact on focus and resources—can make a third-party solution far more attractive.

### Case Study 2: DX for Developer Surveys

The next decision involved [DX](https://getdx.com/), where my role shifted more towards implementing and analyzing the pilot. In this case, the ultimate decision was driven by my director of engineering and the group tech lead, based on the results of our pilot. Previously, our developer surveys yielded a 10–20% response rate, providing little actionable insight. DX changed that. Using a proprietary survey approach with automated outreach, we achieved over a 95% response rate and gathered a stack-ranked list of developers’ pain points. Although the pilot coincided with a major layoff and severe budget cuts, the quantitative data was undeniable. My director, advocating to our CTO, highlighted that the robust data from DX would significantly improve our developer experience and team performance metrics. Even though the pilot was undeniably successful in my eyes I wasn’t sure if the argument was convincing to others. However, agreeing upon what success looks like up before starting the pilot helped align leadership that investing in DX was the right move.

### Case Study 3: Signadot for Iterative Development Testing

For [Signadot](https://www.signadot.com/), I once again took on the role of the primary decision driver, now leading a small team. This decision was more complex. We began by aligning on the overall approach: brainstorming around ten possible solutions and grouping them by core criteria. From there, we narrowed our options to two promising approaches and split into teams to build proof-of-concepts over two weeks. Initially, our POC wasn’t even built with Signadot—we only discovered their offering during the MVP planning phase. After comparing the prototypes, we decided that a solution similar to Signadot’s was our best long-term option. We then used Signadot to develop a robust beta version of our system, which allowed us to focus on refining our core user experience. Although our initial hunch was that building such a system in-house wouldn’t be too challenging, a deeper dive into the work and potential edge cases revealed that the upfront build cost would be too high. In the end, because the solution wasn’t a core competency for us and Signadot’s pricing fit our budget, buying the solution proved to be the smarter choice.

### Case Study 4: Extend for Invoice OCR

[Extend](https://www.extend.app/) marked my first build vs. buy decision for Brex’s core product. A common theme across these case studies is our focus on whether a solution is a core differentiator for our company. In this instance, while one might argue that OCR could set a Bill Pay product apart, we recognized that as a fintech company, OCR isn’t a core competency. We already had multiple OCR vendors, but none delivered the performance we needed—legacy product decisions and poor accuracy were hurting our user experience. We knew we could improve things with our own product logic, but we also understood that there was an upper bound on what we could achieve in-house. When we evaluated Extend, it was not only well-priced (positioned between our two existing vendors) but also offered unmatched accuracy, flexibility, and the ability to quickly implement new features. In this case, buying from Extend was the clear choice, as it provided superior performance without diverting our focus from what we do best.

## The Framework: How to perform a build vs buy analysis?

After multiple real world build vs buy decisions I was able to come to a fairly consistent framework for these types of decisions.

#### Define Your Requirements & Document the Design

- Outline exactly what you need.
- Create a high-level design document that captures these requirements and estimates the work involved.
- This document will serve as the foundation for both building internally and evaluating external options.

#### Conduct Market Research

- Align on what a successful pilot looks like with stakeholders to make the decision criteria clear.
- Test out the product(s) with a pilot.
- Look at all aspects: onboarding, system integration, feature performance, and customer support.
- In startups, you might only have the luxury to pilot one or two providers, so choose wisely.

#### Run a Pilot or Proof-of-Concept

- Align on what a successful pilot looks like with stakeholders to make the decision criteria clear.
- Test out the product(s) with a pilot.
- Look at all aspects: onboarding, system integration, feature performance, and customer support.
- In startups, you might only have the luxury to pilot one or two providers, so choose wisely.

#### Estimate Internal Build Costs

- Calculate the upfront engineering cost by estimating the total hours needed, multiplied by your average engineering hourly rate (for example, $250/hour).
- Don’t forget to factor in ongoing maintenance, on-call support, and potential feature enhancements over time. This is something most teams drastically underestimate and should be a core aspect of any build vs buy decision

#### Estimate Integration Costs for the Provider

- Create a mini design document to estimate the effort required to integrate the new service with your existing systems.
- Apply a similar cost estimation process as with the internal build.

#### Compare Total Costs Over the Contract Period

- Determine the overall cost of building internally versus buying over the entire contract period.
- Include all factors: upfront costs, ongoing maintenance, integration, and any variable pricing elements for the external provider.
- Compare these totals to make an informed decision.

#### Perform the Build vs Buy Decision Analysis

- Document your findings from the previous steps in a decision document to gather feedback and create alignment within your team.
- Consider using a structured format like SCQA (Situation, Complication, Question, Answer) for clarity.
- Ask the crucial question: Is this functionality core to your company? If yes, building might make more sense. If not, buying often allows you to preserve resources for your core product.

## Conclusion: Making Smarter Build vs. Buy Decisions

Making a build vs. buy decision isn’t just about comparing costs—it’s about aligning with your company’s long-term goals, reducing complexity, and ensuring your team can focus on what truly matters. Through my experiences at Brex, I learned that these decisions are rarely straightforward, but by following a structured approach, you can remove much of the guesswork and make more confident choices.

The biggest takeaway? **Always consider the total cost of ownership, not just the upfront effort. The allure of building something in-house can be strong, but ongoing maintenance, operational burden, and the opportunity cost of diverting engineering time away from core initiatives can quickly tip the scales toward buying.** Conversely, if a capability is critical to your company’s differentiation, investing in an internal build might be the best long-term play. Brex definitely made a lot of decisions to build technology in house like our credit card processing stack which were important to our long term success and differentiation. This is now even its own product that we can provide to others via Brex Embedded.

By leveraging a repeatable framework—defining requirements, researching the market, piloting solutions, and performing a rigorous cost analysis—you can make these high-stakes decisions with clarity and alignment across your team. And most importantly, you’ll avoid the trap of reinventing the wheel when a well-supported, scalable solution already exists.

So, the next time you’re faced with the question, “Should we pick a vendor or build it ourselves?” you’ll have a roadmap to guide you. If this framework or these case studies resonate with you, I’d love to hear your thoughts or feedback!
