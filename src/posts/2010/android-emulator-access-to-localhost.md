---
title: Android Emulator Access to LocalHost
description: 
date: 2010-01-19
headerImage: 
categories: [Mobile Development]
tags: post
---

In preparation for my presentation at Lotusphere tomorrow, I've been beating my head against a problem and finally found a very simple solution. I thought I'd share. I'm trying to add an Android example to my rich client session and because I've been sick, I didn't get to work on this until this week. Nothing like last minute coding, eh?

Anyway, I have the Domino server running on my laptop and I've been trying to connect to it from the Android Emulator for about a day now. You can't use localhost, because localhost on a mobile device (whether it be an actual device or an emulator) points to the local device. The emulator therefore doesn't know about the local laptop through that reference (which is what you'd do to do any local testing laptop app to laptop app).

The original web site where I found this information is no longer up, so here's the details:

For an Android application running on the Android Emulator, to allow the application to access network resources running on the system running the emulator use the IP address 10.0.2.2.