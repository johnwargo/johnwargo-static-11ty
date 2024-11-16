---
title: Validating Links On This Site
description: 
date: 2024-11-16
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Web Development
timestamp: 2024-11-16T15:47:48.956Z
---

When I migrated this site from Joomla! to Eleventy, one of the things I didn't spend much time on was validating the links in the site (both internal and external links). I recently decided to spend some time to check all of the links in the site and ended up spending time building a utility that automated the process for me.

## My Requirements

For this solution, what I looked for was a utility (I didn't care of it ran in the web or via a command-line locally) that took the site's root URL and recursively looped through all of the links and generated a report I could use to manually fix the links and, in some cases, manually validate the the link was truly broken.

## W3C Link Checker

I did a quick Internet search on "link checker" and one of the top results (not the top one though) was the World Wide Web Consortium's (W3C) [Link Checker](https://validator.w3.org/checklink){target="_blank"} utility. 

With this site, you enter the site URL and select some configuration options and off it goes to validate all of the links. The app is really slow, but it delivers a lot of useful information about the different links and associated errors or issues with reaching them.

Here's a small example from the results:

{% image "src/images/2024/w3c-link-checker.png", "A screenshot of W3C Link Checker Results", "image-full" %}

It shows a couple of links that failed because the server blocked robots. That's helpful, it lets me know I need to manually validate those links. It also shows some redirect issues that indicate changes I had to make to my site's code to avoid the delay caused by a redirect.

The solution I ended up with for link checking (described below) doesn't provide some of this information, so I expect I'll continue to use this checker for the unique data it provides.

An issue I have with the W3C link checker is that I can't save the results to a file. I looked repeatedly for a Export button, but couldn't find one. So I can only work on these errors with the results page open. I could, I guess, submit a PR that implemented download, perhaps I'll do that.

## @johnwargo/link-checker

As I wrote in [Yet Another Link Checker Utility](/posts/2024/link-checker-utility/), I recently published a node.js-based command-line utility that uses the [linkinator](https://www.npmjs.com/package/linkinator){target="_blank"} package to validate a site's links. This utility does a rudimentary job at scanning links. I can use it to quickly find broken links in the site; for example: those caused by typos and errant spaces.

The link checker also generates failures for a variety of reasons, some of which are not valid. As I mentioned in the previous post, sites that perform a human check before letting you in report as broken links. I could probably set some HTTP headers to let those checks pass, perhaps I'll do that in the future.

Linkinator delivers a lot more information than I display in the report, so it has the ability to tell me a lot more about why a particular link failed. I just didn't spend a lot of time pulling that data from the results. In a while I'll likely update it to provide more useful information in the report. Stay tuned on that one.

## Conclusion

I found that I received tremendous benefit from both utilities. 

The W3C Link Checker is slow but delivers more information and more accurate information. I use this to find link formatting issues that my @johnwargo/link-checker doesn't. 

My @johnwargo/link-checker utility is fast and allows me to quickly find typos in links throughout the site, especially internal links I entered by hand. 

The overall result is this site now has much higher quality links - which is why I started this process.
