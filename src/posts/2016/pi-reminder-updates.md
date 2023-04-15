---
title: Pi Reminder Updates
description: 
date: 2016-06-21
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

My Pi Reminder project went online at Makezine.com and since then I've been hearing from readers. One reader has made a couple of updates to the code which are now available online at [https://github.com/johnwargo/pi-remind.](https://github.com/johnwargo/pi-remind.) Here's a summary of the updates:

Time Zone Processing
--------------------

This project is my first attempt at Python coding; I was surprised at how quickly I was able to pick it up. That 30 years of experience in software development really paid off as I was working to learn Python. As I coded the app, I had to work though how to manipulate the Google Calendar's use of UTC. To filter the event list to return only appointments in the future, I had to convert the current time to UTC and pass it to the cloud API. I poked around a bit and struggled a bit to figure out how to get the time in the right format, so I hardcoded my current time zone in the conversion process. I expected that I'd point this out so other folks could adjust that calculation for their time zone, but forgot to do so in the original article. Fortunately for me, reader John McCabe ran across this hardcoded code and implemented a nice, clean fix for it which I've merged with the live code.

Empty Event Descriptions
------------------------

When I built the app, the only calendar I had to work with was mine. As I use the calendar in a work environment, all of my events were in pretty pristine condition. Unfortunately, the code didn't take into account events that didn't have a summary (a description/title). I'm not sure why you'd want an event without a description, but I tested it and apparently Google Calendar doesn't mind. John McCabe implemented a fix for this and I've merged it in. He also taught me an interesting way to use Python's if-in capability in the process.

Known Issue: Cancelled Events
-----------------------------

I recently noticed that Pi Remind was notifying me of canceled events. I have the Google Calendar feature enabled that allows me to see canceled appointments on my calendar. I enabled this in case I declined an invitation but later found I was available to attend. The Google Calendar API returns those canceled events, even when I have showDeleted set to false, so this is an open issue I'm going to have to fix. Stay tuned on this one.