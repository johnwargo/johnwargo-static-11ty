---
title: BlackBerry Widgets
description: 
date: 2011-01-03
headerImage: 
categories: [BlackBerry]
tags: post
---

I spent some time this weekend working with the BlackBerry Widget (now inappropriately called WebWorks) development tools. They're pretty cool. I've never built web applications designed to run on device (rather than on a server) and didn't have any real experience with much client-side JavaScript, but it real easy after [Scott Good](https://www.scottgood.com/jsg/blog.nsf) kindly provided me with some sample code to work with. I created a couple of applications right away and learned a bunch while I did it. 

One of the things I've done on this site is write about how to build Web Services in Domino so you can consume them from mobile device applications. The Android and iPhone platforms don't support XML-based web services directly, so I had to build a JSON agent (a RESTful web service) for those platforms. Ultimately I need to document that work, I promised to at last year's Lotusphere, but haven't done it yet, sorry. Anyway, for the widget applications (and some work I have been doing in Dashcode) I leveraged those very same RESTful web services to build the application shown below. This is one of the application's I'll be showing at Lotusphere 2011.

![](/images/1-2-2011 7-20-16 pm.png)

I've also been working on using Dashcode to build mobile applications that talk to Domino data sources, I've created a sample application (shown below) that I'll also be showing at Lotusphere 2011.

![](/images/_dashcode app.png)![](/images/dashcode app.png)

Additionally, my publisher has been asking for an update to [BlackBerry Development Fundamentals](https://www.bbdevfundamentals.com). One of the things that had been missing from the book is coverage for BlackBerry Widgets and the BlackBerry Push API's. Both of those technologies were released after my book was finished and I'd like to update the book to include them. Who knows, perhaps I will even put together a widget book. Stay tuned.