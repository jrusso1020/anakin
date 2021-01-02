---
title: "Commenting Code: School vs Industry"
date: "2020-12-26"
description: Back in school, teachers and TAs made commenting your code seem like a necessity that everyone constantly does as a software engineer. Without comments, you shouldn't consider your code complete. However, since working in industry I find it much different in practice. This post outlines my own observations on when software engineers actually comment their code and when it's important.
tags:
  [
    "software engineering",
    "software development",
    "commenting code",
    "documenting code",
  ]
---

## Commenting Code in School

In school, professors and teaching assistants constantly talked about the need to write comments in your code in order for other people to properly read and understand what you had done. Although you want to ensure others can read your code, in practice commenting your code is not always the best or most necessary way to ensure readability. Thinking back on school, comments were most likely meant as a way to ensure TAs could understand what you were trying to do while reading your code. When you are first learning to program it's definitely necessary to add a little context to outside readers. However, the larger reason for commenting code in classes was to learn how to properly write technical documentation. As a software engineer you need to be able to properly write technical documentation, and you can initially develop this skill by writing comments in your code. Later in this post, I will try to separate out commenting your code and writing documentation since in practice they are a bit different.

## Code Commenting in Industry

A junior engineer might quickly notice the lack of comments in a real codebase. In a production codebase engineers should strive to break up and write their code in a readable and digestible way. This in turn leads to less inline comments being needed. Code reviews, linting tools, and formatting tools can help ensure readable and digestible code by automatically looking for code smells(a sign of a deeper problem) and readability issues in your code. Properly naming your functions and variables can go a long way instead of using comments. Clearly written code can help cut down on unnecessary comments. However, this doesn't mean that comments don't exist in industry codebases.

### Comments for Complexity or Edge Cases

I've seen three main reasons for commenting code in professional codebases. The first normally occurs around a particularly complex bit of code, sometimes written to handle edge cases. Generally speaking, software engineers generally write straightforward code, similar to other code paths. However, every once in a while, someone has to solve a particular nuanced business case, handle a weird edge case, or use a rarely used piece of a programming language/framework/library. It might be necessary to write comments in your code to let future users know what you are doing and why. One example from my recent work, I had to write some complex date and datetime manipulation logic for scheduling. This was a little more complex than the day to day work of CRUD operations, so it made sense to write comments about what the code was doing and why. It also had a lot of edge cases that required proper code documentation as well. This allows future code readers to know why the code has added complexity and what it is trying to accomplish. Below is an example of a nuanced business function. The TLDR is that the function takes a date and a day of the week, the date can be the same day of the week or an earlier date. If it's an earlier date we want to push it forward to the right day of the week (in practice this is explained in the functions documentation).

```Elixir
def push_forward_to_correct_day(%Date{} = date, day_of_week) do
  # gets the numerical day of week expected to send on value [1,7](mon-sun)
  numerical_day_scheduled = Timex.day_to_num(day_of_week)

  case Timex.weekday(date) do
    # the previous date was pushed back to a date in the same week, let's shift to the same day of the week
    date_day_of_week when date_day_of_week < numerical_day_scheduled ->
      Timex.shift(date, days: numerical_day_scheduled - date_day_of_week)

    # the previous date was pushed back to the previous week, let's push it forward to the correct day of the week
    # we do this by pushing it forward to the correct week, then subtracting days
    date_day_of_week when date_day_of_week > numerical_day_scheduled ->
      Timex.shift(date, weeks: 1, days: -(date_day_of_week - numerical_day_scheduled))

    # the previous date was on the correct day of the week, do nothing
    date_day_of_week when date_day_of_week == numerical_day_scheduled ->
      date
  end
end
```

### Comments for TODOs

Another reason for commenting code is leaving TODOs or other notes for things that weren't handled yet but should be. This isn't something I necessarily agree with, and think engineers should strive to limit as much as possible. TODOs in general should be seen as technical debt since you are aware of something more that you could do to improve your codebase. TODOs are a good way to callout things that need to be done, but more often than not, they will not be handled in a timely manner and if they could be handled with a little more time you should do your best to handle it. Nevertheless, if you are in the process of developing or refactoring, it is okay to leave yourself TODOs to remember to come back to them. Startups need to move fast and therefore acquire a lot of TODOs and other tech debt, so they are common in such an environment.

```Elixir
# TODO: Make this function handle other currencies besides USD
def add_balances(usd_balance_amount, usd_balance_amount) do
  usd_balance + usd_balance
end
```

### Documenting your code inline

The third main reason I've seen in practice for commenting code is to document your code inline. Documentation in general is a whole other topic we'll discuss next, but inline documentation is a good practice to have. This doesn't mean commenting every line of your code, but is generally used as a way to document your functions/methods(functionality as well as parameters and return values) and modules/classes. Some languages have ways to generate documentation from inline documentation, and if you are using one of these languages take advantage of it and write documentation! Elixir is a language that is great for this because you can write method documentation and module documentation that you can auto generate and even deploy and host publicly for free. This provides a great developer experience for open source projects and can even be used to host internal documentation. Elixir even goes a step further and allows you to define and run tests for functions in your documentation, which documents your functionality with examples and adds tests. Check out an [example in the Elixir codebase](https://github.com/elixir-lang/elixir/blob/master/lib/elixir/lib/calendar/date.ex) to see what good inline documentation looks like.

## Code Documentation

Although classes focused a lot on code comments, in practice technical writing in software and CS classes really tried to get at the need for proper technical writing and documentation skills. Anything from code comments to technical design docs can be seen as documentation. Commenting your code is the first step to documenting your work, but at companies it's important to go a step further to ensure that you have well documented code for any new engineer to learn and understand your system or codebase. Instead of focusing so much on commenting your code in line, I think it's more valuable to write up technical documentation. A lot of the time technical design documents which are written prior to writing code and used to outline the high level approach and tradeoffs of a project or system, can be used for future developers to gain context. However, in practice systems can change from the initial design doc. Therefore it's also important to write up documentation after finishing a project. Documentation can allow you to outline both at a high level how your code or system works, as well as go into more detail and give examples(code snippets) of how others can interact and extend your code for the future. So although it is valuable and important to learn how to write in line comments, I think it's more important to focus on high level documentation of your code and being able to write clear, readable code. Inline auto documentation can be a part of this, but sometimes this isn't enough or high level enough to see how multiple interweaving parts interact. So instead of writing comments throughout your code, document your code!
