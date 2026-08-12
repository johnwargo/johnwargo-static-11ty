---
title: What Were They Thinking 3
description: 
date: 2009-12-13
headerImage: 
categories: 
  - Mobile Development
  - What Were They Thinking
tags: post
---

This example of 'What Were They Thinking' is for a Java application, not a web application - but I thought it would be an interesting addition to the series. It refers to something that absolutely drives me crazy in BlackBerry Java applications and I've seen the same kind of thing on other mobile platforms as well. Here we go...

As i've mentioned before, I'm getting older and with my advanced age comes reduced eyesight. If you see in the sample screen shot below, my BlackBerry client is configured to use pretty large fonts:

![My BlackBerry Messages Application](/images/2009/screenshot-dec0909-104528a.jpg)

This approach makes it easy for me to read the screen without my reading glasses (which I've not yet gotten around to keeping with me always). I know this takes up more screen space, but it's something I just have to do.

Now, last week I was working in RIM's Chalk application (Chalk is a recent purchase and allows organizations to easily push rich content to devices). When I opened the application's main screen, here's what I saw:

![BlackBerry Chalk Application Screen](/images/2009/screenshot-dec0809-063122p.jpg)

The developer (or developers) who built this application, selected a font and size to be used for the application without paying any attention to how I had my particular device configured. For me, it's completely unusable without my glasses.

Why do developers disregard the user when designing their applications? The BlackBerry device provides me with the means to configure the screen using any font and font size I want, but I have to deal with applications that completely ignore that. I know they've done this so they can give their application cool effects (like the graphical background you see in the figure) but that just doesn't take the needs of the actual user into account. I know any 20's user can see this easly, but it just doesn't work for us that are in our 40's.

Mobile developers - when building rich client applications on mobile devices, query the system to determine the font and font size selected by the device user and use that to craft any and all of your application screens. It's unreasonable to do otherwise. Trust that the device user knows better than you do how he or she wants text displayed on the device's small screen.

I'll try to scare up a sample application that does this (on the BlackBerry of course) so you can see how it works.