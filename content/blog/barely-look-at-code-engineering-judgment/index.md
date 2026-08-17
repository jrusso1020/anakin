---
title: "Engineering Judgment Matters More Than Ever"
date: "2026-08-16"
description: For at least the last year, I haven't written implementation code by hand; I usually first see it in pull requests. This post covers how I work with coding agents today and why context, taste, prioritization, and reviewable scope matter more than ever.
banner: "./banner.png"
bannerAlt: "A visual control plane coordinating several parallel coding agent workstreams."
tags:
  [
    "llms",
    "ai agents",
    "codex",
    "agentic workflows",
    "software engineering",
    "staff engineer",
    "engineering judgment",
    "developer productivity",
    "code review",
    "testing",
  ]
---

## I Don't Code by Hand Anymore

I don't code by hand anymore, and I don't personally know anyone else who does at this point. A few years ago, that would have sounded unbelievable to me. I rarely even open code files locally. Most of the time, the first time I see the implementation is in a pull request. That doesn't mean I skip reviewing the code. I read the diff as I normally would and still spend time validating the outcome. When I do open a local file, it is usually to share a specific snippet or some known information with another engineer or an agent.

The most unbelievable part is that I'm able to ship more code than ever while leading a team and spending more time on product direction, strategy, and technical design. For well scoped work, agents can generally implement and test autonomously, and then I review the result like I would another developer's. My friend [Trevin Chow](https://x.com/trevin) recently called this an "implementation sandwich": the heavier parts for humans are planning on one side and testing and validation on the other, with implementation by the agent as the thinner middle layer. That feels pretty accurate to how I work today.

[Last September, I wrote about using LLMs to write the majority of my code](/coding-with-llms/). I was still guiding them closely and compared them to junior engineers. Then in January, I wrote that [the model and feedback loops mattered more than the prompts](/coding-with-llms-2026/). A little over six months later, things have accelerated even more.

## How I Got Here

My first foray into AI coding was GitHub Copilot autocomplete. It made me faster, but I was still typing code in my normal editor. Cursor was the next major workflow change. I was fairly early to agentic coding and started using Cursor's chat-based agent around July 2024. I constantly tested models to find my main driver and gave the model most of my implementation work even back then.

In late 2025, Claude Code with Opus 4.5 rapidly changed how I worked. Cursor's agent could already search the codebase and run CLI tools, so those capabilities were not new. However, the combination of the model and harness felt more autonomous in Claude Code. It was also the point when I started moving most of my work out of an editor and into the terminal. As MCPs and skills became popular, I spent more time improving my agent harness and setup.

Then, around March 2026, I moved from manually approving every action to using the new auto-approval mode in Claude Code. I never liked dangerously skipping permissions, but auto-approve let me retain control while getting out of the way. Over the last couple of months, Codex desktop has made it possible to do most of my job in an app that is neither an editor nor a terminal, which is a first for me.

<video autoplay loop muted playsinline controls preload="metadata" poster="/media/engineering-judgment-2026/editor-terminal-desktop-poster.png" aria-label="The workflow moving from a code editor, to a terminal, to a desktop coding agent interface."><source src="/media/engineering-judgment-2026/editor-terminal-desktop.mp4" type="video/mp4" /></video>

A big part of what has made this possible is tuning instruction files, skills, MCPs, CLIs, and other tools so agents can find information themselves. The other piece is ensuring agents have ways to validate their work, such as end-to-end tests, browser checks, API requests, or dry runs, with read-only access and approval for destructive actions where appropriate.

## My Current Operating Model

Today, I spend roughly 80% of my time in Codex desktop and most of the remaining time in Claude Code via the terminal. Across both, I usually have five to ten active sessions for coding, writing documents, doing data analysis, thinking through strategy, or just discussing open-ended problems.

Connections to existing systems help my agent sessions operate independently. For example, PostHog and Datadog access lets agents pull data and update dashboards without needing to write scripts or screenshot data. Agents have also lowered the activation energy for starting work. I no longer procrastinate on a coding task or document. I can start a conversation and iterate to something concrete quickly.

My general workflow is to start by giving the agent as much context as possible, such as Slack threads, documents, past issues, the problem at hand, how I'm thinking about it, and the goal. We then iterate on a plan together. I don't read the planning doc directly most of the time, but I generally read the synthesis in the chat thread and correct anything that doesn't match my expectations. I also make sure we align on breaking the problem into digestible PRs, using stacks where needed. The agent then implements the change and runs the relevant checks, such as formatting, linting, existing tests, and as much end-to-end testing as it can. I review the pull request and give feedback if something is missing.

Right now, Codex with GPT-5.6 Sol High is my default because the model is capable and cost-efficient. Claude Code and Anthropic models are still a useful part of my workflow, but they are harder for me to justify as costs rise relative to the gains I observe, especially when I burn through monthly token usage and need to pay for overage credits. At this point, I really only use Fable 5 as a thought partner for ideation and exploratory spikes, but I find it too expensive for day-to-day engineering work. The cost-to-quality ratio is not there as a daily driver.

The last aspect of my daily agent use is an internally built system. Over the last six months, HeyGen has built an internal AI employee platform where employees can choose among several agent harnesses for a personal assistant. These agents are long-lived Slack bots that you can DM or ping in allowed Slack channels. I use mine for smaller coding tasks, finding root causes for bugs, fixing documentation, reviewing pull requests, testing, and running recurring tasks. The AI employee platform also includes a general-purpose coding agent that anyone can @mention in Slack to start a coding session. However, I still mostly rely on my personal agent because it has the skills, information, and setup I know and trust.

## The Catch: Coding Ability Is Only Part of Engineering

My earlier comparisons of agents to junior and SWE II engineers still feel broadly right. The best models can approach senior-level execution on bounded work with clear direction and validation, but I'm not convinced they consistently operate as senior engineers. At least not in my eyes. Coding ability is only one part of being a senior engineer. For example, agents are bad at knowing when existing code needs a refactor instead of another change layered on top.

Larger gaps include the ability to reuse existing work, weigh organizational history, recognize tradeoffs, apply taste, choose priorities, and involve people early. This is especially critical because a lot of information lives in old Slack threads, incidents, docs, and people's memories rather than the codebase.

For smaller requests, I may only need a simple prompt, a few requirements, and a way to validate the work.

For more substantial work, I still use a workflow similar to the one I used before AI:

1. We write a succinct PRD and get alignment with the right people.
2. We write a design doc and get alignment again.
3. We plan how the work can be implemented, tested, reviewed, and merged iteratively.

This may sound like a lot of process, but with agents, you can do it without slowing down. The docs don't need to take days to write and review. They just need to capture the decisions and constraints so people can align and agents don't make conflicting assumptions.

Without human alignment, an agent can generate a huge stack of PRs before anyone reviews the direction. Keeping pull requests and PR stacks small was necessary before agents, and it is still practical now. Each diff should be understandable, testable, deployable, and reversible. Agent-based PR reviews can find obvious bugs and missing tests, but they cannot replace architectural or organizational knowledge that neither agent has.

I recently saw this with a new API endpoint implementation. We skipped design review and human alignment, so we reimplemented existing capabilities, missed requirements, and created reliability issues. A later refactor reused what already existed and made it more reliable and complete. A quick design check and search for existing work likely would have saved time before starting the implementation.

## What Remains Unfinished

Today, each person manually assembles their own harness by adding skills and MCPs and constructing explicit loops. That scaffolding can only get you so far when agents are often too eager to start and finish the task. They don't consistently push back, ask for missing information, or understand how I prefer to work. The most common failure I see is an agent acting on incorrect requirements instead of stopping to ask a question.

My hypothesis is that stronger models and harnesses should remember useful workflows, identify tools, and improve reusable skills as they work. I see hints when an agent remembers a speedup or proactively reaches for the GitHub CLI. I think the next iteration of coding agents will also proactively set up their own loops and graphs of subagents for recurring tasks. More importantly, agents need reliable organizational information: decisions, designs, docs, and relevant messages that are up to date. A perfect system of record sounds difficult to manage, but maybe agents can make it easier to build and maintain.

I think the next step is agents that do more than just execute. We aren't there yet. Until then, strong engineering fundamentals are still what help me give an agent the right work, pick the right model for the task, and know whether the result is actually good. That is the part of engineering I spend most of my time on now.
