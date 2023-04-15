---
title: Weird Cordova Prepare Problems
description: 
date: 2013-10-30
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been having weird problems with the cordova prepare command and finally figured out the problem, so I thought I'd write about it here so others who are having the same problem can hopefully (although hope is not a strategy) find a resolution.

I'm product manager for an SAP product which is essentially a set of SAP Mobile Platform (SMP) plugins for Apache Cordova. You can read about the product at [https://scn.sap.com/blogs/johnwargo/2013/09/22/sap-mobile-platform-and-apache-cordova](https://scn.sap.com/blogs/johnwargo/2013/09/22/sap-mobile-platform-and-apache-cordova)) and [https://scn.sap.com/blogs/johnwargo/2013/10/21/an-introduction-to-smp-kapsel](https://scn.sap.com/blogs/johnwargo/2013/10/21/an-introduction-to-smp-kapsel).

Anyways, I'm working on a Kitchen Sink application which shows developers how to use all of the Kapsel plugins and I noticed that some of the plugins simply weren't working. Looking into the problem, it became clear to me that the plugin JavaScipt source code wasn't being copied over to the Android project during the cordova prepare process.

I'd written this huge (for me) app and had the jQuery and jQuery Mobile libraries, so I thought I was having some timing problems, but the more I looked at it, the more I realized that prepare was simply failing. I turned on debug mode using the following:

cordova –d prepare

Prepare executed as expected and no error messages were returned to the console.

I scratched my head for a bit then switched over to my development Macintosh and fired up a new Windows VM. I installed all the Cordova and Android parts (having just written a book on the topic, it was quick work) and set about trying to reproduce the problem. No luck. The development environment on the Windows VM worked great, the same environment (I thought) on my corporate Windows laptop didn't.

Yesterday I upgraded node on my system then used npm –g update to update all of my node modules and…the problem went away. Prepare is actually preparing my project as expected. Problem solved.

So, when you have Cordova CLI problems and you're not getting information from debug mode, make sure you have the latest and greatest of everything on the node side.