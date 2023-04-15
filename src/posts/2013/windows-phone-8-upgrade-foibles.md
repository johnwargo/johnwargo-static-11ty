---
title: Windows Phone 8 Upgrade Foibles
description: 
date: 2013-12-24
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been doing some testing of some Cordova apps on a Windows Phone 8 device AT&T was nice enough to give me earlier this year. I would really like to learn more about developing apps for the device, but there's no time and I work primarily with Cordova anyway.

Anyway, the device prompted me to do an update the other day and I (stupidly) let it go ahead and do what it wanted to do. When it completed, I plugged it back into my Windows 8 desktop and suddenly the device couldn't be seen by the PC. It would beep and let me know it'd seen the device and was installing the necessary driver, but it would quickly beep again and tell me it couldn't install the driver. Then it would go into an infinite loop and repeat those same steps over and over and over again with no end.

I did a search and didn't find anything. I switched to another USB port on my system and was able to get it connected. Unfortunately, Visual Studio would no longer talk to the device, so even though the device was recognized, I could not use it for testing Cordova apps in Visual Studio.

Ugh. Probably my favorite expression for 2013.

Anyway, I spent some time thinking through this and, after reading some internet posts about the Visual Studio error I was getting (a timeout error when trying to load the app on the device) I decided to unregister it as a development device then re-register it using the Windows Phone Developer Registration tool shown in the figure below.

![WP8 Device Registration](/images/2013/wp8-device-registration.jpg)

It worked. Something about the upgrade set the device in a mode that  kept Visual Studio from talking to it. Re-registering it apparently put the device back in a better state.