---
title: 4,500 Records
description: 
date: 2012-04-05
headerImage: 
categories: [Mobile Development]
tags: post
---

I came across this press release yesterday:[Mobiquity Takes Buildium Mobile; App for Property Management Software Leader Has Native-Like Scrolling](https://marketwatch.com/story/mobiquity-takes-buildium-mobile-app-for-property-management-software-leader-has-native-like-scrolling-2012-04-04){target="_blank"}. The article explains how the developers were able to build a PhoneGap application that allowed mobile users to scroll through a listing of up to 4,500 records with native-like performance and functionality. While that's probably a pretty good accomplishment, I have to ask why it was ever even done.

Why would you ever want to expose more than four thousand records on the screen to a mobile user at one time? It's great that they were able to accomplish this, but I'm pretty sure they solved the wrong problem. Instead of doing all of that work to make a hybrid mobile application (a native application built using web technologies) capable of displaying that many records, they should have designed the application so the user would never need to view that many records. Use search or filtering to allow a mobile user to quickly slice and dice the available data options to more quickly get to the data they need - rather than doing rocket science so they can scroll through 4,500 records smoothly.

Who cares that the scrolling was jerky and slow - the user should never have (ever) been exposed to that much data at one time anyway. Can you imagine what this application is going to do to the user's data plan limits and battery life? It doesn't matter that you've solved the problem in an elegant and efficient manner - you never should have tried to solve that problem anyway.

A developer has to constantly think about the impact their decisions have on the mobile user, application performance, network/data utilization and battery life. I can't imagine that was done in this case.