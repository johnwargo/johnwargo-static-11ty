---
title: RIM Introduces New BlackBerry Tools for Web Developers
date: 2009-07-28
categories: [BlackBerry]
tags: post
---

RIM formally announced the new [BlackBerry Tools for Web Developers](http://press.rim.com/release.jsp?id=2448 "BlackBerry Tools for Web Development"). These tools had been in beta for a whlie and I got a chance to work with them while writing the book chapter around debugging web applications. The tools are a plug-in for Eclipse and another for Microsoft Visual Studio. They basically allow a web developer to build web applications (static or dynamic) and debug them on BlackBerry devices directly from within the IDE. The cool thing about them is that the debugger from either IDE connects to the device simulator through the debugger and allows developers to step through dynamic code (JavaScript, AJAX code using XMLHTTPRequest and more) while it runs in the simulator. If needed, it can also do the same thing directly through an USB-connection to a physical device. Way cool.

The thing I liked the most was the window that could be used to watch all traffic between the device and web server using XMLHTTPRequest. If I was building an AJAX application (I refuse to treat it as a word, it's an acronym), I'd need this tool to make debugging and troubleshooting as simple as possible.