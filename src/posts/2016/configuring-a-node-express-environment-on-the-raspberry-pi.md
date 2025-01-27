---
title: Configuring a Node Express Environment on the Raspberry Pi
description: Describes my experience trying to get a Node & Express environment running on the Raspberry Pi
date: 2016-02-16
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

As I posted last week, I'm working on a project on the Raspberry Pi. As I'm not a Python developer, I thought I'd write my server code using Node. My previous post was about how I configured my WebStorm instance so I could code my JavaScript on my PC and publish it on the Raspberry Pi. Once I had that working, I started testing my app on the Pi, and that's when I started running into problems. It took me a little while to figure this one out, so I thought I'd write about it here in case others have the same problem.

As any hardware developer does, before I started, I made sure my Pi had the latest version of Raspian, the default OS for the Pi. In this case, I grabbed the latest version of Raspian from [https://raspberrypi.org/downloads/raspbian/](https://raspberrypi.org/downloads/raspbian/){target="_blank"}. In this case, it's Raspian Jessie (February 2016) as shown in Figure 1.

{% image "src/images/2016/pi-node-express-1_640.png", "Raspian Download Page", "image-full" %}
Figure 1 – Raspian Download Page

I burned the OS to a memory card, inserted it in the device and booted it up. After it booted, I opened a terminal window and checked the node version. Raspian Jessie ships with Node 0.10, which is pretty old. So, before I went any further, I knew I had to update my Node installation. I checked and npm wasn't installed as well, so I had to do that installation as well.

Fortunately, the folks at Adafruit published some instructions on how to upgrade node on the Pi; you can find the instructions here: [https://learn.adafruit.com/node-embedded-development/installing-node-dot-js](https://learn.adafruit.com/node-embedded-development/installing-node-dot-js){target="_blank"}. Basically, all you have to do is execute the following commands in a terminal window to update node:

```shell
curl -sLS https://apt.adafruit.com/add | sudo bash
sudo apt-get install node
```

When you're done, execute the following command to check the version:

```shell
node -v
```

It should return something like v0.12.0 or greater. OK, at this point, I know I'm running a newer version of Node than came with the latest version of Raspian.

Now, I knew that interacting with the Pi's GPIO ports was a little different, so I knew I'd need a library to make this easier in Node. One of the articles I found mentioned a library called rpi-gpio ([https://npmjs.com/package/rpi-gpio](https://npmjs.com/package/rpi-gpio)), so I thought I'd give it a try.

I opened a terminal window and tried to install `rpi-gpio` using the following command:

```shell
npm install rpi-gpio --save
```

Unfortunately, the installation failed every time I tried to install it. In the npm log, I found the following:

```text
606 error epoll@0.1.17 install: node-gyp rebuild 
606 error Exit status 1
607 error Failed at the epoll@0.1.17 install script.
607 error This is most likely a problem with the epoll package,
607 error not with npm itself.
607 error Tell the author that this fails on your system:
607 error     node-gyp rebuild
607 error You can get their info via:
607 error     npm owner ls epoll
607 error There is likely additional logging output above.
608 error System Linux 4.1.17-v7+
609 error command "/usr/bin/nodejs" "/usr/bin/npm" "install" "rpi-gpio" "--save"
610 error cwd /home/pi/dev/test
611 error node -v v0.10.29
612 error npm -v 1.4.21
613 error code ELIFECYCLE
614 verbose exit [ 1, true ]  
```

Apparently, the build process failed. Not sure what to do, I looked at the author's GitHub account ([https://github.com/JamesBarwell/rpi-gpio.js](https://github.com/JamesBarwell/rpi-gpio.js){target="_blank"}) and found a recent issue that was similar to my problem ([https://github.com/JamesBarwell/rpi-gpio.js/issues/33](https://github.com/JamesBarwell/rpi-gpio.js/issues/33){target="_blank"}). There wasn't an immediate solution provided, but one helpful (sarcasm) visitor suggested looking at the readme at [https://github.com/JamesBarwell/rpi-gpio.js/blob/master/README.md#dependency](https://github.com/JamesBarwell/rpi-gpio.js/blob/master/README.md#dependency){target="_blank"}. Apparently the version of gcc is a problem with Raspian.

I quickly took a look, and the version I was running was much, much different than rpi-gpio expected. A quick pointer to [https://github.com/fivdi/onoff/wiki/Node.js-v4-and-native-addons](https://github.com/fivdi/onoff/wiki/Node.js-v4-and-native-addons){target="_blank"} provided me with the instructions to install the latest version of gcc on the Pi.

Unfortunately, after the gcc update, it still didn't work. On a hunch, I restarted the Pi and suddenly it worked, the rpi-gpio module installed successfully and I was all ready to go (at least until the next problem pops up).

I just have one question for you: why does everything have to be so hard?