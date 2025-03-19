---
title: USB 3.0 Cable Power Switch
description: 
date: 2025-03-02
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Project Builds
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-03-02T18:37:36.948Z
---

On a couple of projects lately I found myself repeatedly plugging and unplugging microcontrollers to/from my development system. This happens most frequently when writing faulty code for an ESP32 device and, when the compiled code runs on an ESP32, the code Panics and repeatedly reboots the device - panicking every time it restarts.

I also noticed that for some Microcontroller projects, like the [M5Stack M5StickC-Plus](https://shop.m5stack.com/products/m5stickc-plus-esp32-pico-mini-iot-development-kit?variant=43983456764161){target="_blank"}  I can't leave the device plugged in very long if I want to deploy a new version of the code to the device; for some reason it regularly disconnects from the computer. I often must unplug the device and plug it back in again during the compilation step so it's in the right state when the Arduino Compiler's ready to deploy code to the device.

This started me looking for an USB cable switch that I could use to just disconnect power from the device but leave the cable plugged in between my desktop computer and the microcontroller device. I found quite a few online and even bought one, but they tend to be short cables with a switch in the middle which doesn't work for my use case. My development system is a massive tower computer sitting on the floor under my desk and a cable that short wouldn't reach the top of my desk with enough room to not pull the microcontroller off of the desktop with the weight of the cable.

So, I decided to build my own.

{% sidebar "Complete Project on Instructables" %}
I published this project on Instructables as <a href="https://www.instructables.com/USB-30-Cable-Power-Switch/" target="_blank">USB 3.0 Cable Power Switch</a>.
{% endsidebar %}

Here's an image of the completed project.

{% image "src/images/2025/usb-switch-final.jpg", "An image of the completed project", "image-full" %}

I found some panel mount USB 3.0 ports and a double throw single pull (DPST) switch and got to work. First I designed a panel for the switch and printed it. I knew I'd ultimately build a wooden enclosure around it, but haven't done that yet. Here's an image of the panel, USB ports, some wires, and other stuff:

{% image "src/images/2025/usb-switch-components.jpg", "a panel, two USB panel mount ports and some wires", "image-full" %}

Next, I mounted the USB ports to the panel

{% image "src/images/2025/usb-switch-panel-front.jpg", "The front of the panel with the USB ports mounted", "image-full" %}

And finally wired everything together and added the switch. 

{% image "src/images/2025/usb-switch-panel-back.jpg", "The completed assembly from the back", "image-full" %}

I've been wanting to publish something on [Instructables](https://www.instructables.com){target="_blank"}, so I made this my first project: [USB 3.0 Cable Power Switch](https://www.instructables.com/USB-30-Cable-Power-Switch/){target="_blank"}.

I'll finish the enclosure for it this week and post some pictures.
