---
title: Yet Another Link Checker Utility
description: Describes a node.js-based utility I created and published to validate web links in a site or page.
date: 2024-11-14
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Web Development
timestamp: 2024-11-14T25:03:56.069Z
---

When I migrated this site from Joomla! to Eleventy, one of the things I didn't spend much time on was validating the links in the site (both internal and external links). I recently decided to spend some time to check all of the links in the site and ended up spending time building a utility that automated the process for me.

## My Requirements

For this solution, what I looked for was a utility (I didn't care of it ran in the web or via a command-line locally) that took the site's root URL and recursively looped through all of the links and generated a report I could use to manually fix the links and, in some cases, manually validate the the link was truly broken.

## W3C Link Checker

I did a quick Internet search on "link checker" and one of the top results (not the top one though) was the World Wide Web Consortium's (W3C) [Link Checker](https://validator.w3.org/checklink){target="_blank"} utility. 

With this site, you enter the site URL and select some configuration options and off it goes to validate all of the links. The app is really slow, but it delivers a lot of useful information about the different links and associated errors or issues with reaching them.

Here's a small example from the results:

{% image "src/images/2024/w3c-link-checker.png", "A screenshot of W3C Link Checker Results", "image-full" %}

It shows a couple of links that failed because the server blocked robots. That's helpful, it lets me know I need to manually validate those links. It also shows some redirect issues that indicate changes I need to make to my site's code to avoid a redirect.

The solution I ended up with for link checking (described below) doesn't provide some of this information, so I expect I'll continue to use this checker for the unique data it provides.

An issue I have with this utility is that I can't save the results to a file. I looked repeatedly for a Export button, but couldn't find one. So I can only work on these errors with the results page open. I could, I guess, submit a PR that implemented download, perhaps I'll do that.



The link checker generates failures for a variety of reasons, some are not valid. 
This is why I wanted to be able to manually validate links - gave me a chance to do a manual second check on external links.