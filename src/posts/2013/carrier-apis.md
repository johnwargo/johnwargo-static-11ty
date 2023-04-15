---
title: Carrier APIs
description: 
date: 2013-02-07
headerImage: 
categories: [Mobile]
tags: post
---

I have to admit that I simply don't get Carrier-specific APIs. I used to work for RIM (now called BlackBerry), working with their largest carrier and later on worked at that same carrier. I know how desperately the wireless carriers don't want to simply be a pipe (provide me with network access) – but instead want have all sorts of value-add products they can sell you. At the end of the day, all I want them to be is a pipe and I'd gladly pay them more money per month if they'd simply give me a wireless network connection for my devices and let me use them any way that I want to.

I know it costs a lot of money to create and maintain the wireless networks, and I know that some users use more bandwidth than others (iOS users vs. BlackBerry users for example), so just go ahead and charge me based upon how I use your network.

Anyway, I was at the AT&T Dev Summit last month and saw some interesting things there. AT&T has been working with Sencha and others to create a suite of APIs that mobile app developers can use in their applications. There's some pretty interesting location based services (LBS) APIs available, plus services around SMS, billing and so on that could be pretty useful for mobile developers.

The problem is that these APIs are available from a specific carrier (the LBS APIs are a global product, available for most carrier's devices, but in this case AT&T has their own 'branded' version of the service). If I'm building a mobile application, I don't benefit from leveraging APIs that are usable for only a subset of my available customers. If I'm going to build functionality in my application, I have to be able to use it over all customer devices – having to implement a different system depending on which carrier a customer is on is inefficient and too expensive to implement for many smaller development shops.

In the Dev Summit keynote, one of AT&T's partners demonstrated an application which allowed an application to type in their phone number then the application retrieved the mobile user's account information from the carrier.  If you know all of your customers are on AT&T, then the API is useful, but I expect that the number of cases where that is true is…zero. That makes that particular API pretty much useless. On top of that, the demo included the user typing in their phone number, why? They were showing a native application running on the iPhone; native applications know (with the appropriate permissions of course) what the device's phone number is. How are you helping me if I need to type in my phone number before you retrieve my account information from the carrier?

Use the local API to determine the device's phone number then populate the rest of the form with the data from the carrier. I imagine they did it that way to demonstrate that all that was needed was the phone number in order to populate the entire form, but it was a silly demo.

What's needed is a common, cross-device, cross-carrier on device app and API that allows a user to define common information about themselves (name, address, phone number, credit cards) then make it available to any application that asks for it (with the appropriate approval of the user of course). Then, when I get the device, I enter in all of that information once then any app I authorize can access that information. If I don't authorize it, there is no reason the local API couldn't simply prompt the user for authorization when needed. That would be a much easier system for mobile developers to implement and much less work for the mobile user. Everyone wins and there's no need for cloud-based, carrier-specific APIs.