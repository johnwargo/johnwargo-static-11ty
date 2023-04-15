---
title: Word Clock Time Issues
description: 
date: 2021-07-14
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I'm a big fan of Andy Doro's Word Clock ([https://andydoro.com/wordclockdesktop/](https://andydoro.com/wordclockdesktop/)) project. As soon as I saw the project highlighted in Make Magazine, I immediately ordered the parts and assembled the desktop version of the project. The clock's been running in our guest bathroom for more than a year now and I recently noticed that the clock wasn't keeping time very well. It was about 20 minutes fast.

Well, I grabbed the source code and looked for an easy way to fix this. The original project is based on the Adafruit Trinket device which doesn't have a Wi-Fi connection, so it can't get it's time through Network Time Protocol (NTP). Instead, the project has the following code which tries to initialize the realtime clock (RTC) and, if it can't (because there's no time stored in it), it sets the clock to the compile date/time for the currently running sketch.

RTC.begin(); // begin clock  
if (! RTC.isrunning()) {  
 Serial.println("RTC is NOT running!");  
 // following line sets the RTC to the date & time this   
 // sketch was compiled  
 RTC.adjust(DateTime(\_\_DATE\_\_, \_\_TIME\_\_));  
 // DST? If we're in it, let's subtract an hour from the RTC   
 // time to keep our DST calculation correct. This gives us  
 // Standard Time which our DST check will add an hour back to   
 // if we're in DST.  
 DateTime standardTime = RTC.now();  
 // check whether we're in DST right now. If we are, subtract an hour.  
 if (dst\_rtc.checkDST(standardTime) == true) {   
 standardTime = standardTime.unixtime() - 3600;  
 }  
 RTC.adjust(standardTime);  
}

This is a great solution for initially setting the clock, since the first time you run the sketch it automatically sets the clock with the current time. Unfortunately, this code doesn't work for my situation.