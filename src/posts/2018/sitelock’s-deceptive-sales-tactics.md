---
title: SiteLock’s Deceptive Sales Tactics
description: 
date: 2018-06-19
headerImage: 
categories: [Miscellaneous]
tags: post
---

I’m a [SiteLock](https://www.sitelock.com/) customer; my hosting provider offers the service at a discount, so I signed up for it on several of the sites I manage. My ISP uses SiteLock to scan customer accounts for malware, and, of course, SiteLock tries to upsell me on more rigorous scanning.

A few weeks ago, I received an unsolicited email from Justin McCulloch, a SiteLock Security Consultant, informing me that they’d detected a problem with the site. Here’s what he said in the email:

“My name is Justin and we are partnered with Fatcow, we do all of the web security for your website. We were notified that you have some serious issues that are present which can harm your website. We want to go ahead and get these issues addressed as soon as possible. Please reach me at my contact information below.”

Here's the email:

 ![](images/stories/2018/site-lock-justin-mcculloch.png)

If they’re partnered with FatCow, how is it that he doesn’t know that FatCow spells its name with a capital C?

Holy crikey - “serious issues”? That sounded ominous, I’d better look into this.

Recognizing that the email message didn’t contain any information I could use to understand which of my accounts was affected by these “serious issues”, and what those “serious issues” were, I quickly sent off a reply email asking for more details. Rather than respond to my email, he called my home office number 4 out of 5 business days every week for two weeks. In one of his messages, he finally indicated which account(s) had the "serious issues".

I know that my ISP periodically scans for malware, and creates a text file in a folder on my account’s server listing all of the issues it discovered during the scan. I quickly fired up my trusty FTP client, navigated to my server, and looked for the file in the file system. Nope, nothing there.

Both sites he mentioned are WordPress sites, and I know that I have malware tools running on both of them, I logged into the WordPress admin for each site and checked scan results for both. Nothing there either.

I finally made it home for a couple of days and called Justin McCulloch at SiteLock. He wasn’t in, so I left a voicemail message for him and he quickly called back. When I asked him about the “serious issues” on my accounts, he began explaining to me how SiteLock worked. I interrupted him and told him that as a professional software developer and a SiteLock customer, I knew how they work and what they do.

He then started explaining to me that the scanner that FatCow offers only scans a certain number of pages of a site, and since my site was ‘larger’ than the number of pages they were scanning, many of my pages were not being scanned.

This is the “serious issues” he’s been pestering me about?

I’ve already told you that the sites in question, the ones with “serious issues” are WordPress sites. I know their scanner scans the WordPress files looking for malware, so it doesn’t matter how many ‘pages’ my site has, if they’ve scanned the code, they’ve scanned most everything. Everything else is just data in a database.

One of the sites with “serious issues” is a simple blog accessed by just a few people. I’m the only one who has admin access to the site, and I haven’t updated the site in a really long time, I knew that it didn’t matter how many pages I had, the full site had been scanned by SiteLock.

The other site with “serious issues” is a site I just created for a local fundraiser. I’d done nothing except install WordPress, so the site has no pages, no posts, no plugins, nothing. No risk there either.

So, all this stress and concern over the “serious issues” with the site was nothing more than an opportunity for Justin McCulloch at SiteLock to try to sell me additional services.

I explained to Justin McCulloch from SiteLock that I was a technical guy who understood the risk, and that I didn’t need additional services from SiteLock. He continued to press, even trying to tell me that if I didn’t address these “serious issues” now, it would be much more expensive to fix them later. There were no “serious issues” my sites don’t have any malware. As I tried to explain this to him (probably rather impolitely) he reacted by hanging up on me.

I quickly looked up the main phone number for SiteLock and gave them a call. I was able to connect with a customer service manager and tell my story. Obviously this isn’t SiteLock’s normal operating procedure, I assume there are many SiteLock employees who wouldn’t consider lying to customers in order to get more business from them, I just happened to get one who didn’t mind lying about “serious issues” with my site in order to scare me into buying more services.

I’m considering cancelling my SiteLock services. This experience didn’t help, but I also had a very long period where my primary site (this one) was regularly hacked and SiteLock wasn’t able to do anything about it. SiteLock has a product I could buy that probably would have blocked many of the hacks I experienced, but as a lone developer writing about his projects, I can’t afford the $600 or o per year I’d have to pay for their more robust scanner and firewall. I was able to finally lock down my site to block the hacks, so I’m OK.