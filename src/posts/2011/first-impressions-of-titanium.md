---
title: First Impressions of Titanium
description: 
date: 2011-01-27
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been poking around at [Appcelerator](https://appcelerator.com){target="_blank"} Titanium for the last week or so and I have to admit that I'm really not impressed. It looked like a really interesting solution, but:

1.  There's absolutely no documentation - what 'documentation' they do have is nothing more than a sample application called Kitchen Sink that has examples of everything Titanium can do inside of it.
2.  It took me hours (and I do mean hours) to get the kitchen sink demo to run in the Android simulator. I followed Einstein's definition of Crazy (doing the same steps over and over again expecting different results) before it finally just worked. There's no docs on how to run it, no instructions, nothing. You can find all sorts of posts on their help area from people who had the same experience I had. I finally found something that explained why it wasn't running. I implemented the fix and still couldn't get it to work. I created several new VM's with clean configs and finally on about the 6th try it finally worked.
3.  Screen transitions are slow, applications seem hesitant when running.
4.  There's absolutely no layout manager that I can find. When you add objects (such as buttons, fields and so on) to a screen, you have to provide absolute positions for every single element. You can't plunk a label down then add a edit field below it, you have to add both manually, specifying two coordinates (top, left, right, bottom) for each. It absolutely makes no sense that in 2011, with all of these cool smartphones around that you'd have to take that approach to writing applications.

Granted I'm using the free version, but you'd think there's be something better than this.

I LIKE the idea that mobile development in Titanium is all about code - you hand craft code for everything, I truly like that. But to force me to determine EXACTLY where to put things is ridiculous. How do I know where my label is going to end (with word wrap, font size and so on)? Why do I have to manually, physically put every element in its place?

It just over complicates applications when you have to code at that level. It's easy for iPhone devices since you only have two real screen resolutions to work with (three if you count the iPad - which you should). But with all the different Android and BlackBerry devices out there, writing specific code for each screen resolution so that screen elements show up where they're supposed to makes no sense.

What's surprising as well is how long it's taken them to come out with BlackBerry support. It's been in beta for a very long time - I am curious what's going on with that.

I've got to be missing something here. Stay tuned, I'm going to try to build a Titanium version of my contact lookup app and see what I can come up with. I bet I won't be able to do what I want within Titanium.