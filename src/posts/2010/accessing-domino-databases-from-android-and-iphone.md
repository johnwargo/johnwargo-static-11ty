---
title: Accessing Domino Databases from Android and iPhone
description: 
date: 2010-04-23
headerImage: 
categories: [Mobile Development]
tags: post
---

Last year I wrote a series of articles about how to build a BlackBerry application that talked to a Domino database. I intended it to be a series of three articles but it quickly grew to 4 and those articles have been heavily read and frequently commented on. I’m probably going to write a fifth article in that series that talks about some of the issues related to web services and JME and hopefully another article that shows how to talk to the same Domino web service from a BlackBerry Widget. I hope to get a chance to work on those articles in a while, but in the mean time I have some other things to write about.

At Lotusphere this year, I presented a session that basically covered everything that’s in that original article series plus demonstrated writing a Windows Mobile application that talked to the same service (let me know if you’d like me to write an article about it – I’d thought of doing it, but wasn’t sure if people cared). For this year’s conference I wanted to spice things up a little bit and add Android and possibly iPhone examples of the same application to my session.

The thing about Android and iPhone is that unlike BlackBerry and Windows Mobile, the platforms do not have native support for consuming Web Services. So, in order to be able to work with Domino from Android or iPhone you have to find another way to do it. What I did for those sample applications was rewrite the code for the service into a Domino agent that returned JavaScript Object Notation (JSON – www.json.org) when called through a web URL. It didn’t take me that long to do and it works very well, so I have what I need to work with the other mobile platforms. So, in the next few weeks, I’m going to publish an article that describes the JSON-based web service.

I wasn’t able to get the Android example done in time for Lotusphere (not without trying, I killed a lot of nights in Orlando during the conference furiously trying to get the app done – god thing I was recovering from pneumonia and didn’t want to party anyway). A while after Lotusphere I finally got the application done, so I’m going to cover that application at the View conference in a few weeks. After the conference (perhaps before if I get time) I’m going to publish an article that illustrates how to build an Android application that talks to the JSON-based web service. Just so you believe that it works, here’s a screen shot of the application.

![](/images/stories/android-app.png "Android Contact Lookup Application")

I’m most of the way through building the same application for the iPhone. It’s been a nightmare building the application – Objective-C is so weird and complicated that I’m really struggling to finish the last part of the application. I’m planning to finish the application in time for the conference, I think I can do it, but like I said, I’m struggling. I’m probably not going to publish anything here about the iPhone application – I’m going to see if I can get an article about the application published in the View. Stay tuned on that one. Just to whet your appetite here’s a screen shot of the application.

![](/images/stories/screen shot 2010-04-19 at 8.06.06 am.png "iPhone Contact Lookup Application")