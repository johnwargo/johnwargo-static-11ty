---
title: Using the Arduino NTPClient Library
description: 
date: 2021-07-18
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

As I mentioned in my previous post, I have a version of Andy Doro's Word Clock running in my house. I had some issues with the real-time clock (RTC) keeping time correctly, so I decided to rebuild the clock using a Wi-Fi enabled device and the Network Time Protocol (NTP) to keep my clock's local time synchronized with reality. I'll write more about that project once I've completed it.

As I started working on my updated project, I discovered that the Arduino team maintains (well, used to maintain) an NTP Client library called NTPClient ([https://github.com/arduino-libraries/NTPClient](https://github.com/arduino-libraries/NTPClient)) that would work for my project. The library is pretty easy to use, however it's woefully under-documented. There's a very simple readme in the project repository with an overly simple sample sketch and a vague reference to only one of the functions exported by the library.