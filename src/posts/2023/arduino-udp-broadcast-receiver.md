---
title: Arduino UDP Broadcast Receiver
description: I created an Arduino sketch that implements an UDP broadcast receiver which allows me to control multiple Arduino devices simultaneously from a mobile app.
date: 2023-11-02
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
  - Flutter
---

Back in August, I refreshed my Arduino Glowing Pumpkin project and published an article about it in [Glowing Pumpkin Project Refresh](/posts/2023/glowing-pumpkin-project-refresh/){target="_blank"}. A short while later, I figured out how to put a web server in it and control the LED matrix using a web application (desktop browser only) or a mobile app (smartphone or tablet) and wrote about it in [Arduino ESP32 Web Server on a Processor Core](/posts/2023/arduino-esp32-web-server-on-a-processor-core/){target="_blank"}. That was a lot of fun and I was glad I got those projects out there before Halloween. 

For many years, we put glowing pumpkins running the [Glowing Pumpkin](https://github.com/johnwargo/glowing-pumpkin-trinket-neopixel){target="_blank"} code in each of the dormers on the front of the house. One of the things I always wanted to do was synchronize the LED colors across all of the pumpkins. As soon as I completed the dual-core web server version (the second link at the top of the article) I started actively working on building a version that did that.

I knew the web server approach wouldn't help me because its server focused and I didn't want to have to build something that sent requests to multiple servers to synchronize them. Another possible option is to use Web Sockets and have each pumpkin sync with a server process, but that seemed like more work than I was willing to do.

The mobile app I created to control the web server version of the project is able to easily use a TCP connection to an Arduino device. With that in mind, I started investigating whether I could use TCP's close cousin UDP to deliver synchronization across the pumpkins. It turns out it can and I quickly updated my mobile app ([Pumpkin Controller (Flutter)](https://github.com/fumblystuff/pumpkin-controller-app-flutter){target="_blank"}) to support both HTTP requests over TCP (for the web server version) and UDP broadcasts (for the synchronized version). Basically it works something like this:

<img src="src/images/2023/udp-broadcast-connection.png" alt="Connection Diagram" />

Every time you tap one of the buttons in the app, it sends a UDP broadcast messages on the local network and any device listening for the messages will read the message and act upon them.

In the mobile app, open settings and from there you enable the UDP broadcast capabilities in the app as shown in the following figure. 

<img src="src/images/2023/pumpkin-controller-udp.png" alt="Pumpkin Controller UDP Broadcast Configuration" />

Next, you install the [Glowing Pumpkin Receiver (UDP)](https://github.com/johnwargo/glowing-pumpkin-receiver-udp){target="_blank"} code on all of the Glowing Pumpkin BFF devices you want controlled by the mobile app and you're all set.

Here's a demonstration video showing synchronized pumpkin LEDs in action.

https://youtu.be/beevHJM8poQ
