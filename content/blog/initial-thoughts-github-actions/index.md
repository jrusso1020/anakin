---
title: Initial Thoughts on Github Actions
date: "2023-02-14"
description: Over the last few months I've started to use Github Actions in some of my personal projects. This post goes into some quick initial thoughts on the product and experience.
tags: ["github actions", "cicd", "workflow automation"]
---

# Background

Although over the years I've used different continuous integration and deployment(CICD) and workflow automation tooling at my places of work, I've mostly used [CircleCI](https://circleci.com/) as my personal project CICD framework/service. This was initially because CircleCI had a free tier and was easy to use. In general I haven't had any real issues with CircleCI, it's worked well for my small side projects but its free tier is only valid on public repos. This limits the projects you can utilize it for without paying for the service. It's also important to note that when I initially started using CircleCI, Github Actions didn't exist as it was launched in late 2018. In December of 2022, I was working on a new side project that I didn't want to make public and thought it would be a good chance to check out Github Actions and investigate it for future uses. This post will go into some of my initial thoughts and impressions of github actions. Please note that I've only used it for fairly trivial things like deploying a React app to AWS s3.

## Lots of Open Source Actions

First off Github has an entire [marketplace](https://github.com/marketplace?type=actions) of open source github actions that you can easily pull into your project. This makes it super easy to get up and running with common workflows for small applications. So for folks looking for easy to setup CICD for side projects github actions make a lot of sense.

## Free Tier for Private Repos

Free tiers are super important for side projects. In general, folks just want to hack things together and learn. Having to pay for services stifles learning because it creates a barrier for entry. Although I can definitely afford paying for small services for my own side projects this is not always true for others. Even if you can pay to host and maintain your side project, it can still stifle learning because of additional setup to hook up a credit card and create payments. CircleCI was my initial choice for side project CICD because of their generous free tier. However, they only allow their free tier to be utilized by public repos. Although most of my side projects have no issues being public, that isn't always the case and I have chosen to avoid certain projects where I'd rather not publicly display the code.

However, this is no longer the case with Github Actions! You can check out their [pricing](https://github.com/pricing) online but the TLDR is that you get 2000 CI/CD minutes per month for private repos via Github Actions (and free for public repositories). This is a great feature of Github Actions which make them a super easy choice for adoption when utilizing Github to host your code.

## Black Box and Lack of In Depth Examples

There are a couple of issues though that I noticed with Github Actions (at least from my perspective). The first is that the giant open source marketplace creates a black box effect. In general unless you go in and read the code of the actions, the action's implementation is hidden from you. And even if you do go and read the github actions it may utilize other open source actions creating a nested set of black boxes that you need to slowly unravel. In general other CICD platforms also have open source/premade plugins you can pull into your CICD workflows, however Github Actions have automated almost every potential command invocation/workflow for simple apps. Generally other CICD platforms will show examples where you can more easily understand the flow because you are still invoking the same commands in your workflow that you would locally. Github Actions have abstracted even lots of these basic commands which makes it a lot harder to understand everything that is going on.

Furthermore, there are little to no in-depth examples of implementing some of these basic workflows yourself. Instead the [examples](https://docs.github.com/en/actions/examples/using-scripts-to-test-your-code-on-a-runner) are overall lacking and use the open source actions greatly leading to more confusion. This makes it very hard to write your own github actions using non open source actions. An improvement here would be more detailed documentation to write github actions yourself utilizing the native commands you would use locally.

That being said this may not be an issue for everyone, some folks may enjoy the black box abstraction that allows them to not worry about the underlying implementation.
