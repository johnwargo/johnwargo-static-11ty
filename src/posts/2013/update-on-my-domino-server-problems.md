---
title: Update on My Domino Server Problems
description: 
date: 2013-04-14
headerImage: 
categories: [IBM Lotus Domino]
tags: post
---

Thanks to all of you who helped out last week trying to help me fix my Domino configuration problem.  Tom Verleysen and Michael Dudding suggested creating an Internet Sites document which I thought made sense based upon what I'd read on the Internet but wasn't sure exactly how to implement it. I followed the instructions I was given (I think) and setup the following:

I updated the server document so it uses internet sites documents:

{% image "src/images/2013/domino-problem-0.png", "Figure 0", "image-full" %}

I now have an Internet Sites document with the following information:

{% image "src/images/2013/domino-problem-1.png", "Figure 1", "image-full" %}

On the Configuration tab, here's where I'm enabling HTTP PUT and DELETE.

{% image "src/images/2013/domino-problem-2.png", "Figure 2", "image-full" %}

When I open a browser and launch the Sencha Touch app, it renders its UI then connects to the Domino server to request the data using the RESTful agent I've created. Here's the Domino log document for the GET request:

{% image "src/images/2013/domino-problem-3.png", "Figure 3", "image-full" %}

After the browser receives the 401 error, it prompts me for the credentials then repeats the request to the Domino server as shown in the following figure:

{% image "src/images/2013/domino-problem-4.png", "Figure 4", "image-full" %}

So far, expected behavior, right? When I edit a document in the Sencha Touch application, the Sencha Proxy tries to PUT the data back on the server and I get the following error:

{% image "src/images/2013/domino-problem-5.png", "Figure 5", "image-full" %}

So, last week I thought I was having an authentication problem (since the Authenticated User field in Figure 5 was showing Anonymous). Turns out this was some sort of weird a Safari caching problem, as soon as I switched to Chrome or cleared the cache in safari I was prompted to login and get what you see above.

So, looking at this, it looks like I DON'T have the Domino server configured correctly and I could use more of your help. Anyone have any suggestions?