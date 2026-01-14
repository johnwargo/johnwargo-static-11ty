---
title: Too Many Eclipse Instances
description: 
date: 2013-02-04
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been doing some more mobile development lately – building some applications on the SAP Mobile platform (what was formerly known as the Sybase Unwired Platform) and therefore cranking up some development environments for Android, BlackBerry and even iOS. In preparation for this work, I was updating my Eclipse instance on my Mac Mini plus creating a new Windows VM with Eclipse and all of the tools I needed. One of the things I noticed is that the whole concept of Eclipse plug-ins is essentially broken when it comes to mobile development.

Let me explain…

The Android development tools embraced Eclipse early on and worked very hard to make sure their stuff simply ran on most any version of Eclipse out there. There were some initial incompatibilities with the Java 7 SDK, but that's to be expected with a big version upgrade for an underlying technology like Java, and although the Android SDK installer wanted to install its files in the Windows Program Files folder, that rarely worked. At the end of the day though, the Android SDK fit nicely into most any version of Eclipse.

I just downloaded the latest version of the Android SDK and noticed that the installer was gone (not sure I'm really a fan of that) and there was a new folder included in the download with a complete instance of Eclipse. OK, so Google's now telling us that they suggest that you do your Android development with their instance of the Eclipse IDE.

The BlackBerry Java SDK is fickle, very fickle. Even though the Android DSK has embraced most any version of Eclipse, with the BlackBerry Java SDK, it supports only Eclipse version 3.7 ([https://developer.blackberry.com/java/download/requirements/](https://developer.blackberry.com/java/download/requirements/){target="_blank"}). That wouldn't be that bad, except that 3.7 is pretty old. So, imagine you're using the latest and greatest Eclipse stuff to do Android or some other development, you're going to have to maintain a completely separate, older version of Eclipse simply for BlackBerry development.

Here's some screen shots of what you get when you successfully install then try to run the BlackBerry Java development SDK in a current version of Eclipse.

<img src="src/images/2013/eclipse-1.png" alt="Figure 1" />

<img src="src/images/2013/eclipse-2.png" alt="Figure 2" />

<img src="src/images/2013/eclipse-3.png" alt="Figure 3" />

<img src="src/images/2013/eclipse-4.png" alt="Figure 4" />

What was particularly maddening about this particular problem was that the error messages about the pre-processor configuration are cyclical, the one message appears, then you're prompted to restart Eclipse then the error message appears, then you're prompted to restart Eclipse. It never ends.  
Notice too the error messages about missing a DLL? Unfortunately, that error was generated on a Macintosh – not sure there's a lot of DLLs on a Mac.

The IBM Worklight developer tools have similar restrictions – I downloaded the trial last year and was having fits trying to get it to work. I expect everything to be like the Android tools – simply work in most any version of Eclipse, but after struggling with the Worklight plug-in installation, I finally looked at the system requirements and noticed it too only supported an older version of Eclipse.

The SAP Mobile Platform (SMP) tooling uses Eclipse 3.7, so it's really easy to setup BlackBerry and Android Java development environments within the SMP development tools. At the end of the day though, you're still setting up a separate environment just for SMP development – and adding yet another Android instance to your configuration if you want to do both Android and BlackBerry development in the same IDE where you're doing your SMP development. I would be happier though if SMP was a plug-in as well, rather than a complete IDE installation like it is today.

The moral of the story is that it simply shouldn't be this hard! Google's making the investment to make their stuff work in most any version of Eclipse – how hard can that be? RIM (now called BlackBerry) and IBM I imagine have to have similar sized development teams, why can't they build Eclipse plug-ins that just work? Granted BlackBerry has been really busy with BlackBerry 10, and has essentially abandoned Java development, you'd think they would want to make things simple for their developer community.

With so many of the mobile development vendors supporting restricted versions of Eclipse, developers can't truly benefit from the plug-in capabilities of Eclipse. Either Eclipse has made making compatible plug-ins too hard or these mobile development tool vendors or the vendors are simply not trying hard enough. I've never built an Eclipse plug-in, so I really can't say. At the end of the day though, what's the value of an IDE with a plug-in architecture if I still have to install and maintain separate instances of the IDE just to use different plug-ins?

If you're not going to do that – at least make the system requirements more visible so that people like me who don't go looking for the system requirement before installing an Eclipse plug-in can know that what they're trying to do won't work. Why not include the supported eclipse version in the plug-in name?

Better yet, why not simply include version checking into the plug-in installation process? Let me know during installation that the plug-in is not compatible with the version of Eclipse I'm running? That would seem to make sense – why let me install something that you know is not going to work?