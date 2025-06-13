---
title: TechSmith Snagit Stops Loading or Capturing 
description: 
date: 2025-06-13
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
timestamp: 2025-06-13T23:45:20.701Z
---

A few weeks ago, [Snagit](https://www.techsmith.com/snagit){target="_blank"} stopped launching its capture window on startup (yes, I had automatic launch at startup configured) and stopped being able to capture accurately 90% of the time.

I've been a Snagit customer for decades and use the product almost every day, at home and at work.

I don't know exactly when it stopped working, but all of a sudden I noticed that the Capture widget wasn't on my screen. If I launched Snagit directly, it would launch and stay running, but every time I rebooted Microsoft Windows, no Snagit capture widget.

After a couple of weeks of manually launching Snagit, I noticed that the application would only work successfully about 10% of the time. The other 90% of the time, capturing would either only capture the whole screen or, if it did recognize I wanted to capture a application window, it would capture some other rectangle than the one I was trying to capture.

So frustrating!

I own three licenses, I run Snagit on three computers at home, so I quickly fired up Techsmith technical support and created a ticket for each problem. Not expecting much, product support is so useless it seems lately, I quickly heard back from Techsmith support within about 24 hours. The support staff was very responsive and provided a lot of guidance. That was just awesome!

Anyway, I'm not going to detail all of the steps we took to figure out the problem, I'm just going to jump to the solution:

[Dell Display Manager](https://www.dell.com/en-us/lp/ddpm){target="_blank"}

Apparently, the latest version breaks a lot of other applications. Screen capture utilities is one of the affected app categories.

I uninstalled Dell Display Manager, rebooted my system, and all of my Snagit issues went away.
