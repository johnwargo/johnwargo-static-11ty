---
title: PhoneGap Build Android Woes
description: 
date: 2011-11-23
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been using the heck out of PhoneGap Build these last few weeks as I work through the API chapters in _PhoneGap Essentials_.

For the last three weeks, the process for building BlackBerry applications was broken, it would build an app for you, but it wouldn't include the phnegap.js file, so none of the PhoneGap features in the application would work. They finally fixed it today, but it was broken for about 20 days, and that was painful.

Recently, I've been focusing on Android development since the BlackBerry stuff was broken. Unfortunately the Android stuff is partially broken as well. You can build an app for Android using PhoneGap Build, but about 70% of the time, the application that's built for you won't install on an Android device.

If you take a look at the following figure you'll see an example of what I'm experiencing. The two downloads shown in the figure are for the exact same application. When I build an Android application using PhoneGap Build and it's 3k smaller than I expect it to be, I know it won't install on the device. I just go back to the portal and start the build again. Most of my evenings have been spent repeatedly rebuilding the same app over and over and over again to get one version that will install.

![](/images/2011/device-2011-11-22-205526.png)

The problem is that there's no efficient way to communicate build problems to the PhoneGap Build team. There's the help pages that you can link to directly from Build, but people are using that forum for any PhoneGap related question, so there's no easy way to just see what kind of problems are being encountered for Build. People should be using the Google Groups PhoneGap forums for general development stuff and leave the help forum associated with the Build portal for Build related questions.

Another problem with that forum is that there's no easy way to see your own posts. Anything I've posted up there is just there and I can't open a page and see my questions and the associated responses. Google Groups is the same way and it's really frustrating. With PhoneGap Build still in beta, there should be a true issue tracking system in use so we can all work together to help make Build better.