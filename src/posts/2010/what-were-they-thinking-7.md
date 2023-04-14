---
title: What Were They Thinking 7
description: 
date: 2010-04-16
headerImage: 
categories: [Mobile Development]
tags: post
---

Apparently March 18th was a big day for updates to applications in the BlackBerry App World. As the screen shot below shows, my device inbox was all of a sudden filled with notices of applications that needed to be upgraded.

![](/images/2010/app-world-updates-1.jpg)

Nice, I like that the system notifies me and I can tell quickly which applications need updates. When I opened the App World application, one of the things I quickly noticed was that App World didn’t have the means to update all of the applications simultaneously. Instead, I was presented with a list like the one shown in the following screen shot.

![](/images/2010/app-world-updates-2.jpg)

Rather than give me an easy option to update all of the applications, I had to select each application individually and start the update for each manually. Granted the developers of the application didn’t expect so many updates on the same day, but they probably should have.  
This is one of the things I like about the Apple App Store, when there are a bunch of updates, you can click the ‘Update all’ button and all of the affected applications are updated.

This is a hard one – you don’t want to code for every possible options for an application, but pick the ones that you think will happen most often (and cover other cases later). But the App World application has been updated several times and if the number of applications was expected to grow (as it has) then the developers should have made accommodation for the case where multiple applications have updates simultaneously.

I’m currently working as a project manager for an application for a major retailer and one of the things that came up this week is related to this. The application is calling a web service to retrieve a list of items from a list the user has created. The Web Service the application is calling supports a calling method that returns all list items, but also supports an option that allows you to specify a starting point in the list and the number of rows returned to the calling function.  The developer of the iPhone application called the operation using the default option (all items) and during testing the customer found that the application quickly crashed. Of course, the developer only tested with short lists and the customer’s QA department tested with huge lists. Both teams tested with unreasonable size lists and of course we had problems.

In this simple case, the developer, having seen that the back-end web service supported two calling methods, should have coded the application to accommodate very long lists in its original implementation. That way, the application would work with reasonable lists (10 to 20 items) but would also work when the list exceeded the original expectation. I know it’s more work, but that’s the way it should have been developed from the beginning. As it is, we’re already a little late for release of the application and the developer is trying to submit a change order for the new work to implement the system in a way that should have been done this way all along.

For those of you who are Domino developers – look at how IBM managed the default behavior when rendering a view in the browser – the default behavior (and the expected behavior) is when the view is short, display all documents. When the list is long, render the view in pages and allow the users to page between chunks of documents until they find the one they want. Another smart thing they did was make the default number of view rows that are displayed a configuration value on the server, but also something that could be easily overridden in the ?OpenView URL.