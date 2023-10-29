---
title: A Better Arduino MicroFogger Controller
description: Describes a better way to control a Vosentech MicroFogger from an Arduino sketch. The example provided in the previous post blocked the sketch's `loop` function and this one doesn't.
date: 2023-10-29
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
---

In my [previous post](/posts/2023/arduino-microfogger-control/), I demonstrated how to control a [Vosentech MicroFogger 5 Pro](https://vosentech.com/index.php/product/microfogger-5-pro/) from an Arduino sketch. The example I provided there was simple and just showed how to control the smoke generator, turning on and off smoke generation for random periods of time.

That example has an issue, a big one, the sketch can't do anything while the sketch waits to turn off or turn on the smoke. I suggested at the end of the article that you could write the sketch in such a way as to let the sketch do other things. This post describes that alternate version. I'll show the complete code at the end of this article, but you can also access it on GitHub at [microfogger-random-smoke-better](https://gist.github.com/johnwargo/601a38c913dabb006f3412c93c276f6e){target="_blank"}.

This version of the sketch starts mostly the same as the other version, with a few additions.

```c
#define SMOKE_PIN A0
#define MIN_TIME 1000
#define MAX_TIME 5000

bool isSmoking = false;
int timerDuration = 0;
unsigned long startTime;

void setup() {
  // configure the output pin to control the smoke generator
  pinMode(SMOKE_PIN, OUTPUT);
  // Enable the Arduino device's onboard LED
  pinMode(LED_BUILTIN, OUTPUT);
  // start making smoke. You can do this later based
  // on some other trigger if you want
  startSmoke();
}
```

I added some variables that weren't in the other version:

* The boolean `isSmoking` allows the sketch to understand whether it's generating smoke or waiting before generating smoke again. 
* The integer `timerDuration` keeps track of how long the sketch generates smoke or waits between smoke generation. It tracks the time in milliseconds (1,000 milliseconds equals one second). Basically, the sketch resets this value with a randomly generated number of milliseconds every time it interacts with the smoke generator. In the previous example, the number of milliseconds was passed to the `delay()` function, so the sketch 'used' it only when starting a wait. In this example, we need to be able to track the wait duration external to any call to `delay()` mostly because this version of the sketch doesn't use `delay()`.
* The long integer `startTime` tracks the current time, in milliseconds, as tracked by the Arduino. Basically, the Arduino platform has a timer chip and starts counting milliseconds from the moment the Arduino powered on (resetting at about 50 days). This provides a sketch a very rough way to track time and calculate time between events or activities. The sketch uses this to help calculate how long since an event (starting smoke generation or waiting between generation events) started so it can determine, using `timerDuration` whether it's time to end the event. 

During `setup()`, the sketch also calls `startSmoke()` to begin smoke generation; I'll explain how that works a little later.

The `loop()` function in this example changed dramatically. Previously, the loop did all of our smoke generation and waiting to generate smoke again. In this version, the loop simply makes a check to see if its time to end an event and start the next one (`checkSmokeTimer`). This gives the sketch time to do other activities, as you can see from the comments in the code:

```c
void loop() {
  // ===
  // do some stuff
  // ===
  checkSmokeTimer();
  // ===
  // do some other stuff
  // ===
}
```

As long as the code the sketch executes before and/or after the timer check doesn't take too long, the sketch will accurately track the time assigned for each smoke event (generating and waiting). If your sketch's other code executes long-running actions or uses `delay()` with more than 500 milliseconds or so, then this breaks down. For other long-running events, your sketch must use a similar timer approach (described below) to ensure every part of the sketch gets time to execute and share processor cycles with the rest of the sketch.

Alright, lets get into the meat of the sketch.

The `startSmoke()` function turns on the smoke generator and onboard LED just like the previous example (uses the same code), it also sets those three new variables I described at the beginning of the post. It sets the `isSmoking` boolean to `true` (you know, because we're generating smoke at this time). In the `startDelay` function I set it to `false` and that's how the sketch knows which 'state' its in.

Next, it assigns the current time to `startTime` (remember, in milliseconds) and assigns a random number of milliseconds between the values in `MIN_TIME` and `MAX_TIME` to `timerDuration`. Simple subtraction between the two values performed later tells the sketch whether it's time to stop generating smoke, I'll explain this later.

```c
void startSmoke() {
  // turn the smoke machine and onboard LED on
  digitalWrite(SMOKE_PIN, HIGH);
  digitalWrite(LED_BUILTIN, HIGH);
  isSmoking = true;
  startTime = millis();  // capture when we started the timer
  // figure out how long it generates smoke (randomly)
  timerDuration = (int)random(MIN_TIME, MAX_TIME);  // milliseconds
}
```

The `startDelay()` function works exactly the same except for two differences:

1. It turns smoke generation and the onboard LED off.
2. It sets `isSMoking` to false because we're no longer generating smoke

Those two actions puts the sketch in delay mode, waiting for the next opportunity to generate smoke.

```c
void startDelay() {
  // turn the smoke machine off and onboard LED, then wait a while
  digitalWrite(SMOKE_PIN, LOW);
  digitalWrite(LED_BUILTIN, LOW);
  isSmoking = false;
  startTime = millis();  // capture when we started the timer
  // figure out how long it waits between generating smoke (random duration)
  timerDuration = (int)random(MIN_TIME, MAX_TIME);  // milliseconds
}
```

Finally, and this is where all the magic happens, the `checkSmokeTimer()` manages smoke generation state and kicks off smoke generation or waiting based on that state. 

The first thing the sketch does is check to see if the `timerDuration` contains a value greater than zero. If for any reason you want to stop this process all together, some other part of the sketch can change the value assigned to `timerDuration` to zero or any negative integer and this check for zero causes `checkSmokeTimer()` to skip execution all together. To restart the process, make a call to `startSmoke()`;

```c
void checkSmokeTimer() {
  // Set `timerDuration` to 0 to stop/disable this process
  if (timerDuration > 0) {
    // check to see if enough time's passed since the timer started
    if ((millis() - startTime) > timerDuration) {
      // timer expired, so time to switch modes
      if (!isSmoking) {
        // we're not smoking, so start the smoke
        startSmoke();
      } else {
        // we're smoking, so switch to delay
        startDelay();
      }
    }
  }
}
```

Next, the function subtracts the start time from the current time (`millis()-startTime`) and compares it to `timerDuration`. If the elapsed time is less than `timerDuration` the function exits because there's still time left before changing state. If the value is greater than `timerDuration` then the timer expired and the function calls `startSmoke()` or `startDelay()` depending on whether the sketch is in delay  or smoke generation mode.

That's it, that's all there is to switching a sketch from using `delay()` to control how long it waits to using a timer loop like this with the ability for other 'stuff' to happen during the wait period.

Here's the complete sketch:

```c
#define SMOKE_PIN A0
#define MIN_TIME 1000
#define MAX_TIME 5000

bool isSmoking = false;
int timerDuration = 0;
unsigned long startTime;

void setup() {
  // configure the output pin to control the smoke generator
  pinMode(SMOKE_PIN, OUTPUT);
  // Enable the Arduino device's onboard LED
  pinMode(LED_BUILTIN, OUTPUT);
  // start making smoke. You can do this later based
  // on some other trigger if you want
  startSmoke();
}

void loop() {
  // ===
  // do some stuff
  // ===
  checkSmokeTimer();
  // ===
  // do some other stuff
  // ===
}

void startSmoke() {
  // turn the smoke machine and onboard LED on
  digitalWrite(SMOKE_PIN, HIGH);
  digitalWrite(LED_BUILTIN, HIGH);
  isSmoking = true;
  startTime = millis();  // capture when we started the timer
  // figure out how long it generates smoke (randomly)
  timerDuration = (int)random(MIN_TIME, MAX_TIME);  // milliseconds
}

void startDelay() {
  // turn the smoke machine off and onboard LED, then wait a while
  digitalWrite(SMOKE_PIN, LOW);
  digitalWrite(LED_BUILTIN, LOW);
  isSmoking = false;
  startTime = millis();  // capture when we started the timer
  // figure out how long it waits between generating smoke (random duration)
  timerDuration = (int)random(MIN_TIME, MAX_TIME);  // milliseconds
}

void checkSmokeTimer() {
  // Set `timerDuration` to 0 to stop/disable this process
  if (timerDuration > 0) {
    // check to see if enough time's passed since the timer started
    if ((millis() - startTime) > timerDuration) {
      // timer expired, so time to switch modes
      if (!isSmoking) {
        // we're not smoking, so start the smoke
        startSmoke();
      } else {
        // we're smoking, so switch to delay
        startDelay();
      }
    }
  }
}
```

Don't forget that you can access the full source on GitHub at [microfogger-random-smoke-better](https://gist.github.com/johnwargo/601a38c913dabb006f3412c93c276f6e){target="_blank"}.

Normally I'd record a video of this in action, but even though the code is dramatically different, the sketch still delivers the exact same functionality. If you want to see the video again though, here it is:

https://youtu.be/hNl9zjcL8mQ
