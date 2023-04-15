---
title: Arduino Powered Pinewood Derby Car
description: 
date: 2016-04-14
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

This content was originally published online in Make Magazine at [https://makezine.com/projects/arduino-powered-pinewood-derby-race-car/.](https://makezine.com/projects/arduino-powered-pinewood-derby-race-car/) A PDF version of this article can be downloaded from a link at the bottom of the article.

## Introduction

By John M. Wargo & August M. Wargo

**August:** My dad and I had an idea that our last pinewood derby car should be really cool. My dad is a geek and really good with electronics so he did most of the coding. I did most of the design. I thought that it was a lot of fun because I got to spend more time with my dad and got to do a lot of things that I like. I couldn't wait until the race to see how fast it was. It did not win a single race. But we did win the most unique car design. It was the best Cub Scout experience I've ever had.

**John:** My son is in Cub Scouts and for years we've been building Boy Scouts of America Pinewood Derby ([www.pinewoodderby.org](https://www.pinewoodderby.org){target="_blank"}) cars with the rest of the pack. I've always invited my son's Den into my workshop so the other scouts and their Dads can make use of my tools to build their cars. The Boy Scouts has a policy against Cub Scouts using power tools, but with the right guidance we've gotten along.

It's always…interesting to see how much involvement the Scouts have vs. their parents in making the cars. For the most part, I've let my son do what he wants with his car; I've guided him, but let him cut the car, sand it, paint it and so on. I really only got directly involved when it came to putting the wheels on as he didn't, until recently, have the physical strength and control needed to do that right.

![A Boy and His Arduino Powered Pinewood Derby Car](/images/2016/arduino-pinewood-derby-01.png)
Figure 1 – A Boy and His Arduino Powered Pinewood Derby Car

After watching one particular parent last year spend two hours or more in the shop painstakingly cutting, shaping, sanding and grinding the car into a particular shape, my son and I decided that we'd kick it up a notch this year. Even though I have a pretty nice wood shop, I'm more of a programmer type (I've written 6 books on mobile development), so I suggested that we do something with a programmable microcontroller and some LEDs for this year's race. I'd wanted to do something with Arduino, so this seemed like the perfect opportunity to do so while at the same time providing me with a chance to teach my son how to wire things together, solder and write code.

In this project, we'll show you how to create an Arduino-powered Pinewood Derby car. We'll be using an Arduino ([www.arduino.cc](https://www.arduino.cc){target="_blank"}) microcontroller board, some LEDs and an accelerometer to flash a set of LEDs depending on the orientation of the car.

For our first iteration of this, we configured the car so that when it sits in the pits, it will flash the lights in a certain pattern. When the car is at the starting gate, and when it's on the angled portion of the track, the light pattern changes and becomes much more active. Knowing that the car may jump off the track, we also added special added patterns for when the car is sitting on its left or right side. Since everything is done in code, it's super easy to completely change the light patterns and orientation settings in the software. You and your son can spend hours trying out different patterns to get the right, and potentially unique, ones for your car.