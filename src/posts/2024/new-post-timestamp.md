---
title: Added Timestamp to My Eleventy New Post Utility
description: 
date: 2024-04-06
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2024-04-06T12:10:59.445Z
---

A user of my [Eleventy New Post](https://github.com/johnwargo/eleventy-new-post){target="_blank"} utility submitted a feature request yesterday suggesting I add the post's timestamp to the generated post instead of just the date. 

If you put a timestamp in a post's `date` front matter property, Eleventy ignores it since it expects that property to just be the post date. To implement this feature, I added a configuration option that causes the utility to add a new property to the post called `timeStamp` with the full date/time for the post creation.

I also updated this site to use the timeStamp when available. Enjoy!
