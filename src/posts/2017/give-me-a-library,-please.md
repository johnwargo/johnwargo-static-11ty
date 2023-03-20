---
title: Give Me a Library, Please
description: 
date: 2017-07-17
headerImage: 
categories: [Miscellaneous]
tags: post
---

I’ve been doing a lot of work lately on several IoT projects. For a while last year, I worked on some documentation for an IoT platform, but for the most part, I’ve been working on some personal projects. Recently, I’ve been trying to build a better power timer – using relays and a microcontroller to turn a light on and off on a schedule, even using sunrise and sunset as triggers (you can see some of my work [here](https://github.com/johnwargo/raspberry-pi-relay-timer) and [here](https://github.com/johnwargo/Aduino-RTC-Relay-Static)). I recently discovered some relay boards for the Raspberry Pi platform, and started working with them. My experiences with these boards, and the sample code provided for each, incented me to write this post today.

When you’re working with someone else’s hardware, chances are that you don’t know how to ‘use’ the hardware in your project. That’s why vendors typically include some sample programs to show you how to work with their board, right? The problem is, these sample programs are typically written by a hardware guy trying to show that the board works instead of being written by someone trying to show you how to use the hardware in your project.

What these vendors must do is make a list of the core things a developer will want to do with the hardware, then build code that quickly and easily enables developers to do those things. Once all that code is written and tested, vendors should publish the code as stand-alone libraries that developers can easily plunk into their apps and use.

Instead of the huge Kitchen Sink app, with UI and functional code intermixed, pull out the functional code into stand-alone libraries for easy consumption. Then, build a separate UI or interaction app that uses the library to interact with the hardware. That way, developers have an easy way to determine how to interact with the board from their applications (by looking at the library code) and an easy way to interact with the hardware (the UI app) to make sure it works or to see how it works. This simple separation of concerns dramatically increases a developer’s (experienced or inexperienced) ability to come up to speed with your hardware.

As an example of what not to do (and what prompted me to write this post), take a look at the code for the [ModMyPi PiOT Relay board](https://www.modmypi.com/raspberry-pi/breakout-boards/modmypi/modmypi-piot-relay-board) at [https://github.com/modmypi/PiOT-Relay-Board/blob/master/piot5.py](https://github.com/modmypi/PiOT-Relay-Board/blob/master/piot5.py). In this example, you’ll see 424 lines of code for this relay board; I’m guessing here, but you’ll see, I’ll bet, more than 300 lines of UI code and only about 30 lines of code that actually show you how to work with the relay board. It took me a while looking through the code to find those 30 lines that I needed to learn how to use the board in my projects. Its those 30 lines or so that I want the developer to pull out into a library for me – to make it easy for me to see how to use the board.

In this example, it gets even worse. This relay board has 4 relays, and the only code the developer provides is code to toggle all or individual relays. Thinking through the use cases, developers may want to turn a relay off or on as well. What good is the ability to toggle a relay when I’m not certain of the relay’s status?

What I did was think through how an app will want to interact with the board and came up with the following:

*   Turn a relay on
*   Turn a relay off
*   Toggle a relay (on to off or off to on)
*   Turn all relays on
*   Turn all relays off
*   Toggle all relays
*   Get Relay status (is the specified port on or off?)

This list is what any project may need to do with this board, so that’s what must be coded in the example application to help developers, especially inexperienced developers, can get up and running quickly. With that in mind, I published my own library for this board on [Github](https://github.com/johnwargo/pi-relay-controller-modmypi/blob/master/relay_lib_modmypi.py). You’ll find functions for each of the items in the list, and you’ll be able to add this library to any project, initialize it then interact with its relays as needed.  
That’s how you enable developers to use your hardware: make it easy for them, not by making it hard for them!