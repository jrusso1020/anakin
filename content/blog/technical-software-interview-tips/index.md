---
title: Technical Software Engineer Interview Tips
date: "2020-02-17"
description: Software engineering interviews can be incredibly stressful and difficult. Recently, I went looking for a new job and threw myself back into this anxiety inducing process. In order to perform better in my interviews I came up with a 7 step game plan for technical interviews. This is by no means a fool proof guide to passing technical interviews, but can definitely help you to perform better.
tags:
  [
    "interviews",
    "tips",
    "technical interviews",
    "software engineering interviews",
  ]
---

### Background

Late last year I decided to start interviewing for new jobs. It had been over two years since I had last interviewed, and although I had been working and performing interviews for my employers this doesn't directly translate into keeping up your interview skills(although it does help). So during my preparation which I discussed in a [previous post](/preparing-for-software-engineering-interviews/) I came up with a gameplan to help me perform better during technical interviews. I definitely don't think I am a technical interview master like some of the people you see on youtube and on blog posts, but these methods definitely helped me to perform better.

### Algorithms and Data Structures Coding Challenges

As mentioned during my previous post, I felt it was important to come up with a game plan for all of my coding challenges. Previously I felt like I would just go into technical interviews preparing for questions but when I was in the actual interview I never seemed to follow any set procedure. This would lead me to getting stuck and not being able to find a way out. So in order to combat this and make sure I always had a method where I could keep making progress I came up with the following 7 point plan. This plan may not work completely for everyone, but feel free to create your own or adapt mine to your style.

1. **Restate the problem back to your interviewer in your own words, make sure you understand the question, and ask any clarifying questions.**

I find that the first step to solving a question is making sure that you completely understand the question.This may seem basic, but you would be surprised at how easy it is to misunderstand the question and solve the incorrect problem. Remove any personal doubt that you understand the expected input and output. Also by restating it you may find things you didn't see when initially reading/being told it. Your interviewer may also be nice enough to correct you if you ask if your restatement of the question is correct. However, they may not so it is important that you reread the question and make sure you are solving the right question. Sometimes candidates misunderstand the initial question and don't spend time clarifying it, so they end up solving the wrong question. Often the interviewer won't recognize this right away so you will spend most of your time solving a slightly different or incorrect question and then you will be left with little or no time to solve the correct version of the question. Spend a little extra time at the beginning to make sure you are solving the correct question.

2. **Work through a couple of simple examples of the question, making sure to explain exactly what you are doing as you do it**

You may not always automatically see a solution to a technical question and that is okay. Start off by working with a simple example input with a simple expected answer. A lot of the time they may even give you example input and output. Feel free to work through this example mentally in front of your interviewer. If the example is slightly longer or more complex, make sure to simplify it down. You don't want to spend too much time verbally going through the question. This should be quick so that you can spend most of your time coding.

Start from the input and verbally work to an output, stating exactly how you are solving the problem to the interviewer. Using this method you should start to see a way you can solve this in code. However, it may not always be completely clear from one round of this how you can go from the spoken version to the code version. Maybe your example problem was not complex enough, feel free to do this more than once if necessary using slightly different inputs or statements of the problem. Don't just solve the same problem over and over again because the odds of seeing it differently with the same input are not high. But if you solve the same problem with different inputs, you may see a pattern or method common to both that you can use. Just make sure not to spend too much time on this part.

3. _(OPTIONAL)_ **Write a couple of simple tests at the beginning**

I made this step optional because in practice I never really wrote tests before writing code. However, by doing step 2 I would generally come up with at least 1 test assertion that I would use later. Some companies have a large focus on Test Driven Development which involves writing tests before actually coding up a solution. If interviewing for organizations like this it might be wise to write a few simple tests before coding, however remember you only have a certain set of time. Prioritize finish the coding solution.

4. **Talk through a potential solution at a high level, ask for feedback and if it seems like a reasonable approach**

After working through the problem and coming to a potential solution I could code, I would restate this algorithm and ask my interviewer if that seemed like a good approach. Sometimes I would even write it out in pseudocode here and use those comments to drive my coding and structure. This can be incredibly helpful for yourself to get a quick self review and catch any potential gotchas or edge cases. Also it allows your interviewer to potentially call out any gotchas or edge cases. They may not always give you much feedback though and just say it seems reasonable, but you could potentially save yourself some debugging time by catching something during this step.

5. **Implement your approach, making sure to talk though what you are doing at each step. Feel free to break the problem up and test it at each step before moving on**

Finally the main attraction, time to code. Follow your pseudocode or vocalized approach you stated in step 4. Feel free to break the problem up into subproblems and code and test those individually. Sometimes for more complicated questions, I would make sure I was getting the expected result after each part of the implementation. This way I could fix any small bugs or issues before moving too far. This can help because if you run into a bug at the end it may be hard to find the problem. Lastly make sure you are talking through your implementation so that your interviewer can follow along. You want to make sure you keep the interviewer engaged and they understand what you are doing. Think of it as a paired programming session, where you are working with your interviewer not for them. You want to make sure your implementation is clear and approachable.

6. **Test, debug, repeat**

Your interviewer isn't just going to take your word that your solution works. Once you believe your code is ready, write a simple test and make sure you get the expected outcome. If you don't pass the test case then debug it using breakpoints or print statements(whatever is faster for this case), until you get the desired outcome and have your test passing. After you get the initial test passing try writing some more tests including for edge cases and follow this approach of debugging until all your tests pass.

7. **Ask the interviewer if they think your solution looks okay, or if they have any questions for you**

Lastly once your solution is well tested, ask your interviewer if your solution looks alright or if they have any questions for you. They may ask you why you chose to do something one way or another and make sure you talk about the tradeoffs of each and why you chose your route. They may also ask if there are any optimizations you could make, so make sure you inspect your code and see if you could use any smarter data structures or approaches to solve the problem now that you have an answer.
