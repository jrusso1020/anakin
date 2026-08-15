---
title: How I Use LLMs to Write the Majority of My Code
date: "2025-09-18"
description: As a staff engineer at an early-stage startup, I rely on LLM-powered coding assistants like Cursor, Claude, and ChatGPT to move faster while writing less code by hand. This post shares practical workflows, prompting strategies, and principles for using AI tools effectively in real-world software engineering.
tags:
  [
    "llms",
    "ai coding tools",
    "cursor",
    "claude",
    "chatgpt",
    "software engineering",
    "debugging",
    "staff engineer",
    "developer productivity",
    "prompt engineering",
  ]
---

# How I Use LLMs to Write the Majority of my Code

What if I told you that I write less code by hand than I ever have, and I’m also moving faster than ever? That’s the reality, if done right, of working with LLMs as a staff engineer. Using LLMs to code is a hot topic nowadays, and I've seen a variety of posts almost every week on it. The most recent posts I've read that I highly agree with are [this post by antirez](https://antirez.com/news/154) and [this post by Vincent Quigley at Sanity](https://www.sanity.io/blog/first-attempt-will-be-95-garbage)

Over the past couple of years, I’ve been using a range of LLM-powered tools to help me do my job more efficiently. I started out with GitHub Copilot, but over the last 10–12 months, I’ve shifted primarily to a combination of Cursor, ChatGPT, and Claude Code. I’d say I use Cursor still 60-70% of the time, Claude Code maybe 20-30% of the time, and ChatGPT the remaining 10-20% of the time.

As a Staff Engineer, hands-on coding often isn’t the most valuable use of my time. I’m often more focused on defining abstractions, architecting systems, solving ambiguous problems, and breaking down projects. That being said when you work at an early stage startup you are probably still expected to code 80-90% of your time. That’s where AI assistants come in: they help handle the lower-level implementation work so I can stay focused on higher-leverage tasks. I treat AI like a junior engineer or research partner: someone to help write code, fix bugs, or explore new approaches.

Sure, sometimes I worry that I’m outsourcing too much and letting my own coding muscles atrophy. But I’d rather be ahead of the curve and take full advantage of the incredible velocity gains LLMs can offer. I do go back and forth on trying to retake some coding responsibility from time to time. Over the last year I've used AI tools in a ton of different ways, and I thought it might be helpful to walk through some of those patterns. Both to reflect on what’s worked for me and to help others accelerate their own workflows.

Here are a few quick principles that shape how I work with AI day‑to‑day:

- **Context is fuel**: Paste the relevant files, types, screenshots, and logs so the model can ground its answers in real code.
- **Lead, don’t delegate**: Break work into clear, bite‑size prompts the way you would mentor a junior engineer.
- **Pick the right engine**: Swap models intentionally: heavyweight reasoning models for tricky bugs, lighter ones for boilerplate.
- **Pause & ponder**: When the assistant stalls, step back, think through the system, and feed it the missing insight.
- **Version fearlessly**: Stage diffs early, reset chats often, and treat generations as disposable drafts.

Now let’s get into the details of how I’ve been using LLMs.

## How I Actually Use LLMs in My Workflow

### Writing Frontend Code I Don't Want to Master

Although I am a fullstack engineer, I lean more toward the backend. I understand the high-level concepts behind frontend development and am familiar with React, but I’m far from a deep expert. LLMs help me move incredibly fast when building or updating components, especially when I’m trying to match designs. I often upload screenshots of UIs or show design-implementation differences to guide the AI toward more accurate styling. More recently I’ve always tried out the [Figma Dev Mode MCP Server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) alongside claude code and found it pretty helpful in matching designs.

Having a solid understanding of the fundamentals allows me to prompt effectively, make quick corrections, and apply best practices. This workflow shines when using frameworks like Tailwind CSS. Both in my personal blog and at work, both at work and personally I use Tailwind heavily and LLMs are excellent at working with open source libraries that are well-documented and widely adopted. I was able to migrate my blog from styled-components to Tailwind in just a few hours using Cursor and some basic prompting. More recently I completely redesigned my entire blog in a single evening to give it a more modern look.

These days, I can often prompt AI assistants to generate entire frontend features with minimal manual coding. It’s dramatically increased my ability to ship fullstack features quickly without needing deep frontend expertise.

### Adopting New Languages and Frameworks Quickly

Before LLMs, learning a new programming language or library meant spending hours reading documentation and going through tutorials. That ramp-up time has been reduced drastically. Recently, I’ve been building features in a Python codebase using Pydantic and SQLAlchemy. While I was already familiar with Python, I hadn’t used those libraries much and yet I’ve barely had to look at the docs. A year ago, that would’ve been impossible.

The hallucinations and misuse of APIs that once plagued LLMs have improved significantly (with the right models). I can now onboard to new environments with far less friction and get productive faster. On the other side LLMs are often plagued with using old/out of date dependencies and need to be prompted to check for the latest dependency to use and what documentation to look at. MCP’s like [context7](https://context7.com/) can help with this as well.

### Debugging

While debugging is still an area with room for improvement (especially in distributed systems), LLMs have proven to be surprisingly helpful. They’re excellent at interpreting stack traces and often take me straight to the source of a problem or suggest viable fixes.
One of the most valuable superpowers here is surfacing language or framework-specific quirks that might otherwise take a human hours or days to track down through GitHub issues and scattered docs. For example, I often use LLMs to help fix specific React bugs around state updates and hooks. I will go into this a bit more later, but utilizing reasoning or thinking models for this type of work is especially important.

I also use LLMs to sanity-check my fixes and think through edge cases. They can be overly agreeable, so you still need to apply critical thinking, but as a sounding board, they’re invaluable.

### How I Learn Faster with LLMs

LLMs are some of the best teachers I’ve worked with. Whether I’m onboarding to a new codebase, learning a novel abstraction, or diving into a complex domain, they’ve helped me accelerate understanding dramatically.

With Cursor, I often highlight snippets of code and ask for explanations, inline comments, or architectural summaries. When I want to go deeper, I switch to ChatGPT to explore broader concepts and have more nuanced back-and-forth discussions.

One standout use case was learning how our C++ and OpenGL-based video rendering service works, two technologies I had little experience with. LLMs helped me get a working model of the system’s architecture quickly, which let me contribute new features in hours instead of weeks.

Another was researching Advanced Substation Alpha (ASS) for a captioning feature. I used ChatGPT to dig into its syntax, styling limitations, and tradeoffs. Often running deep research threads in the background while I kept coding. This asynchronous research workflow saved days of ramp-up time.

### Code Search + One-Shot Exploration

One technique I’ve been leaning into is one-shot feature exploration. Sometimes I’ll prompt an AI assistant to generate an entire feature, even if it spans 5–10+ files. I don’t expect it to work perfectly, but it helps me quickly understand scope and surface relevant parts of the codebase.

I’ll usually throw the code away, but by reviewing the AI’s approach, I can break the work into smaller scoped prompts that have a higher chance of success. It’s like an accelerated form of guided spelunking.

As models improve, I expect this technique to shift from exploratory to productive. Even today, it’s a huge time-saver when starting complex features. I've also started to see it start to work from time to time for well scoped features with the right context provided.

## Tips for Getting the Most Out of AI Code Assistants

After a year of using these tools daily, I’ve developed a few techniques that consistently improve results whether I'm working on a small bugfix or a multi-file feature.
Know Some Basic Prompting Techniques

I rely heavily on the chat window in Cursor and use autocomplete less often unless I'm scaffolding out some basic models/functions myself. I usually start by outlining context (briefly describing the state and linking files, directories, or images), defining the problem, making a clear ask, and appending any relevant code, logs, errors.

```

Context

Problem

Ask
---
code or logs
```

I’ve tried out XML-style tags to better structure prompts when including multiple code blocks as well:

```

<context>
...
</context>

<problem>
...
</problem>

<ask>
...
</ask>
```

There is actually a [more recent article](https://maxleiter.com/blog/rewrite-your-prompts) highlighting how you should rewrite your prompt depending on the model. The gist of it is that OpenAI models may perform better with markdown style prompts while Anthropic models may perform better with XML style prompts. Keep this in mind depending on your model selection.

### Pattern Matching, Context, and Model Selection

Most software engineering is pattern matching, and AI is no different. If you provide examples that mirror what you want, the output improves significantly. I often include relevant files and type definitions to anchor the model’s responses. This is very similar to how I've always coded myself looking for existing patterns or examples and using them as a starting point.

Model choice also matters. I almost always manually select the model instead of using Cursor’s default. The latest Claude Sonnet model has been my go-to model for months, but recently I’ve been testing Gemini 2.5, Gemini 2.5 Pro, OpenAI’s O3, and more recently GPT-5 with good results. However I have noticed that Gemini models seem to struggle more with tool calls in Cursor than Claude models. In general I find the thinking models to behave fairly well most of the time, but the default models do often spit out garbage that requires manual intervention.

This is all very relevant specifically for debugging as well as new feature development. I often use LLMs to help debug issues both in my new code and in existing production issues. Context like error messages, stack traces, and logs are incredibly helpful to LLMs as they can easily decipher the flow of code from them. A reasoning model is a must when it comes to debugging as well as it generally takes some deeper thinking. I think the other aspect of debugging with LLMs is that you should treat it the same way you would debug. For example, adding breakpoints, or logs to help add context and understand the issue feeding this context into the LLM. It's also important to include context on what is happening i.e. what is the error state, when does it occur, and what you expect. I wrote a [blog post in the past on how to ask for help](https://boredhacking.com/seeking-help/) and I think this technique is essentially the same for how I ask LLMs for help debugging.

### Break It Down Like You Would for a Junior Engineer

One-shotting complex features will almost never work even with really great prompts. You wouldn’t ask a junior engineer to implement type definitions, UI updates, and state logic all at once so don’t ask an AI to. Break large changes into smaller pieces, provide the right context for each step. Prompting well often mirrors good mentorship: clarity, structure, and step-by-step direction. This is very similar to most AI companies approaches today as well, agentic workflows have fairly high success rates. Free form agents though are still prone to going off the rails and needing to be reset.

### Don’t Sweat the Syntax—Focus on Architecture

LLMs are powerful tools, but they can still get stuck especially when a problem requires nuance or deeper system-level understanding. I’ve had plenty of moments where I’ve gone back and forth with a coding assistant, only to realize that I needed to stop and think for myself. A quick 10–15 minute deep dive on my own often surfaces a key insight the model was missing. Once I frame that insight clearly, the assistant can suddenly resolve the issue perfectly.

These breakthroughs are often the result of experience and system context, things only a human can bring. LLMs can generate and iterate, but it’s your understanding that keeps the whole process moving in the right direction.

I let AI write most of the code and focus my attention on design, structure, and correctness. Reviewing AI-generated code is like reviewing a teammate’s pull request. Does it follow conventions? Is it readable? Are we duplicating existing patterns or DRYing them up?

The AI helps with execution, but the thinking still has to come from you.

### Reset Often

The longer a conversation thread gets, the more likely the model is to degrade in quality. I often reset chats after reaching a good checkpoint to reframe the problem cleanly. A fresh prompt usually produces better results than trying to recover from a confused thread.

## Closing Thoughts: The Future of Human-AI Engineering

LLMs are changing how we build software. They’re accelerating productivity, lowering the barrier to entry for unfamiliar domains, and letting engineers focus on the things that matter most.

Do I worry about my coding muscles atrophying? A bit. But I still write by hand when I need to and I apply the same level of scrutiny to AI-generated code that I would to any junior engineer. As the tools improve, the real skill will be knowing when and how to guide them. Every so often I’ll revert to more manual coding.

The biggest risk right now isn’t relying on AI too much, it's ignoring it. The engineers who learn to wield these tools with intention will move faster, learn more, and have a massive edge.

I may be writing less code but I’m still designing systems, learning faster, and mentoring more effectively. That feels like progress.
