---
title: Eleventy Generate Posts Utility Updates
description: I updated my Eleventy Generate Posts utility after the random-word API it depended on stopped working. I switched to a new API, cleaned up a few things, and added an option to write timestamps to front matter in version 0.0.7.
date: 2026-03-20
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Eleventy
  - Node.js
timestamp: 2026-03-20T23:29:27.627Z
generatedDescription: true
---

I'm building a new site that I plan to launch soon. As part of the development process, I wanted to load the site with a bunch of posts, so I turned to my handy dandy [Eleventy Generate Posts](https://www.npmjs.com/package/eleventy-generate-posts){target="_blank"} to do the job for me. Unfortunately, the API I used in the utility to generate post titles using random words was no longer available. 

I had some work to do. I quickly found a new API to use and was able to fix it with minor changes. I also found a couple of things I wanted to clean up, so I made those changes as well. I use timestamps instead of dates in this site and the one I'm working on, so I also added an option to write the timestamp to generate post's front matter. That became version 0.0.7 of the utility.

After I published the fixe(s), I realized that I really didn't have much (any) error checking in the code to fail gracefully when the APIs don't work (or the `fetch` command used to retrieve content fails in some other way). I put the `fetch` calls in a `try/catch` block and also check for `HTTP OK` (200) before attempting to process any retrieved data. That became version 0.0.8 of the utility. 

If you tried using this utility and it failed for you, now its all fixed so please try it again.
