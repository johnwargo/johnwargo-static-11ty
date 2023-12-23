---
title: December Updates to Eleventy Plugin Stats
description: I made some enhancements to my Eleventy Post Statistics plugin this month and this post describes the changes.
date: 2023-12-23
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

I made some enhancements this month to my [Eleventy Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} plugin. 

First of all, I added a `avgPostsPerYear` property to the collection to capture that metric; you can see the property in the [sample page](https://eleventy-plugin-post-stats.netlify.app/){target="_blank"}.

{% image "src/images/2023/eleventy-plugin-post-stats-average-posts-per-year.png", "Shows the Average Posts per year metric on the sample page", "image-full" %}. 

I also added the [cli-logger](https://www.npmjs.com/package/cli-logger){target="_blank"} to the plugin. This helps me more easily manage the output to the console. 
