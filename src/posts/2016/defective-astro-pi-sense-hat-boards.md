---
title: Defective Astro Pi Sense HAT Boards
description: 
date: 2016-07-06
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I'm working on a project that uses the [Astro Pi Sense HAT](https://astro-pi.org/){target="_blank"} board to measure temperature, pressure and humidity. The project I'm building will upload weather measurements to Weather Underground, but I'm also storing the data locally (in a Mongo database) and building a dashboard my family can access to view the captured data using Flask.

Anyway, I've been having problems with the Sense HAT board, I've purchased two of them and they both recorded invalid data. The vendor finally admitted that 'We reached out to the manufacturer. There are issues with the current ones on the market and it will not be resolved until late July.' So, apparently the batch of devices out in the wild won't work and I'll have to wait until probably early August for a working board. Since I searched the Internet and couldn't find anything about this problem, I thought I'd post it here so others can save themselves some troubleshooting.

Here's the results I got from my second Sense HAT board:

![Astro Pi Sense Hat Output](/images/2016/pi_sense_hat_output.png)

That temperature reading? It's in degrees Celsius - can you imagine 140 degrees C?

Anyway, here's a quick test application you can use to, well, test the board; this is the app that generates the output you see in the figure:

```python
from __future__ import print_function
import time
from sense_hat import SenseHat

sense = SenseHat()
while True:
   t = sense.get_temperature()
   p = sense.get_pressure()
   h = sense.get_humidity()
   t = round(t, 1)
   p = round(p, 1)
   h = round(h, 1)
   msg = "Temperature = %s degrees F, Pressure=%s millibars, Humidity=%s percent" % (t, p, h)
   print(msg)
   time.sleep(2)
```