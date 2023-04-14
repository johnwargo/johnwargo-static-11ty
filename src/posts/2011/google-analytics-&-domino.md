---
title: Google Analytics & Domino
description: 
date: 2011-03-14
headerImage: 
categories: [IBM Lotus Domino]
tags: post
---

If you have a public-facing web site that you maintain, you're probably aware of the capabilities provided by the free Google Analytics  (GA) service. Essentially it's a web-based web metrics application that you can use to understand a whole bunch of stuff about your site's visitors.

I use the service to track visitors to this site and several other sites I maintain, it provides you with a lot of very useful information. I can tell how steady my site's traffic is, where people are visiting from as well as what type of hardware and software visitors are using to access my site. Another interesting feature is traffic sources, I can tell how people are finding my site - which would be very useful information if I were advertising and trying to understand where I should be spending my advertising money.

GA tells me which articles are the most popular, allowing me to see trends in readerhip interest. Of course, if I cared about my readers (and I truly do), I could use information about which articles are being read to help guide me on what to write about next. The big question for Domino developers though is how do I effectively use GA to help me track readership in my Domino-based public web site?

Lotus Domino web application URL's are...ugly. Lotus has built a great system for managing content on the web, but the behind the scenes URL Domino uses to represent a document in a database doesn't translate very well in GA. You can add analytics to a domino application, but when you look in GA to see which articles are being read, what you'll see is those funky Domino URL's; you won't really be able to tell which documents or views are being opened unless you can translate Domino's internal URL into something more useful.

You can easily build your Domino application so all links are more human readable, but when you open a document from a view in a Domino database, the URL reported to GA is the internal one maintained by Domino rather than something human readable. To help Domino developers get around this, I recently published an article in [The View](https://www.eview.com) called [Creating Domino-Friendly Entries in Google Analytics](https://bit.ly/i6tdsU) that descibes in detail how to use special features of GA to allow a developer to control what URL information is delivered to GA. The article contains a sample Domino application that illustrates the implementation. Check it out when you get a chance.