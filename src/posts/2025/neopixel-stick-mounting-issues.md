---
title: NeoPixel Stick Mounting Issues
description: 
date: 2025-05-15
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - ESP32
  - Internet of Things (IoT)
  - Project Builds
timestamp: 2025-05-15T11:28:16.411Z
---

In yesterday's post about mounting Adafruit NeoPixel Stick devices in a line, I made the following comment: "But, the folks at Adafruit didn't feel the need to make this easy." For this post, I thought I'd explain why I said that.

With a lot of hobbyist electronics boards and accessories, in many (most) cases, it feels to me like the Engineers who design these products focus solely on the capabilities offered by the device (whatever it is) but not on how the device will be used in the underlying project. I notice this more and more frequently and I expect I'll write a lot more on this topic here (my blog).

Looking at the [NeoPixel Stick - 8 x 5050 RGBW LEDs - Cool White - ~6000K](https://www.adafruit.com/product/2869){target="_blank"}, its a great device - mostly because it does exactly what I need/want it to do. For the project I wrote about yesterday, I needed a long, straight, solid strip of LEDs. Having 8 NeoPixel LEDs lined up close together plus the ability to fit them together in a longer line (using three of the devices in series) was a bonus. The problem though, is actually doing that.

Taking a look at the product, it's pretty much as small as it can possibly be; the folks at Adafruit did a really good job making the product as small as possible. I imagine they did this in order to allow the product to be used in as many possible scenarios as possible.

{% image "src/images/2025/adafruit-neopixel-stick-front.jpg", "An image of the back of the NeoPixel Stick", "image-full" %}
Image credit: Adafruit. (cropped by me)

Making the product bigger, in order to offer simpler or more flexible options for mounting the product, could potentially eliminate the product's ability to be included in some projects.

When I started complaining to myself about how hard it was to connect three of these boards together, I started thinking of ways to keep the solder pads for people who want to use them (I find it extremely difficult to solder wires to solder pads, you need at least three hands) but drill holes in the pads so I can solder wires using through holes if I wanted (much easier to solder).

{% image "src/images/2025/adafruit-neopixel-stick-back.jpg", "An image of the back of the NeoPixel Stick", "image-full" %}
Image credit: Adafruit. (cropped by me)

I thought that was an amazing idea, until I looked at the front of the board. Right behind the solder pads on each end of the board is a NeoPixel. There's not room for through holes. Sigh.

Thinking through this more, what if I wanted to sew these into something? There's the two mounting holes, but in order to securely sew this device into an article of clothing, I'd need holes on both sides of the board (top and bottom when looking at the images) so I can ensure the position of the board no matter how the material folds/flexes.

See what I mean?

Here's what I think Adafruit should do with this device. Make it a little wider, not much, then add needle sized holes on each side that someone can use to stitch this device into clothing.

{% image "src/images/2025/neopixel-stick-redux.png", "a mockup of what I think Adafruit should do", "image-full" %}

Keep the solder pads on the end if they want, but add through-hole connections so I can solder wires securely to the board without needing three hands. 

With those small changes, the device stays as powerful it is today from a capabilities standpoint while at the same time becoming more flexible in mounting and connection capabilities.
