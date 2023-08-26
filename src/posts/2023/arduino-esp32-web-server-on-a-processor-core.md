---
title: Arduino ESP32 Web Server on a Processor Core
description: 
date: 2023-08-27
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
  - ESP32
---

I wrote the [Arduino ESP32 Running Tasks On Multiple Cores](/posts/2023/arduino-running-tasks-on-multiple-cores/) post I published earlier this week so I could publish this one. 

Years ago I published a several Glowing Pumpkin projects: Arduino Glowing Pumpkin and Arduino Glowing Pumpkin (Adafruit Feather). Both of them used Arduino compatible devices plus either one of the Adafruit multi-NeoPixel devices or a NeoPixel shield.

I always wanted to redo this project, especially using some of the smaller ESP32 devices like the [Seeed Studio Xaio](https://www.seeedstudio.com/xiao-series-page){target="_blank"} series of microcontrollers and some of the smaller NeoPixel matrixes like the [Adafruit 5x5 NeoPixel Grid BFF Add-On for QT Py and Xiao](https://www.adafruit.com/product/5646){target="_blank"}. Because of this, I recently published a refresh in [Glowing Pumpkin Xiao 5x5 BFF](https://github.com/johnwargo/glowing-pumpkin-xiao-bff){target="_blank"}. 

With that project in the can (a movie-making term) I started thinking about what else I could do with it. I quickly realized that I could enhance the project by adding a web server and letting a user remotely control the pumpkin illuminating hardware using a web browser or mobile app. I agree that that's not the most interesting use case, but I figured I'd use what I learned about splitting tasks across multiple ESP32 processor cores to run a web server on one of the cores while the other one does something else. 

This article explains how I did it. If you want to skip the explanation all together and jump to the code, you can find the complete project code at [Glowing Pumpkin Xiao 5x5 BFF Server](https://github.com/johnwargo/glowing-pumpkin-xiao-bff-server){target="_blank"}.

## The API

For this project, I have this Arduino compatible Microcontroller with a 5x5 NeoPixel matrix strapped to its back residing NeoPixels facing up inside a theoretical carved pumpkin. What would I want to be able to do with this thing?  

Assuming the following NeoPixel configuration:

```c
int numColors = 6;
uint32_t colors[] = { CRGB::Blue, CRGB::Green, CRGB::Orange, CRGB::Purple, CRGB::Red, CRGB::Yellow };
CRGB leds[NUM_LEDS];  
```

I came up with the following API:

| Method      | Description |
| ----------- | ----------- |
| `/color:#`     | Lights all of the NeoPixels with a specific color. The command accepts a single parameter, the array index for the selected color. So, for example, to illuminate all of the LEDs Purple, the command is `color:3` as Purple is the 4th color in the array (with an index of 3 since C arrays start at 0). To illuminate the LEDs Blue, the command is `color:0`. |
| `/flash:#:#`     | Flash the LED matrix a specific color a specific number of times. For example, to flash the LED matrix Blue three times, the command is `flash:0:3`. |
| `/lightning` | Flash the LED matrix White a random number of times for a random amount of time for each flash in an attempt to simulate lightning or electrical flashes inside the pumpkin. |
| `/off`       | Turns off the LED Matrix (sets all NeoPixels to `CRGB::Black`). |
| `/random`    | Enables random mode where the ESP32 device randomly picks a color from the array and displays it for a random amount of time (seconds) before picking another color and starting all over again. |

## CORS Impact

Before I get too far into this post I have to warn you about something. 

Even though you can run a Web Server on an Arduino device and have it process requests, it doesn't mean that you can access the web server from any device anywhere. The Internet, well, really mostly Google, conspires against you and will block responses from the web server in several scenarios.

Yeah, I know, right?

Anyways, back in 2019 Google got serious about HTTPS requests vs. HTTP; you can read about it in [No More Mixed Messages About HTTPS](https://blog.chromium.org/2019/10/no-more-mixed-messages-about-https.html){target="_blank"}. With this, Google started preferring HTTPS connections (while still allowing HTTP connections) but eventually started blocking HTTP connections all together.

There's also this thing called [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS){target="_blank"} that tries to help secure connections between a browser and a server. The web application has to enable CORS (which basically means adding some headers to the request) in order to be able to make a request to the server and the server must respond in kind (with the right headers). Even if you setup CORS correctly, the browser will block responses from our tiny little web server unless:

1. The web server and the system running the browser are running on the same local network.
2. You use some other application other than a browser to connect to the web server.
2. You're using an Internet-hosted web application, but set some special settings that allow the browser to connect to the server and accept responses from it. 

I know, it's a pain in the @ss.

So, for this post, I only cover connecting to the web server from a locally hosted browser and from another application (instead of a browser) running on the same network. In my next post, I'll cover the other use cases. I apologize for that, but this article is going to be pretty big without me covering all options.

## Core 1

In this project, the web server runs on core 0. I'll get to that code in a minute, but lets talk about the other core, what code it runs. 

Core 1 has an easy job, all it has to do is check to see if Random is enabled then, if it is enabled, pick a color and update the NeoPixel matrix with that color.

```c
void Task1code(void* pvParameters) {
  int randomInt;

  Serial.print("LED Management running on core ");
  Serial.println(xPortGetCoreID());

  // Repeat the following infinitely
  for (;;) {
    if (doRandom) {
      randomInt = (int)random(1, numColors + 1);
      fadeColor(colors[randomInt]);
    }
    // Add a small delay to let the watchdog process
    //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
    delay(25);
  }
}
```

While this isn't an amazing example of splitting tasks across two processor cores, by splitting this task off to its own processor, the random color process runs smoothly - no matter what the web server is doing. A much better example would be two processor intensive tasks running simultaneously on separate cores but I don't have that example handy. This is all I have to share with you.


## My First Web Server Attempt

The web server runs as the `Task0` task as described in my previous post. The web server and all the actions it takes runs on the ESP32 processor core 0.

The Arduino platform's Wi-Fi library includes a rudimentary [WiFi Web Server](https://docs.arduino.cc/library-examples/wifi-library/WiFiWebServer){target="_blank"}, so I decided to start there. Using what I learned in the previous post ([Arduino ESP32 Running Tasks On Multiple Cores](/posts/2023/arduino-running-tasks-on-multiple-cores/)), I created a new Arduino project, configured the sketch to connect to my Wi-Fi network, then configured a web server on an ESP32's first core (Core 0) using the web server tutorial linked at the top of the paragraph. The web server code looked like this:

```c
String request, searchStr;
int color, colorPos, count;

WebServer server(80);

void Task0code(void* pvParameters) {

  Serial.print("Web Server running on core ");
  Serial.println(xPortGetCoreID());
  
  // This is the worker code for the core, runs infinitely
  // listening for requests from the remote client
  for (;;) {
    request = "";                            // empty this to eliminate previous responses
    WiFiClient client = server.available();  // Listen for incoming clients
    if (client) {
      Serial.println("Client connection");
      while (client.connected()) {  // loop while the client's connected
        if (client.available()) {   // if there's bytes to read from the client,
          char c = client.read();   // read a byte, then
          request += c;             // append it to the response variable

          if (c == '\n') {
            Serial.println(request);

            // Color command
            searchStr = "GET /color:";
            colorPos = searchStr.length();
            if (request.indexOf(searchStr) >= 0) {
              // subtracts '0' from it to get the integer representation of the number
              color = request.charAt(colorPos) - '0';
              Serial.print("Set Color #");
              Serial.println(color);

              if (color > numColors - 1) {  // invalid color idx
                allOff();
                error(client);
                break;
              }

              disableRandom();
              fadeColor(colors[color]);
              success(client);
              break;
            }

            // FLash command
            searchStr = "GET /flash:";
            colorPos = searchStr.length();
            if (request.indexOf(searchStr) >= 0) {
              // subtracts '0' from it to get the integer representation of the number
              color = request.charAt(colorPos) - '0';
              // get the number of flashes
              count = request.charAt(colorPos + 2) - '0';
              Serial.print("Flash color #");
              Serial.print(color);
              Serial.print(", ");
              Serial.print(count);
              Serial.println(" times");

              if (color > numColors - 1) {  // invalid color idx
                allOff();
                error(client);
                break;
              }

              flashLEDs(colors[color], count);
              success(client);
              break;
            }

            // Lightning command
            if (request.indexOf("GET /lightning") >= 0) {
              Serial.println("Lightning");
              flicker();
              success(client);
              break;
            }

            // Off command
            if (request.indexOf("GET /off") >= 0) {
              Serial.println("Off");
              allOff();
              success(client);
              break;
            }

            // Random command
            if (request.indexOf("GET /random") >= 0) {
              Serial.println("Random");
              enableRandom();
              success(client);
              break;
            }
          }
        }
        delay(10);
      }
      client.stop();
      Serial.println("client disconnected");
    }
    // Add a small delay to let the watchdog process
    //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
    delay(25);
  }
}
```

I'm not going to explain all the ins and outs of the code since it's not important because I abandoned this approach.  If you look at the code, it's klunky. For example, to read the request, the sketch does the following:

```c
// empty the previous request buffer to eliminate previous responses
request = "";                            
// Listen for incoming client requests
WiFiClient client = server.available();  
if (client) {
  Serial.println("Client connection");
  while (client.connected()) {  // loop while the client's connected
    if (client.available()) {   // if there's bytes to read from the client,
      char c = client.read();   // read a byte, then
      request += c;             // append it to the response variable

      if (c == '\n') {
        // search through the line looking for one of the API commands

      }
  }
  client.stop();
  Serial.println("client disconnected");
}
```

The code reads requests character by character looking for a new line character (`\n`), next it must search the request line (each request could be multiple lines considering HTTP headers) by line until it sees a command it recognizes. 

Next, I had to write a bunch of if/then statements to identify the different API commands and act accordingly. It's not beautiful code and I could have used functions to make it cleaner, but there has to be a better way. I quickly abandoned this approach.

## A Better Web Server Approach

Poking around for an alternative to the standard arduino web server I found the [Arduino-ESP32 WebServer library](https://github.com/espressif/arduino-esp32/tree/master/libraries/WebServer){target="_blank"}. This code is specific to the ESP32 but offers a much cleaner implementation plus it support CORS out of the box. Looking at the main server setup and request processing loop looks like this:

```c
#include <ESPmDNS.h>
#include <WebServer.h>

#include <uri/UriBraces.h>

WebServer server(80);

void Task0code(void* pvParameters) {

  Serial.print("Web Server running on core ");
  Serial.println(xPortGetCoreID());

  if (MDNS.begin(HOSTNAME)) {
    displayMessage("MDNS responder started");
    MDNS.addService("http", "tcp", 80);
  } else {
    // It didn't work, so turn the LED Matrix Red
    // until someone notices (forever)
    displayMessage("Error setting up MDNS responder!");
    fadeColor(CRGB::Red);
    while (1) {
      delay(1000);
    }
  }

  server.enableCORS();
  server.on("/", handleRoot);
  server.on(UriBraces("/color:{}"), handleColor);
  server.on(UriBraces("/flash:{}"), handleFlash);
  server.on("/lightning", handleFlicker);
  server.on("/off", handleOff);
  server.on("/random", handleRandom);
  server.onNotFound(handleNotFound);
  server.begin();
  displayMessage("HTTP server started\n");

  for (;;) {
    server.handleClient();
    // Add a small delay to let the watchdog process
    //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
    delay(25);
  }
}
```

Notice how it's a lot cleaner? It's a lot easier to maintain too. Lets dig into the code.

### Core 0

First of all, the web server process runs on the ESP32 device's core 0. Since there's nothing executing in the sketch's main `loop` function, the core is dedicated to the web server process (more or less, that may not be 100% true, but close).

### Multicast DNS

Next, the sketch uses the [Multicast DNS (ESPmDNS)](https://github.com/espressif/arduino-esp32/blob/master/libraries/ESPmDNS/src/ESPmDNS.h){target="_blank"} library to register a unique name for the device on the network. The code looks like this:

```c
#define HOSTNAME "pumpkin"

if (MDNS.begin(HOSTNAME)) {
  displayMessage("MDNS responder started");
  MDNS.addService("http", "tcp", 80);
} else {
  displayMessage("Error setting up MDNS responder!");
  fadeColor(CRGB::Red);
  while (1) {
    delay(1000);
  }
}
```

What this code does is define a network device in DNS with the name `pumpkin.local`.

If I open a browser and type `pumpkin.local` in the address bar, the browser will connect to the web server running on the device and request the page at `/`. How cool is that? It even works with the `ping` command:

{% image "src/images/2023/ping-pumpkin-local.png", "windows terminal showing the results of the ping command", "image-full" %}

With this in place, any user trying to connect to the web server only needs the name for the device, nothing more. Without this, the user would have to determine the IP Address for the device (perhaps pulling it from the Serial Monitor while the sketch runs in the Arduino IDE) and type it in manually every time they wanted to use it.

### Processing Client Requests

At this point, it's time to setup the Web Server code. In the example below, the sketch:

1. Enables CORS so the web server automatically adds the needed headers to every response.
2. Adds an event handler for root requests for the web server (`/'`).
3. Adds event handlers for the different API commands (described above).
4. Adds an event handler for requests that don't match any of the defined requests (404 - not found).
5. Starts the server.
6. Writes to the Serial Monitor letting the developer (me) know that the server started.

The server process has everything it needs to process any request it receives. 

Here's the code that implements everything in that list:

```c
server.enableCORS();
server.on("/", handleRoot);
server.on(UriBraces("/color:{}"), handleColor);
server.on(UriBraces("/flash:{}"), handleFlash);
server.on("/lightning", handleFlicker);
server.on("/off", handleOff);
server.on("/random", handleRandom);
server.onNotFound(handleNotFound);
server.begin();
displayMessage("HTTP server started\n");

for (;;) {
  server.handleClient();
  // Add a small delay to let the watchdog process
  //https://stackoverflow.com/questions/66278271/task-watchdog-got-triggered-the-tasks-did-not-reset-the-watchdog-in-time
  delay(25);
}
```

#### Handling Root Requests



```c
void handleRoot() {  
  displayMessage("Root (/)\n");
  String redirectHTML = "<html>";
  redirectHTML += "<head><title>Redirecting</title>";
  redirectHTML += "<meta http-equiv='Refresh' content=\"3; url='https://pumpkin-controller.netlify.app?" + WiFi.localIP().toString() + "'\" />";
  redirectHTML += "<link rel='stylesheet' href='https://unpkg.com/mvp.css'>";
  redirectHTML += "</head><body><main>";
  redirectHTML += "<h1>Redirecting</h1><p>Redirecting to Pumpkin Controller<p>";
  redirectHTML += "</main></body></html>";
  server.send(200, "text/html", redirectHTML);
}
```


```html
<html>
  <head>
    <title>Redirecting</title>
    <meta http-equiv='Refresh' content="3; url='https://pumpkin-controller.netlify.app?192.168.86.230'" />
    <link rel='stylesheet' href='https://unpkg.com/mvp.css'>
  </head>
  <body>
    <main>
      <h1>Redirecting</h1>
      <p>Redirecting to Pumpkin Controller<p>          
    </main>
  </body>
</html>
```


pass IP Address on redirect, automatic configuration of app



#### Not Found


```c
void handleNotFound() {
  displayMessage("Not Found\n");
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
```

#### Color


```c
void handleColor() {
  int color;
  String colorStr = server.pathArg(0);

  // Only accept GET requests, this addresses a problem caused by
  // CORS preflight check requests that the web server library
  // doesn't deal with correctly (OK, not at all)
  if (server.method() != HTTP_GET) return;
  displayMessage("color: " + colorStr);

  color = colorStr.toInt();
  if (color > numColors - 1) {  // invalid color idx
    allOff();
    sendError();
    return;
  }
  sendSuccess();
  disableRandom();
  fadeColor(colors[color]);
}
```

#### Flash


```c
void handleFlash() {
  int color, count;
  String uriParms = server.pathArg(0);

  // Only accept GET requests, this addresses a problem caused by
  // CORS preflight check requests that the web server library
  // doesn't deal with correctly (OK, not at all)
  if (server.method() != HTTP_GET) return;
  displayMessage("flash: " + uriParms);

  color = uriParms.charAt(0) - '0';
  count = uriParms.charAt(2) - '0';
  // invalid color idx or count
  if (color > numColors - 1 || count > 5) {
    sendError();
    allOff();
    return;
  }
  sendSuccess();
  flashLEDs(colors[color], count);
}
```

## Testing the Web Server

### Postman


### Web Application
