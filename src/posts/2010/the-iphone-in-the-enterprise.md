---
title: The iPhone In the Enterprise
description: 
date: 2010-03-10
headerImage: 
categories: [Mobile]
tags: post
---

A colleague asked me a while back to provide my comments on [InfoWorld's Enterprise iPhone Deep Dive Report](https://infoworld.com/iphone-deep-dive){target="_blank"}. I found it to be an interesting read and I was convinced when I finished that you should never allow a bigot to write an article if you're going to pretend that you're impartial.  
  
I could be wrong on this, and as usual my comments below do not reflect the official position of AT&T, but here's my take on the report:  
  
I'm not sure the iPhone is capable of satisfying the enterprise and the different articles in the report highlight many of the issues, but not really the root cause behind them.  Apple historically has never really 'understood' the enterprise and until now it hasn't really been an issue. Now that these organizations have all of these remote devices accessing corporate data, it's even more important that Apple understand the enterprise.  Buried deep within the report was the following statement:  
 

> “Apple designed the iPhone as a consumer device, so it's heavy on convenience and light on security. If you want protection, you have to accept some pain”  
  
No enterprise is going to be interested in hearing that unless they're willing to forgo security in order to have the cool device (which is currently the case with many enterprises).  
  
If you think about the platform, it was designed under the premise that users would not run any application other than the applications provided by Apple or a select few of very trusted partners. The web browser, being a desktop browser in a small package rather than an actual mobile browser, was deemed to be sufficient for all user needs. The tradeoff they got by making this assumption was that they could build the platform allowing all applications to run with root level access within the Unix security model. They wouldn't need a security model since they weren't planning on allowing anything but their applications to run. All applications run with the same level of access and each and every application can do anything it wants to anything else on the device. No sandboxing, no varying levels of access (Apple applications running with the most access, other applications running with less), nothing. Everything runs as root. No system administrator on any unix system in the world would allow that for any end user computing device, but that's what Apple did with the iPhone.  
  
After Apple decided that end-users did want to have access to applications, Apple quickly 'patched' the environment to allow third-party applications. They took a system designed with no security and added a security model (of sorts) on top of it. Now, third party applications could be created and Apple reserved access to some API's for itself – most likely over security or performance concerns. What I believe, unless Apple has done a complete rewrite, is that the iPhone platform doesn't have the foundation enterprises need to feel that the device is secure in their environments.  
  
I believe that Apple's prohibition of background applications is another offshoot of this design. Since they didn't build the necessary security restrictions in the original platform, they have to worry about applications running in the background, gaining access to all sorts of information and data the enterprise would otherwise not want accessed. By not allowing background applications, they can avoid any security concerns over inter-process communication.  
  
Apple's getting there with regards to support for ActiveSync policies. More and more policies will be added over time. What's clear from the article is that if you're on ActiveSync, many of the enterprise security features you need are there and I believe more and more will continue to appear with each release of the platform.  If you're not on ActiveSync, then your choices for enterprise management are:

1. Buy a third party product  
2. Use the free tool Apple offers, the iPhone Configuration Utility

The problem with the iPhone Configuration Utility is that while you have the ability to configure all sorts of settings, there's absolutely no way to ensure that these settings are deployed and correctly maintained on the affected mobile devices. None. The user has to act to implement the security feature you have created for them. Enterprises security departments will not accept that as an option. The report later says:

> “But a big IT issue remains: you can't easily manage iPhones through a central console wirelessly, even though you can do some management (profiles and remote wipe) via email, the web and/or Exchange 2007. IT Pros rightfully complain that Apple essentially forces them to use a local PC as a management workstation and physically connect user's iPhones to it”  
  
The conclusion correctly reached in the report is that ActiveSync good, anything else bad. Since the majority of enterprises are running Exchange, most organizations should be OK.    
  
There's still the issue where any iPhone prior to the 3GS would report to ActiveSync that it was capable of encrypting or was actually encrypting the local data when it actually lacked the capability it said it had. That's got to have many enterprises scared to death and I'm waiting to see what lawsuits make it into the courts over that one. Take for example the Massachusetts law that goes into effect in March requiring any organization to encrypt data regarding any Massachusetts resident any time it's stored:  
  
* [https://27001.com/massachusetts-data-protection-law.aspx](https://27001.com/massachusetts-data-protection-law.aspx){target="_blank"}
* [https://mass.gov/Eoca/docs/idtheft/201CMR17faqs.pdf](https://mass.gov/Eoca/docs/idtheft/201CMR17faqs.pdf){target="_blank"}
* [https://searchsecurity.techtarget.com/news/article/0,289142,sid14_gci1347836,00.html#](https://searchsecurity.techtarget.com/news/article/0,289142,sid14_gci1347836,00.html){target="_blank"}
* [https://alertboot.com/blog/blogs/endpoint_security/archive/2009/01/06/massachusetts-data-encryption-law-201-cmr-17-00.aspx](https://alertboot.com/blog/blogs/endpoint_security/archive/2009/01/06/massachusetts-data-encryption-law-201-cmr-17-00.aspx){target="_blank"}
  
In the case of the iPhone, enterprises would believe it's encrypted and they're in compliance with the law when on older iPhones it won't be the case even though the device is saying it is. Not good for enterprises.  
  
I learned a little from some other topics in the report. I've always wondered why Apple forces everyone to go through them for application approval. I always thought that developers should be able to do whatever they want on the platform. That won't work for Apple. Since the fundamental security platform isn't there, Apple has to analyze and approve all applications because they have to make sure that the application isn't doing anything it's not supposed to be doing. What was most telling was Apple's prohibition of downloading any code from the internet. Apple even forced one vendor to remove the eval function from their JavaScript library.  This is because a developer could download dangerous code and execute it within the context of the application – without the needed security model, Apple can't allow it. The BlackBerry and Android platforms can both allow this 'feature' because the requisite security features needed to protect the user and/or enterprise were built into the platform from the very beginning.  
  
The last thing I noticed was that several of the articles were laced with inaccuracies. It's clear that the authors are enamored with the iPhone platform and didn't take the time to validate the things they said about the other platforms. I was able to update the author that indicated that the BlackBerry platform supported WebKit in newer devices (not true) but the iPhone vs. BlackBerry article was chock full of falsehoods and it's clear that the author didn't care about being accurate.