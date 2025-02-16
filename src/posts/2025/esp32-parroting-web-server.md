---
title: ESP32 Parroting Web Server
description: 
date: 2025-02-15
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-16T01:41:28.874Z
---

I'm working on a version of my [Pumpkin LED Controller](https://github.com/johnwargo/glowing-pumpkin-controller-html){target="_blank"} for the [Unihiker M10](https://www.unihiker.com/products/m10){target="_blank"} single board computer. Web and mobile apps have a variety of issues when connecting to a web server running on an ESP32 device (as I wrote about in [Accessing an Arduino ESP32 Web Server](/posts/2023/accessing-an-arduino-esp32-web-server/){target="_blank"}and [Pumpkin Controller Native Apps for Windows](/posts/2023/pumpkin-controller-native-apps-for-windows/){target="_blank"}) and I think a device like the Unihiker may provide a way around them.

Anyway, I have the first version of the Python app finished and as I started thinking about testing the app, I realized that all of my pumpkin LED devices are all in storage and zip tied to some fake pumpkins. I didn't have any spare hardware devices lying around (it uses a special 5x5 LED matrix I had to order), so I decided to write a little sketch that acted as a simple web server that parroted every request it received. With that sketch running on an inexpensive ESP32 device, I could test my python program without needing the custom hardware.

{% sidebar "ESP32 Parrot Server" %}
You can find all of the code discussed in this post on Github in <a href="https://github.com/johnwargo/esp32-parrot-server" target="_blank">ESP32 Parrot Server</a>. The code you need to configure and deploy the sketch on an ESP32 device is in the repo.
{% endsidebar %}

The code is really simple and easy to configure. I abstracted the Wi-Fi credentials and local hostname into a separate configuration file so if I make changes in the future, you can apply them without having to reconfigure the sketch.

When you run the sketch, the Arduino IDE Serial Monitor displays a running commentary on the incoming requests:

```text
***********************
* ESP32 Parrot Server * 
* By John M. Wargo.   * 
***********************

Connecting to MyLocalNetwork
..
WiFi connected
IP address: 192.168.86.88

Web server: MDNS responder started
Web server: HTTP server started
Web server: Request: /someRequest
```

This allows me to watch incoming requests as I test and troubleshoot the code making the requests.

The MDNS line in the output indicates that it registered the hostname on the local network, so the application that sends requests to the sketch can access the server using the hostname (in my example `parrot`) and `.local` like this: `http://parrot.local`.

This sketch only accepts HTTP requests, I may create a version that uses TLS (HTTPS) someday.

The sketch enables CORS, so if you access it from a web browser, you'll see two requests come in (rather than just one). The first one is the CORS request asking for supported options and the second request is the actual request.

There is one little weirdness about the code; in the initialization code that sets up the server, I used the following:

```c
server.enableCORS();
server.on("/", handleRoot);
server.onNotFound(handleRequest);
server.begin();
displayMessage("HTTP server started");
```

I registered a request handlers for the server root (`/`) and for any other request (the `onNotFound()` method). Not because I needed to, but because I thought the code would look a little weird if it only registered a not found handler.

Anyway, you can remove the root handler if you want, but at least this shows how to handle different requests that arrive at the server.
