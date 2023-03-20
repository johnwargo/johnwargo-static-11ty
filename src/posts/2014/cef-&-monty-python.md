---
title: CEF & Monty Python
description: 
date: 2014-08-04
headerImage: 
categories: [Miscellaneous]
tags: post
---

Note: The original title for this post was supposed to be ‘How is the Chromium Embedded Framework Documentation like a Sketch from Monty Python’s Meaning of Life?’ but the title was just too long.

I was getting some exercise yesterday and came up with an idea for an app I wanted to write. The app needed to work for Windows as well as Macintosh, so I started thinking about how I’d do it. I’m a big Delphi developer, and the recent Delphi tools support Windows & Macintosh, but I imagine other folks would be interested in this thing, so doing it in something that required a commercial software license to maintain didn’t make sense.

Next I started thinking about whether I could do it as a Cordova application. Windows is a supported platform for Cordova, so that would work, but Macintosh support is only available pre-3.x. I could probably dig up some work in progress OS X support somewhere, but if it’s not part of the core, it didn’t make sense for me.

Then I started thinking about Adobe Brackets. This code editor worked on Windows, OS X and Linux, so they’d clearly picked an approach that worked on each. It’s written using web technologies, so that would work for the app I wanted to build.

I started digging into the Brackets code to see how they’d done it. A while back, a colleague convinced me that Brackets was written in PhoneGap, but in reading around on the blogs it quickly became clear that it was created using the Chromium Embedded Framework ([https://code.google.com/p/chromiumembedded/](https://code.google.com/p/chromiumembedded/)).

![](images/stories/2014/cef-site-640.png)

Figure 1

So, I started digging around in the CEF documentation and found a bunch of information. There was an introduction page at [https://code.google.com/p/chromiumembedded/](https://code.google.com/p/chromiumembedded/), a tutorial at [http://code.google.com/p/chromiumembedded/wiki/Tutorial](http://code.google.com/p/chromiumembedded/wiki/Tutorial) and some general usage stuff at [http://code.google.com/p/chromiumembedded/wiki/GeneralUsage.](http://code.google.com/p/chromiumembedded/wiki/GeneralUsage.) Nice! I love it when an open source project has actual guides (that’s one of the things I love about Apache Cordova).

I quickly read through all of that material and quickly discovered that after reading all of it, I still didn’t understand how it ‘worked.’ The materials talked about where to download the stuff and how to build it, but nothing about how to ‘use’ it. The tutorial and usage guides talked about threads, callbacks, plugins and all sorts of stuff, but nothing about how to actually ‘use’ it. It’s clear that after I downloaded all of these files, I had something I could run and use, but how did I actually make it do what I wanted it to do?

Sigh.

I scanned through the stuff again and still didn’t see it. I saw all sorts of source code and highly technical stuff, but not what I needed to know to make an application that did what I wanted to do.

Even the Brackets source didn’t help me as it’s just the source code for the app and there was some external process for building it into the actual platform-specific executables. Sigh again.

  
Finally, I started searching around again to find some post or article somewhere that told me what I needed to do to make this thing my own. I finally stumbled on an article from Intel at [https://software.intel.com/en-us/html5/blogs/an-html5-project-with-chromium-embedded-framework.](https://software.intel.com/en-us/html5/blogs/an-html5-project-with-chromium-embedded-framework.) Here they told me exactly what I needed to do to make the CEF my own – open a configuration file and edit a particular variable to point it to the web application content you want to load.

![](images/stories/2014/cef-intel-page.png)

Figure 2

Ah ha! That’s what I needed to know. All that other stuff about threads, plugins, callbacks and so on is interesting, and that’s information I’ll eventually need, but for now I simply need to understand how to get started. All those pages of content and somebody simply forgot to add the important part – how to specify what content is loaded into the browser container.

So, apparently, for each target platform, you have to specify the content you want loaded in the browser, then use the build process to package it all together into the executable you need. Tada!

The issue for me is that developers working on open source projects are so excited about the technical stuff that they skip the getting started stuff and jump to the ‘important’ stuff. So much of the ‘documentation’ out there is written, in my eyes, from the standpoint that you already know how to do this stuff. I’m not kidding, most every time I take a look at one of these projects, I struggle to get past all the unimportant stuff in order to be able to find the simple, everyday, what do I do with this thing.

That’s why I write my articles and books the way I do – I assume NOTHING and expect that if you’re brand new to a topic, what I’m providing will give you everything you need. If you’re already familiar with the topic, I expect that you’ll be able to scan the content in order to find interesting tidbits. If you read the reviews of my more recent books on Amazon, you’ll see that people seem to agree.

Developers, please listen to me. When you’re documenting your stuff, assume nothing. Let me decide what’s important and what’s important – just document everything STARTING AT THE BEGINNING.

Want to hear a little confession from me? I’ve honestly never manipulated an XML document programmatically. Yep, that’s true. Want to know why? Because I could never figure out how to do so. When I first tried to do it in Delphi, there were some tools to help me do it, but no matter how hard I tried, I simply couldn’t find any documentation or example anywhere that showed me how to actually use the tools. The tool documentation clearly explained to me what methods and properties were available, but nowhere could I find anything that showed me how to create an object, assign it to some XML then retrieve properties from it. I’m sorry, but I’ve been a professional software developer for more than 30 years, but sometimes you simply have to show me how things work. I no longer have the patience to hack away at something for hours to figure it out.

Back when I was doing Java development on BlackBerry, I was trying to figure out how to use KSOAP ([http://kobjects.org/ksoap2/index.html](http://kobjects.org/ksoap2/index.html)) to allow an application to consume XML-based web services. Like I said earlier, the docs explained the methods and properties, but never, nowhere, anywhere did it show me how to use any of it in a sentence. I wasn’t a heavy duty Java developer (never have been) so I simply didn’t have the background I need to be able to understand how to use this thing.

Again, I could have figured it out, but I had a wife, kids and some books to write, I simply didn’t have the bandwidth to plug through it in order to sort it out myself.

I’ll say it again: When you’re documenting your stuff, assume nothing. Let me decide what’s important and what’s important – just document everything STARTING AT THE BEGINNING.

JavaDocs can be…useful and interesting, but where’s the sample code? A simple requirement for each and every API, object, property & method is a code sample that shows the target developer how to use the thingie in a sentence. I know that would be boring for the experienced folks, but just don’t look at that stuff. For folks however who are not experienced with the particular technology, someone who knows just a little Java, lay it all out for them so they can use the stuff.

OK, on to the Monty Python Reference. So, how is the Chromium Embedded Framework Documentation like a Sketch from Monty Python’s Meaning of Life? The story I just told reminded me of the Sex education sketch ([https://www.youtube.com/watch?v=PqI-28meTZ8](https://www.youtube.com/watch?v=PqI-28meTZ8)) from the Monty Python Meaning of Life Movie. I’m not going to try to explain it here, watch the video to see what I’m talking about (warning, it is clearly a very adult topic), but what made me think about the video was the teacher’s comment about ‘why not start her off with a kiss?’

When creating documentation for open source projects, start with the simple, give the background beginning users need, before leaping off to the technical details that the more experienced developers need. Both approaches are needed.

Start us all off with a simple kiss before doing anything else.