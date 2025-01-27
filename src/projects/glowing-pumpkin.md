---
layout: generic
title: Glowing Pumpkin
description: All about my different Glowing Pumpkin projects.
---

My children (twins) were born around Halloween, so that's always been a big holiday for us. Many years ago, I think when I found NeoPixels, I started building projects that used technology to enhance Halloween decorations. One of my favorites, and the one I wrote about here multiple times, is my Glowing Pumpkin project. Since there's so many posts and GitHub repos about these projects, I created this page to list everything in one place.

https://youtu.be/05cMcB_vGCM

So, with that in mind, here's a table that summarizes all of my posts and GitHub Repos (with Gists if I remember) related to the NeoPixel-driven Glowing Pumpkins I created over the years.

| Project | Notes | GitHub Repository(ies) | Post(s) |
| ------- | ----- | ---------------------- | ------- |
|Arduino Glowing Pumpkin | My first published version (I think), uses a NeoPixel Ring | <ul><li>https://github.com/johnwargo/glowing-pumpkin-trinket-neopixel</li></ul> | | 
| Glowing Pumpkin Xiao 5x5 BFF | Refreshed the project to use a lot less hardware, basically a Seeed Studio Xiao board with a same size 5x5 NeoPixel matrix. | <ul><li>https://github.com/johnwargo/glowing-pumpkin-xiao-bff#glowing-pumpkin-xiao-5x5-bff</li></ul> | [Glowing Pumpkin Project Refresh](/posts/2023/glowing-pumpkin-project-refresh/) |
| Glowing Pumpkin Server (HTTP) | Rebuilt the previous project with a Web Server running on a separate processor core so I can control it from a web browser or mobile app. | <ul><li>https://github.com/johnwargo/glowing-pumpkin-server-http</li><li> https://github.com/johnwargo/glowing-pumpkin-controller-html</li> | [Arduino ESP32 Web Server on a Processor Core](/posts/2023/arduino-esp32-web-server-on-a-processor-core/) |
| Glowing Pumpkin Receiver (UDP) | With a web server onboard, I started thinking about how to control multiple devices simultaneously. I decided to use UDB broadcast from a mobile app to synchronize colors across multiple Glowing Pumpkin devices. | <ul><li>https://github.com/johnwargo/glowing-pumpkin-receiver-udp</li></ul> | [Arduino UDP Broadcast Receiver](/posts/2023/arduino-udp-broadcast-receiver/) |
| Glowing Pumpkin Sync (UDP) | After getting the mobile app working synchronizing colors, I built a version that used one of the Glowing Pumpkin devices to send commands to all of the other devices on the network (Using UDP broadcast messages from the Arduino) | <ul><li>https://github.com/johnwargo/glowing-pumpkin-udp-sync</li></ul> | [Using UDP Broadcast to Synchronize Actions Across Arduino Devices](/posts/2023/arduino-udp-sender/) |

I have no idea what I'm going to do next, stay tuned. 