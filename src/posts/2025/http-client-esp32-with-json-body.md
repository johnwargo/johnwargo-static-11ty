---
title: ESP32 HTTP Client Request with JSON Body
description: 
date: 2025-02-04
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-05T11:57:18.300Z
---

A few weeks ago I published an article called [ESP32 Connect Using HTTPS](/posts/2025/https-client-esp32/){target="_blank"} that demonstrated how to build an Arduino sketch for the ESP32 platform that connected to a remote server using [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security){target="_blank"} (HTTPS). I wrote that article because I wanted to learn how to connect to a [REST](https://en.wikipedia.org/wiki/REST){target="_blank"} API running on a server online and I knew that most (all) modern API servers required TLS. 

I started with a simple example that requested data using a simple URL with one or more parameters in the requests's [query string](https://en.wikipedia.org/wiki/Query_string){target="_blank"}. The target server parses the URL and returns a block of data. 

As I wrote that post, and example code, I knew that what I really wanted was to able to call a remote REST API and pass data in the request body in JSON format.

{% sidebar "Sample Project" %}
All of the source code highlighted in this post is from a GitHub repository called [ESP32 HTTPS Client Request with JSON Body](https://github.com/johnwargo/https-client-esp32-json-body){target="_blank"}.
{% endsidebar %}

## Background

Many years ago, I built a remote garage door opener using the [Particle Platform](https://www.particle.io/){target="_blank"}. I eventually implemented a cloud function to abstract away some of the complexities of the process; the cloud function allowed me to securely hide the API key and device ID needed to interact with the Particle platform in the request body (instead of the server URL). The result is a cloud function I can trigger to open my garage door no matter where I am in the world.

This sample sketch described in this post came from me wanting to build an Arduino/ESP32 project that opens and closes my garage door on a button press.  I'll show you that project soon.

## Remote host

For this project, I built and published a cloud function that simulates the requirements for the sketch. It's a public service and it requires two parameters passed in the request body in JSON format. When it received the data, it parses it and:

+ Returns 200 (`HTTP OK`) and a success string if both request parameters are populated.
+ Returns 400 (`Bad Request`) if any of the required parameters are missing or empty.

I'll publish an article soon that describes that service and shares the source code.

## The Code

The first thing I needed was a way to represent the request body in JSON format. Assuming I needed to pass a couple of parameters to the server in a JSON Object like this:

```JSON
{ "param1": "value1", "param2": "value2"}
```

In my code, I can represent it as a simple `String` variable like this:

```c
String httpRequestData = "{ \"param1\": \"value1\", \"param2\": \"value2\"}"
```

**Note:** The extra backslashes in the string are there because c doesn't allow you to include a double quote character inside strings. 

{% sidebar "Escaping Quote Marks in c Strings" %}
To use a double quote character in a JavaScript string, you must 'escape' it with a backslash. So, if I want to make a string with a double quote in it, I must precede the double quote with a single backslash:

<br /><pre>
String myString = "This is a string with a double quote \" in it";
</pre>

Basically, the backslash character tells the compiler to ignore the character in the string that follows.
{% endsidebar %}

To make my code more flexible and to avoid having to deal with all those escaped quote marks, I decided to use a String array to store the keys and their associated values:

```c
const int PARAM_ROWS = 2;
String paramsArray[PARAM_ROWS][2] = {
  { "param1", "value1" },
  { "param2", "value2" }
};
```

Then, in the function that sends the HTTPS request, I can simply build the JSON string on the fly like this:

```c
String httpRequestData = buildRequestBodyJSON();

String buildRequestBodyJSON() {
  String returnStr = "{ ";
  for (int row = 0; row < PARAM_ROWS; row++) {
    returnStr += "\"";
    returnStr += paramsArray[row][0];
    returnStr += "\": \"";
    returnStr += paramsArray[row][1];
    returnStr += "\"";
    if (row < PARAM_ROWS - 1) returnStr += ", ";
  }
  returnStr += " }";
  return returnStr;
}
```

The sketch needs some libraries, external files, and a few variables to operate:

```c
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "cert.h"
#include "config.h"

const char *ssid = WIFI_SSID;
const char *pswd = WIFI_PSWD;
const char *targetHost = "https://us-east1-jmw-demos.cloudfunctions.net/jsonbody";

WiFiClientSecure *client = new WiFiClientSecure;
HTTPClient https;

int responseCode;
```
<br />
<p>The following table describes most of those things.</p>

| Object | Description |
| ------ | ----------- |
| `WiFiClientSecure.h` | The ESP32 library for secure communications over a Wi-Fi network. | 
| `HTTPClient.h` | The ESP32 library delivering HTTP/HTTPS client capabilities. Note the spelling, on non-ESP32 Arduino, the file is called `HttpClient.h`. Pay attention, they're different. |
| `cert.h` | The downloaded Certificate Authority (CA) certificate for the target host server converted into an c constant called `caCert`. |
| `config.h` | So you can execute the sketch on your hardware without modifying the source code, I moved Wi-Fi and parameter settings to an external file. This way, if I make changes to the original source, you can download it and run it cleanly without having to reapply your changes. See the project readme for instructions on how to use the config file. |
| `ssid` | The SSID for the local Wi-Fi network the device connects to. The code pulls the String value from the external configuration file and converts it to a `char` pointer required by the client. |
| `pswd` | The password for the local Wi-Fi network the device connects to. The code pulls the String value from the external configuration file and converts it to a `char` pointer required by the client. |
| `targetHost` | The remote server the sketch connects to. It hosts a public cloud function I created for this demo. Please don't connect to it too much, I'm paying for it. |
| `WiFiClientSecure` | Creates the client object that makes the request. Later, I'll assign the certificate to the client so it can make secure connections |
| `HTTPClient` | Adds capabilities to the `client` object that allows the sketch to send the body of the request. If you look at the simpler sample, it's able to do everything it needs without adding `HTTPClient` |
| `responseCode` | An integer variable used to store the HTTP result code returned by the server. |

Here's a complete block of code that sends the HTTPS request to `targetHost` with a two property JSON object in the request body. 

```c
if (client) {
  Serial.println("Client created successfully");
  // assign the Cert Authority cert to the client object
  client->setCACert(caCert);
} else {
  // this should never happen
  Serial.println("Unable to create client");
  // fatal error, so go into an infinite loop
  for (;;) {
  }
}

Serial.print("Connecting to ");
Serial.println(targetHost);

https.begin(*client, targetHost);
https.addHeader("content-type", "application/json");

Serial.println("Building POST body");
String httpRequestData = buildRequestBodyJSON();
Serial.print("Body: ");
Serial.println(httpRequestData);

Serial.println("\nExecuting POST request");
responseCode = https.POST(httpRequestData);

Serial.print("HTTPS response: ");
Serial.println(responseCode);
// will be -1 for errors
if (responseCode > 0) {
  if (responseCode == HTTP_CODE_OK) {
    Serial.println("Success");
  } else {
    Serial.println("Failure");
  }
  Serial.printf("Content length: %u\n", https.getSize());
  String payload = https.getString();
  Serial.printf("Response Payload: %s\n", payload.c_str());
} else {
  Serial.println("\nConnection failed");
  Serial.print("Message: ");
  Serial.println(https.errorToString(responseCode));
}
https.end();
```

See the full code in action in [https-client-esp32-json-body.ino](https://github.com/johnwargo/https-client-esp32-json-body/blob/main/https-client-esp32-json-body.ino){target="_blank"}. Use [GitHub Issues](https://github.com/johnwargo/https-client-esp32-json-body/issues){target="_blank"} to ask questions about the code.

When you run the sketch, you should see something like the following text in the Arduino IDE's Serial Monitor:

```text
Connecting to https://us-east1-jmw-demos.cloudfunctions.net/jsonbody
Building POST body
Body: { "param1": "This", "param2": "That" }

Executing POST request
HTTPS response: 200
Success
Content length: 24
Response Payload: Received "This" & "That"
```
