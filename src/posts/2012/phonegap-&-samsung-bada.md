---
title: PhoneGap & Samsung bada
description: 
date: 2012-02-13
headerImage: 
categories: [Mobile Development]
tags: post
---

While working on PhoneGap Essentials, I got a chance to work with some mobile device platforms I'd not worked with before.  I did some work with webOS, but as soon as I got ready to write the chapter on webOS development for PhoneGap, HP announced it was killing the platform and the PhoneGap team added support for Windows Phone development. So, I whacked the webOS chapter and cheerfully replaced it with one on Windows Phone.

Another interesting one is Samsung bada, a 'newer' OS supposedly getting some traction in Europe and Asia. I covered the OS in *PhoneGap Essentials*, but since then Samsung's thrown their hat in with another mobile platform called Tizen (ww.wikipedia.org/wiki/Tizen). There's been some talk of backwards compatibility for bada applications in Tizen, so you should be OK with what you know about PhoneGap and bada.

What I learned while working on the bada chapter of the book is that there isn't any useful information about how to build PhoneGap applications on bada. Not in the PhoneGap download, not on the PhoneGap Google Groups forums, not on the PhoneGap wiki. I'm trying to work through this for the book so the information in the bada chapter is complete, but I thought I'd fill you in on some of the problems today – knowing that they'll be addressed by the PhoneGap development team as soon as they can. I just wanted to make sure you had this information since I just can't find real information anywhere.

First of all, the PhoneGap download located here: [https://phonegap.com/download-thankyou](https://phonegap.com/download-thankyou){target="_blank"} doesn't contain the code you need to build a bada application for PhoneGap. If you download the files from there and extract them on your hard drive then open the readme.md file in the bada folder, you will see something like this:

```text
Steps to build a PhoneGap app  
-----------------------------  
1. Download Source Code (clone the repository)  
2. Import in bada C++ IDE  
3. Put your HTML/CSS files in the Res/ folder  
4. Run phonegap.bat under Res/phonegap directory  
5. Build&Run!
```

What this is telling you is that even though there's PhoneGap source code for creating bada applications in the download you just downloaded, you'll have to go somewhere else to get the actual code you need. The instructions instruct you to import the sample bada project files into the bada IDE while the bada folder in the standard PhoneGap download doesn't contain the project files. Instead of using the bada files from the PhoneGap download, you instead need to get them from the Apache Cordova (the latest name for PhoneGap) git repository here: [https://git-wip-us.apache.org/repos/asf?p=incubator-cordova-bada.git](https://git-wip-us.apache.org/repos/asf?p=incubator-cordova-bada.git){target="_blank"}.

Once you download and extract the files, you'll have the files you need to import the bada PhoneGap project into the bada IDE.

Before you can run the program though, there's one more step you have to complete and this isn't documented anywhere either. Open Windows Explorer (the bada stuff only runs on Windows) and navigate to the bada source folder you extracted. Within the Res/phonegap folder is the phonegap.bat file highlighted in the following figure. You must execute that batch file to generate the phonegap.js file used by the sample application. I don't understand why you have to take this extra step, there's no reason I can think of that would prohibit the PhoneGap team from generating this file in advance, but it is what it is.

{% image "src/images/2012/phonegap-bada-1.png", "", "image-full" %}

If you later make any changes to the JavaScript source files shown in the figure, you can just rerun the batch file to generate a new phonegap.js file from your modified source.

At this point you are supposed to be able to fire up the bada IDE, import the project and get to work. At this point, I've not been able to make the project build and execute on the bada emulator, but I'm working on it and you'll find the complete instructions in PhoneGap Essentials when it makes it to print.

If you did a quick Google search on PhoneGap and bada, toward the top of the search results should be the link to a PhoneGap bada tutorial here: [https://groups.google.com/group/phonegap/browse_thread/thread/ee8dcd9ca0d2d792](https://groups.google.com/group/phonegap/browse_thread/thread/ee8dcd9ca0d2d792){target="_blank"} Unfortunately those instructions didn't work for me. I followed the instructions to the letter and I got an application, but not one that would use any of the PhoneGap API's. The tutorial instructs you to build a bada web application to use with the PhoneGap API's, but if you look at the source code folders in the bada PhoneGap download, you'll see a bunch of C++ library files – which implies that it's not a web application, but instead a C++ application that the PhoneGap application runs within. Supposedly there are complete instructions available for how to do this, but I have not been able to get my hands on them. If you know how to make the instructions in this tutorial work, please let me know because I cannot.

I'm still working through this and will update you when I have it working. Stay tuned.