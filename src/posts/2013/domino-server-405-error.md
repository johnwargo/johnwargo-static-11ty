---
title: Domino Server 405 Error
description: 
date: 2013-04-10
headerImage: 
categories: [IBM Lotus Domino]
tags: post
---

I’m trying to wrap up an article series for The View (www.eview.com) on developing Sencha Touch applications for IBM Lotus Domino and ran into a problem that I can’t seem to find a solution for – can you help me out? Please?

I’ve created a simple competitive information database in Notes and exposed it to mobile devices using several methods. I first built a Rhodes application (www.rhomobile.com) that synchronized data with the Domino server and wrote a series of articles about it. You can see a sample screen shot of the Rhodes application in Figure 1.

![](/images/stories/2013/domino-405-error-1.png)

Figure 1

Next I did the same thing using Sencha Touch (www.sencha.com); you can see the application in Figure 2.

![](/images/stories/2013/domino-405-error-2.png)

Figure 2

As you can see, I finally got around to populating the application with more interesting content.

Anyway, as I worked through the Rhodes application, I discovered that by default, the Domino server was blocking HTTP PUT and DELETE requests, so I had to put the following line in the server’s notes.ini file:

HTTPEnableMethods=PUT,DELETE

Once I did that, the Domino server stopped blocking my requests and everything worked out great.

Yesterday, I was working on the Sencha Touch application and read and create worked great, but as soon as I started editing records in the database I started getting the following error on the server:

04/10/2013 07:47:48 AM HTTP Web Server: The HTTP method is not allowed for the specified URL \[/view/compete.nsf/(rest2)?openagent/2035EE2523E794D785257B4900086A2C&\_dc=1365594468245\] Anonymous

I looked in the Domino log and saw that the problematic URL was:

PUT /view/compete.nsf/(rest2)?openagent/2035EE2523E794D785257B4900086A2C&\_dc=1365592049449 HTTP/1.1

You can see the complete Domino log entry in Figure 3.

![](/images/stories/2013/domino-405-error-3.png)

Figure 3

I’ve searched and searched and can’t seem to find the solution to this problem.

Nothing’s changed on the server and there’s only a few references I can find about that HTTPEnableMethods ini parameter. Most of the stuff I can find on the 405 error all relates to configuring a Domino server to use WebDAV (which I’m not using in this case \[am I?\]). This was working just fine for my Rhodes application but now fails for the Sencha Touch application and they’re both essentially using the same RESTful service.

Can anyone help me understand more about this problem and hopefully (although hope is not a strategy) fix it?

In a side note, I wanted to take a look at the server’s notes.ini file and remember that I’d written a utility (back in 1996) called Configuration Manager for Lotus Notes that allowed me to work with a sorted version of the notes.ini . So funny that a utility I wrote 19 years ago is still useful. What fun!

![](/images/stories/2013/domino-405-error-4.png)

Figure 4

I wonder if I should do an update (the DRCC ini reference link isn’t working anymore). You can see the application in Figure 4. I just looked and Wolcott Systems Group has pulled the link to this utility from their web site. No surprise, but sad.

Update Apr 11, 2013

I'm getting more convinced that I'm not having a Domino server config problem but instead I'm having an authentication problem. Notice in figure 3 that it lists the authenticated user as '-'. I've been poking around in the ACL and have tried setting Anonymous to 'No Access' in order to force a login and even setting Anonymous to Manager - still doesn't allow me to do a PUT to the server.