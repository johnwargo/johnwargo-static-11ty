---
title: Glowing Pumpkin Project Refresh
description: 
date: 2023-08-30
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
---

Years ago I published a several Glowing Pumpkin projects: [Arduino Glowing Pumpkin](https://github.com/johnwargo/glowing-pumpkin-trinket-neopixel) and [Arduino Glowing Pumpkin (Adafruit Feather)](https://github.com/johnwargo/glowing-pumpkin-feather). Both projects used Arduino compatible devices plus either one of the Adafruit multi-NeoPixel devices or a NeoPixel shield. The shield approach was easy because I just had to solder some male and female headers to the boards and press them together into a unit. My first project used the NeoPixel Ring which required soldering wires and running them into an enclosure where the Arduino device resides. 

I always wanted to redo this project, especially using some of the smaller ESP32 devices like the [Seeed Studio Xaio](https://www.seeedstudio.com/xiao-series-page) series of microcontrollers. A while back I was perusing the Adafruit site looking for new products when I noticed the [Adafruit 5x5 NeoPixel Grid BFF Add-On for QT Py and Xiao](https://www.adafruit.com/product/5646); it's a super tiny device, designed to attach back to back with a Seeed Xiao board. This combination gives me an opportunity to do a super small reboot of the glowing pumpkin here. 

I updated the code and published the project today in [Glowing Pumpkin Xiao 5x5 BFF](https://github.com/johnwargo/glowing-pumpkin-xiao-bff){target="_blank"}. This version is the size of the tip of my thumb and uses the powerful ESP32 processor so I can do some pretty interesting things using a web server with remote control from a mobile app or web browser. Eventually, I plan to synchronize LED matrix colors across multiple devices which enables me to put these devices in pumpkins in each of the dormers in front of the house and have them all display the same colors.

Here's the project in action:

https://youtu.be/05cMcB_vGCM

And here's the original project (on the right) and the latest version on the left. See how much smaller the new version is? And its much easier to assemble.

{% image "src/images/2023/glowing-pumpkins-old-and-new.jpg", "An image showing the old project next to the new one", "image-full" %}
