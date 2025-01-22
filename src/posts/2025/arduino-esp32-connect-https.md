---
title: Arduino ESP32 Connect to Server Using HTTPS
description: 
date: 2025-01-22
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-01-22T12:02:56.022Z
---



## Why Bacon Ipsum


## Getting the Certificate


## Generating the Certificate Code


## Looking at the Code

### Setup


### Loop




### Code Weirdness


```c
if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
  String payload = https.getString();
  Serial.println(payload);
}
```