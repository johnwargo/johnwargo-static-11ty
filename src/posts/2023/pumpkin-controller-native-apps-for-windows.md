---
title: Pumpkin Controller Native Apps for Windows
description: 
date: 2023-11-19
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
  - Flutter
  - Microsoft Windows
---

In the post I published earlier today I mentioned that someday I might make a native windows version of my Pumpkin Controller app (See [Glowing Pumpkin](/projects/glowing-pumpkin/)). Well apparently today's the day. 

## Flutter App

I guess I wasn't paying attention when I wrote that because Flutter apps are cross platform apps and all it took me was a minute or so to create, build, and test the Windows version of the app. Here's a screen shot:

<img src="src/images/2023/pumpkin-controller-flutter-windows.png" alt="Pumpkin Controller Windows" />

Everything seems to work OK except that the Toast module I used doesn't support Windows, so you won't see any notifications when it completes successfully or when it fails. I'll see what I can do to fix that.

I'll have to figure out how to generate a Windows executable out of Android Studio and publish it in the repository. Stay tuned on that one.

## FireMonkey App

I did a little Delphi development this weekend, so when I decided to build a native Windows version of the Pumpkin Controller app I used RAD Studio and FireMonkey to create a cross-platform native version of the app using Object Pascal. Here's a screen shot of the app:

<img src="src/images/2023/pumpkin-controller-firemonkey-windows.png" alt="Pumpkin Controller Windows" />

I didn't do anything to make the app pretty, I was just trying to figure out how to make it work using FireMonkey.

I generated Win32 and Win64 executables and published them as [Releases](https://github.com/johnwargo/pumpkin-cotroller-firemonkey/releases){target="_blank"} in the [Pumpkin Controller FireMonkey](https://github.com/johnwargo/pumpkin-cotroller-firemonkey){target="_blank"} project.
