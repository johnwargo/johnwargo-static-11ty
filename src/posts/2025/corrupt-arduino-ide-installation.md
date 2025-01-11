---
title: Corrupt Arduino IDE Installation
description: 
date: 2025-01-11
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Internet of Things (IoT)
timestamp: 2025-01-11T13:57:18.087Z
---

I'm a big fan of [M5Stack](https://m5stack.com/){target="_blank"} products, I have a collection of their devices here but I never seem to do much with them. In one of the periodic newsletters I receive, I noticed a cool project for an M5Stack Core Ink device I wanted to try out. The project is the [Keychain Skimmer Scanner](https://github.com/kevinl95/KeychainSkimmerScanner){target="_blank"} project that helps you locate Credit Card Skimmers.

I quickly pulled out the right device and started working on getting the code compiled and deployed to the device. I immediately ran into a bunch of problems, and I really struggled to get it to work. I visited the Issues area of the code repository, and created an issue outlining my problem. It turns out that there were some minor issues with the code and instructions, but even after resolving them I still couldn't get the code to compile and the errors I got simply didn't make sense. 

If you look at my issue at [Code won't compile](https://github.com/kevinl95/KeychainSkimmerScanner/issues/4){target="_blank"} you can see the error messages I received from the compiler. In one of the examples, the compiler complained that a method referenced in the code did not exist. I took a look at that particular library's source and realized that the owner had refactored the code and moved some methods into a separate file or library. 

Looking at my local configuration, I realized that I had some older versions of the libraries on my system. I quickly uninstalled Arduino Studio and deleted the libraries folder, rebooted, installed everything again, and gave it another shot. Sigh, it didn't work. 

I put it aside for a while and started working last night on another M5Stack device project and encountered similar library incompatibilities. Realizing that I had bigger problems if none of my M5Stack projects would compile, I started digging into this in earnest. 

I uninstalled and deleted everything again, but then started looking for any other detritus left on the system. I run Windows on my primary development system (I have a macOS system as well, but I don't use it as much) and I found some additional files that remained after the uninstall. 

The first set of files was in `c:\users\john\.arduinoIDE` as shown in the following figure. Delete that folder.

{% image "src/images/2025/arduino-file-explorer-1.png", "Windows File Explorer showing the arduinoIDE folder", "image-full" %}

Next, I looked in the system's Application Data folder and found the following:

{% image "src/images/2025/arduino-file-explorer-2.png", "Windows File Explorer showing the app data folder", "image-full" %}

> The easiest way to find the system's AppData folder is to open File Explorer, select the path input field, type %appdata% then press the Enter key. AppData is an environment variable that points to the system's roaming data folder. 

There's two different Arduino IDE folders in that location: `Arduino IDE` and `arduino-ide`. Sigh. I'm not sure why there's two of them, but the `arduino-ide` folder contains settings, code cache, and other stuff as shown below.

{% image "src/images/2025/arduino-file-explorer-3.png", "Windows File Explorer showing the arduino-ide folder contents", "image-full" %}

This must have been the source of my issue. Once I whacked (deleted) all three folders and reinstalled every one of my existing issues went away. 

Somehow my system's configuration got corrupted and wouldn't install updated versions of the libraries already installed. 
