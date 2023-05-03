---
title: Error Capturing Video using PhoneGap
description: 
date: 2012-04-26
headerImage: 
categories: [Mobile Development]
tags: post
---

I got up early this morning to answer some last minute questions from my editor for PhoneGap Essentials. We're almost done with the book; I just had a few questions to answer. The editor asked me to redo one of the screen shots because it was a little blurry. I dug out the device I used to take the screen shot and setup the shot. The device battery had died, so I plugged it into power so it would charge as I began my test. As I loaded the application and started the video capture application used in the book, the application threw a couple of errors.

On this particular device, video capture is disabled when the battery life falls below a certain threshold. This makes sense, but in this case it shouldn't have mattered since the device was connected to a power source and was charging. Apparently it does.

Anyway, that's not really important, what's important to me was how the application responded. As I wrote that chapter, I struggled to determine how to cause errors in the video capture process. I could of course cancel the capture and show readers what was returned to the PhoneGap application, but I was looking for real errors and finally found one. The trouble is, the information returned from the PhoneGap application wasn't enough to help me as a developer understand what had actually happened to cause the failure.

Let's take a look at what I mean.

If you take a look at Figure 1, you'll see a screen capture from the device as soon as I attempted to record video from the application. The alert box is the application's way to let me know what happened during the process. In this case, the device refused to take the video (because the battery was too low) and returned a canceled error to the PhoneGap application.

{% image "src/images/2012/phonegap_video_capture_1.png", "Figure 1", "image-full" %}

I didn't notice at first, but the device also displays (for a very short time) an error indicating why it can't capture video. It wasn't until I'd tested this a few times that I noticed that little pop-up below the alert dialog.

Unfortunately, no error code beyond the simple cancelled message is returned to the calling program, so there's no way for the PhoneGap application to tell what actually happened and recover cleanly. All the app knows is that the video capture failed, not why.