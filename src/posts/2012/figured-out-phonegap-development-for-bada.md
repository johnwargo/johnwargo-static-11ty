---
title: Figured out PhoneGap Development for bada
description: 
date: 2012-04-27
headerImage: 
categories: [Mobile Development]
tags: post
---

If you remember a while ago I published an article that explained some of the issues I encountered trying to build and run a PhoneGap application for the Samsung bada OS. Well, with the help of the developer who wrote the bada code for PhoneGap I was able to finally figure it out, get it working and finished the bada chapter for PhoneGap Essentials.

![Image of a PhoneGap application running on bada](/images/2012/jmw04_23.png)

First I'm going to complain a little and then I'll tell you what you need to do to build PhoneGap applications for bada.

## Missing Files

In the article I pointed out how the files you needed to build a bada application using PhoneGap weren't actually in the PhoneGap download. I just checked in the PhoneGap 1.7 release candidate download and they're still not there. I simply don't understand it. The development team knows the wrong files are included in the download, but months and months later this particular problem still hasn't been fixed. How hard can it be to make sure the files you need are packaged into the download? I discussed this with them months ago – you would think this wouldn't be hard to fix.

## Beta

Did you know that support for bada in PhoneGap is considered beta? No, neither did I. The reason the instructions I needed to understand how to build PhoneGap applications for bada were not available is because the PhoneGap project considers (or considered) support for bada to be in beta status. I wish they'd told me that when I started.

## Wrong SDK Version

OK, the reason why I  (and all of you) couldn't get the bada stuff to work, even when you had the right files, is that the bada code (still being beta and all) was written for and will only work for an older version of the bada SDK which is no longer available for download. Perhaps I missed this when I started working with this back in August, but I finally see it listed in the readme:

DISCLAIMER: THIS IMPLEMENTATION DOES NOT WORK WITH THE BADA 2.x SDK. ONLY 1.2 is supported BY THIS IMPLEMENTATION!

So, in order to be able to use this for your bada applications, you will have had to already downloaded this older SDK (before Samsung pulled it from their web site). If you didn't do that, you're out of luck.

I just noticed too that actual instructions for building bada applications for PhoneGap are now posted to the PhoneGap web site: [https://phonegap.com/start#bada](https://phonegap.com/start#bada){target="_blank"}.

## Conclusion

So, now you know what you need to build bada applications using PhoneGap. As I understand it, the PhoneGap development team is working on an update to the code that will work with the bada 2.x SDK. This will essentially be a complete rewrite since 2.0 does things differently. Once that is done, building bada applications will be easier since you'll be able to use the latest SDK, support the latest devices and have a simpler process for starting a new app (I hope).