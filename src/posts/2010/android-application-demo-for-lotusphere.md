---
title: Android Application Demo for Lotusphere
description: 
date: 2010-01-20
headerImage: 
categories: [Mobile Development]
tags: post
---

I had to abandon my plans for demonstrating an Android application talking to a Domino Web Service for my session this morning. I'm disappointed. I spent a lot of time learning it and working through the kinks. I got it to a point where I was able to access the Domino service and was getting data back when all of the sudden the application just stopped working on the emulator. I'm going to keep at it and write something I can put up here for everyone to look at, but I just won't be demonstrating it here at Lotusphere 2010. I got too sick before the holidays (still not recovered yet) and just didn't have the time to do this right.

What I did to support this application platform was create a new service to use for iPhone and Android. Windows Mobile and the BlackBerry can use the XML-Based Web Service that Domino supports natively, and that's what I'm going to show in the session. But for other platforms (the iPhone and Android don't support XML-Based Web Services natively) I created a service that uses REST (Representative State Transfer) to process the data. It works really well and can also be used in a Widget using XMLHTTPRequest (which I'll show here as well some day).

So, expect to see the new RESTful Domino agent documented here soon followed by the Android application, a BlackBerry Widget and, now that I have a MacBook to play with for about 90 days, an iPhone version as well. This is going to be fun. I'll be moving right in the middle of all of this, so I don't know when I'll get it all done.