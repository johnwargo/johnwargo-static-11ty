# Changelog

## 20250103 v0.1.62

+ Added Photo Gallery to the site using [PhotoSwipe](https://photoswipe.com/).
+ Added a link to the packages page to the home page.

## 20250102 v0.1.61

+ Added NPM Packages page to the Sightings page.

## 20241231

+ Modified Popular Posts to display the top 20 posts instead of the top 10.
+ Added generator meta tag to every page.

## 20240412

+ Fixed home page, articles page, categories pages to use timestamp.
+ Added a `articlesByTimestamp` collection that sorts posts by timestamp if the post has it. Needed this to sort two articles on the same day correctly.
+ Fixed **Most Popular** posts page, apparently I broke it when I moved the Analytics stuff to Google Cloud.

## 20240408

+ Updated the feed files to use the timestamp property if its available.
+ Added **Key Takeaway** and **What it Means** shortcodes to the `eleventy.config.js file and VSCode shortcuts.

## 20240406

+ Modified site pages (Home, Articles, and Post) to display the `timestamp` property recently added to Eleventy-New-Post.

## 20240107

+ Updated the stats plugin so it ignores the current year (the last yeally, making some assumptions) in the avgPostsPerYear calculation. Updated the graph on the stats page so it omits the last year stat (Site Average Posts/Year) on the graph. 

## 20240106

+ Migrated from Netlify Functions to Google Functions to avoid publishing my Google Analytics API key with the site.
