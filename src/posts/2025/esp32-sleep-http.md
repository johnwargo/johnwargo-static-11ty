---
title: Putting an ESP32 Device to Sleep (ESP32 Repeat Request HTTP)
description: 
date: 2025-02-16
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-16T13:15:27.441Z
---

While playing around this week with a hardware project, I decided to spend some time learning how to use Sleep modes in an Arduino project on an ESP32 device. It turns out that it's not that hard to do, but you really have to pay attention to a couple of things as you code your project. In this post, I demonstrate how to build an Arduino project that sends a HTTP request to a remote server, puts the device running the sketch asleep for a few minutes, then wakes up and does it again until the device loses power.

{% sidebar "ESP32 Request Repeater (HTTP)" %}
All the code for this project is online at <a href="https://github.com/johnwargo/esp32-request-repeater-http" target="_blank">ESP32 Request Repeater (HTTP)</a>.
{% endsidebar %}

Lets take a look at the code.

## Initialization

The sketch uses the standard Arduino/ESP32 WiFi and HTTPClient libraries. New for me is the `esp_sleep.h` library that I needed to implement sleep and wake capabilities in the sketch.

```c
#include <WiFi.h>
#include <HTTPClient.h>
#include "esp_sleep.h"

#include "config.h"
```

The final line in the code block loads configuration settings from an external file (a file that isn't included in the Github repository). This allows you to configure the sketch as you need, but also refresh the repository contents whenever I publish updates and not overwrite the config. Read the instructions in the repository to understand how to create and populate the config file.

Next, the sketch creates a few constants and variables used by the sketch:

```c
// store the credentials in the project's config.h file
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const long minutes2Microseconds = 60000000;

// Create a restart counter to track how many times the sketch restarts,
// store in the RTC (realtime clock) storage area
RTC_DATA_ATTR unsigned int restartCounter = 0;

HTTPClient http;
```

The first two lines define constants holding the Wi-Fi network SSID and password as character (`char`) array pointers built using the corresponding settings from the config file.

The `minutes2Microseconds` constant allows the sketch to convert the config file's `SLEEP_DURATION_MINUTES` minutes value into the microseconds value the sketch needs to tell the device how long to sleep.

The `restartCounter` variable is special because of the `RTC_DATA_ATTR` that precedes the definition. This variable contains a counter used by the sketch to track how many times the device wakes itself up to run the sketch. `RTC_DATA_ATTR` means realtime clock (RTC) data attribute which is essentially a compiler directive that instructs the compiler to store this value in the RTC memory space. When stored there, the value isn't lost when the device powers down.

Finally, the `HTTPClient` object is part of the ESP32 SDK and defines a client object the sketch uses to connect to remote hosts.

## The Code

I'm going to start with the `loop()` function. For this particular sketch, there isn't any activity that happens in the loop function since the sketch starts, does its stuff, then powers down. The device never executes the `loop()` function, so therefore it's empty:

```c
void loop() {
  // nothing to do here, its all done in setup()
}
```

Remember when I mentioned that there were a couple of things you had to pay attention to in your sketch? That's one of them, whether there's any work for the device to do repeatedly in the `loop()` function before going to sleep.

Now, because of that, everything happens in the `setup()` function. Here's the full code for the function, I'll break it down and explain it to you after you've had some time to look at it.

```c
void setup() {

  Serial.begin(115200);
  delay(1000);
  Serial.println();
  Serial.println("**************************");
  Serial.println("* ESP32 Request Repeater *");
  Serial.println("**************************");

  // Check to make sure we have Wi-Fi credentials
  // before trying to use them
  if (String(ssid).isEmpty() || String(password).isEmpty()) {
    Serial.println("\nMissing Wi-Fi credentials");
    for (;;) {}
  }

  restartCounter += 1;
  if (restartCounter > 1) Serial.printf("Sketch restarted %d times\n", restartCounter);
  displayWakeupReason();

  // Wait 30 seconds to provide some time to deploy updates to the sketch otherwise it will
  // disconnect as soon as its done and you won't be able to save updates to the device
  Serial.println("Waiting 30 seconds to allow for sketch uploads");
  delay(30000);

  esp_sleep_enable_timer_wakeup(SLEEP_DURATION_MINUTES * minutes2Microseconds);
  if (connectToNetwork()) callRemoteHost();
  esp_deep_sleep_start();
}
```

Alright, so the code starts with the standard stuff I put in every Arduino sketch, code that starts `Serial` and prints some stuff to the Serial Monitor. 

Next, the sketch makes sure that it at least has values for the Wi-Fi network SSID and associated password. I really should validate the other configuration properties, but I got lazy here. 

```c
 // Check to make sure we have Wi-Fi credentials
// before trying to use them
if (String(ssid).isEmpty() || String(password).isEmpty()) {
  Serial.println("\nMissing Wi-Fi credentials");
  for (;;) {}
}
```

To let the user know how many times the device awoke from sleep, the sketch increments the `restartCounter` variable - remember, this value is stored in RTC memory so it doesn't disappear when the device goes to sleep. Once it's completed that, it writes the current counter value to the Serial Monitor (skipping the first time).

```c
restartCounter += 1;
if (restartCounter > 1) Serial.printf("Sketch restarted %d times\n", restartCounter);
```

And, to help you understand what woke up the device, I added a call to a little function that writes the reason to the Serial Monitor. It does this based on the value returned from the call to `esp_sleep_get_wakeup_cause()`.  I basically looked at the [docs](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/system/sleep_modes.html#_CPPv418esp_sleep_source_t){target="_blank"} docs and built a simple `case` statement that writes a text message to the Serial Monitor based on the `esp_sleep_wakeup_cause_t` value (numeric).

```c
displayWakeupReason();

void displayWakeupReason() {

  esp_sleep_wakeup_cause_t wakeupReason;
  String msg;

  wakeupReason = esp_sleep_get_wakeup_cause();
  switch (wakeupReason) {
    case ESP_SLEEP_WAKEUP_BT: msg = "BT (light sleep only)"; break;  // added for completeness
    case ESP_SLEEP_WAKEUP_COCPU: msg = "COCPU int"; break;
    case ESP_SLEEP_WAKEUP_COCPU_TRAP_TRIG: msg = "COCPU crash"; break;
    case ESP_SLEEP_WAKEUP_EXT0: msg = "External signal using RTC_IO"; break;
    case ESP_SLEEP_WAKEUP_EXT1: msg = "External signal using RTC_CNTL"; break;  // added for completeness
    case ESP_SLEEP_WAKEUP_GPIO: msg = "GPIO (light sleep only on ESP32, S2 and S3)"; break;
    case ESP_SLEEP_WAKEUP_TIMER: msg = "Timer"; break;  // this is the one we care about
    case ESP_SLEEP_WAKEUP_TOUCHPAD: msg = "Touchpad"; break;
    case ESP_SLEEP_WAKEUP_UART: msg = "UART (light sleep only)"; break;  // added for completeness
    case ESP_SLEEP_WAKEUP_ULP: msg = "ULP program"; break;
    // means sketch started because a new version of the sketch was loaded or powered up not from sleep (fresh start)
    case ESP_SLEEP_WAKEUP_UNDEFINED: msg = "Not caused by exit from deep sleep"; break;
    // this one's in the docs, but not in the library apparently
    // case ESP_SLEEP_WAKEUP_VAD: msg = "Wakeup caused by VAD"; break;
    case ESP_SLEEP_WAKEUP_WIFI: msg = "WIFI (light sleep only)"; break;  // added for completeness
    default: msg = "Unknown (" + String(wakeupReason) + ")"; break;
  }
  Serial.print("Wakeup Reason: ");
  Serial.println(msg);
}
```

Alright, here's the second place where you really have to pay attention to what you're doing. When I started on the sketch and got everything working, the next morning I added some things and moved some stuff around. As I tried to deploy the updated sketch to the device, it kept losing its connection to the Arduino IDE. After fussing at it for a while, thinking that the board was fried, I realized that what was happening was expected. 

As I have the sketch configured: it connects to Wi-Fi, sends an HTTP request, then powers off the device for two minutes before doing it all again. The device wasn't broken, the window between the device powering up and shutting down again was so small that there was limited opportunity for me to sneak a code update onto the device.

The best solution to this is to start the build and deploy step in the Arduino IDE then plug the device in right before compilation ends and deployment begins. By doing that you should be able to find a very short window where the device can't take a code update because its powered down. 

Sigh, what a nightmare. 

Anyway, the solution I came up with was to add a 30 second delay (`delay(30000)`) before the sketch really does anything - that allows me to time software updates more easily because it gives me a solid half minute window to fit it in. This is the code that does that:

```c
// Wait 30 seconds to provide some time to deploy updates to the sketch otherwise it will
// disconnect as soon as its done and you won't be able to save updates to the device
Serial.println("Waiting 30 seconds to allow for sketch uploads");
delay(30000);
```

Now, because of this, I had to change my configuration value for `SLEEP_DURATION_MINUTES` from 2 minutes to 1.5 minutes (yes, it accepts non-integer numbers) to accommodate the additional 30 seconds baked into the startup time.

Finally comes the code that does all the work in the sketch:

```c
  esp_sleep_enable_timer_wakeup(SLEEP_DURATION_MINUTES * minutes2Microseconds);
  if (connectToNetwork()) callRemoteHost();
  esp_deep_sleep_start();
```

First it sets the number of microseconds (**Note:** NOT milliseconds) the device should sleep; that's this code:

```c
esp_sleep_enable_timer_wakeup(SLEEP_DURATION_MINUTES * minutes2Microseconds);
```

It calculates the number of microseconds using the `SLEEP_DURATION_MINUTES` minute value times the `minutes2Microseconds` constant I described earlier.

Next, it tries to connect to the Wi-Fi network. If it connects successfully, then it immediately sends off the required HTTP request and puts the device to sleep.

It's this code that puts the device in deep sleep:

```c
esp_deep_sleep_start();
```

Easy peasy.

Whenever I write a sketch that connects to something over Wi-Fi, I always put the connection code in the `setup()` function. That's the kind of thing that need only happen once (unless you think you may lose the connection and need to retry - but that's another story) so that's why it *usually* happens in `setup()`.

As I worked on this code, I realized I had to move those steps so they happened every time the device powered on. But, at the same time, what happens if the device cannot connect? What do I do then?

Well, my solution was to make the connection to Wi-Fi a function the implement a timeout factor in the function; returning false if the connection times out and true if it successfully connects. Here's the code:

```c
bool connectToNetwork() {
  unsigned long connectionStart;
  int counter = 0;

  Serial.printf("\nConnecting to %s\n", ssid);
  connectionStart = millis();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    // How long have we been trying to connect to wi-fi?
    if (millis() - connectionStart > WIFI_CONNECT_LIMIT) {
      Serial.println("\nUnable to connect to network, aborting");
      return false;
    }
    counter += 1;
    if (counter > 25) {
      counter = 0;
      Serial.println();
    }
  }
  Serial.println();
  Serial.println("WiFi connected\nIP address: ");
  Serial.println(WiFi.localIP());
  return true;
}
```

The first thing the function does is define a long variable called `connectionStart`. Later, it assigns the current time in milliseconds to the variable (`connectionStart = millis();`). 

{% sidebar "Current Time" %}
Now, in an Arduino sketch, by current time I don't mean the current time in the world. You can do that, using network time protocol (NTP), but that's not what happens here. The Arduino <code>millis()</code> function returns the number of milliseconds since the Arduino powered on. Then, in my sketch, I just have to see how many milliseconds have passed in order to determine how long the sketch spent waiting for the Wi-Fi to connect.
{% endsidebar %}

As the code making the connection to the Wi-Fi network loops waiting for it to complete, I added the following code:

```c
// How long have we been trying to connect to wi-fi?
if (millis() - connectionStart > WIFI_CONNECT_LIMIT) {
  Serial.println("\nUnable to connect to network, aborting");
  return false;
}
```

The `WIFI_CONNECT_LIMIT` value is in the config file and defaults to 15 seconds (15000 milliseconds). The code subtracts the start time from the current time (milliseconds since start) and compares it to 15 seconds. Once the connection process takes longer than 15 seconds, the device shuts down to try it again in 2 minutes. Whew.

Finally, here's the code that actually makes the connection to the remote host. I stole it from the HTTP Client example code and cleaned it up a bit.

```c
void callRemoteHost() {
  Serial.printf("Connecting to %s\n", REMOTE_HOST);
  http.begin(REMOTE_HOST);
  int httpCode = http.GET();
  if (httpCode > 0) {  // httpCode will be negative on error
    Serial.printf("Response: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Success");
    }
    String payload = http.getString();
    Serial.println(payload);
  } else {
    Serial.printf("[HTTP] GET failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}
```

That's it, that's the complete code. Don't forget, all the code for this project is online at [ESP32 Request Repeater (HTTP)](https://github.com/johnwargo/esp32-request-repeater-http){target="_blank"}
