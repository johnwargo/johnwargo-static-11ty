---
title: What Happened to Commas in Numbers
description: 
date: 2018-12-11
headerImage: 
categories: [Stupid Developer Tricks]
tags: post
---

That’s pretty much it, what ever happened to them? Nobody seems to use them anymore in software products. I’ve noticed this at work where people make dashboards showing big numbers, but don’t show thousands separators when displaying them on a page or in a screen.

Take, for example, the [Stupid Developers Tricks](https://johnwargo.com/posts/stupid-developer-tricks/) section of this site (shown in the following figure). Several of the articles in this category have more than a thousand hits, but whomever wrote the Hits counter plugin didn’t consider rendering the separators that make reading the numbers easier.

![Stupid Developer Tricks listing](/images/stories/2018/stupid-developer-tricks-listing.png)

Why is this happening? Are developers just lazy? Are there just not functions or libraries available that return a string representing the number with the right separators based on locale?  It makes no sense to me.