---
title: PhoneGap Day 2017 Presentation
description: 
date: 2017-11-03
headerImage: 
categories: [Mobile Development]
tags: post
---

**Note:** removed obsolete attachments November 11, 2022

The week following my session at NCDevCon, I was fortunate enough to be Microsoft's representative at [PhoneGap Day 2017](https://pgday.phonegap.com/us2017/){target="_blank"} (US). Microsoft hosted the event in our Times Square (NY) offices, so I was asked to be the onsite host. It was a lot of fun and I got a chance to hang with a lot of great people.

I've not been involved with the Cordova project for some time now, I interacted with the Cordova team while working as an Analyst at Forrester, but in the year that followed, I didn't do a lot of mobile development. In my role at Microsoft, I'm responsible for our JavaScript Mobile development tools (the Cordova and React Native extensions for Visual Studio Code), so it's nice to be working with Cordova again.

For my session, I delivered a presentation on how to use [Cordova Simulate](https://github.com/Microsoft/cordova-simulate){target="_blank"} to streamline manual testing of Cordova applications. Cordova Simulate is an open source project sponsored by Microsoft. It's an evolution of the Ripple Emulator (do you remember the Ripple Emulator?), but one that 1) was actually released, and 2) actually works. Microsoft uses Cordova Simulate in its [Tools for Apache Cordova (TACO)](https://www.visualstudio.com/vs/cordova/){target="_blank"} and it's also bundled in the Apache Cordova Extension for Visual Studio Code. It enables you to simulate a Cordova application in the browser, but with complete simulator control the core Cordova plugins. Check out the project when you get a chance, it's pretty cool and easy to use. I'm going to write a blog post on Cordova Simulate some time in the near future.

For my session, I also demonstrated how to add support for Cordova simulate to third-party plugins. I took my [Carrier Plugin](https://www.npmjs.com/package/johnwargo-cordova-plugin-carrier){target="_blank"}, and demonstrated how to add code to it to enable it to work with Cordova Simulate. You can find the source code from the demonstration on [Github](https://github.com/johnwargo/phonegapday-2017){target="_blank"}.