---
title: Eleventy Post Stats Plugin Broken
description: I started blogging in 2025 and noticed a problem with my Eleventy
  Plugin Post Statistics. The plugin doesn't include posts published on January
  1st in the statistics.
date: 2025-01-11
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Eleventy
timestamp: 2025-01-12T01:11:27.480Z
generatedDescription: true
---

When I started blogging here in 2025, I noticed an issue with my [Eleventy Plugin Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} plugin.  If you use the plugin and publish a post on January 1st, the plugin won't include that post in the statistics. Sigh. 

Anyways, I'm working on fixing this and should have an update published tomorrow.

## Postscript

Playing around with it a little more, I realized that the issue with the counts is that the plugin treats posts on January 1st as if they're in the previous year. Interesting. 
