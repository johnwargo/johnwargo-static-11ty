---
title: RAID 5 Pain
description: 
date: 2011-08-23
headerImage: 
categories: [Miscellaneous]
tags: post
---

At the beginning of the year, I replaced my main PC in my home office. I'd had the last one for more than 4 years and it was really time to get rid of it. When I build a new PC, I always go for the biggest and fastest and this one was really fast 4 years ago, but could no longer keep up.

For the new one, I purchased an Intel i7 quad core, dual graphics cards, 24 GB of memory and a big honking 8 TB drive array configured for RAID 5 (giving me 6 TB of available space). For my boot drive, I implemented a solid state drive, very cool but I wish it was bigger (Isn't that always the case?). I'd previously used AMD processors, but for this one, I knew I'd be doing a lot of work in Virtual Machines so I wanted the hyper threading capabilities of the i7 processor.

It wasn't long after I had this beast up and running that the RAID controller indicated that the third drive in the array was indicating that it was experiencing SMART errors. Soon afterwards the 4th drive failed completely. I quickly ordered a replacement drive from [newegg.com](https://newegg.com){target="_blank"} (I LOVE those guys) and, when it arrived, replaced the failed drive in the array.

I then downloaded the drive diagnostics utility from the Samsung web site (I was using 4, 2 TB Samsung SATA drives for my array) and plugged the drive into one of the test machines in my lab. Quick tests indicated that there was an error with the drive (I already knew that). Surface test indicated that there was a problem with the drive (I still already knew that). After low level formatting the drive, I reran the tests and was informed that the drive was bad (didn't I already know that?).

I opened the manual that came with the drive and saw that I was supposed to call an 800 number to get support. I called the number and after only getting transferred once, spoke with a tech who gave me directions to go to a web site to generate an RMA number. I would have completely avoided the phone call if they would have just given me the support URL in the manual, but apparently that's not the way it works.

I shipped the drive off to Samsung and soon received the replacement drive. I installed the new replacement drive in the drive 3 slot in my RAID array and of course now I'm completing the same steps for the other failed drive. So far, the quick test and surface test have completed and I'm currently low level formatting the drive. Since this drive didn't actually fail, only threw some SMART errors, I'm not sure what's going to happen here. I'd prefer to have the drive replaced and have a good backup drive lying around to use when the next drive goes bad.

I'm disappointed that I had the drive failures, but I am glad I implemented a RAID Array (so I could easily recover from a failure). What bothers me most is that I have to pay shipping three times to get these two drives replaced under warrantee (one for shipping of the purchased replacement drive and two to send drives back to Samsung). Even though these drives are under warranty, I have to incur a cost to use the warranty. Sucks, but it's better than the alternatives.