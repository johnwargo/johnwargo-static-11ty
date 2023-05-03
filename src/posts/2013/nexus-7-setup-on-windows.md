---
title: Nexus 7 Setup on Windows
description: 
date: 2013-09-27
headerImage: 
categories: [Mobile Development]
tags: post
---

I was trying to test a Kapsel application yesterday on my Nexus 7 and was having some problems (Kapsel is a set of SAP plugins for Cordova that I wrote about on my SCN Blog here [https://scn.sap.com/blogs/johnwargo/2013/09/22/sap-mobile-platform-and-apache-cordova](https://scn.sap.com/blogs/johnwargo/2013/09/22/sap-mobile-platform-and-apache-cordova){target="_blank"}). Essentially, I was trying to install the application on the device via a USB cable, but my Windows system wasn't recognizing the device. The device saw that it was connected to the Windows system and prompted me to enable USB debugging, but Windows was 'seeing' the device, but couldn't really talk to it.

I'd encountered this problem while working on Apache Cordova 3 Programming and figured it out, but for the life of me I couldn't remember how I'd done it. I of course grabbed the manuscript and looked to see if I'd documented the solution to the problem and of course I hadn't. So, I thought I'd write about it here then I'll put a link in the book that points to this article.

OK, so when I plugged the device in, Windows twirled and whirled for a while trying to install the appropriate device driver. After much work, it finally decided that it couldn't do so and displayed an error message. When I looked at the Windows Device Manager, I noticed what is shown in the following figure, that it recognized the device, but simply didn't know what to do with it. Notice under 'Other devices' that the Nexus 7 is listed.

{% image "src/images/2013/nexus-7-setup_1.png", "Figure 1", "image-full" %}

So, I knew that Google provides special USB device driver as part of their SDK, so I fired up the SDK tools and made sure to select the Google USB Driver as shown in the following figure.

{% image "src/images/2013/nexus-7-setup_2.png", "Figure 2", "image-full" %}

With that in place, I was ready to fix this problem. In Windows Device Manager, back in Figure 1, I right-clicked on the Nexus 7 entry and from the menu that appeared I selected Update Driver Software. In the dialog that appears, I selected Browse my computer for driver software as shown in the Figure 3.

{% image "src/images/2013/nexus-7-setup_3.png", "Figure 3", "image-full" %}

Next I was prompted to identify where Windows should search for the driver. I could have let it search the whole drive, but I knew that the driver I wanted was likely in the folder where I'd installed the Android development tools (ADT), so I simply pointed it to that folder then clicked next to begin the search.

{% image "src/images/2013/nexus-7-setup_4.png", "Figure 4", "image-full" %}

After a while, it found the driver, installed it then displayed the results screen shown in Figure 5.

{% image "src/images/2013/nexus-7-setup_5.png", "Figure 5", "image-full" %}

Closing the dialog and looking again at the Windows Device Manager as shown in Figure 6, you'll see that the Nexus 7 is now recognized by Windows as an Android Composite ADB Interface device.

{% image "src/images/2013/nexus-7-setup_6.png", "Figure 6", "image-full" %}

With this completed, I was able to install the application onto the device using the Android command line tools.