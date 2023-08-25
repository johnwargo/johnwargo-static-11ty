---
title: Arduino ESP32 Web Server on a Processor Core
description: 
date: 2023-08-26
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

## How CORS Impacts This Project

// TODO: Write this content

Ham pork meatloaf bresaola salami turducken shoulder. Cupim fatback burgdoggen alcatra turducken jerky chuck turkey beef ribs landjaeger. Ham doner jowl, brisket tail pork belly swine. Tail rump strip steak short loin shankle hamburger spare ribs fatback pork chop kevin picanha chicken salami. Brisket jowl pork loin, porchetta beef ribs pork chop meatloaf cow alcatra beef pig tongue. Hamburger flank sausage prosciutto.

T-bone bresaola meatloaf venison pastrami. Pork tongue cupim capicola, shankle pork chop filet mignon buffalo ham short ribs burgdoggen jerky shoulder pastrami rump. Ham hock kevin pork chop kielbasa, corned beef jowl landjaeger meatball ground round turducken ham swine. Landjaeger kevin beef ribs jowl alcatra short ribs buffalo.


## First Attempt

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

Notice, by the way, that this web server runs as the `Task0` task as described in my previous post. The web server and all the actions it takes runs on the ESP32 processor core 0.

## Core 1

Core 1 has an easier job, all it has to do is check to see if Random is enabled then, if it is enabled, pick a color and update the NeoPixel matrix with that color.

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

## A Better Web Server Approach



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


Show color parsing

Show flash parsing

Postman to test

Talk about redirect

Discuss web app

web app screen shot

What I'll do next... (pass IP Address on redirect, automatic configuration of app).