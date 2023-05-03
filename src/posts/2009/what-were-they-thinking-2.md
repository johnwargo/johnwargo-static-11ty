---
title: What Were They Thinking 2
description: 
date: 2009-12-10
headerImage: 
categories: 
  - Mobile Development
  - What Were They Thinking
tags: post
---

At first I thought I might have difficulty finding enough examples to make this an interesting series but that's turning out to not be the case. Just on a whim, I navigated over to linkedin.com to see how their site looked on the BlackBerry Browser. I expected that they'd detect that I'm running a BlackBerry and give me a mobile version of their site, but I was wrong - take a look at the following screen shot:

{% image "src/images/2009/screenshot-dec0909-024858p.jpg", "LinkedIn web site on the BlackBerry Browser", "image-full" %}

The LinkedIn developers broke the first rule of Mobile Web Development: Always (and yes, I do mean always) Detect the Browser!

What were they thinking? I cover this in the book, but it's important to highlight something here.  Because of the iPhone and other smartphones, developers are building their sites disregarding the information available to them about the target device. The iPhone and the Storm for example have pretty large screens, so 'normal' sites render on them OK, so developers have gotten lazy and just assume everyone's a desktop browser and tosses out the page. Unfortunately, even though the modern smartphone can render pages designed for the desktop (because of their supports for desktop browser standards and the larger screen than earlier smartphones) it doesn't always make sense to do that. Big web pages on small screens just don't look right (see the figure) and it's disrespectful of mobile users to send a whole bunch of gunk to the browser (graphics and a bunch of menu items).

Mobile web sites must be designed with the mobile user in mind and crafted so the user can get as quickly as possible to the data that matters to them. In this case, LinkedIn doesn't seem to be sensing that I'm accessing their site from a BlackBerry and gave me their standard page. Developers must always detect the user-agent and send a text-only, designed for small screen page to mobile devices.

On the BlackBerry and other mobile platforms, the user has the choice of changing the browser's personality to IE or Firefox.Let the user make this configuration change then get the whole page when they have the browser impersonating a desktop browser. Then, when people like me who let the BlackBerry announce itself as a BlackBerry, send a mobile-friendly version to all mobile devices.