---
title: (more) PhoneGap Build Problems
description: 
date: 2011-11-11
headerImage: 
categories: [Mobile Development]
tags: post
---

PhoneGap Build's BlackBerry capabilities have been down for the last two weeks. I've been working through the book's API chapters, writing applications that highlight the capabilities of each and using PhoneGap Build to quickly build an application I can test on multiple devices. It allows me to simply create the index.html file I need, post it up to the server and within minutes (PhoneGap Build is NOT fast) get an application I can deploy to devices for testing.

This capability is especially helpful when I was working with the API's related to physical hardware (such as the compass and the accelerometer) since those applications had to run on physical devices and it's much simpler to deploy via the web for testing.

I first noticed the problem when none of the BlackBerry applications I was working with would fire the deviceready event. After a lot of poking around, I discovered that the problem indicated that the PhoneGap.js file wasn't being included in the BlackBerry application's executable (the .cod file). It would work every once in a while, but 99.9% of the time, PhoneGap Build would build the app, but forget to include the critical phonepap.js file needed to access any of the PhoneGap API's.

I searched the knowledge base and found another who was having the same problem and even submitted my own tickets on the problem, but as of yesterday it still wasn't working. I know someone from Nitobi is working on it, but I'm not getting any details on the problem or a possible estimate for when it might be fixed.

I wasn't sure about the value of the PhoneGap Build service when I first started working on the book. It wasn't until I got into working with the apps I needed to write to support my writings that I realized how cool the service is when you're doing this kind of work. It allows you to quickly pen an app by only writing the index.html (and associated files) then gives you apps for multiple platforms without all of the fuss and muss of creating projects for each platform. Now that it's broken, it's making it very hard for me to get my work done.

Hopefully it will be fixed soon, although hope is not a strategy.