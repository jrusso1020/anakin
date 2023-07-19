---
title: "Mastering the Art of Seeking Help: How Software Engineers Can Get the Perfect Answer, Faster!"
date: "2023-07-19"
description: In this blog post, we explore the art of seeking help as a software engineer, emphasizing the significance of providing context and prerequisites to ensure clear and actionable responses. By structuring inquiries with relevant details like issue descriptions, code snippets, and error logs, engineers can obtain quicker and more accurate solutions. Whether seeking assistance internally within a company or externally in developer communities and open-source projects, these skills foster a positive, supportive, and successful community. Mastering this art empowers engineers to make meaningful progress in their projects while contributing to a thriving knowledge-sharing community.
tags: ["questions", "help", "mentorship"]
---

## Background

In the fast-paced and collaborative world of software engineering, seeking help is crucial for both individual growth and project success. Engineers often encounter challenges that require guidance or assistance, and the effectiveness of their help-seeking approaches can significantly impact their productivity. This blog post explores the significance of effective help-seeking and the negative impact of poorly formulated questions. We will compare the outcomes of seeking help with clear context and prerequisites to the results when lacking essential information. The two main types of help-seeking scenarios we will examine are seeking assistance with unexpected output, such as errors or bugs, and seeking guidance or mentorship for specific tasks or requirements.

## Types of Help Seeking

### Seeking Help with Unexpected Output (Bugs)

When faced with unexpected output, such as errors or unusual behavior from software or tools, the first step should be independent troubleshooting. Developers should conduct cursory searches externally, utilizing resources like Google and chat bots, and internally, by referring to company knowledge bases, Q&A systems, and communication platforms like Slack. Often, someone else has encountered and resolved the same issue before.

If self-service efforts are unsuccessful, crafting a clear and concise help request becomes essential. A well-structured help request includes the following information:

1. **Task Description**: Explain the task or objective you were working on at a high level.
2. **Action(s) Taken**: Detail the specific actions you attempted with the software or tool.
3. **Error Output**: Share the error message or unexpected output you encountered.
4. **Previous Attempts**: Include the steps you've already taken, links to documentation or search results you've explored, and any help you've already sought.

Before submitting the request, review it yourself, which may lead you to self-unblock or gain insights for further investigation. Once you've exhausted these efforts, send the request to the appropriate channel or forum. Starting with your immediate team is a good idea as someone may have encountered the issue before or have relevant context. If no one on your immediate team can help, escalating it to the owner of the domain or tool is a reasonable next step. Engage in any back-and-forth discussions, and keep others informed of any remediation progress or successful solutions. Updating relevant documentation further contributes to a supportive knowledge-sharing community.

In some cases, workflows and templates are designed to gather essential information in help requests, such as GitHub issue templates in larger open-source projects or internal Slack workflows. These templates guide users to provide the necessary context for more efficient problem-solving. For instance, a typical template might include sections like description, expected behavior, actual behavior with screenshots, reproduction steps, impact, and environment details.

#### Hypthetical Scenario and Example

Let's create a hypothetical scenario where a software engineer is using a command-line tool to compress a file, but encounters unexpected output in the form of an error message. Here is an example help request

Subject: Help Needed - Issue with Compressing File

Hi everyone,

I'm using the compress CLI tool to compress a file, but I encountered an error.

Task Description:
I want to compress myfile.txt to myfile.zip using the compress command with --level 10 for high compression.

Action Taken:
I ran this command:

```
compress --input myfile.txt --output myfile.zip --level 10
```

Error Output:
Received this error:

```
Error: Failed to compress file. Reason: Input file not found or inaccessible.
```

Previous Attempts:
I searched externally and internally but couldn't find a solution. The file exists, and I have proper permissions.

Any help to resolve this would be appreciated!

### Seeking Guidance or Mentorship

The other common type of help request involves seeking guidance or mentorship to solve higher-level problems or integrate with existing software. Such requests often arise during the technical design phase of a project or while building it, requiring domain experts' advice. A common scenario is when designing an integration within an existing software platform and needing guidance from the team that owns the underlying platform, who are domain experts. To ensure effective guidance-seeking, avoid the ["XY problem"](https://xyproblem.info/) pitfall, where you focus on a specific solution or roadblock without providing enough context about the underlying problem.

When seeking guidance or mentorship, follow a similar approach as with unexpected output:

1. **Problem Context**: Start with a high-level description of the problem you're trying to solve, including any relevant technical or product documents.
2. **Previous Research**: Mention any previous research or search efforts you've undertaken.
3. **Proposed Solutions**: Share any solutions you've considered or attempted and explain your reasoning.
4. **Roadblocks**: If you've encountered roadblocks, include them, but remember that the recommended approach might be entirely different.

Engage in discussions, make decisions on the best approach, and update the thread with your chosen path, along with any documentation updates to assist future engineers.

#### Hypthetical Scenario and Example

**Hypothetical Scenario:**

As a software engineer, you've been tasked with implementing a new feature for an e-commerce platform. The requirement is to develop a "Recommended Products" section on the product detail page, which suggests related products based on the user's browsing history. While you have some ideas on how to approach this, you're unsure about the most efficient and scalable way to achieve it. You decide to seek guidance from more experienced developers to ensure you're on the right track.

**Example Help Request:**

Subject: Seeking Guidance - Implementing "Recommended Products" Feature

Hello everyone,

I'm working on implementing a "Recommended Products" feature for our e-commerce platform and could use some guidance.

**Problem Context:**
The task is to create a section on the product detail page that displays recommended products to users based on their browsing history. We want to enhance the user experience by suggesting relevant items that align with their interests.

**Previous Research:**
I've done some initial research both externally and internally to explore different approaches. While I found some general strategies for recommendation systems, I'm unsure which method would be the most suitable for our platform's scale and user base.

**Proposed Solutions:**
I'm considering two potential approaches:

1. Collaborative Filtering: Using user history and behavior to recommend products based on similar users' preferences.
2. Content-Based Filtering: Analyzing product attributes and metadata to suggest items with similar characteristics.

**Roadblocks:**
I'm concerned that my proposed solutions might not be the most efficient or effective for our specific use case. Additionally, I'm unsure about the data processing and storage requirements for implementing these recommendation strategies.

**Help Needed:**
I would greatly appreciate your insights on the best approach for our "Recommended Products" feature. Which method do you think would be more suitable for our platform? Are there any other recommendation algorithms or strategies I should consider? Additionally, if you have any tips on data processing and storage for handling a large number of users and products, that would be incredibly helpful.

Once we decide on the approach, I'll proceed with the implementation and keep you updated on the progress.

Thank you for your time and expertise!

## Conclusion

Mastering the art of seeking help is a crucial skill for software engineers. Providing clear context and prerequisites when asking questions leads to more efficient problem-solving and fosters a positive, supportive, and successful community. By following the best practices outlined in this blog post, engineers can unblock themselves, receive faster and more accurate assistance, and contribute to a thriving knowledge-sharing ecosystem. Empowered with these skills, engineers can confidently tackle challenges, make meaningful progress in their projects, and collectively drive innovation in the world of software development.
