---
title: Particle Photon Function Not Found
description: 
date: 2016-02-18
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

Lately, I’ve been working on a project using the Particle Photon. The project’s been ‘done’ for some time now; the code’s all written and the hardware is all soldered together. I’m ready to install it, but, of course, I’ve found some additional functionality I want to add to the associated Android app. So, I added a couple of additional functions to the Photon’s code and started testing them using the Chrome Advanced Rest Client.

During my testing, I encountered the following error:

`Function myverylongfunction name not found`

Of course, I studied my Particle C code for a while looking for the problem to no avail. I could not find the problem.

I have three functions in my app, so I thought for some reason the Photon was limited in how many functions you could have (turns out the limit is 410). To test this theory, I reordered the functions to see if the one I was having trouble with would work if it was higher in the list. Nope, that wasn’t it.

I noticed that the function that wasn’t working had a name longer than the rest, so I shortened it and suddenly it started working. If you encounter this issue, know that the maximum function name length is 12 characters. What I don't understand is why this is even an error I had to figure out. The Particle Cloud is parsing the request and looking for a function that matches the name I've provided on the URL. If the functiion name is longer than 12 characters, then tell me that I've passed a function name that's too long. Don't tell me you can't find the function. I knew I was providing the right function name, the one that matched my code, but the Particle Cloud couldn't recognize it because it's too long - that's the perfect time for an error message back from the service that reads something like "The function name is too long." That, for sure, would have shortened my troubleshooting time.

You can find the complete documentation here: [https://docs.particle.io/reference/firmware/photon](https://docs.particle.io/reference/firmware/photon).

Post Script:

OK, so I learned a few things since posting this. I submitted part of this article to the community forums and got a bunch of responses. Several people who responded seemed to think that it was a good idea to fix this. Unfortunately, many other folks had a pretty antagonistic attitude about this; apparently they think this is pretty clearly documented and there’s no reason to make this idiot (me) proof. So, if you’re just getting started, recognize that the Particle Community doesn’t care to catch some errors you may have missed.

The documentation at the link I provided above says the following:

Currently, up to 10 cloud variables may be defined and each variable name is limited to a maximum of 12 characters.

So, for cloud variables, there can be no more than 10. My bad, I thought that applied to functions; for functions, the limit is 4:

Currently the application supports the creation of up to 4 different cloud functions.

In order to register a cloud function, the user provides the funcKey, which is the string name used to make a POST request and a funcName, which is the actual name of the function that gets called in your app. The cloud function can return any integer; -1 is commonly used for a failed function call.

The length of the funcKey is limited to a max of 12 characters. If you declare a function name longer than 12 characters the function will not be registered.

So, keep in mind that you can only have four functions, and, if any of the function names are too long, they won’t even get registered. So, the function not found error? While not useful, it’s at least technically accurate – since my function name was too long, it didn’t get truncated, it was simply never registered.

It was my understanding that the functions were registered somehow with the cloud, so the cloud understood what is exposed by the device and could act upon the requests coming through. Apparently when you use a function name that’s too long, the device never even attempts to register it with the cloud. That’s why the server returns function not found, it’s because the function doesn’t even exist as far as it’s concerned and it doesn’t know what else to do.

Now, I suggested to the Particle community that the cloud could tell that the name was too long and not even try to look for it, instead returning a useful error message that the function name was too long. That suggestion was shot down by a varying degree of “you’re not understanding” or “why would we want to deal with something the developer should have done better” attitude from the community, so don’t expect this to ever be fixed by them. Interesting attitude for a hacker community.