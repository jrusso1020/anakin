---
title: "Strong Opinions, Loosely Held: A Developer's Guide to AI Hype"
date: "2025-10-06"
description: In a world of constant AI hype, how do you decide which developer tools are actually worth your time? This post moves beyond the "10x productivity" claims and offers a practical framework for evaluating new tools, using real-world examples like GitHub Copilot and OpenRouter to show how healthy skepticism and hands-on testing can uncover real value.
tags:
  [
    "llms",
    "ai coding tools",
    "cursor",
    "claude",
    "chatgpt",
    "software engineering",
    "developer productivity",
    "openrouter",
    "strong opinions loosely held",
  ]
---

At this point, a new 10x productivity AI tool is announced almost every week, if not every day. Without a doubt, I’m more productive today using AI coding tools than I was a year ago, but I wouldn't say it’s 10xed my productivity yet. I’ve tried out a number of tools over the last couple of years, and I always go into the evaluation with a healthy amount of skepticism. It’s normal to be skeptical of claims, and it’s healthy to avoid rushing in and doing proper due diligence. However, it’s impossible to ignore the power of AI coding and developer tools.

That’s why it’s critical to balance skepticism with disciplined curiosity. A mindset best summarized by the phrase, **'strong opinions, loosely held'**. Static cynicism could lead to stagnation or, even worse, in your career. Curiosity and exploration, on the other hand, can be a superpower to accelerate your career. This is a mantra I follow not just for new pieces of software but software engineering in general.

Over the last few years, I’ve often looked at an AI tool or piece of software and thought it was a fad, but I didn't understand its value. It’s common to write things off when you don’t feel the problem or understand the solution; however, it’s important to be willing to try something out and evaluate it properly.That's what this post is about: moving beyond the hype and focusing on a simple framework for identifying the real-world developer problems that a new generation of AI tools can solve.

## The Endless Grind of Boilerplate and Repetitive Tasks

Most engineers get joy out of solving problems, writing elegant code, or seeing the successful output of their labor. However, most engineers don’t enjoy the monotonous aspects of coding, such as writing unit tests, boilerplate, and documentation. While there are many energizers in software engineering, there are also many drainers. Before AI coding tools, engineers had to constantly handle both the good and bad to successfully deliver good software; however, this isn’t necessarily the case anymore.

### Taming the Grind with GitHub Copilot

Back when tools like [GitHub Copilot](https://github.com/features/copilot) first emerged and ChatGPT was starting to show the world what was possible, my initial sentiment was suspicion on its value potential. Having used ChatGPT with GPT-3 at the time I knew its code output was not great to say the least and pretty buggy. Not only that, I was pretty pessimistic about the future of AI coding in general because of how it would lack context. Without understanding larger codebases, how could it know what libraries or packages to use? However, another engineer on my team whom I respected told me he was enjoying GitHub Copilot and was very bullish on the future of AI coding over the next few years. Based on his recommendation, I started to test GitHub Copilot and quickly saw the benefits. We were coding in Kotlin at the time, and it could handle scaffolding out a lot of the boilerplate or picking the right functions needed to manipulate the main data abstractions. Writing boilerplate at the time was one of our company's largest problems brought up by engineers, and Copilot could greatly improve productivity. It wasn’t a 10x or even 2x improvement, but it did raise my productivity by 20-30% at the time. As I got more used to Copilot and better at giving it context via code comments, pseudocode, open files, etc., it got even more useful.

TIP: Often you are pattern matching code from existing files in a codebase, online tutorials/examples, or stack overflow. Don’t skip this step with the LLM, still look for patterns where possible and feed this to the LLM as context.

### Evolving to Conversational Coding with Cursor

Now, when [Cursor](https://cursor.com/) and [Claude Code](https://www.claude.com/product/claude-code) started to gain hype, I was a lot less skeptical out of the gate but still a bit unsure of how different they could be. Cursor, though, was an even larger step improvement to me than GitHub Copilot. Cursor’s agent/chat window, which could directly edit files and tell you why, was a massive improvement to my productivity, especially in new codebases or languages. No longer did one need to spend time learning functions and libraries. Senior+ engineers who understand what good code and abstractions look like could easily describe in a prompt the exact steps and functionality they wished to use, what best practices to use, etc., and have it generated. With Cursor, I would say I quickly became not just a believer but an advocate for its usage. Anyone who wasn’t using Cursor or a chat-based workflow for coding was doing it wrong. Furthermore, as I learned to use the right models for thinking and coding, as well as giving the LLM the right context, it got even better. My opinions on AI coding have done a complete 180 over the last few years, going from pessimistic to bullish.

## The High Cost and Friction of Model Experimentation

More recently, a friend of mine brought up [OpenRouter](https://openrouter.ai/) to me and asked for my opinion. Initially, I didn’t empathize with the problem it was trying to solve or completely understand its offering. The companies I had worked at had built their own clients for each LLM API to have proper telemetry and logging in place. My thought was, wouldn’t this be true for most production AI apps?

However, when working on a side project recently with another engineer, they brought up OpenRouter and said they used it on their products, so I decided to give it a try. I quickly saw its usefulness. I think there were two big misunderstandings I had initially: 1) I didn’t realize OpenRouter centralized the billing and API access for you; I thought you would still need to set this up in each LLM provider. 2) I didn’t know how easy it was to integrate it into other clients, especially Vercel’s AI SDK. I was able to immediately set up an account, fund it, and integrate it into an app within an hour to test different models and providers.

The friction to build AI tools was immediately lower using OpenRouter and the Vercel AI SDK, going from potentially days of setup and configuration to minutes. In my previous writings, I’ve discussed when to buy versus build, and setting LLM providers and access is not a differentiator at this point; it should be something you optimize for speed and maintenance costs (or the lack thereof). Picking the right tool to accelerate development and build prototypes is incredibly important. OpenRouter not only gives you this speed improvement, but it also allows you to quickly and easily A/B test different models or handle cost optimization across providers.

## Evaluate Tools Based on the Problems They Solve

It’s important not just to buy into the hype without proper due diligence. Make sure you’re always asking yourself the question: “What specific, real-world problem does this solve for me?” And then, make sure to test it in a real-world setting, running it through a full, real application. This is another lesson from evaluating software providers and services. You need to come in with an opinion and give it a thorough test on real problems you or your team are facing. Remember: strong opinions, loosely held.
