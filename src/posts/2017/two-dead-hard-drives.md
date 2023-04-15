---
title: Two Dead Hard Drives
description: 
date: 2017-12-04
headerImage: 
categories: [Miscellaneous]
tags: post
---

My desktop PC (yes, I use a Windows Desktop for most of my personal work) had a hard drive crash a few weeks ago. This particular PC is three years old, so I expected to see some failures. It wasn't too bad as my system has a 512 GB SSD as its boot drive, but an 8 TB RAID array for all my apps, data, games, etc. I ordered a replacement drive and was quickly back in business.

Weirdness ensued when I tested the 'bad' drive using the manufacturer's diagnostics and it passed with flying colors. I assumed that the original failure was just a fluke, so I ran the tests a few more times and set the drive aside to use when another drive failed.

A week or so later, another drive in the RAID array failed. Knowing I had a 'good' spare lying around, I swapped the drives and got to work. Unfortunately, the array came back up, but then quickly failed again. Since I knew the drive tested good, I started looking for other sources for my problem.

I swapped all my drive cables, split the array across two power supply rails, but the problem persisted. At this point, I ordered a new motherboard and installed it only to find that the problem persisted. Thinking through this, I started swapping the drives around and noticed that the problem moved with the drive. I then swapped the old, bad drive back in and the problem persisted. Crikey, two bad drives.

I should have swapped the drives around before I ordered the motherboard; if I'd done that, I would have noticed that the failure followed the drive, eliminating the possibility that it was a motherboard problem. My second failure was assuming that the original failed drive was still good It turns out that the drive works when first connected, but then fails a while later.  The evidence showed that, but I ignored it when the drive passed diagnostics.

I finally ordered another replacement drive, plugged it in, and I'm all set; everything is working as planned.

I also used this as an opportunity to format my system and do a clean installation of Windows. This is the only system I've EVER upgraded (from Windows 8 to Windows 10, what happened to Windows 9, I can't tell you), and I was having some problems. The biggest of which was that my Windows Store instance was corrupt, and I couldn't install or upgrade any Windows Store apps on the system.  I encountered some problems with the re-install, I'll share those experiences in my next post.