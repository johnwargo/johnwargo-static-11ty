---
title: Going Cross Platform
description: 
date: 2011-05-13
headerImage: 
categories: [Mobile Development]
tags: post
---

I came across an article in APC Magazine this week that discusses problems developers have with cross platform mobile development. The article is called [Smartphone Devlopment: Going Cross Platform](https://apcmag.com/smartphone-development-going-cross-platform.htm){target="_blank"} and what interested me was what was being said about iPhone development.

There's this perception in the market that since the iPhone platform is so cool and the apps are so beautiful, that it must be easy to develop for the platform. There's so much bias out there in favor of the iPhone that it is hard to get an honest assessment without appearing bigoted against iPhone.  I did some iPhone development in preparation for a conference presentation last year and even though I had more than 20 years of experience as a professional software developer, the development approach to iPhone development and the archaic Objective-C were so hard to work with that I wasn't able to finish the application in time for the conference session. I worked on it for weeks and weeks and had to give up because it was just incomprehensible to me.

Apple Macintosh and iPhone development is done using technologies Apple obtained when it purchased NextStep back in the 80's. Objects such as strings start with NS, NextStep, so instead of working with Strings, you have to work with NSStrings. Why they can't be just strings makes no sense to me, but that's the way it is. The iPhone platform has no garbage collection capabilities – developers have to track everything and make sure memory is freed up when an object is no longer used. Everything is a pointer; there's no direct access to variables, it's all pointers to variables. It's very 1980's.

I laugh when I hear people complain that the BlackBerry development stuff is 'old' – I'm old enough to know that the iPhone stuff is even older. Most modern languages have some sort of garbage collection mechanism. BlackBerry and Android have it because of their use of Java. Not true in iPhone development – you have to do the work yourself.  Ugh!

Let's take a look at some important tidbits from the article:

“Going to iPhone development feels like a backwards step from programming in managed environments like Java and .NET, where memory management, exception handling and the like are automatic,” 

“The iPhone stuff is still in the dark ages in terms of programming environments: you've got to keep track of everything,” he continues. “Objective C tries to make sure everybody understands who's responsible for freeing up what, but it feels like going backwards; being able to have Java-like memory management makes a big difference for developers.”

In a rapidly-growing market where iPhone support is the de rigeur standard for developers and a necessary step to access the world's largest and most successful App Store, Powell's comments may sound like heresy. But with Android having rapidly emerged as a viable alternative over the past year, it reflects the growing realization among many developers that iOS is no longer the be-all and end-all of mobile operating systems.

Needing to build and maintain two or more versions of a smartphone app raises the difficulty level of many development projects significantly, particularly for small developers. “iOS and Android are very different platforms," says Bradby. "Someone who's skilled in Java say, doing Android, is not necessarily and unlikely to understand the Objective C and XCode development environment for iOS. Having a team of developers that can maintain both of those code bases is difficult; there's no way we can do native development on more than two platforms.”