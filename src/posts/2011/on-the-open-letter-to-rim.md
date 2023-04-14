---
title: On the Open Letter to RIM
description: 
date: 2011-07-01
headerImage: 
categories: [BlackBerry]
tags: post
---

![](/images/2011/rim.jpg)I don’t know if you heard about it or not, but a [RIM executive published an open letter to his bosses](https://www.bgr.com/2011/06/30/open-letter-to-blackberry-bosses-senior-rim-exec-tells-all-as-company-crumbles-around-him/): Mike L and Jim B of RIM. It’s an interesting read and it had to be said. It’s really sad, but RIM has been slow in its response to market changes and it’s likely that they won’t be able to recover.

Their development tools are sub-par and it takes a ridiculous amount of time to release them. Where Apple and Android pre-release their development tools or at least ship them on the same day the device is announced, RIM does prolonged betas and in one case delivered the SDK out of beta only after a device that used the particular SDK had been in market for almost 6 months. Ridiculous.

I was trying to get my demo machine ready for a presentation at The View Developer Conference last week and had upgraded one of my BlackBerry Java projects that I was going to show at the conference. When I loaded the project, Eclipse gave me all sorts of errors that I just couldn’t resolve. I quickly called a former colleague at RIM and he informed me that he never imports old projects into Eclipse; he created a new project every time and copied his code over into the project.  Ugh! Is that world class development? No ! Is it at least acceptable? No way!

Is Apple’s Platform better? No, absolutely not. I wrote about this a few weeks ago, but developing for the iPhone is much, much harder than it is for any other mobile platform I’ve worked with (I’ve worked with a lot). In [a previous article on this site](index.php?option=com_content&view=article&id=246:going-cross-platform&catid=14&Itemid=22), I referred to a post by an Australian developer who confirmed my conclusion.

RIM gets hammered because its technology is so old, but the iOS tools are even older. BlackBerry development’s primary language is Java which was released in 1995. NextStep, the stuff that Objective-C (and all iOS development) is based on was released in 1989. iOS has no Garbage collection capabilities, the developer has to manage the lifecycle of all objects – there’s not another popular smartphone platform in market that has that same limitation. In Objective-C, all references to variables are through pointers – that’s so 1980’s (or so Pascal), the development world is way past that approach. Compared to every other modern development language, Objective-C code has so many quirks that it’s essentially unreadable (to me anyway – and I’ve been a professional developer for almost 30 years).

If you’re a new developer, Objective-C might make sense, but it you’ve been working with many different development technologies, you’ll find it almost incomprehensible. There’s no reason it has to be so hard, but it is.  
RIM’s problem is that it’s old. RIM has done a very good job of forcing their internal development teams to continue to support older devices as new ones (with new capabilities) are released. That’s a good thing, backwards compatibility is very important. Unfortunately that does make it harder on developers – there’s no getting away from it and it’s the kind of thing that Windows developers, Linux developers and many other platform developers live with on a day to day basis.

iOS is new, Apple is going to have the same problem in the future. They’ve already started releasing newer devices with higher screen resolutions, so developers now have to deal with two iPhone screen resolutions plus the iPad. As displays get better or form factors change, it won’t be long before Apple developers start complaining about all of the different devices they have to code (or create graphics) for. When apple starts adding additional interfaces (neural and who know what else) the same problem will occur. It’s the way software development works and it has nothing to do with Apple or RIM. For Apple, forcing users off older OS helps eliminate some of those problems. Since users are essentially forced to upgrade as soon as a new version of iOS is released, developers don’t actually have to support older OS’s for that long. Unfortunately, RIM works with enterprises and that’s just not acceptable for most companies.

I said a long time ago that RIM should abandon their older devices and release a new, more modern way of building mobile applications. They’ve done that now with their acquisition of QNX, but I agree with the market that this transition has taken too long. Working for a carrier, I understand the pressures RIM and other device manufacturers face, but it is taking them way, way too long to get things done. They announced the PlayBook when they weren’t ready, they released when they were not ready, those aren’t smart things to do. Releasing the PlayBook without native email support is incomprehensible.

I truly do not know whether it’s too late for RIM or not. I feel for them and hurt a little inside when I see their repeated stumbles. There’s a whole bunch of smart people there, so there’s a chance they’ll pull it out, but it will take very drastic measures and a lot of pain. Unfortunately, by the time they figure it out, it may be too late. 

Remember: The comments presented herein are my personal opinions and in no way represent AT&T (my employer). I am not speaking as a representative of AT&T.