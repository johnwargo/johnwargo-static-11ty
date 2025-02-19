---
title: ESP32 Request Repeater With Sleep
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
timestamp: 2025-02-18T23:46:03.224Z
---

In my [previous post](/posts/2025/esp32-sleep-http/){target="_blank"} I described how to put an ESP device to sleep (allowing it to wake up later). I used a sample sketch I created, [ESP32 Request Repeater (HTTP)](https://github.com/johnwargo/esp32-request-repeater-http){target="_blank"}, to show how it works. 

The sample sketch sends a HTTP to a remote host, then puts the device to sleep (deep sleep) with instructions to wake up two minutes later to do it again. I realized then I would probably make a TLS (HTTPS) version of the sketch and publish it as well. Well, I published it, and this post highlights the differences between it and the HTTP version.

{% sidebar "ESP32 Request Repeater (HTTPS)" %}
All the code for this project is online at <a href="https://github.com/johnwargo/esp32-request-repeater-https" target="_blank">ESP32 Request Repeater (HTTPS)</a>.
{% endsidebar %}

Both versions (HTTP and HTTPS) of the sketch:

1. Tells you how many times it's woken and made (or tried to make) a request
2. Waits for 30 seconds so you can upload sketch updates to the device
3. Connects to the Wi-Fi network
4. Sends the request (this version sends the request using TLS (HTTPS))
5. Puts the device to sleep for SLEEP_DURATION_MINUTES

So it's the exact same approach except for the more secure nature of the request.

## Initialization

The initialization section of the code has only a few changes, mostly additions:

```c
#include <WiFiClientSecure.h>

#include "cert.h"

HTTPClient https;
WiFiClientSecure* client = new WiFiClientSecure;
```
The code has the following changes: 

+ Added the `WiFiClientSecure` library which implements a client object the sketch uses to create an HTTPS request. 
+ Added the Certificate Authority (CA) certificate file `cert.h` required to enable secure communications with the remote host using TLS (HTTPS). I wrote more about this in [ESP32 Connect Using HTTPS](/posts/2025/https-client-esp32/){target="_blank"}
+ Changed the HTTPClient variable from `http` to `https`
+ Created a new `client` object using `WiFiClientSecure`.

Beyond those simple changes, the remaining changes are in the `callRemoteHost()` function described below.

## Sending the Request

In the sketch, I enhanced the `callRemoteHost()` function to use the `client` object to manage the secure connection to the remote host:

```c
void callRemoteHost() {
  client->setCACert(caCert);
  Serial.printf("Connecting to %s\n", REMOTE_HOST);
  if (https.begin(*client, REMOTE_HOST)) {
    // start connection to host as a GET request
    int httpCode = https.GET();
    if (httpCode > 0) {  // httpCode is negative on error
      Serial.printf("Response: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK) {
        String payload = https.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("GET failed, error: %s\n", https.errorToString(httpCode).c_str());
    }
    // close the connection
    https.end();
  }
}
```

The differences from the HTTP version are:

+ Assigning the CA cert to the `client` object
+ Passing the `client` object (well, a pointer to the `client` object anyway) when `begin`ing the request

Otherwise it's essentially the same code. 

One other difference is that the sketch checks the status of the call to `begin` and only tries to send the request when that succeeds. I don't know where I pulled that code from, I imagine it would work as well without it.
