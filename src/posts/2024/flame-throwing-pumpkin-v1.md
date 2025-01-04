---
title: Flame Throwing Pumpkin
description: 
date: 2024-10-15
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - Internet of Things (IoT)
timestamp: 2024-10-15T23:34:43.171Z
---

Back in 2019, I decided to finally start work on a Flame Throwing pumpkin project for Halloween. I saw some projects like this in the past, and I wanted to do my own version. Some projects do some pretty sophisticated things to make a flame thrower in a pumpkin (like using a solenoid to push down the nozzle of a spray can (hair spray or WD-40)) but others use a simple air freshener (short spurt) in front of a candle.

I built my pumpkin out of a steel coal bucket because I didn't want to have to carve a large pumpkin every year. I also mounted it on top of a large monster frame to put the flame way above any children's heads.

Anyway, I used this project for several years now, but realized I never published the source code. I finally got around to that yesterday, you can find it here: [Sparky, the Flame Throwing Pumpkin](https://github.com/johnwargo/flame-throwing-pumpkin-feather){target="_blank"}.

Here's a video of one of my [first tests of the flame throwing mechanism](https://www.youtube.com/shorts/WcZAg1KJ5VQ){target="_blank"}

And here's a full demonstration by our exchange student (at the time) Jannis:

https://youtu.be/NKz0V5vYwB8?si=Gw-L9_2vB_EBNYtp

As I prepared for this Halloween, I decided to kill the whole 8 foot tall pumpkin monster and instead build a 48" tall pedestal for just the pumpkin portion. I also thought about refreshing the code, but I decided to put that off until after Halloween this year. My plan is to migrate the project to an ESP32 device and a web app instead of using the remote control relay device. Stay tuned for details on that one.  Here's some pictures of the project.

{% gallery "sparky-1" %}
{% galleryImage "src/images/2024/flame-throwing-pumpkin-01.jpg", "" %}
{% galleryImage "src/images/2024/flame-throwing-pumpkin-02.jpg", "" %}
{% galleryImage "src/images/2024/flame-throwing-pumpkin-03.jpg", "" %}
{% galleryImage "src/images/2024/flame-throwing-pumpkin-04.jpg", "" %}
{% galleryImage "src/images/2024/flame-throwing-pumpkin-05.jpg", "" %}
{% endgallery %}
