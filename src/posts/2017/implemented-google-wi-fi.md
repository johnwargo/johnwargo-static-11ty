---
title: Implemented Google Wi-Fi
description: 
date: 2017-04-22
headerImage: 
categories: [Miscellaneous]
tags: post
---

I had an interesting SMS conversation with my son the other day. The conversation went like this:

{% image "src/images/2017/google-wi-fi-01.png", "Google Wi-Fi 1", "image-full" %}

I was at a concert with my wife (we saw Jonny Lang) and we noticed that the kids were watching a show on the Apple TV (I'll explain how later) when they were supposed to be in going to bed, so I turned off Wi-Fi to the Apple TV. Here's the story...

My brother in law recommended I get the Linksys WRT 1900 Apache Cordova Router. My brother in law liked how it allowed you to configure a separate guest network and some other features, so I got it and put it to work.

Ultimately, though, I didn't like the results I got with this router. True, it allowed me to implement a guest network, but bizarrely the guest network had different passphrase requirements than the primary network. The primary network allowed me to set a passphrase containing spaces, but for some ridiculous reason, the guest network password couldn't handle passphrases, it had to be a password instead (with no spaces). It had other interesting features, like the ability to set priority devices and some other stuff, so I used a guest password I wasn't happy with and left it in place.

Fast forward a couple of years later and al of a sudden, I can't connect to the Wi-Fi network in my office with any of my mobile devices. I'd reboot the Wi-Fi hotspot or reboot the devices and get on the network, but ultimately it wasn't working. Gone are the days where I can troubleshoot a network, I just don't have the bandwidth for it anymore, so I decided to swap out the hardware for a better solution.

I'd been looking at the Google Router for a while now; a friend uses one and configured it to use the OpenDNS service for name resolution (and site blocking). I thought that might be a good solution, but then I started reading about Google Wi-Fi and its ability to implement a mesh network. I decided to give this solution a try and purchased and setup a three pack of the devices in the house.

My office is in an outbuilding, and I thought I'd leave my hotspot in my office, but when I setup the new network, I disconnected the hotspot in my office and noticed that I had good coverage from the house. So, three devices, distributed through the house was enough to cover my office and workshop as well. Nice!

The setup process is really simple, you install the first device and connect it to your cable/DSL modem using a standard Ethernet cable. When you fire up the app, it walks you through setting up the network, creating a primary and guest networks – both allowing passphrases (woohoo!), of course. Next, you add each additional unit, and let the app configure its Wi-Fi mesh.

It only took a few minutes and I was all setup. A quick test with my mobile devices and they all connected just fine to the new network. Even my desktop PC, a couple of Raspberry Pi devices and my smart devices all connected to the new network automatically. I didn't have to restart or muck with it in any way. Nice!

I started poking around in the Google Wi-Fi mobile app (Google insists in calling it WiFi, but since that's not how you spell Wi-Fi, I'm not going to use their spelling); the app opens to a view of your network:

{% image "src/images/2017/google-wi-fi-02.png", "Google Wi-Fi 2", "image-full" %}
Figure 2

Here, I can quickly tell whether my Internet connection is up. I can view the status of my Wi-Fi units, and I can view all of the devices on the network (wired or Wi-Fi).

When you tap on the Wi-Fi points, you'll see each of the units and the current device's connectivity to each. In the following image, you can see that I have a good connection to the Family Room and a poor connection to the 'Hallway' device. This is good as the Family Room device is closest to me, but even if that one goes down, I can still see signal from the device that's furthest away.

{% image "src/images/2017/google-wi-fi-03.png", "Google Wi-Fi 3", "image-full" %}
Figure 3

You can also test the network, notice the 'Test Mesh' button in the bottom-right corner of the figure. When you tap on the button, the app begins a network check:

{% image "src/images/2017/google-wi-fi-04.png", "Google Wi-Fi 4", "image-full" %}
Figure 4

Followed by a Mesh check:

{% image "src/images/2017/google-wi-fi-05.png", "Google Wi-Fi 5", "image-full" %}
Figure 5

And finally the Wi-Fi network (which I'm not showing). Anyway, there's lots of information about the network which is really useful and very easy to use (especially compared to the Linksys solution I used previously).

When you access the Devices section of the app, you're presented with a list of all of the devices currently using the network. When you open a device, you can view the device's usage of the network (which is useful) but you can also edit it's display name, enabling you to name devices based on how you view the device, not the way the network sees the device. So, I've named my Amazon Echo devices based on where they're located (kitchen, office, etc), my computers based on my name for them and so on. At the end of this process, I had a complete list of devices I could view, all named the way I wanted them named. Cool stuff.

On to the SMS conversation I showed you at the top of the article. One of the things the app allows you to do is setup Family Wi-Fi settings. Here you can define groups of devices (my kid's devices for example) and control when they can access the network.

I quickly setup a family group for my twins and added their smartphones, tablets and Chromebooks to the list. With that in place, I configured the group so it shut off network access to those devices on school nights between 9:30 PM and 6 AM as shown in the following figure.

{% image "src/images/2017/google-wi-fi-10.png", "Google Wi-Fi 6", "image-full" %}
Figure 6

With this in place, Sundays through Thursday nights, the twins' access shuts down when it's time for them to be in bed. Nice stuff.

The app also allows you to pause individual devices. So, as I explained at the beginning of the article, I was able to see through the app that the Apple TV was consuming bandwidth, indicating that my kids were watching something, and I quickly paused access to shut them down. What fun!

I paused it permanently, but it seems like I could have only paused it for a limited time (which I'll do the next time). My son called me today, three days later, asking me to turn the Apple TV back on – apparently it was off all this time.

Other features that are interesting:

Allows for reserving IP addresses – I really want my printers and Raspberry Pi devices to have dedicated IP addresses, so I was able to use the app to reserve addresses for them. The Pi's took the change without pause, my printers have yet to recognize the IP address assigned to them. I assume that will happen when their current IP address lease expires.

The app also allows you to set additional admins for the network, so I quickly added my wife and showed here how to turn things on/off. Only the owner of the network, me, can do that, so there's no chance my kids will be able to install the app and manipulate the network. My smartphone and tablet are all locked to my fingerprint, so they can't access anything without cutting off my finger.

Some drawbacks, there's no way to print a device list. I want to print the network information so I can file it away, but that's not possible. The Google devices sport an API that may expose this information, I'm not sure. The API's not public. There's also an associated cloud service, but no published API there either. Hopefully (although Hope is NOT a Strategy) Google will expose some additional capabilities through the desktop browser someday.

Another drawback is that when you open a device, then return to the device list, the list refreshes every time. When I was going through each device, setting its name, it was quite annoying that I had to scroll back to my place every time. I wish Google would expose a setting that would let me disable list refreshes while I'm working with the list.

In all, an incredible experience and the system exposes most everything I need to manage my network (and annoy my kids). I did implement OpenDNS as well, to give me more control over what the kids can see and some additional reporting on the sites they access. Perhaps I'll write about that someday soon.