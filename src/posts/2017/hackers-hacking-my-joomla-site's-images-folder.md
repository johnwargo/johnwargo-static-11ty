---
title: Hackers Hacking My Joomla Site's Images Folder
description: For many months I'd been dealing with hackers beating up this site (when it ran on Joomla); this article describes how it locked it down and stopped the hacking.
date: 2017-04-07
headerImage: 
categories: [Content Management Systems]
tags: post
---

For a while now, hackers have been hacking the images folder of one of my Joomla sites (I run sites using both Joomla, WordPress and even a Concrete5 site). I'm not quite sure how they're doing it; I've looked online for others having this problem, but really never found anything. I posted questions on the Joomla forums, but couldn't get an answer.

The files show up in the site's images folder, usually just in that folder, but sometimes subfolders as well. The files are usually .jpg files, showing some sort of hacker badge or message; occasionally they're just random images. Sometimes I'll get .txt files, and a few weeks ago, for a couple of days I got .pdf files that, for some bizarre reason, Google quickly picked up in their search results.

Needless to say, this was pretty annoying. I don't think anything else on my site was compromised (I checked) and both my ISP's malware detection and SiteGuard didn't find anything at risk on my site. The admin tool I use didn't block the attacks though, so every day, more and more files popped-up in that folder or subfolders, sometimes 30 per day. Sigh.

I thought perhaps there was something wrong with my hosting account. I ran multiple sites from the same account, so I decided to create a new, separate hosting account for just this one site. At the time, I wasn't using SiteLock, so I added that to this new account thinking that if hackers were doing something weird, SiteLock would catch it. No such luck, no change.

I attended [OSCON](https://conferences.oreilly.com/oscon/oscon-tx){target="_blank"} a couple of years back (I wish I could attend this year, I really loved that conference) and attended a session about protecting your site from hackers. The presenter (I won't name names right now; you'll understand why in a little bit) did a really good job highlighting different ways hackers got into your site (although mostly targeting WordPress sites) and showed some tools you could use to identify and fix hacks. Cool stuff. I applied some of the strategies and tools to my site to no avail – the hackers kept hacking away.

I reached out to the presenter to that session and asked for help. She gave me some suggestions to try and I eventually hired her company to completely rebuild my site from scratch. Her team backed up the site, restored it to a new folder and checked everything for malware, cleaned it up and switched my URL to the new instance. No change, anywhere from 5 to 30 images hacked into my site's images folder almost every day.

I spoke with several technical people at my ISP and got no help. One guy suggested that I that I disable file upload for the site. I'm sure that would have helped, but that would have made it hard for me to add images to my articles, so I put that one aside until I became completely desperate.

The kind and helpful people at SiteLock assessed the situation and suggested that I could fix my problem by buying a higher level of protection. Yeah, that would have been useful, but, I'm sorry, I'm not going to plunk down $600 per year to protect my personal blog. That's simply too much.

I'd been using an old JoomlaShack template for my site for many years. When Google announced that they would be giving mobile-friendly sites preference in search results, I started assessing my existing site's mobile-friendliness and found it lacking. So, I decided to switch templates and make this site mobile-friendly. This was a fun and exciting project. Once I got started, it didn't take me very long to complete the project.

As I tested the different parts of my now mobile-friendly site, I was surprised to see that at the bottom of every article list, the site displayed a button labeled “New”. I quickly tested the button and found that I could add new articles to the site – even when not logged into the site! Holy crikey, I think I found the source of my problem!

I tested a few things, and eventually reset my site's permissions in order to block that particular button. Of course, I broke the site doing this, but at least I killed that button. As I sorted out trying to fix the broken site, I noticed that I was no longer getting image files uploaded to my site by hackers. Woohoo! That particular problem was fixed. I watched the site for a few weeks, no extraneous images. Hackers are finally blocked.

I think what happened is that this particular site started as a Joomla 1.5 site many years ago. Over the years, I upgraded it all the way up to Joomla 3.6 and I think that during the many upgrade processes, the site's permissions somehow got corrupted. I'm sure there was a major ACL overhaul during that period and I imagine that was the source of my issue.

OK, so the hackers are blocked, but only because I've hosed up the site's permission settings and even I can't get in. The Joomla.org forums were useless, I got ridiculous responses like “don't mess with permissions when you don't understand them” and “that New button was there because you probably forgot you were logged in” so I had to fix this myself. I quickly determined that the site's assets table held the permission settings, so I copied records from a working instance to this broken one and I was able to get back in.

I knew my Joomla permissions were 'broken' so I purchased a license to the [ACL Manager for Joomla!](https://www.aclmanager.net){target="_blank"}, installed the plugin and let it clean up my permissions and assets table. That was it, everything fixed. It's been several weeks now and I haven't been hacked once.  I can't tell you how many months (or perhaps is it years, who knows?) that I dealt with this issue (it's embarrassing). I'm just excited to have it fixed. I'm hoping that this simple article helps others with the same problem since I couldn't find anything about this particular problem online anywhere.
