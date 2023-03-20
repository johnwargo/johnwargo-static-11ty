---
title: Raspberry Pi Reminder App
description: 
date: 2016-06-16
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I work at home and I spend a lot of time on the phone talking to clients and vendors. My employer uses Google Apps (which includes Google Calendar and Gmail) and the appointment notification capabilities of both are not very robust. Well, they’re robust, but not enough to get me to actually show up for calls on time. What I find is that I often miss the notification when I’m busy doing something else or I notice the notification, but quickly forget about just a few minutes later and ultimately miss some meetings or join late.

One day, after being 15 minutes for a meeting, I decided I had to fix this problem. I needed a more effective way to alert myself of upcoming appointments. As I spend a lot of time on the phone, I didn’t want an audible alert, so I decided I’d do something visual. While browsing the Adafruit web site, I noticed the [Pimoroni Unicorn HAT](https://shop.pimoroni.com/products/unicorn-hat) and that had me thinking of solution. The Unicorn HAT is an add-on board for the Raspberry Pi that consists of an 8x8 array (that’s 64 total if you’re counting) of bright RGB LEDs. What if I wrote a Raspberry Pi application that connected to Google Calendar and checked my calendar for my next appointment then flashed those 64 LEDs to let me know? As long as I was conscious, and in the room, I’d likely see them and decrease my chances of missing an appointment.

Make Magazine just published an article I wrote about this project at [http://makezine.com/projects/get-a-flashing-meeting-reminder-with-a-raspberry-pi.](http://makezine.com/projects/get-a-flashing-meeting-reminder-with-a-raspberry-pi.) You can see the final project in action at [https://youtu.be/X111pAaEP-k.](https://youtu.be/X111pAaEP-k.)