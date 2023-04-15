---
title: When to Check for Updates
description: 
date: 2014-08-11
headerImage: 
categories: [Mobile Development]
tags: post
---

I've been trying to build a sample application using [Ionic](https://ionicframework.com/){target="_blank"}, an HTML5 framework specifically designed for hybrid applications. I read the instructions, downloaded the code and initiated the command to create a new project.

What happened? Failure.

I posted my issue on their forum only to be told that my Cordova development environment must be old. I explained that it was all up to date and working perfectly for every other Cordova development I've ever done and what I got for my trouble was a link to a video that showed me how to install Ionic on Windows.

Sigh. Didn't I just explain that I have a fully functioning Cordova development environment? Sigh again.

Anyway, I started looking around for a potential culprit. My Android dev tools were all up to date and so was my Cordova installation. I noticed that NodeJS was a little old, so I just installed the latest and greatest version of node.

When I tried the command again, I got the following…

![Figure 1](/images/2014/ionic-error-20140811-1.png) 
Figure 1

I have the Ionic tools installed and the command runs. It downloads some stuff, then downloads some more stuff then sets about creating a project and adding some plugins to it. As you can see, it's able to install two Cordova plugins (device and console), but where it fails is when it's trying to install a proprietary Ionic plugin.

It tells me that there's the potential that my Cordova is too old, but it's already been able to install two Cordova plugins without any problems. What could it be about that Ionic plugin that suddenly breaks the Cordova CLI?

OK, so we know that my Cordova is up to date and we know that I can add plugins. I'm pretty sure this isn't a problem with my Cordova implementation – I've created Cordova 30 apps or more with this configuration (and written three Cordova books using this config). So what's the problem?

Well, the next thing the Ionic CLI tells me is that my Ionic CLI is out of date and that's what prompted me to write this blog post.

As a developer, when should you check to see that your stuff needs updating? Do you do it before you perform any tasks or do you perform a bunch of tasks, fail, then check to see if there's a new version of the tool(s)? That was a trick question because the answer to that question is ALWAYS the first choice – check for application updates BEFORE your tools do anything.

That's the only option that makes sense.

Why would you tell me I'm running an older version of a tool only AFTER I've tried to use it and failed? Whoever wrote that particular piece of code simply wasn't paying attention.

OK, so I updated the Ionic CLI and ran the command again, only to receive the same error – apparently the Ionic CLI can install Cordova plugins, but not their own as shown below.

![Figure 2](/images/2014/ionic-error-20140811-2.png) 
Figure 2

I'd ask for help again, but I've already done that and all I hear back is that I should check to make sure my development environment is up to date. Nobody seems to want to try to understand what's happening here or suggest actual steps I can take to try to fix this.

It looks like my next book isn't going to have a section in it about how to use Ionic with Cordova. Too bad.