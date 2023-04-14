---
title: Tooling Changes
description: 
date: 2016-12-19
headerImage: 
categories: [Miscellaneous]
tags: post
---

I’ve been doing some different work lately; building and writing about some IoT projects, writing some whitepapers, working on some documentation for Microsoft, and writing a bunch of code (Ionic, TypeScript, and more). I noticed that I’ve been spending a lot of time lately with some tools I’ve not used much lately. I thought I’d write about it here.

Markdown & MarkdownPad
======================

All of the IoT tutorial work I’ve done recently for AT&T, and all of the documentation work I’m doing for Micosoft have been in markdown([https://daringfireball.net/projects/markdown/](https://daringfireball.net/projects/markdown/)). I remember when I first encountered an .md file, it was in the readme files for the Apache Cordova team. I did some searching online and couldn’t find anything about the file extension, so I had to ask the Cordova dev team what it was. I haven’t found a good markdown editor on the Mac, but I’m a huge fan of MarkdownPad ([https://markdownpad.com/](https://markdownpad.com/)) although it seems to have been abandoned by its author – the last update was in 2013. That’s unfortunate as it’s the best, and most professionally produced, markdown editor I’ve found for Windows.

The biggest requirement for me is to be able to view the markdown alongside the output, so I can clearly see how my work will be formatted online. MarkdownPad does this for me, other Windows editors I’ve used (Visual Studio Code, JetBrains WebStorm, and many others) simply don’t do that.

When I started working for AT&T and Microsoft, it was the first time I’d worked with markdown files with embedded image files – I quickly learned that MarkdownPad doesn’t deal with that very well – the two sides of the editor window (code and output) don’t stay in sync when you’re linking in images into your files. MarkdownPad is also not compatible with Windows 10, you have to install some extra software to get it to work, and even that’s buggy. That’s too bad, I wish Evan Wondrasek would update his app.

Git
===

I’d used git and github before, mostly for managing my own code and accessing others. My work at AT&T and Microsoft have forced me to actively interact with others in multiple code repositories, so I’ve gotten more experience with it. I’ve even become a more frequent user of git integration in WebStorm, PyCharm, Visual Studio Code and more. I haven’t yet had to recover from some shoddy coding, but integrating Git into my development workflow has made me more confident.

Visual Studio Code
==================

I became a big fan of WebStorm when I learned it had Apache Cordova support, and I wrote a bunch of code using the IDE. I even adopted PyCharm (a Python IDE from the same codebase) when I taught myself Python this year. At Microsoft, I’ve started using Visual Studio Code for all of my typescript and Ionic coding. It’s a really great IDE, and, with all of its available plugins, it’s very capable. I want to use Visual Studio for my Ionic coding, mostly because of the testing and debugging capabilities Visual Studio Tools for Apache Cordova gives me, but the lack of a terminal window in Visual Studio forces me to leave Visual Studio to use the Ionic CLI to add pages, providers and so on. This isn’t a big deal, and I expect I’ll spend more time in Visual Studio than Visual Studio Code going foreward. I’m still pretty impressed with what Code provides, how often Microsoft updates it, and how many cool plugins are available. It’s going to be fun to see what happens with this tool over the next 18 months.