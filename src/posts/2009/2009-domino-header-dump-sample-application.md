---
title: Domino Header Dump Sample Application
date: 2009-10-21
tags: IBM Lotus Domino
---

Have you ever wanted an easy way to see what HTTP Header and CGI variables were available to a Domino Wev Server? I know much of what's available is documented, but when I started learning about BlackBerry web development, I wanted a way to be able to see in real-time what the Domino server knew about the BlackBerry device connecting to it. To help me figure this out, I created a little sample Domino database that dumped a bunch of information the Domino Server knows about a User-Agent (the browser) back to the browser screen making the request.

Here's a sample screen shot from a BlackBerry device illustrating what the application looks like:

![](images/stories/jmw08_11.jpg "Header Dump Page")

I just posted an article about the application and the Domino database to my [BlackBerry Development Fundamentals](http://bbdevfundamentals.com/code-samples/header-dump-domino.html) site. Check it out when you get a chance (only if you're interested of course).

There's a piece of the application that shows what JavaScript information is available to the BlackBerry Browser - I noticed while I was working on the book that it isn't working on BlackBerry Device Software 4.6 and higher - sorry, but I haven't gotten around to fixing it yet.