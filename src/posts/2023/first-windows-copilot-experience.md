---
title: First Windows Copilot Experience
description: 
date: 2023-10-21
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Miscellaneous
---

I've been a GitHub Copilot user since the public beta; a former colleague was a PM on the Copilot team, and I was able to reach out to her directly to get on the beta. Using GitHub Copilot in Visual Studio Code dramatically improves my efficiency writing code, especially for NodeJS or React Apps. I've also been doing a lot of work in Generative AI (GenAI) for my day job at Oracle.

I get the benefit of GenAI tools in Developer tools, that makes sense to me. Even GenAI in Google and Bing search as well as the command/terminal window makes some sense to me since I'm in that interface while I'm trying to do things. When Microsoft announced Copilot for Windows then automatically installed a pre-release version of it on my Windows system, I really didn't get it. I didn't see (and I still don't see) the need for a chat interface in Windows. I couldn't possibly think of anything I'd want to do with it.

I knew I could, for example, use Copilot to open Microsoft Word by, you know, typing in Word in the chat interface and letting Copilot open it for me. Unfortunately, I already had an easier way to do that: press the Ctrl and Esc keys simultaneously then type word and press the enter key. Copilot would prompt me to agree that I wanted to open Word, the other approach I just outlined was faster, much faster.

Fast forward to about two weeks ago and I was working on my presentation for the [All Things Open](https://www.allthingsopen.org/){target="_blank"} (ATO) conference and I came up with the perfect use case for Copilot. My session was about [zx](https://github.com/google/zx){target="_blank"} and one of my arguments for using zx was for situations where I wrote a shell script (macOS) and command file (Windows) to automate something in one of my development projects that I worked in on macOS and Windows. I knew I'd done that a few times in the past and I wanted to use one of those projects as a case study for my session. Unfortunately, I couldn't for the life of me remember which projects I'd done that in.

I tried to use Search in a Windows command prompt to find all the folders that contained a `.cmd` file, but that found all sorts of detritus in the `node_modules` folders in my Node projects as well. What I really wanted was the way to search for all folders that contained both `.cmd` and `.sh` files but I couldn't figure out how.

Suddenly I had a use case for Windows Copilot!

I quickly opened up Windows Copilot and typed in the following prompt:

```text
List all of the folders in d:\dev and sub-folders that contain both .cmd and .sh files
```

It responded with:

```text
I’m sorry, but I don’t have the ability to access or manipulate files on your computer.
```

Sigh, that isn't very helpful. One of the few other use cases I came up with related to using Copilot with prompts like "help me find the august-budget spreadsheet" but if Copilot can't view or interact with the file system, it's more than useless.

Next, started typing out the following response:

```text
However, you can use the find command in your terminal to search for specific file types in a directory. Here’s an example of how you can do it:

# For .cmd files
find /d/dev -name "*.cmd"

# For .sh files
find /d/dev -name "*.sh"

These commands will list all the .cmd and .sh files in the /d/dev directory and its subdirectories. You can then manually check which directories contain both file types. Please replace /d/dev with D:\\dev if you are using Windows Command Prompt.
```

{% image "src/images/2023/windows-copilot-01.png", "Windows Copilot Response", "image-full" %}

This proves that Copilot understood very little of the intent of the prompt I entered.

No only did it miss that I wanted only the folders that contained both types of files, it completely missed that I wanted to do this on a Windows system. I asked the question in Windows, why would it give me instructions for linux and macOS and only offer the Windows command option as an afterthought? You'd think Copilot had at least that context; apparently it doesn't.

Even more evidence that I wanted a Windows response was the fact that the target folder I asked it to start with was a Windows/DOS filepath. 

Thinking I could help it out with a more precise prompt (that's the whole point of prompt engineering, right?) I decided to specifically tell it I only wanted folders listed that contained both types of files:

```text
List all of the folders in d:\dev and sub-folders that contain only both .cmd and .sh files.  I only want folders returned that contain files of both types.
```

Unfortunately, the response I received back was exactly the same as the previous one.

I know this is a pre-release feature and I'm glad Microsoft is letting me try it out, but this isn't even pre-release quality. Delivering a chatbot on Windows that doesn't have access to the file system is just stupid.

Another issue I have with Copilot is that every time I open it, it hides the Windows taskbar. I don't know if this is on purpose or a bug, but even though I'm entering a chat experience doesn't mean I want to abandon core Windows features (like the taskbar and Start menu).

This not a very good start for technology that's supposed to transform the Windows experience.
