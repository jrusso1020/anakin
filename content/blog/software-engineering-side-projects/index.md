---
title: "Level Up Your Engineering Career with Strategic Side Projects"
date: "2025-01-29"
description: Don't be afraid to utilize side projects to accelerate your career growth. This post explores how building personal projects can enhance your skills, accelerate onboarding, and keep you competitive in a fast-evolving industry. Side projects are a low-pressure environment to explore and learn about emerging technologies, to accelerate your future work and career growth.
tags:
  [
    "side projects",
    "career development",
    "software engineering",
    "best practices",
    "tech trends",
    "onboarding",
  ]
---

## Why Do Side Projects Matter for Your Career

Ever wondered how to stand out as a software engineer beyond what you learn on the job? Although many engineers go through their careers without side projects, I’ve found them invaluable for career growth and practical learning. They’ve been especially helpful for jumping into new companies, teams, and domains, as well as onboarding rapidly. Side projects are also incredibly useful if you’re working at startups, where you need to move fast and adapt often.

The investments you make in side projects are compounding—the more you do them, the quicker you’ll learn and grow. While I don’t think side projects are the only reason I became a staff engineer, they’ve definitely contributed to my growth and helped me reach that level at a relatively young age. In general, side projects have allowed me to gain practical experience, stay ahead of industry trends, and prepare for new challenges that also apply to my day-to-day work. Let’s dive into the types of side projects I’ve worked on and how they’ve shaped my journey as a software engineer.

## Preparing for a New Role and Rapidly Onboarding

Onboarding can be daunting. You’re learning new systems, meeting new teammates, and getting up to speed on a company’s practices. The faster you onboard, the sooner you can contribute real value—and the sooner you can continue growing as an engineer.

Side projects can be a secret weapon in this process. Before starting my last two jobs, I spent time learning the languages and frameworks that the company used. During or after interviews, I’d ask what tech stack they relied on, then spin up a mini-project—like a simple blog, a to-do app, or even a mobile game—to familiarize myself with their tools.

For example, at Brex, I knew I’d be working with [Elixir](https://elixir-lang.org/), a language I’d heard of but never used. I spent a week or two doing tutorials and tinkering with small Elixir projects, which allowed me to commit and deploy a change on day one. Similarly, for my current job, I built a Tetris-like game in [React Native](https://reactnative.dev/) before I even started, so I understood the syntax, tools, and deployment process. That preparation let me jump right into the codebase on my first day.

## Staying Aware of Trends

Software development is constantly evolving, and what’s popular now might change in just a few months. For staff+ engineers or aspiring founders, keeping an eye on trends is crucial for making informed decisions and avoiding outdated choices. Side projects provide a low-pressure environment to explore and learn about emerging technologies.

In the JavaScript ecosystem, for instance, frameworks come and go quickly. When [Next.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.com/) first appeared, both promised better performance than traditional client-side [React](https://reactjs.org/). At work, I chose Next.js for a project while using Gatsby to build this blog. Even though I haven’t used them professionally since then, I’ve stayed up to date through side projects. This means I know when to pick one over the other, and I can easily build quick demos with the latest versions.

A more recent example is NX for monorepos. My current company uses a TypeScript monorepo but hadn’t implemented any structured framework for it. NX kept showing up in discussions and from ex-coworkers, so I decided to set up a small NX monorepo on my own. This allowed me to understand the setup, tooling, and common pitfalls, so I can help guide a future migration at work if we decide to go down that path. If you’re looking to launch a startup, being aware of (and comfortable with) new tools is often a key to moving fast and saving money.

## Applying Best Practices

Testing and implementing best practices in a side project is one of the most practical ways to prepare for using them at work—without the pressure of deadlines or stakeholder expectations. You get to see what works, what doesn’t, and how to fix it when things go wrong.

When I first built this blog, it used plain JavaScript with no linting, formatting, or typing tools. At work, these were always pre-configured, so I never thought much about it. Over time, though, I realized how linting and formatting reduce bugs and make code more maintainable. So I added TypeScript, Prettier, and ESLint to my personal projects. It might not sound critical for a small blog, but learning how to set it up from scratch boosted my confidence—and later helped me implement the same practices at a startup with an existing codebase.

CI/CD pipelines are another area where side projects taught me a lot. Setting up [CircleCI](https://circleci.com/) for this blog, for instance, helped me catch issues early by validating linting, tests, and builds on every pull request. I even automated deployments to production after merges. Later, experimenting with [GitHub Actions](https://github.com/features/actions) gave me a broader view of CI/CD, and I could roll it out quickly at work.

Refactoring is similar. I transitioned this blog from styled components to Tailwind CSS not just to keep up with trends, but also to test new workflows and tools like GitHub Copilot. Those experiences help me integrate libraries like ShadCN in other projects—and I can confidently advocate for these tools in professional environments because I’ve already worked through potential pitfalls.

## Learning from Your Job

Side projects aren’t just for exploring new tools; they’re also a way to solidify lessons you learn at work. Seeing a best practice in action is one thing, but actively applying it in your own code cements your understanding and reveals nuances you might miss otherwise.

At Brex, I learned the value of building apps on every pull request to avoid broken builds. Initially, I resisted because it slowed down pipelines, but after facing repeated deployment failures on my blog, I finally implemented a build validation step in my CI checks. Since then, I haven’t had a bad main build—and I’ve saved myself a ton of frustration.

Brex also exposed me to the advantages of caching and parallelizing CI/CD steps. My blog’s pipeline used to run tasks like linting, testing, and building one after another, getting slower as I added more steps. Inspired by what I saw at work, I restructured my workflow to cache dependencies and run tasks in parallel, drastically reducing build times. These techniques have become staples in my professional toolkit, and I’ve brought them to other side projects and even my current company’s pipelines.

## Iterating Rapidly

If you’re looking to simulate a startup environment or just want to build MVPs quickly, side projects are perfect for practicing rapid iteration, feature scoping, and building from scratch. It’s tempting—especially for newer engineers—to reach for the coolest new technology or the most performant language. However, this often complicates your project without offering much real benefit.

Over the years, I’ve experimented with different technologies for quick prototypes and found a stack that lets me move fast: an [NX monorepo](https://nx.dev/), [Express backend](https://expressjs.com/), [Next.js for web](https://nextjs.org/), [React Native for mobile](https://reactnative.dev/), [TypeScript everywhere](https://www.typescriptlang.org/), [Tailwind CSS for styling](https://tailwindcss.com/), and [ShadCN for components](https://ui.shadcn.com/). While I was slower at first, I’m now familiar enough to set up this entire environment in a few hours. That means I can shift my focus to actual features and user experience.

Beyond the tools, rapid iteration teaches you how to define requirements, scope features, and break tasks into manageable pieces—skills that are essential for product engineers and founders alike. If you can quickly build an MVP, you’ll be much better at tackling larger, more complex problems down the road.

## Compounding Experience and a Final Word

By focusing on targeted side projects, you not only learn new skills but also accelerate your career growth in a self-driven way. At first, it may feel challenging to find the right project or work independently without colleagues to rely on. However, the effect compounds over time, making each new project easier and more impactful.

A good way to start is by following tutorials or taking courses on sites like LinkedIn Learning, Codecademy, or Egghead.io. As your confidence grows, you can piece together multiple resources, open-source documentation, and even AI tools to bring your visions to life—leading to some of the most rewarding and educational projects.

Side projects might be just one piece of the career puzzle, but their compounding effect will help you move faster both professionally and personally. Whether you’re preparing for a new job, staying on top of trends, or refining best practices, these small experiments can have a big impact on your future as a software engineer.

**Ready to start your next side project?** Pick one idea this week—whether it’s learning a new framework, exploring a CI/CD tool, or spinning up a mobile app—and see how quickly your skills and confidence grow.
