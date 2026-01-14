---
title: Mounting the DFRobot mmWave RADAR
description: 
date: 2023-12-08
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
---

A while back, I started building a project using the [DFRobot mmWave RADAR](/posts/2023/dfrobot-mmwave-radar/){target="_blank"}. However, as I described in [IoT Component Manufacturers Ignoring Mounting Needs](/posts/2023/iot-component-mounting/){target="_blank"}, I had some trouble figuring out how to mount the device in my project. 

After I published that article, I spoke with the product team at DFRobot and they informed me that they build that sensor expecting it to be mounted inside a commercial product. So it doesn't have an easy way to mount because my use case is different.

My project is the Sleeping Dragon in a Mailbox project that I was supposed to finish for Halloween this year, but ran out of time due to hardware incompatibilities (a long story that I'll write about later). I needed a way to mount the mmWave device on top of the sign and I finally decided on a simple implementation.

Adafruit makes a quarter-sized [Perma-Proto breadboard PCB](https://adafruit.com/product/1608){target="_blank"} that's just the right size for my purposes. I ordered some right-angle female headers and soldered them to the breadboard as shown in the following image.

<img src="src/images/2023/mount-mmwave-01.jpg" alt="" />

With male headers soldered to the mmWave device, the RADAR points to the front as I needed it for my project.

<img src="src/images/2023/mount-mmwave-02.jpg" alt="" />
<img src="src/images/2023/mount-mmwave-03.jpg" alt="" />

Next, soldered the connections from the ESP32 device I'm using for this project.

<img src="src/images/2023/mount-mmwave-04.jpg" alt="" />

Finally, I mounted the Perma-Proto board on top of the Sleeping Dragon sign.

<img src="src/images/2023/mount-mmwave-05.jpg" alt="" />

I could have done more to hide the wires and I definitely should have painted the Perma-Proto board black, but this solved my mounting issue and aims the mmWave device right where I want.
