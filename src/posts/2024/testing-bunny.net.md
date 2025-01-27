---
title: Testing a Bunny.Net CDN
description: As I worked through the process of publishing a Windows app to the Windows Store, I found that I needed a CDN and this post describes how I addressed that requirement.
date: 2024-04-14
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Miscellaneous
  - Web Development
timestamp: 2024-04-15T01:25:39.602Z
---

I built a Windows app that I'm trying to publish in the Windows App Store. As I worked through the publishing process, I made a huge mistake and didn't look for documentation that walked me through the whole process. Rather than getting all of my ducks in a row, I worked through the process bumping up against issue after issue. I feel like I'm getting nowhere. 

After getting my Microsoft store account setup and validated, I set about configuring my app profile only to discover that I needed a CDN. I've never had a CDN before; I've used them, but never setup my own. 

I started looking at the pricing page to determine what this would cost me, but I couldn't accurately assess my costs. Not knowing my costs is a problem, but since I had some Azure credits lying around, I started poking around in the Azure Portal to see if I could create one anyway. After following the instructions to create a CDN, I learned that neither my credits nor my pay as you go accounts were enabled for CDN creation. **Strike 1**.

Next I Googled setting up a CDN and found that one of the top recommendations was [Fastly](https://fastly.com/){target="_blank"}. I started poking around on their site only to find that for every pricing package the only option was to **Request Pricing**. If they're not going to let me know what their service costs, I'm out. **Strike 2**.

Google's next best option was a recommendation for [Bunny.net](https://bunny.net/){target="_blank"} and they actually publish pricing on their public web site. A quick look told me I'd pay a minimum of $1 per month and their other charges were very reasonable based on what I expected my needs to be. 

I have this first app to publish and another one following quickly, so I'm going to give it try to see how this works out. This will cost me a minimum of $12US and likely more - I'll either run this for a year and see what my overall costs are or kill the experiment when I reach something like $50US hosting costs for the year.

I'll let you know how it goes.
