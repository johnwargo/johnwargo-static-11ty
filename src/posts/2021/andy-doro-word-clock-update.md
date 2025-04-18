---
title: Andy Doro Word Clock Update
description: I recently discovered Andy Doro's Word Clock and I love the project. I built one for my self then started looking at the code for ways to improve it. I made a bunch of changes to the code and, once Andy added a license to the project repository, forked it and published my own version of it. 
date: 2021-08-10
headerImage: 
categories: 
  - Internet of Things (IoT)
  - Arduino
tags: post
---

When I first discovered [Andy Doro's Word Clock](https://github.com/andydoro/WordClock-NeoMatrix8x8){target="_blank"} project, I immediately fell in love with it and knew I had to build one. I quickly downloaded everything I needed, then ordered the enclosure pieces from [Ponoko](https://ponoko.com/){target="_blank"}.

{% image "src/images/2021/assembled.jpg", "Assembled Word CLock", "image-full" %}

The clock ran in our guest bathroom for more than a year before I noticed that the time was off. Looking into things, I realized that the temperature change in the bathroom (my son takes loooooong, hot showers) and the temperature sensitivity of the real-time clock (RTC) caused the time to shift.

I started looking for ways to improve this project so the time would stay accurate, so I decided to fork the project and rebuild it using a Wi-Fi enabled Adafruit Feather board and Network Time Protocol (NTP) to allow the project to periodically reset the local RTC to the correct time over the Internet. I also selected an RTC FeatherWing (add-on board for the Feather) that doesn't have the temperature sensitivity of the earlier project.

The Feather board has a different footprint than the Adafruit Trinket board originally used for the project, so I engaged [Muzammil Patel](https://fiverr.com/muzammil_patel){target="_blank"} on Fiverr to update the enclosure drawings to accommodate the microcontroller change. I also learned that even though Adafruit published a specification for the Feather platform, the Espressif-based Feather boards have a slightly different footprint which made accurately updating the enclosure a challenge.

I completed the updated project assembly last night and published the forked repository this morning on [GitHub](https://github.com/johnwargo/world-clock-neomatrix-wifi-desktop){target="_blank"}.

With that work done, I've started working on a wall mounted version of the clock. I have the hardware and software all working, now I have to just start assembling the clock. I'll publish the results as soon as I'm done.