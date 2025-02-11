---
title: M5Stack M5StickC-PLUS Garage Door Opener
description: 
date: 2025-02-11
showCoffee: true
headerImage:
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-11T22:26:23.451Z
---

In [ESP32 HTTP Client Request with JSON Body](https://johnwargo.com/posts/2025/http-client-esp32-with-json-body/) I demonstrated how to call a remote API from an ESP32 device; in that example, the request body passed content in JSON format to the server. As I described in that post, I built that sample because I wanted to be able to build an ESP32 garage door opener and that was a stepping stone for me to this project.

This post is about that garage door opener.

{% sidebar "Code Available Online" %}
All the code for this project is online at <a href="https://github.com/johnwargo/m5stickc-plus-cloud-function" target="_blank">M5StackC-Plus Cloud Function Execution</a>
{% endsidebar %}

To build my garage door opener, I used the [M5StickC PLUS ESP32-PICO Mini IoT Development Kit](https://shop.m5stack.com/products/m5stickc-plus-esp32-pico-mini-iot-development-kit){target="_blank"}; it's a small ESP32 device with a small screen and a button on the face of the device. The form factor is perfect for my needs here.

**Note:** The blue arrow in the figure below highlights the device's power button; I was lazy and copied the picture from the code repository.

{% image "src/images/2025/m5stick-01.jpg", "An image of a M5Stack M5StickC-Plus device running my sketch", "image-full" %}

Using the cloud function as a starting point, I built a sketch for the M5StickC-PLUS device that:

1. Validates the configuration settings in the sketch (like Wi-Fi network, remote endpoint, etc.)
2. Connects to my local Wi-Fi network
3. Displays "Push Button" with an arrow pointing to the button on the face of the device.

The device automatically powers down after 30 seconds of inactivity. 

If the user pushes the M5 button on the device face before the 30 second shutdown limit, the sketch calls the remote function configured in the sketch and passes the data (also configured in the sketch) in the body of the request in JSON format. For my use case, the sketch calls my cloud function that triggers my garage door opener, passing in the required API key and other information required to perform the action. 

## Configuring the Sketch

The repository has more detailed instructions, but here's how you configure the sketch:

```c
#define REMOTE_HOST "https://myremotehost.com/api"
#define USE_PARAMS true
const int PARAM_ROWS = 2;
String paramsArray[PARAM_ROWS][2] = {
  { "myApiKey", "some api key" }, 
  { "otherPertinentInfo", "some other data" }
};
```

These settings and more are stored in an external configuration file and read by the sketch at compile time. With this approach, the user can modify the configuration without modifying the cloned repository; if I later make changes to the sketch, the user can quickly sync it and deploy it to devices.

If your particular cloud function requires one or more than two pieces of data send in the body, you can easily modify the configuration to accommodate as many or few properties as needed. You can even disable the JSON body by setting `USE_PARAMS` to `false` in the configuration file.

## Startup Time

Powering up the device and it connecting to my home Wi-Fi network is typically the matter of seconds.  My home Wi-Fi network covers my driveway, so it's really simple for me to get in and out of my garage in seconds using the M5StickC-Plus and my sketch.

## Shutdown Timer

The shutdown timer resets after every successful call to the remote host. In my case, I use the button to open the garage door when I'm in the car waiting to pull my car in the garage. Once I'm in the garage, I push it again to close it behind my car; the 30 second timer is enough time for this. Fortunately, the inactivity timeout value is easily modified before compiling and deploying the sketch. 

## Multiple Cores

I coded the sketch so it splits tasks across the ESP32's dual core architecture. The sketch's `loop` function executes on processor core 0 and the section of the code (the event loop) that calls the remote function executes on core 1. 

With this architecture, while processor 1 is busy connecting to the remote host and processing the response, in the `loop` function on core 0 is unfettered by that activity I could add a screen animation to indicate that the device is busy without affecting performance of either task.

## About M5Stack Devices

I'm a huge fan of M5Stack devices because they're generally:

+ Built using high-powered ESP32 devices (my favorite)
+ Packaged in a nice enclosure with a screen and one or more buttons
+ Packaged with a rechargeable battery

And they connect and charge using USB-C connectors (which should be the norm for any device today). 

I have a stack (no pun intended) of these devices and I'll post more about them over time. 
