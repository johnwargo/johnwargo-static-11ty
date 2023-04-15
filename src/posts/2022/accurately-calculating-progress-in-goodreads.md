---
title: Accurately Calculating Progress in Goodreads
description: 
date: 2022-01-09
headerImage: 
categories: [Miscellaneous]
tags: post
---

I love writing utility applications; for many, many years I worked in the Enterprise space doing technology transitions and one of my favorite things was to write little pieces of code to solve problems big and small. For this blog post, the problem I'm dealing with is for a free app from Amazon called [Goodreads](https://www.goodreads.com/).

For years, Amazon had two social apps that allowed people to track the books they read: Shelfari and Goodreads. They eventually shut down Shelfari and merged everyone's data into Goodreads. That saddened me because Shelfari was a much better app than Goodreads and delivered a more consistent experience across platforms. Goodreads delivers a different user experience (UX) on different platforms (browser, native mobile apps) and I really kinda hate it. I've gotten used to the android app user experience, but when I sometimes have to use a browser instead, I'm completely lost in completing some tasks.

I use Goodreads because it lets me track how many books I read in a year (last year I read 68 books out of my goal of reading 50). It also allows me to see the books family and friends are reading, so it gives me great suggestions on what to pick up next. When I'm reading a book, Goodreads allows me to publish an update showing friends what I'm reading and how far into the book I am. The problem is that for many books, the information Goodreads uses to calculate percentage completion based on page number is inaccurate, making the progress value inaccurate as well.