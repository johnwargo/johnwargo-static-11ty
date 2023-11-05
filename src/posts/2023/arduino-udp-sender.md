---
title: Using UDP Broadcast to Synchronize Actions Across Arduino Devices
description: 
date: 2023-11-05
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - Internet of Things (IoT)
---

With my [Glowing Pumpkin Project Refresh](https://johnwargo.com/posts/2023/glowing-pumpkin-project-refresh/) my ultimate goal was to synchronize LED Matrix colors across multiple devices so I could place one in a pumpkin in each of the front dormers in my house. I finally got it all working and published the project yesterday at [Glowing Pumpkin Sync UDP](https://github.com/johnwargo/glowing-pumpkin-udp-sync){target="_blank"}.

Here's the project in action (without pumpkins this time):

https://www.youtube.com/watch?v=L2v5T3hO6S4

With this version of the GLowing Pumpkin project, you deploy one Glowing Pumpkin Xiao 5x5 BFF device with the [Sender](https://github.com/johnwargo/glowing-pumpkin-udp-sync/tree/main/udp-sender-arduino){target="_blank"} sketch deployed to it and all of the other devices with the [Receiver](https://github.com/johnwargo/glowing-pumpkin-udp-sync/tree/main/udp-receiver-arduino){target="_blank"} sketch. As long as all of the devices are one the same Wi-Fi network, they all connect to the network and the Sender starts sending commands to each of the Receiver devices using UDP Broadcast messages. 

{% image "src/images/2023/udp-sync-diagram.png", "UDP Sync Connection Diagram", "image-full" %}

## Arduino Sender 

Here's the loop code from the Sender:

```c
void loop() {
  String cmdStr;
  int colorIdx;

  cmdStr = broadcastPrefix;
  //generate a random integer between 1 and 10
  if ((int)random(11) > 8) {
    // if it's a 9 or a 10, do that flicker thing
    // but, did we just flicker?
    if (!justFlickered) {
      // whew, OK, it's good to flicker, just not twice in a row
      justFlickered = true;
      // reset our last color idx since we flickered
      lastColorIdx = -1;  
      // build the command string
      cmdStr += "f";
      sendBroadcast(cmdStr);
      flicker();
      delay(1000);
    }
  } else {
    justFlickered = false;
    // Otherwise switch to the new color
    // pick a new color index
    colorIdx = random(1, numColors + 1);
    // if it's the same color as last time, keep looking until you get a new one
    while (colorIdx == lastColorIdx) {
      // pick another color index
      colorIdx = random(1, numColors + 1);
    }
    // whew, we made it here, so we must have a new color index
    // assign it to lastColorIdx to use the next time around
    lastColorIdx = colorIdx;
    // build the command string
    cmdStr += "c:";
    cmdStr += String(colorIdx);
    sendBroadcast(cmdStr);
    fadeColor(colors[colorIdx]);
    // wait a while
    delay((int)random(DELAY_MIN, DELAY_MAX));
  }
  delay(25);
}
```

It's essentially the same code from the original BFF project but as soon as it decides to flicker (like lightning inside the pumpkin) or what color to display, it sends a command to the Receiver devices to do the same thing.

## Arduino Receiver 

In the receiver, the sketch sets up an UDP listener that parses the incoming packet, then calls the local function to flicker the LED Matrix (when it receives the `f` command) or fade to a particular color (when it receives the `c:#` command where the `#` refers to a particular color in the color array).

```c
void loop() {
  // if there's UDP data available, read a packet
  int packetSize = udp.parsePacket();
  if (packetSize) {
    IPAddress remoteIp = udp.remoteIP();
    // read the packet into packetBufffer  
    int len = udp.read(packetBuffer, 255);
    if (len > 0) {
      packetBuffer[len] = 0;
    }
    request = packetBuffer;

    // Color
    searchStr = broadcastPrefix + "c:";
    colorPos = searchStr.length();
    if (request.indexOf(searchStr) >= 0) {
      fadeColor(colors[request.charAt(colorPos) - '0']);
      return;  // skip the rest of this loop
    }

    // Flicker
    searchStr = broadcastPrefix + "f";
    if (request.indexOf(searchStr) >= 0) {
      flicker();
    }
  }
  delay(25);
}
```

## Raspberry Pi Pico W Sender

As I worked on this project, I had some trouble getting the Sender sketch working as an Arduino project. I finally figured it out, but as I tried different solutions to get this working I built a [Python version of the Sender](https://github.com/johnwargo/glowing-pumpkin-udp-sync/tree/main/udp-sender-pi-pico-w){target="_blank"} for the Raspberry Pi Pico W. If you want to use this version, run the Sender on the Pico and run the Receiver on all of the Glowing Pumpkin Xiao 5x5 BFF devices.

## Wrap-up

This all works really well except that I periodically have some difficulty connecting several of my devices to my Wi-Fi network. I'm not sure whether it's a problem with the [Seeed Studio Xiao](https://www.seeedstudio.com/XIAO-ESP32S3-p-5627.html){target="_blank"} devices or my network (Nest Wi-Fi) not trusting the devices because I keep rebooting them during development. I found that with one of the devices, if I let it sit for a couple of hours, it connects just find. For another device, I have to fiddle with it for a while to get it to connect. I'm going to swap out the hardware (I have some spares here) and see what happens. 

I hope you enjoy this project, I'm excited that I was able to accomplish what I wanted to do using UDP broadcasts. 

Here's links to the articles in the Glowing Pumpkin Xiao 5x5 BFF series:

* [Glowing Pumpkin Project Refresh](https://johnwargo.com/posts/2023/glowing-pumpkin-project-refresh/)
* [Arduino UDP Broadcast Receiver](https://johnwargo.com/posts/2023/arduino-udp-broadcast-receiver/)
* [Arduino ESP32 Web Server on a Processor Core](https://johnwargo.com/posts/2023/arduino-esp32-web-server-on-a-processor-core/)
