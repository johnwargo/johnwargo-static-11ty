---
title: Playing Around with Info Orbs
description: 
date: 2025-02-08
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - ESP32
  - Internet of Things (IoT)
timestamp: 2025-02-08T13:59:53.164Z
---

A while back, I learned about this ESP32 project called [Info Orbs](https://brett.tech/products/info-orbs-full-dev-kit?srsltid=AfmBOoryum6iekEf54HDhbxM65KiyPTtgzT__YydExUVYKeITumiN_2k){target="_blank"}; it's a simple project that pairs 5 1.8 inch circular displays with a simple stand and some pretty cool software. The kit seems to be designed as a first project for people interested in getting into Arduino; it requires a little bit of soldering and the entire software configuration and deployment process runs in Visual Studio Code. The assembly instructions are simple and easy to follow. 

{% image "src/images/2025/info-orbs-01.jpg", "My assembled Info Orbs project sitting on my desk", "image-full" %}

If you're looking for an excellent way to quickly build a very interesting project with a young learner, this one's pretty cool; especially since you can use it to teach soldering.

During assemblyI realized I wanted to present the orbs differently. I built it out as designed, but I already decided I'm going to build a wooden enclosure for it and I've already ordered the parts I needed. 

## Soldering Issues

My father taught me how to solder when I was about 10 years old (I'm now over 60) so I thought I would have no issues with the simple soldering tasks required to assemble this project. I was wrong. Not because the parts are hard to solder, but because I made mistakes while I soldered the parts. 

When I assembled all the parts and deployed the compiled sketch to the device, one of the orbs was blank and the one next to it had content overlapping on it. I hopped on the project's Discord and after a quick search I found the solution. 

The project apparantly uses the `cs` pin on the displays to select which display gets which content. When soldering the last display, I did two things wrong. I didn't make a solid solder connection on the Ground (`gnd`) pin and I also didn't seem to have enough solder on the `cs` pin.  I touched up all the connections on the failed display and everything worked perfectly (as you can see from the image).

I'll let you know when I get the extra sat of parts and start building my wooden enclosure. In the mean time, I'm 3D printing an enclosure for it right now. 
