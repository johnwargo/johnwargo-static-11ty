---
title: Refactored Goodreads Page Adjuster App
description: I recently revamped my web app that helps accurately calculate
  reading progress in Goodreads. The app now looks much better thanks to
  MVP.css, and I upgraded it to React 19 while removing Bootstrap. The new
  design is cleaner and more visually appealing, making it easier to use.
date: 2025-01-14
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Web Development
timestamp: 2025-01-14T22:32:37.940Z
generatedDescription: true
---

About two years ago, I published an article describing a web app I created that helps you [Accurately Calculate Reading Progress in Goodreads](/posts/2022/accurately-calculating-progress-in-goodreads/). The app's simple and helps you calculate an accurate completion percentage taking into account those pages at the end of the book that you never read (notes, appendices, first chapters of the next book in the series, etc.).

I opened the app the other day because Goodreads says the current book I'm reading, [The Soul of America: The Battle for Our Better Angels](https://amazon.com/Soul-America-Battle-Better-Angels/dp/0399589813){target="_blank"}, has 416 pages in it when there are only 272 of actual reading content.The disparity between reality and Goodreads is so great that I wanted a more accurate view of how far I made it through the book.

As I looked at the app, I realized it just didn't look very nice. When I wrote it, I just learned [React](https://react.dev/){target="_blank"} and I wanted to learn how to use [Bootstrap](https://getbootstrap.com/){target="_blank"} with it. The app works, but it just looked lame. 

A while back, I discovered [MVP.css](https://andybrewer.github.io/mvp/){target="_blank"}; it's a simple stylesheet that quickly makes any single page app look great (and supports multiple page apps too). I decided to give the app a facelift using MVP.css.

The app was old, so I had to upgrade it to React 19. Next, I stripped out all the Bootstrap stuff and converted it to MVP.css. Here's a screenshot of the results:

<img src="src/images/2025/goodreads-page-adjuster.png" alt="An image showing the new and improved Goodreads Page Adjuster app" />

It looks much better and the code is a lot easier to read.
