---
title: A Better Arduino MicroFogger Controller Redux
description: 
date: 2023-10-30
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
---

In my [previous post](/posts/2023/arduino-microfogger-control-better/), I demonstrated a better way to randomly generate smoke using the [Vosentech MicroFogger 5 Pro](https://vosentech.com/index.php/product/microfogger-5-pro/) from an Arduino sketch. That version was better because it didn’t block the main loop, instead it let other stuff while it generated smoke and waited. 

That example was good, but in order to teach the topic, I wrote more code than I needed to to solve the problem. I was demonstrating a method for periodically checking a timer rather than blocking other activities using `delay()`.

I figured someone would look at that code and say “yeah, but there’s a better way to do that” and yes, there is. There are a lot of better ways to do what I did; this post demonstrates one of them.

Instead of using two separate functions to start smoke and start a wait period,  you can do it all in one function. With that in place, you only need two functions to manage both the smoke and delay between smoke events instead of three.

I'll show the complete code at the end of this article, but you can also access it on GitHub at [microfogger-random-smoke-better](https://gist.github.com/johnwargo/6effb27c2e632674eb3774be9180b88c){target="_blank"}.

For this example, the initialization and `setup()` code remain essentially the same, you can refer to the [previous post](/posts/2023/arduino-microfogger-control-better/) for details. All I did was rename `startSmoke()` to `setSmokeState()`; you’ll see why in a minute.

```c
void setup() {
  // configure the output pin to control the smoke generator
  pinMode(SMOKE_PIN, OUTPUT);
  // Enable the Arduino device's onboard LED
  pinMode(LED_BUILTIN, OUTPUT);
  // start making smoke. You can do this later based
  // on some other trigger if you want
  setSmokeState(true);
}
```

In `loop()` I merely changed the name of `checkSmokeTimer()` to `checkSmokeState()`.

```c
void loop() {
  // ===
  // do some stuff
  // ===
  checkSmokeState();
  // ===
  // do some other stuff
  // ===
}
```

I made those changes because in this example, we’re no longer turning smoke on or starting a wait period, we’re managing the state of smoke generation. When the smoke state is on (`true`), the sketch turns on the smoke generator, when smoke state is off (`false`) the sketch turns off the smoke generator. For both states, the sketch maintains a single timer and uses it to manage both generating smoke and the wait periods in between.

Lets look at the `checkSmokeState()` function:

```c
void checkSmokeState() {
  // Set `timerDuration` to 0 to stop/disable this process
  if (timerDuration > 0) {
    // check to see if enough time's passed since the timer started
    if ((millis() - startTime) > timerDuration) {
      // timer expired, so time to switch modes
      setSmokeState(!isSmoking);      
    }
  }
}
```

The only change here is that I removed the if/then statement based on `isSmoking` and replaced it with a single line of code that calls `setSmokeState()` and passes in the opposite of the current state (`isSmoking` `true` or `false`).
All the magic is in the `setSmokeState()` function:

```c
void setSmokeState(bool smokeState) {
  uint8_t state = smokeState ? HIGH : LOW;
  digitalWrite(SMOKE_PIN, state);
  digitalWrite(LED_BUILTIN, state);
  isSmoking = smokeState;
  startTime = millis();  // capture when we started the timer
  timerDuration = (int)random(MIN_TIME, MAX_TIME);  // milliseconds
}
```

This new function covers the tasks required from the earlier example to turn smoke on (`startSmoke()`) or start a delay (`startDelay()`) in a smaller package.

First, the function uses the boolean value passed to the function (the state we want to put the sketch in) to determine whether we want the smoke pin or LED pin on (`HIGH`) or off (`LOW`). The sketch does this by assigning high or low values to the `state` variable based on whether `smokeState` is `true` or `false`.  With that in hand, the sketch uses that value to turn the smoke pin and LED Pin on or off.

Next, the sketch simply resets the timer with a new start time and duration then the whole process kicks off again.
This sketch uses less code to do the same thing as the previous example and instead of setting pin state in two different functions (with hard coded logic) it moves that into a single function and therefore simplifies the code.

The code may be a little harder to read, but smaller code means more memory space in the Arduino memory for code to do other things.
