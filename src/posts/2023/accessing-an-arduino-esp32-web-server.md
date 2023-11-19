---
title: Accessing an Arduino ESP32 Web Server
description: The third (and, I think, final) article in this series. In this post, I show the different options for connecting to the ESP32 web server highlighting the limitations and restrictions that apply to make your life miserable.
date: 2023-11-19
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
  - ESP32
---

This post is the continuation of [Arduino ESP32 Web Server on a Processor Core](/posts/2023/arduino-esp32-web-server-on-a-processor-core/) where I described how to code a web server and run it on a dedicated core in an Arduino ESP32 project. That article was very long, so I didn't describe much about how to connect to that web server from a desktop PC or mobile device, so I cover that here. Here's a video of the web server project working with the mobile app: https://youtube.com/shorts/BMP7LUCIwN0.

If you watch the video, you'll notice that I mentioned making it flash purple three times but in the video it only seems to flash twice. That's because I already had purple selected, so the first purple flash didn't actually do anything. 

**Note:** I do not have any plans to show how to connect to this web server from another microcontroller-based project; let me know if this is something you would like see. There are a lot of examples of Arduino projects connecting to a web server over Wi-Fi, the only difference here would be the local URL for the web server. 

## Background

The premise for this project is to use a desktop PC or mobile device to remotely control the LED matrix inside the pumpkin. 

You can build a native desktop (which includes laptops) application and access the microcontroller-driven web server (MDWS) very easily but who wants to do all of that heavy lifting? Besides, do I really want to haul a laptop around to control the pumpkin? For testing, however, there are existing tools that make controlling the MDWS a simple process. More on this later.

Since I want to control the pumpkin from a variety of devices, I assumed that using a web browser would be the fastest, easiest, and most consistent approach to use. 

It turns out that's simply not the case.

You can build a web application and use it to access the MDWS pretty easily. On your desktop PC, fire up your web app editor of choice, code the app, load the application in your browser, then access the MDWS. Here's a link to the app I built for this project: [Pumpkin LED Controller](https://github.com/johnwargo/glowing-pumpkin-controller-html){target="_blank"}; I discuss this app later in this article.

As long as the PC running the browser/web application and the ESP32 web server are on the same local Wi-Fi network, it works. If you host the web application on a pub web server somewhere (like [Netlify](https://www.netlify.com/){target="_blank"}) you can make it work, but not out of the box; there are special settings you must change in the browser to make it work (described below).

My little microcontroller-driven ESP32 web server doesn't have an SSL/TLS certificate installed. Yes, I know I can generate and install it on the device, but I chose not to take that painful approach, because browsers won't like [self-signed certificates](https://en.wikipedia.org/wiki/Self-signed_certificate#:~:text=Self%2Dsigned%20certificates%20have%20limited,decrypt%20files%20on%20the%20fly.){target="_blank"}. When I host the web app on a custom domain (in this case [https://pumpkin-controller.netlify.app/](https://pumpkin-controller.netlify.app/){target="_blank"}), the browser doesn't like cross domain access (the web app hosted at pumpkin-controller.netlify.app connecting to a web server on a local network). The browser blocks it and that's where the special settings come into play (telling the browser to ignore the security risk).

Running the web app on a mobile device changes everything. 

Mobile browsers flatly refuse to let a web app hosted in one domain access my microprocessor-driven web server. That browser setting that instructs the browser to ignore the security risk simply does not exist on mobile devices; from my testing and what I learned through research, there's nothing I can do - it's never going to work.

So, what are your options for controlling the Pumpkin from a mobile device? The only option I could find is to do it using a native mobile application. There are a variety of options for building the mobile app:

* Native Android app written in Java or Kotlin.
* Native iOS and/or iPadOS app written in Objective-C or Swift.
* Native application written in Dart using [Flutter](https://flutter.dev/){target="_blank"}.
* Native Hybrid application (such as [Apache Cordova](https://cordova.apache.org/){target="_blank"}, [Ionic Capacitor](https://capacitorjs.com/){target="_blank"}, or even [Electron](https://www.electronjs.org/){target="_blank"}).

I'm really not a native mobile developer even though I published multiple books on the topic, so that option doesn't work for me. I wrote [4 books on Apache Cordova](https://johnwargobooks.com/books/cordova){target="_blank"}, so I know I could do that pretty easily, but that particular technology is dead. I've also written a bunch of Ionic apps (I even have one in the app store: [Time Slicer](https://timeslicer.app/){target="_blank"}) so I could use that option if I wanted. My favorite mobile app development approach is Flutter, so for this project I built a Flutter app called [Pumpkin Controller](https://github.com/fumblystuff/pumpkin-controller-app-flutter){target="_blank"} that you can install and use to control the pumpkin.

You'll find detailed information for each of these topics in the following sections. 

## Postman

As I mentioned in the Background section, you can use a native desktop/laptop app to access the microprocessor-driven web server. I'm not suggesting that you write your own, but you could certainly do that; I may even spend some time doing that and share the project here.

There are many API testing applications available to developers and they're an excellent way to exercise the microprocessor-driven web server. My favorite is [Postman](https://www.postman.com/){target="_blank"}. Postman is interesting in that they offer a fre version that allows you to pretty much anything you need to do to exercise the pumpkin web server. They also provide a paid offering that has a lot more capabilities. I've never used anything but the free version and that's what I'll show here.

To use Postman to control the MDWS, you need either the IP address for the web server or the DNS name for the device (the Arduino sketch defaults to `pumpkin.local`), either works fine. To use the MDWS IP Address, look for it in the Serial Monitor after successfully connecting to the Wi-Fi network as shown below:

```text
Connecting to Wargo-Network
.........
WiFi connected
IP address: 192.168.86.194
Web Server running on core 0
LED Management running on core 0
Web server: MDNS responder started
Web server: HTTP server started
```

After downloading and installing Postman, fire up the application and select a `GET` command (that's the HTTP request type the MDWS responds to) and type in any of the commands supported by the MDWS. For example, to set the LED matrix color on the remote device to Purple (`colors` array index 3) you use the following:

```text
pumpkin.local/color:3
```

Here's what it looks like in Postman:

{% image "src/images/2023/pmpkn-crtl-postman-01.png", "Postman GET command to set color", "image-full" %}

Click the Send button and if Postman can see the device, the Arduino Serial Monitor will show the command executing as shown below:

```text
Connecting to Wargo-Network
.........
WiFi connected
IP address: 192.168.86.194
Web Server running on core 0
LED Management running on core 0
Web server: MDNS responder started
Web server: HTTP server started

Web server: color: 3
```

You'll also see a `status` of `success` in the body of the response as shown in the figure. 

If something else happens, you're going to have to troubleshoot it yourself, I can't help you from here (although I'll try if you ask me through an issue in the project repo). 

Here's what a Postman command looks like using an IP address instead of a DNS name:

{% image "src/images/2023/pmpkn-crtl-postman-02.png", "Postman GET command Using DNS Name", "image-full" %}

You can also save requests in workspaces as shown below. This allows you to save multiple commands together and easily switch between them as you code and test an API.

{% image "src/images/2023/pmpkn-crtl-postman-03.png", "Postman Save Request Dialog", "image-full" %}

Using the Postman approach to test the MDWS API allowed me to ensure everything on the ESP32 worked correctly before starting on the associated web application or Flutter app (both described below). This eliminates any concerns about "well, is the API responding correctly" when testing a custom application during development. 

## Local Web Application

In the previous article for this project, I described the [Pumpkin Controller web application](https://github.com/johnwargo/glowing-pumpkin-controller-html){target="_blank"} I created to control the ESP32 LED matrix through the MDWS. When you launch the web application locally (running on a web server on your local network - for example using the [http-server](https://www.npmjs.com/package/http-server){target="_blank"} module), browsers will warn you that the connection to the web server is not secure but lets you connect anyway. In the browser, the connection to the app shows as 'Not secure' as shown in the browser's address bar at the top of the following figure.

{% image "src/images/2023/pumpkin-controller-browser-local.png", "Pumpkin Controller web app running in a browser locally", "image-full" %}

The app works and everything's fine unless you try to access it from a different network; with the web app hosted from a different network (domain), the browser will load the app, but blocks access to the MDWS API. I describe how to make it work in the following section. 

## Hosted Web Application

To make it easier for me (and you) to control the pumpkin LEDs using a browser, I published the [Pumpkin Controller web application](https://github.com/johnwargo/glowing-pumpkin-controller-html){target="_blank"} to [Netlify](https://www.netlify.com/){target="_blank"}; you can access it using [https://pumpkin-controller.netlify.app/](https://pumpkin-controller.netlify.app/){target="_blank"}.

When you access the app from a browser, the connection to the web server shows Secure as highlighted in the following figure

{% image "src/images/2023/pumpkin-controller-browser-remote-1.png", "Pumpkin Controller web app hosted remotely", "image-full" %}

But, as soon as you try to connect to the MDWS, the app fails to connect. This happens because of the cross domain stuff I mentioned previously. The browser knows the web app is hosted/running on https://netlify.app and that site has a site certificate that matches the host domain (netlify.com), so it trusts the app. When you click one of the buttons on the app and the app's code makes an HTTP connection to the MDWS, the request fails for a couple of reasons:

1. The MDWS doesn't have a site certificate
2. The MDWS is a web server that's not on the same domain as the web app

You can see the browser blocking the request in the browser console (through Developer Tools) as shown below:

{% image "src/images/2023/pmpkn-ctrl-netlify-03.png", "Pumpkin Controller access error in browser tools", "image-full" %}

Notice the console errors as well as the Not Secure warning in the address bar. 

If the MDWS had a trusted site certificate then there's code in the web app that allows it to trust the other site (the MDWS). In this case, the MDWS doesn't have any site certificate and that's why it didn't work. Even if I generated and self-signed my own certificate and installed it in the MDWS, it still wouldn't work because the browser wouldn't trust the certificate since I signed it instead of a trusted signing authority. Like I said earlier, I could generate a trusted certificate and install it in the project but that was a lot more pain than I was willing to endure for this.

Now, don't panic. Desktop browsers have a work-around that fixes this, mobile browsers don't! To fix this issue, click on the lock icon next to the site address in the browser address bar as shown in the figure, then select **Site Settings**.

{% image "src/images/2023/pumpkin-controller-browser-remote-2.png", "Pumpkin Controller web app hosted remotely", "image-full" %}

The browser opens a long page (truncated in the image below) that allows you to control security settings for this particular web page. Change that setting from `Blocked` to `Allow` then close the Settings page.

{% image "src/images/2023/pumpkin-controller-browser-remote-3.png", "Pumpkin Controller web app hosted remotely", "image-full" %}

To apply the settings change, reload the page as shown in the following figure:

{% image "src/images/2023/pumpkin-controller-browser-remote-4.png", "Pumpkin Controller web app hosted remotely", "image-full" %}

With the page reloaded, the app can access the MDWS successfully, but the address bar still shows the Not Secure warning and the console displays a warning as well as shown below:

{% image "src/images/2023/pumpkin-controller-browser-remote-5.png", "Pumpkin Controller web app hosted remotely", "image-full" %}

As much as the warnings are annoying, the app still works and you can control the ESP32 device's LED Matrix from a desktop or laptop browser. The next section describes the only way I could find to access the MDWS from a mobile device (smartphone or tablet).

## Mobile Application

