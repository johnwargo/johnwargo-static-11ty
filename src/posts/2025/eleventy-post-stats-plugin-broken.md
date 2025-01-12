---
title: Eleventy Post Stats Plugin Broken
description: 
date: 2025-01-11
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2025-01-12T01:11:27.480Z
---

When I started blogging here in 2025, I noticed an issue with my [Eleventy Plugin Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} plugin.  If you use the plugin and publish a post on January 1st, the plugin won't include that post in the statistics. Sigh. 

Anyways, I'm working on fixing this and should have an update published tomorrow.

## Postscript

Playing around with it a little more, I realized that the issue with the counts is that the plugin treats posts on January 1st as if they're in the previous year. Interesting. 
