---
title: "Coding With LLMs in 2026: The Model Matters More Than the Prompts"
date: "2026-01-18"
description: Following up on my 2025 workflows, this post explores the shift from manual prompting to agentic feedback loops. I break down why model choice now outweighs prompt engineering, how Claude Code has become my primary driver alongside Cursor, and why the "SWE II" level of AI requires a new focus on automated eval loops and organizational standards.
tags:
  [
    "llms",
    "agentic workflows",
    "claude code",
    "cursor",
    "opus 4.5",
    "software engineering",
    "eval loops",
    "developer experience",
    "ai agents",
    "productivity",
  ]
---

# Coding With LLMs in 2026: The Model Matters More Than the Prompts

Agentic coding took a step-function leap in late 2025.

[Last year, I wrote about using LLMs + agentic workflows](/coding-with-llms/) to write most of my code. While the core principles hold, the nuance has shifted. In early 2026, the biggest variable between "AI slop" and production-grade code isn't your prompting technique—it's the model you pick and the feedback loops you build around it.

**Prompting isn't the blocker anymore. Feedback loops are.**

## What's Evolved: From SWE I to SWE II

Last year, I argued that you had to treat LLMs like junior developers (SWE I): they needed explicit breakdowns, struggled with ambiguity, and required constant hand-holding.

By the end of 2025, we've clearly leveled up. Working with a top-tier agent now feels like collaborating with a SWE II:

- **Proactive Context**: They are better at navigating codebases and collecting context without being told exactly which file to open.
- **Autonomous Planning**: You can define higher-level constraints and acceptance criteria, letting the agent break the work down itself.
- **Ambiguity Handling**: As long as there is enough "signal" (logs, docs, or types), they can fill in the gaps.

The missing pieces are still what you'd expect from a mid-level engineer: they lack "product taste" (knowing what not to build) and have a tendency to over-engineer if you don't set guardrails.

## The Model Matters More Than Ever

If the goal is speed to shipped impact, model choice dominates "prompt cleverness." If you're spending 30 minutes cleaning up "cheap model" output, you're paying more in engineering time than you saved in tokens.

### My 2026 Defaults

- **Opus 4.5**: My daily driver. It's the first model that felt visibly different for coding and general engineering tasks.
- **GPT 5.2**: Still in the rotation for experimentation, but hasn't yet unseated Opus for my daily coding.
- **Gemini 3 (Pro/Flash)**: The standout for creativity. If I'm doing UI/UX or design thinking, it's the most reliable partner for generating non-generic ideas(with context or prompting).

## The Tooling Split: Claude Code & Cursor

For most of last year, Cursor was my default. It's still my main "pane of glass" for navigating code because, despite my best efforts, the full terminal/Vim life never quite stuck for me. I need a GUI.

However, **Claude Code has become my daily driver for actual execution.** But mostly within Cursor to easily review changesets.

### Why the shift?

- **Usage-Based Pricing**: I started with Claude Code on my side projects. My side-project schedule is spiky. I'll binge for a week and then do nothing for months. Claude Code's "pay for what you use" model fits my lifestyle better than a flat monthly subscription.
- **Terminal + Editor Synergy**: It doesn't limit me to the IDE. I can run it fully in the terminal or IDE without it feeling clunky.
- **Standardization**: It's becoming the default internally at my company, making it easier to share reusable "agentic" patterns with teammates.
- **Trendsetter**: The Claude Code teams seems to be sending the standards for most agentic development and therefore using it gives you first access to new trends or best practices.

Lately, I use them in parallel: Claude Code for the long-running project thread, and Cursor for quick bugs or one-off edits that pop up while I'm working on something else.

While I've done two or three multiple session at once this is still an area of improvement for me. I need to get more comfortable with work trees and multiple sessions in parallel.

## The Real Unlock: Debugging & Eval Loops

This is the part I'm doubling down on the hardest.

Eval loops have always mattered in software development. Coming from a developer experience background, it's funny to watch the industry "discover" this now—but it makes sense. Agents need the same thing humans do: a fast, reliable way to validate changes.

Now that code creation is cheap, the bottleneck moves downstream to validation, confidence, and speed of iteration.

Over the last few months, debugging has become almost fully autonomous. I recently started owning our external API, and most bugs were solved in one interaction.

### The Context Packet

If you want an agent to behave like a strong engineer, give it the same "Context Packet" you'd give a teammate. This follows the same logic I wrote about years ago in [_Seeking Help_](/seeking-help/):

- High-level description of bug
- Endpoint/Component
- Input provided
- Output received
- Expected behavior
- What you've done so far or other context you've gathered

### Eval Loops Can Be Anything (As Long As They're Fast and Reliable)

Depending on the work, your eval loop might be:

- Unit tests
- Integration tests
- Golden file snapshots
- End-to-end tests
- Local repro scripts
- Feature flags
- Dev/QA environments
- "Run the thing in the real distributed system and see if it behaves"

**The punchline: Your agent's effectiveness is capped by how quickly it can prove it didn't break anything or it met your requirements.** Your job is no longer writing the code; it's building the loop.

**Case Study: The "Slow Startup" Fix**

I had a service with a bloated Python startup time. Instead of me hunting imports, I gave the agent a loop:

1. It added startup logs to diagnose the bottleneck. It was flask blueprint initialization.
2. It set up a profiling loop (`PYTHONPROFILEIMPORTTIME=1`).
3. It wrote a parser to sort the worst offenders.

**The Autonomy**: It then spent an afternoon identifying slow imports, moving them to runtime imports, re-running the profile, and repeating until the startup time stabilized.

I didn't drive the steps; I just provided the "profiling loop" and let the engine run.

## Code Is Cheaper Than Ever—Don't Be Afraid to Be Wasteful

Because code is now effectively free to generate, I've embraced "Wasteful Engineering." I treat throwaway scripts as a default part of my workflow.

When a clean eval loop doesn't exist and it's possible to test via code, the easiest move is:

- Write a one-off script that reproduces the issue or validates behavior
- Let the agent run it and iterate
- Delete it when you're done

I do this multiple times a day.

Common "throwaway" artifacts I generate:

- Bug reproduction scripts (trigger hard-to-reach code paths)
- One-off scripts for backfills/migrations
- Scripts for pulling observability data (Datadog metrics, logs)
- Tiny HTML files for visualizing outputs (especially when evals spit out JSON)

## Guardrails: Avoiding Footguns with Terminal Agents

Terminal-integrated agents are powerful—and that means you need guardrails.

A few patterns that have worked well for me:

### Secrets

We use **Infisical** for secret storage and injection. That makes it easy to write scripts and give them the credentials they need without hardcoding anything. With infisical they are injected at runtime.

### Production Data

I do write scripts that interact with production data to recreate customer issues, but most of them are **read-only** operations (GET requests, database queries with no mutations).

### Writes & Destructive Actions

When the agent generates scripts that could mutate data, I push it toward safety by default:

- Explicit confirmations ("type YES to proceed")
- Dry-run flags
- Limiting scopes (single customer, single request ID)
- Verbose logging before executing changes

I want the agent to be fast, but I also want it to be safe.

## Breaking Work Down Is Less Manual—But Still Necessary

Agents can handle more ambiguity and do more planning on their own now. That's real.

But you still need the work to land in a digestible, reliable way:

- DB migration PR first
- Code changes next
- Avoid multi-thousand-line PRs nobody can review or safely roll back

Agents can figure this out but you have to set the expectation early:

- "Propose PR boundaries"
- "Pause and ask before you touch migrations"
- "Stop and commit at checkpoints"

This is less about model limitations and more about good engineering hygiene.

## Frontend Eval Loops (Promising, But Still Messier)

Backend eval loops are relatively easy to make deterministic.

Frontend is improving, but it's still messier. I've seen a few approaches emerge:

- **Playwright-based workflows** (including Playwright MCP) to control a browser for real UI validation
- **Claude browser extension + in-IDE browsers** for live feedback
- **IDE-integrated "preview + test" loops**

I also think **Antigravity** seems promising here because Google is well positioned to integrate Chrome deeply with their own IDE/tooling story.

But in general, frontend eval reliability still feels behind backend. It's getting better, it's just not "solved" in the same way yet.

## The 2026 Gap: Personal vs. Org Productivity

One of the biggest gaps is that agentic coding still rewards people who build more complex, opinionated setups.

Cursor and Claude Code are both extensible (agents, prompts, MCPs, repo rules, etc.). Teams with time and expertise can assemble workflows that feel _shockingly_ autonomous. But most companies don't have the expertise or the resources to build that configuration layer.

### Everyone Is Building Their Own "Autonomous Stack"… and It's Duplicative

This is something I'm watching play out at work in real time: a few of my coworkers are independently trying to develop their own "fully autonomous" workflows using the same set of tools and models.

They're all converging on similar patterns:

- Custom repo rules/prompts
- Pre-built sub-agents for recurring tasks (migrations, debugging, refactors)
- MCP integrations for internal context (docs, tickets, dashboards)

The problem is: **everyone is reinventing some version of the same workflow**, and it's not universal across the org.

So even if a few people become 10x with their setup, the company doesn't get a true step-function improvement—because the leverage isn't shared. It stays stuck as "personal productivity wins" instead of "organizational capability."

### The Step-Function Jump Requires Standardization

If companies want real step-function gains in development velocity, they need to treat agentic workflows like internal platform infrastructure:

- **Make a "blessed" default** (the recommended setup every engineer can start with)
- **Centralize guardrails + patterns** (so safety and consistency aren't optional)
- **Package reusable workflows** (debug loops, migration flows, PR chunking, release patterns)
- **Invest in eval loops org-wide** (because that's the real limiter)
- **Create a feedback channel** so the best individual workflows become shared defaults

My bet: **2026 is the year this becomes a real platform function.**

Agentic coding platforms will ship more opinionated, batteries-included defaults, and companies will need to meet them halfway with internal standards. Otherwise you'll keep seeing the same story: a few people doing wizardry, everyone else doing "AI autocomplete," and leadership wondering why velocity isn't increasing as expected.

We're moving from a world of "writing code" to a world of "managing cycles." The faster your loops, the faster you ship.
