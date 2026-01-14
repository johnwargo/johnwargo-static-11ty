---
title: Automated Public Cert to Arduino Header Conversion
description: I was working on a project using an M5Stack device to interact with
  a Google Firebase Function, but I ran into an issue with the SSL requirement.
  After exploring different options, I found that ESP32 devices could send HTTPS
  requests, but required the server's public cert embedded in the code. To
  simplify this process, I created a web app called Cert2Arduino that automates
  the conversion of public certificates into Arduino-compatible code.
date: 2025-01-20
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - ESP32
  - Raspberry Pi
  - Internet of Things (IoT)
  - Web Development
timestamp: 2025-01-21T00:59:48.693Z
generatedDescription: true
---

I'm working on a project where I'm using an [M5Stack](https://m5stack.com/){target="_blank"} device to interact with a Google Firebase Function I have running in the cloud. As I started planning my project's code, I realized that the SSL (HTTPS) requirement Firebase Functions forces on applications would be a problem for me.

I started investigating different options for my project:

+ Generating a self-signed cert won't work because it's Google's public cert I need for secure communications to the cloud function.
+ I could build a local proxy device, running on a [Raspberry Pi Pico W](https://raspberrypi.com/products/raspberry-pi-pico-2/){target="_blank"}  for example. That allows me to connect via HTTP to a REST API exposed by the device while the code behind it connects via secure HTTPS connection to the Functions backend. This would definitely work, but leaving a Raspberry Pi running just for this use case didn't make sense.

I did some research and learned that ESP32 devices had access to sending HTTPS requests. The drawback of the process is that you needed the server's public cert embedded in your code to make this work. Looking at examples, this looked like it was a reasonable approach, so I started digging into the details.

## Modifying the Public Cert for Arduino

To start, you must download a server's public key into a .pem or .crt file. I'm not going to show you how to do that here, just follow the instructions found online. Here's a good example: [How to Download the SSL Certificate From a Website in Windows](https://instructables.com/How-to-Download-the-SSL-Certificate-From-a-Website/){target="_blank"}.

The download certificate is a text file with a specific format:

```text
-----BEGIN CERTIFICATE-----
MIIhvzCCIKegAwIBAgIRAITxhzWmYmL5EFvp9GRTHY0wDQYJKoZIhvcNAQELBQAw
OzELMAkGA1UEBhMCVVMxHjAcBgNVBAoTFUdvb2dsZSBUcnVzdCBTZXJ2aWNlczEM
MAoGA1UEAxMDV1IyMB4XDTI0MTIwOTA4MzYzNFoXDTI1MDMwMzA4MzYzM1owGjEY
.
.
.
mcNL3qT7c96/YJZvxPiXDCfAvaKv3zYq+vH1O4hpJ1XYm7SFeHFQ5AyisnKP4z7U
uDcTXhOPTOtzsVMEaRbCaYwq+y/4AxLasMtUj4h20s9E2BwMgSy8jjbvlTZKli4D
hSaI
-----END CERTIFICATE-----
```

The file contains a header (`-----BEGIN CERTIFICATE-----`) and footer (`-----END CERTIFICATE-----`) that delimits the certificate code. Everything in between is the raw code of the public certificate. 

**Note:** That particular file is 184 lines long, so I used the three periods vertically  in the middle to indicate that part of the file was cut out of the example.

To use that certificate in an Arduino sketch,  you must first convert it into a format that the Arduino IDE understands. Specifically you must convert it to a file that:

1. Defines a variable name for the certificate. You'll reference this name in the code that leverages the certificate. In the example code below, this is the `const char* cert=` code that creates a variable called `cert` for the certificate.
2. Adds a continuation character (`\`) at the end of every line (except the last one) telling the Arduino compiler that there are more lines in the current statement.
3. Quotation marks (`"`) at the beginning and end of each line (before the continuation character).
4. A newline (`\n`) at the end of each line before the ending quotation mark.

Here's what the modified file looks like (with the same indicator showing that I dropped a bunch of lines from the output):

```c
const char* cert= \
"-----BEGIN CERTIFICATE-----\n" \
"MIIhvzCCIKegAwIBAgIRAITxhzWmYmL5EFvp9GRTHY0wDQYJKoZIhvcNAQELBQAw\n" \
"OzELMAkGA1UEBhMCVVMxHjAcBgNVBAoTFUdvb2dsZSBUcnVzdCBTZXJ2aWNlczEM\n" \
"MAoGA1UEAxMDV1IyMB4XDTI0MTIwOTA4MzYzNFoXDTI1MDMwMzA4MzYzM1owGjEY\n" \
.
.
.
"mcNL3qT7c96/YJZvxPiXDCfAvaKv3zYq+vH1O4hpJ1XYm7SFeHFQ5AyisnKP4z7U\n" \
"uDcTXhOPTOtzsVMEaRbCaYwq+y/4AxLasMtUj4h20s9E2BwMgSy8jjbvlTZKli4D\n" \
"hSaI\n" \
"-----END CERTIFICATE-----\n";
```

Making those changes to the certificate file isn't impossible, but at 184 lines for this particular example, it's pretty tedious work If you have to do this frequently for certificates for different sites. Since I don't like doing that type of tedious work, I decided to build a utility that handles the process for me (and you).

## Automating the Conversion Process

To automate this conversion process, I published a simple web application that converts a public certificate into the source code needed to use the certificate in an Arduino sketch. The utility is called [Cert2Arduino](https://cert2arduino.netlify.app/){target="_blank"} and it's hosted on Netlify.

<img src="src/images/2025/cert-to-arduino-app.png" alt="Cert2Arduino main page" />

To use the app: 

1. Specify the variable name for the imported certificate code, the app uses `cert` by default
2. Browse and select the downloaded public cert.
3. Generate the Arduino code from the cert and save it to your local development system.

That's it, that's all there is to it with no manually editing 184 lines of certificate code.
