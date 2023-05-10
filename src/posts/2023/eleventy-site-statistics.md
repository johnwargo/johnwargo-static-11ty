---
tags: post
title: Eleventy Site Statistics
description: 
date: 2023-05-10
headerImage: 
categories:
  - Eleventy
---

As I worked to migrate this site to Eleventy, one of the final touches I wanted to add was a statistics page that showed 'stuff' about the site. The page started simple at first, but then I started thinking about what I could do with 14 years of data. 

I knew I could add a collection to my site and use that to build a data set showing the number of posts per year as well as the average number of days between posts. At that point, I realized I could make an Eleventy plugin out of it so others could use it as well and this would give me an opportunity to learn how to make Eleventy plugins. 

I published the plugin yesterday as [Eleventy-Plugin-Post-Stats](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} and added the complete [Stats page](/statistics) to the site. 

I'm in the process of tightening up the table, but here's what the page looks like today:

{% image "src/images/2023/site-stats.png", "Site Statistics Page", "image-full" %}
