---
title: Acura MDX Play Music on USB Flash Drives
description: 
date: 2025-06-05
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Automobiles
timestamp: 2025-06-05T22:48:46.129Z
---

In [Audi Q7 Drive System Failure](/posts/2024/audi-q7-drive-system-failure) I described a problem I had with an Audi Q7 I owned. As soon as I got it back from the dealer (after waiting almost 6 months for them to fix it), I immediately traded it in for a 2025 Acura MDX. The replacement engine they installed in the car had 10,000 more miles than the one that broke, so I knew it was a ticking time bomb.

One of the features the Audi had I'm happy to say is also a feature of the Acura MDX: the ability to play music files from SD cards (Audi) or USB Flash drives (Acura). When I'm on a longer trip, I like to put on one of my favorite bands and listen to a bunch of albums while I drive. This feature allows me to quickly locate the artist I want to play without having to dig out my phone and navigate around the YouTube Music app. It's a pain in the ass to do that in YouTube Music, I either have to pick a playlist (which I never want to do) or add multiple albums to a queue. The memory card approach is best for this.

Anyway, the Acura MDX Manual says you can play music from USB drives, but provides no information on how to do it:

> The USB port (3.0A) is for charging devices, playing audio files, and connecting compatible phones with Apple CarPlay or Android Auto.

That's it, I can play audio files from a flash drive, nothing more. 

Knowing what I know about cars and memory sticks/drives, I know that there are four things that affect whether you can play music from an external drive:

| Issue                   | Details                       | 
| ----------------------- | ----------------------------- | 
| Drive Format            | The computer system in the car playing the music files (the media player) may not be as up to date on drive configurations. It may support only a subset of the available options. |
| Maximum number of files | The media player may only have enough memory to manage the file system for a specific number of files. My old Audi supported a maximum of 10,000 audio files on a SD Card (it may have been 20,000, I don't remember).  |
| Drive Capacity          | On top of the maximum number of files supported on the drive, the media player may support a limited capacity. |
| File Format             | Media players are limited by which drive formats they can read. |
 
So I set about figuring out how to do this and I was able to get it to work. I'm sharing the details here to help other Acura MDX owners in the same situation.  I didn't get all the answers I needed, but here's what I have.

| Issue                   | Details                       | 
| ----------------------- | ----------------------------- | 
| Drive Format            | Reading different articles on the Internet, I found that the Acura MDX supports the FAT and FAT32 file formats. I tested drives formatted with each and they worked for me. <br />**Note:** I saw some articles that mentioned support for exFAT, but that didn't work for me. |
| Drive Capacity          | I tested 16GB, 32GB, 64GB, 128GB, and 256GB drives. Everything except for the 256GB drive worked in my MDX. |
| File Format             | I read somewhere that Acura vehicles "generally support MP3, WMA, and AAC files". I only tested MP3 files and they worked great for me. |
| Maximum number of files | I wasn't able to find any reference for this. I put more than 6,000 music files on a drive and the media player read them just fine. I assume the real limit is 10,000 files but I've not tested it yet. |

That's it, that's all I know. I hope this helps you.

Perhaps Acura will someday publish the actual details for this so their customers don't have to figure it out themselves. How hard would it be to add a table to the manual that covers these 4 requirements/limitations?
