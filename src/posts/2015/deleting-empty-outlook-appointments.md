---
title: Deleting Empty Outlook Appointments
description: 
date: 2015-09-26
headerImage: 
categories: [Miscellaneous]
tags: post
---

Until recently, I've always kept my main set of contacts on my personal mobile device and used Exchange ActiveSync to synchronize it with my mobile device. When I joined Forrester, I decided to keep my work stuff separate from my personal stuff. So, rather than have all of my personal contacts available to me while at work, I let my work account sync my work PIM data to my device through its normal means and used a separate process to sync my person PIM data to my device as well.

Since I carry an Android device, I looked around and found an open source solution called Go Contact Sync Mod ([https://googlesyncmod.sourceforge.net/](https://googlesyncmod.sourceforge.net/)) that works pretty well. I could have the sync run automatically, but for now I'm running it manually. One of the things I noticed when I run it is that it was showing an error indicating that it had found empty calendar entries in Outlook. I didn't know I had empty calendar entries nor did I know you could create empty calendar entries, but apparently my pst file had a bunch of them.

I looked around for a while and didn't find a solution for deleting those empty entries, and I couldn't 'see' them in Outlook, so I decided to write some code to solve the problem. I'd been helping a friend with some Outlook automation, so I had the basis of what I needed to make this work. I'm a big Delphi developer, although I'm pretty upset with Embarcadero right now, so it gave me a chance to dust off my Delphi skills and write some code.

I'm not going to go through everything here, but I've posted the code to GitHub at [https://github.com/johnwargo/Kill-Empty-Outlook-Calendar-Entries](https://github.com/johnwargo/Kill-Empty-Outlook-Calendar-Entries). Basically you can open the project in Delphi then build and run it, or you can use the pre-built executables I've included in the repository. Enjoy!