---
title: Updated My Pi Remind Project (December, 2018)
description: 
date: 2019-01-13
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I've been running my Pi Remind project at my desk now for several years. I started with the Pi Remind ([https://github.com/johnwargo/pi-remind](https://github.com/johnwargo/pi-remind)), but then upgraded the hardware to the higher resolution Pi Remind HD ([https://github.com/johnwargo/pi-remind-hd](https://github.com/johnwargo/pi-remind-hd)) hardware. The project essentially gives me a visual reminder when I have an upcoming appointment on my personal calendar. My personal calendar is online using Google Calendar, so it's easy for the Raspberry Pi to connect to my calendar through Google's public API.

When I created my original project, my employer at the time used the G-Suite for corporate email, calendar, etc., so I was able to get all of my work calendar reminders on it - that's ultimately why I created the project.  I work at Microsoft now and, while I can connect to Office 365 from the Raspberry Pi, I didn't want to take the risk as It would require me messing with the corporate directory. Perhaps some day I'll get around to updating the project for my work calendar; we'll see.

Anyway, I'd been having a problem with power in my home office, for some reason we get a lot of outages (really quick off, then on - frying several PC power supplies in the process), and my Pi Remind Raspberry Pi would restart, but not get connected to the network before my cable modem completed its restart. This left the Pi in a state where it was up and running, but it couldn't see anything on the network. This needed fixed.

I have two options to fix this problem:

1.  Configure the Pi to wait for the network before booting (described at [https://www.raspberrypi.org/blog/latest-raspbian-update/](https://www.raspberrypi.org/blog/latest-raspbian-update/))
2.  Modify my project's code so it detects that it's not been able to connect to the network for a number of minutes (defaults to 10), then reboots the Pi so it can reconnect.

I chose not to use the first option since I didn't want the Pi sitting there in limbo if my network didn't come up in a reasonable time. The project displays a red warning light (LED) when it can't see the network, so it was better for me if it booted, then notified me via the HAT's LEDs that it couldn't connect to the network.

So, the code up on GitHub has the reboot after # minutes (defaults to 10, you can easily change it in the source code). It's disabled by default, so you'll have to enable it (pretty easy to see how in the code) before you can see it in action.

I should put the configuration settings in an external file, enabling you to update your code when I make changes and not lose your settings. Perhaps that will be my next update to this project.

I periodically get emails from users asking me questions about the code or to fix some problem they've found. Surprisingly, so many of them start by assuming I'm not going to respond (starting their emails with something like “I know you probably don't have time to respond…”). I published the code so others could use it, and I'm happy to answer questions or fix problems with the code. Either create a GitHub issue (the preferred way) or send me an email from the contact area of the site. You can even send me an email directly, my email address is my first name at, well, you know, my whole name (the site you're on).