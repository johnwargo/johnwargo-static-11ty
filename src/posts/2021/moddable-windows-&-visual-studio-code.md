---
title: Moddable, Windows, & Visual Studio Code
description: 
date: 2021-05-20
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I’ve been working a bit lately with the [Moddable](https://www.moddable.com/) platform; I set up their SDK on my macOS and Windows systems, but for several reasons I prefer to code on Windows unless I have to use macOS. The [Moddable SDK](https://github.com/Moddable-OpenSource/moddable) is very command-line heavy (for reasons I agree with) and as I started coding Moddable JavaScript projects in Visual Studio Code, I realized that there are some tweaks I can document here that may help other Moddable developers using Visual Studio Code on Windows.

### Environment Setup

I’m primarily using Moddable with Espressif devices (specifically the ESP32 devices from Moddable and M5Stack) and the [Moddable ESP32 installation instructions](https://github.com/Moddable-OpenSource/moddable/blob/public/documentation/devices/esp32.md) show how to configure a command-line environment setup with all of the environment variables and PATH entries you need to execute Moddable SDK instructions that invoke the Espressif SDK.  
The idea is that you’ll double-click a shortcut to open a properly-configured terminal window (what Windows calls a Command Prompt) and execute all of the Moddable SDK commands from there.

The problem for my environment is that I want to do all of my work inside Visual Studio Code (I’m going to start calling it VSC from here) and VSC has its own terminal built in that I can use instead of switching to an external one.