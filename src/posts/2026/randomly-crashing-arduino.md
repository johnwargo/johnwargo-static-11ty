---
title: Randomly Crashing An Arduino
description: 
date: 2026-02-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
timestamp: 2026-02-24T23:16:45.040Z
---

I'm helping a friend build a NeoPixel-based throttle gauge for his Autocross race car. He records video of all his runs and wants the gauge to show in the recording. For a variety of reasons, we've been plugging away at this project for months and I've been struggling to complete it. I designed a custom circuit board for the gauge and my friend designed a custom enclosure for it. The most difficult parts of this project is debugging an Arduino-based solution inside a race car in real time. 

Anyway, we spent part of last week refactoring the code in an effort to fix some issues we had accurately displaying the throttle position in LEDs. The throttle generally floats at the low end, when the throttle isn't pressed, the Arduino records a wide variety of values, all of them wrong. So we set about hard coding lower and upper limits for the throttle values (voltage values between 0 and 15) and when we tested it, it seemed to work.

It didn't. 

During some additional testing, we noticed that often when we let off the throttle, the arduino device reset. After about 8 times throttling to maximum, when we let off, the Arduino randomly rebooted.

I previously had a divide by zero error in the code, so when this random rebooting started, I studied the code looking for places where I could possibly divide by zero. I didn't find anything, but this was definitely a good place to start.

Next, I started looking for other places the sketch could crash and, fortunately, I found it.

My friend wanted to narrow the range of throttle values that drove the LED gauge. The ESP32 device running the sketch measures analog voltages in a range from 0 to 4096, but for a variety of reasons (that aren't important now) we only card about values between 450 and 2000 as shown below:

```c
#define NUM_THROTTLE_LEDS 15
#define THROTTLE_MIN 450
#define THROTTLE_MAX 2000
```

The project has 15 LEDs in a strip, and my friend wanted to turn all of the LEDs White when the throttle was at 90%. So that led to this code:

```c
const float maxThrottleValue = THROTTLE_MAX * 0.9;
const float pixelRatio = (maxThrottleValue - THROTTLE_MIN) / NUM_THROTTLE_LEDS;
```

The `pixelRatio` constant allows the sketch to know how many throttle values are required to illuminate a single LED (NeoPixel).

Later on in the code, I use the following calculation to determine how many Pixels to illuminate:

```c
currentPixelCount = (throttleValue - THROTTLE_MIN) / pixelRatio;
```

This code can't generate a divide by zero error since `pixelRatio` can never be zero unless done by purpose. The code can, however, generate a negative pixel count if `throttleValue` is less than `THROTTLE_MIN`. This does happen periodically since the throttle value reading can be below `THROTTLE_MIN` but the sketch essentially ignores analog readings below `THROTTLE_MIN`.

Later on in the sketch, I do some stuff to get the gauge to accurately display the LEDs like I want, and this is where the sketch crashes. Take a look:

```c
if (isMaxThrottle) {
  // Set all throttle LEDs to WHITE
  for (int i = 0; i < NUM_THROTTLE_LEDS; i++) tLeds[i] = CRGB::White;
} else {  // else not isMaxThrottle
  // first, set pixel count to zero if no throttle
  if (isMinThrottle) {
    // No pixels illuminated, this allows the code to skip the next if statement
    // then sets all pixels to black
    currentPixelCount = 0;
  }
  // Set only a portion of the throttle LEDs to Green
  if (currentPixelCount > 0) {
    // light LEDs green based on the current throttle value
    for (int i = 0; i < currentPixelCount; i++) tLeds[i] = CRGB::Green;
  }
  // then set the rest to black
  for (int i = currentPixelCount; i < NUM_THROTTLE_LEDS; i++) tLeds[i] = CRGB::Black;
}  //if (isMaxThrottle)
FastLED.show();
```

The issue is in the two `for` loops the code uses to illuminate the gauge LEDs using the value in `currentPixelCount` in the loop bounds. 

For example, take a look at the code that illuminates the throttle position in Green:

```c
for (int i = 0; i < currentPixelCount; i++) tLeds[i] = CRGB::Green;
```

When `currentPixelCount` is less than zero (which I've already proved is possible) then the loop crashes with an **array out of bounds** error. Assuming, for example, that `currentPixelCount` is -5, that makes the `for` loop look like this:

```c
for (int i = 0; i < -5; i++) tLeds[i] = CRGB::Green;
```

In this example, the `i++` increments `i` in every loop, but `i` starts at 0 and the condition for ending the loop is when the value for `i` is less than 5. For this example, `i` is never less than 5 and the sketch crashes as soon as `i` exceeds the upper bounds of the array. 

The second place the sketch crashes is in the following code:

```c
for (int i = currentPixelCount; i < NUM_THROTTLE_LEDS; i++) tLeds[i] = CRGB::Black;
```

Assuming the same value for `currentPixelCount` (-5), the `for` loop looks like this:

```c
for (int i = -5; i < NUM_THROTTLE_LEDS; i++) tLeds[i] = CRGB::Black;
```

In this case, the sketch crashes much faster; it crashes in the very first loop iteration as soon as it executes this array assignment:

```c
tLeds[i] = CRGB::Black
```

It crashes because since `i` = -5, there is no -5th element in the array (Arduino arrays start at index 0);

So, how did I fix the code? Well, I need to accept throttle readings less than `THROTTLE_MIN`, but not attempt to illuminate any LEDs when less than `THROTTLE_MIN`. I did this by checking to see if `throttleValue` was less than `THROTTLE_MIN` and setting `currentPixelCount` to zero in this case. Here's the code:

``` c
currentPixelCount = (throttleValue > THROTTLE_MIN) ? (throttleValue - THROTTLE_MIN) / pixelRatio : 0;
```

With this code, `currentPixelCount` is always an integer value greater or equal to zero which is exactly what the sketch needed to never exceed the `tleds` array bounds.

I hope this article saves you some troubleshooting time when working on a sketch that randomly reboots the Arduino device.

Just in case you're interested, you can find the full code for the sketch in [Throttle & Brake Gauge](https://github.com/johnwargo/throttle-brake-gauge).
