---
title: Weinre Debugger and PhoneGap Build
description: 
date: 2011-12-08
headerImage: 
categories: [Mobile Development]
tags: post
---

I'm working on the example application for the last chapter of [PhoneGap Essentials](https://www.amazon.com/gp/product/0321814290/ref=as_li_ss_tl?ie=UTF8&tag=mcnsof-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=0321814290). The chapter is about the Storage API and I've build a little mileage tracker (for expense management) application to highlight how to use the different capabilities of the API.

I got most of the application working but ran into a problem. I was able to create a local database and write to it, but unfortunately the call to the SQL INSERT method returns an error, even though the record is being successfully written to the database. Weird. I can't find anything online that explains why this is happening. Ugh!

Anyway, I was doing some testing in the Chrome browser and decided to go over to a device to do some testing just to make sure it wasn't Google Chrome giving me the trouble. It wasn't, but I did encounter something that's both fun and interesting.

PhoneGap includes the Weinre debugger which is a cool application that allows you to debug applications on a device, but watch what's happening in a desktop browser. I've been using it during my work on the book since it makes on-device debugging so much easier. Anyway, I was in Weinre poking around at the application's HTML when I noticed that part of the application screen (on-device) was acting weird. Take a look at the following screen shot:

![](/images/device-2011-12-08-162826.png)

The miles input field had some weird stuff around it and I could see the highlight moving to different fields. Turns out that as I highlighted the page elements in the desktop browser, the client-side application highlights the element I was pointing to - in real-time. I expected the device application to update the console on the desktop, but what I wasn't expecting was for the client-side appliction to also react to what I was doing on the desktop. Way, way cool.

The Weinre stuff works, too bad my application isn't.