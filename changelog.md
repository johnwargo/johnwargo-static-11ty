# Changelog

## 20240408

+ Updated the feed files to use the timestamp property if its available.
+ Added **Key Takeaway** and **What it Means** shortcodes to the `eleventy.config.js file and VSCode shortcuts.

## 20240406

+ Modified site pages (Home, Articles, and Post) to display the `timestamp` property recently added to Eleventy-New-Post.

## 20240107

+ Updated the stats plugin so it ignores the current year (the last yeally, making some assumptions) in the avgPostsPerYear calculation. Updated the graph on the stats page so it omits the last year stat (Site Average Posts/Year) on the graph. 

## 20240106

+ Migrated from Netlify Functions to Google Functions to avoid publishing my Google Analytics API key with the site.
