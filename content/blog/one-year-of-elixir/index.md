---
title: "One Year of Elixir: How it compares to Ruby"
date: "2021-02-21"
description: Last year I started a new job at Brex where Elixir is the primary programming language for business logic. This was my first real adventure into Elixir after working in Ruby (mostly) for my professional career. Since José Valim came from the Ruby world, Elixir was a common buzzword I heard for years. I had done a tutorial or two here and there but never gotten to really use it. Now, looking back at the past year I've become fairly comfortable with Elixir, and wanted to outline some of the things I really enjoy about Elixir and some of the things I miss from Ruby.
tags: ["elixir", "ruby", "comparison"]
---

Last year I started a new job at [Brex](https://brex.com) where Elixir is the primary programming language for business logic. This was my first real adventure into Elixir after working in Ruby (mostly) for my professional career. Since José Valim came from the Ruby world, Elixir was a common buzzword I heard for years. I had done a tutorial or two here and there but never gotten to really use it. Now, looking back at the past year I've become fairly comfortable with Elixir, and wanted to outline some of the things I really enjoy about Elixir and some of the things I miss from Ruby.

## The Good Parts of Elixir

First off there are lots of great things about the Elixir programming language. This post by no means is going to cover all them or talk about when you should use Elixir vs Ruby. These are solely a few of my opinions and observations I've gathered over the past year on Elixir coming from a Ruby (on Rails) background.

### Processes and Concurrency (No Global Interpreter lock)

[Processes](https://elixir-lang.org/getting-started/processes.html) are an abstraction built into the language (thanks erlang), that are extremely lightweight in terms of memory and CPU and allow code to run in isolation and concurrently. Processes provide the building blocks for concurrency in Elixir and allow us to write distributed and fault tolerant code. Because of processes writing concurrent code in Elixir is incredibly simple and straightforward. However in Ruby, there is the concept of the Global Interpreter Lock (GIL) which prevents multiple Ruby threads from executing at the same time.

### Great Documentation

Elixir does a really good job when it comes to documentation. Via hexdocs, developers can easily write documentation inline with their code and then generate and host it for free! This makes it incredibly low effort to create documentation for your OSS. The Elixir language and other libraries developed by the core team take full advantage of hexdocs, creating very robust documentation. Hexdocs are very well designed which makes them incredibly easy to read and navigate as well. You can even write and run tests from documentation which is a great way to write multi-purpose code examples in your documentation. Just take a look at the [Elixir DateTime docs](https://hexdocs.pm/elixir/DateTime.html#content), the below `@doc` module attribute will generate the hexdocs and the examples will be run during tests just by adding `doctest DateTime` to the xxx_test.exs file.

```elixir
@doc """
Compares two datetime structs.
Returns `:gt` if the first datetime is later than the second
and `:lt` for vice versa. If the two datetimes are equal
`:eq` is returned.
Note that both UTC and Standard offsets will be taken into
account when comparison is done.
## Examples
    iex> dt1 = %DateTime{year: 2000, month: 2, day: 29, zone_abbr: "AMT",
    ...>                 hour: 23, minute: 0, second: 7, microsecond: {0, 0},
    ...>                 utc_offset: -14400, std_offset: 0, time_zone: "America/Manaus"}
    iex> dt2 = %DateTime{year: 2000, month: 2, day: 29, zone_abbr: "CET",
    ...>                 hour: 23, minute: 0, second: 7, microsecond: {0, 0},
    ...>                 utc_offset: 3600, std_offset: 0, time_zone: "Europe/Warsaw"}
    iex> DateTime.compare(dt1, dt2)
    :gt
"""
@doc since: "1.4.0"
@spec compare(Calendar.datetime(), Calendar.datetime()) :: :lt | :eq | :gt
def compare(...) do
...
```

### Pattern Matching

When I was in college I took a functional programming course which taught me [OCaml](https://ocaml.org/). This was my first foray into functional programming and way back then I realized how incredibly powerful and useful pattern matching was. No more complex and hard to read switch/if statements. So when I first started writing Elixir, I was excited to get to use [pattern matching](https://elixir-lang.org/getting-started/pattern-matching.html) again. For example, the `=` sign is the match operator in Elixir not assignment. Pattern matching allows us to match simple values, data structures, and even functions. So what does this look like in practice?

Here we can see how we can extract values of a tuple into variables. We also see an example of the pin operator `^` which will match the current value vs extracting it into a variable. This makes writing assertive code straightforward.

```elixir
iex> {a, b, c} = {:hello, "world", 42}
{:hello, "world", 42}
iex> a
:hello
iex> b
"world"
iex> ^c = 34
** (MatchError) no match of right hand side value: 34
```

Another example of the power of pattern matching is to dynamically dispatch functions based on the parameters. For example the below shows the `first` function defined to handle three different parameter patterns and dynamically choose the correct function definition.

```elixir
def first(nil), do: nil
def first({x, _y}), do: x
def first([x | _rest]), do: x
```

And lastly it can be great for control flows via `case` statements or `with` statements like the below, which will only continue along the current flow if the previous pattern matches. For example, `coordinate` must be a three-tuple, and each `evaluate` function must return an ok tuple to do the final addition. If any pattern doesn't match it will go to the `else` clause and attempt to pattern match there to return 0 (There is a scenario where no pattern matches though and we get a `MatchError`)

```elixir
with {x, y, z} <- coordinate,
  {:ok, x_val} <- evaluate(x),
  {:ok, y_val} <- evaluate(y),
  {:ok, z_val} <- evaluate(z) do
  x_val + y_val + z_val
else
  nil -> 0
  {:error, _reason} -> 0
end
```

### Standard Library and Built in Tooling

The Elixir standard library comes with a number of useful functions and modules, as well as first class tooling. First off Exunit and async tests are a big win over Ruby. When working in Ruby, the first thing was to pull in RSpec and any necessary matchers, but in Elixir this isn't necessary because exunit is built into the language. You have a test framework out of the box, and it allows you to run tests asynchronously as well! This was a huge pain point back when I was in a Ruby on Rails monolith, running all the tests synchronously just got slower and slower over time but in Elixir even in a large service it's relatively fast with async tests runs. Another great built in tool in Elixir is [Mix](https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html) which is "a build tool that ships with Elixir and provides tasks for creating, compiling, testing your application, managing its dependencies and much more." Mix allows you to quickly and easily 1) start new Elixir projects via `mix new`, 2) manage your dependencies and retrieve them via `mix deps.get`, 3) run tests via `mix test`, and 4) format your code to make it easy to read and digest via `mix format`. In Ruby this would be replaced by about 4 separate tools: `rails new` or templates for starting new projects, 2) bundler for managing and retrieving dependencies, 3) RSpec for running tests, and 4) Rubocop or another third party tool for formatting and checking your code. This makes it incredibly straightforward and easy to get a project up and running with ease.

### Pipes

Pipes (`|>`) are a great way to easily chain function calls together in Elixir, similar to how you would chain function calls in Ruby. Before I knew becoming acquainted with Elixir, pipe operators were a bit confusing, but after a quick introduction you can easily spot them and understand the flow of code.

In Ruby, function chains may look something like

```ruby
text.
  downcase.
  replace_non_words_with_spaces.
  drop_extra_whitespace.
  join_with_dashes
```

but in Elixir we can use pipes to accomplish this like so

```elixir
title
|> String.downcase
|> String.replace(~r/\W/, " ")
|> String.split
|> Enum.join("-")
```

## The Things I Miss From Ruby

That being said, there are still a lot of good things about Ruby and some things I miss. These are probably the biggest two things I’ve really missed over the past year.

### The Community and Resources

Personally, the greatest thing about Ruby is the massive community and resources around it. Ruby started in 1995 whereas Elixir is a lot newer, being initially released in 2011. Ruby and Ruby on Rails have gained massive user bases and because of this have a huge number of resources. One of the best things about Ruby is the fact that there will almost always be a library(gem) for what you want to do and they generally are well maintained. On top of that there's a plethora of tutorials and resources to learn Ruby. A big pain point with Elixir is the smaller community and lack of open source libraries. Although there are a lot of learning resources for new Elixir developers. There's also a lot of great libraries built by the core Elixir team for most needs, but there's still not a lot of libraries in comparison to other languages. At Brex, we have needed to write a number of internal Elixir libraries for our specific needs or for third party services which don’t have an SDK in Elixir. A couple of other issues are that a lot of Elixir libraries aren't well maintained and go dormant often or are maintained by a single maintainer which makes it hard to get updates in a timely manner. That being said Elixir is still a fairly young language and with its continued growth hopefully it will improve.

### Monkey Patching

_Edit: Since initially publishing this article I have gotten helpful comments/emails about how you can implement monkey patching in Elixir. It involves copying the given library's full module into your codebase and changing the necessary code to fit your needs. This will override the libraries implementation with your custom code. Although I was familiar with hot code reloading in Elixir this did not come to mind as Monkey Patching. Also I think the main reason I have not seen this in Elixir is because it is an antipattern that should be avoided. For what it is worth, I think what I truly miss is Ruby's ability to easily override a library's singular function with ease but in Elixir this would require redefining the whole module and changing bits and pieces. I will leave the original paragraph below though for posterity._

Monkey patching is a way to extend or change a Ruby class, including within libraries, dynamically by writing code directly into your project. This makes it incredibly easy to personalize or customize library functionality for your personal needs or patch a bug as a stop gap until the underlying library can be fixed. In Elixir you can wrap open source libraries with your own code to extend or personalize it but this can be a lot of boilerplate and extra code to just add a simple change. More often than not this may also involve writing a macro which [should generally be avoided whenever possible](https://hexdocs.pm/elixir/master/library-guidelines.html#avoid-macros). However, this doesn't allow you to fix bugs in an underlying library like monkey patching does. You would need to fork a library and make the change yourself then point your project to your branch in order to do this without waiting for the underlying library to be fixed.
