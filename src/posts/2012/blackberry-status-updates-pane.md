---
title: BlackBerry Status Updates Pane
description: 
date: 2012-01-11
headerImage: 
categories: [BlackBerry]
tags: post
---

I'm struggling to find value in the BlackBerry 7 Status Pane that appears at the top of the BlackBerry home screen and, when clicked, displays the screen shown in Figure 1 below.

{% image "src/images/2012/blackberry_status_pane.jpg", "BlackBerry Status Pane", "image-full" %}

When you look at the image, it should be clear that there's really very little information displayed on the screen. Now, when I wrote about things like this in the past, I got comments back that the issue I'm experiencing is related to my device's current font settings. Those comments were correct, the problem is caused by my font settings. My problem is that I have older eyes and the BlackBerry is the only popular smartphone that allows me to set system-wide font settings. On my BlackBerry devices, I crank up the font size and I can sometimes (if there's bright light) read the screen without my glasses on.

That being said though, why do I have to put up with this? The BlackBerry SDK includes an API I can use to determine what the system fonts are, so the OS and an application can tell how the text will display. If I remember correctly, there's even an API an application can use to determine the amount of space a piece of text will take up on the screen (using the current font settings of course). So why doesn't the BlackBerry OS know it needs to render this text onto multiple lines or at least remove some content from each line so at least some of the text will display in its entirety.

Displaying small, incomplete parts of the information I'm seeking does me no good. It provides no value at all.