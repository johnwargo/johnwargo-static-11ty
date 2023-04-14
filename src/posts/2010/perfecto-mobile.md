---
title: Perfecto Mobile
description: 
date: 2010-12-22
headerImage: 
categories: [Mobile]
tags: post
---

I've been getting some briefings lately from [Perfecto Mobile](https://perfectomobile.com/){target="_blank"} regarding their mobile application testing capabilities. I'd known a little bit about the market and identified some of the players in BlackBerry Development Fundamentals, but really didn't have a good idea of how it worked. From the briefings I learned more about the technology behind it and it's pretty cool.

They essentially place a bunch of active mobile devices in cradles in a data center then connect to them via a USB cable. Through a web interface you as a customer have access to, you can install applications on a device plus pull logs and other information from the device and interact with it. What surprised me was that they also offer a scripting language you can use to automate testing on the device; pretty cool. I still need to play with this directly, but as I understand it you can write scripts that poke and prod at the device, which I expected they could do through interfacing with the keyboard buffer and other API's the device manufacturers provide. You can even swipe through menus and click menu items , buttons and application icons. Again, I don't have all of the details, but apparently you can provide an image that the scipt uses to identify a menu item or application icon to click - as your script moves things around on the device, you can configure it to click when it finds the particular item you're looking for. So, if a menu item or application's icon position changes depending on what other applications are installed on the device, your script can still find it.

I'll be taking a real look at this solution after the holidays and I'll let you know what I find out.