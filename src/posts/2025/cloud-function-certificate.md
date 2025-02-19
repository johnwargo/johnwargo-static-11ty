---
title: Cloud Function Certificate Issue
description: 
date: 2025-02-18
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-19T00:53:57.583Z
---

After publishing my [M5StackC-Plus Cloud Function Execution](https://github.com/johnwargo/m5stickc-plus-cloud-function){target="_blank"} example, I used it for about a week before it just stopped working one day. 

I tried opening my garage door with it a couple of times and it failed every time. So I pulled out my smartphone and opened my custom garage opener app and it worked just fine. 

Sigh. 

So, it wasn't a network issue, and cloud function used by the sketch works just fine (the mobile app calls the same cloud function). 

It didn't take me long to start thinking about security as the cause for this issue. I fired up my browser of choice, navigated to the cloud function and clicked the public URL for the function. Following the instructions I'd written in [ESP32 Connect Using HTTPS](/posts/2025/https-client-esp32/){target="_blank"} I opened up the root Certificate Authority (CA) certificate used by the cloud vendor's functions service and realized that it was different than the one used in the sketch.

I downloaded the cert, converted it into Arduino source code using [Cert2Arduino](https://cert2arduino.netlify.app/){target="_blank"}, built and deployed the sketch, and discovered that this fixed the issue

I don't know whether cloud function provider suddenly decided to switch the CA certificate or whether what happened was part of regular cycling of the certificates. It also could be that I was accidentally hitting the same server and a load balancer suddenly sent me to a different one (with a different CA cert).  I'll watch this for a while and see if it happens again and let you know.
