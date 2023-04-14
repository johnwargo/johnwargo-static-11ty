---
title: Password Pain Redux
description: 
date: 2014-02-11
headerImage: 
categories: [Miscellaneous]
tags: post
---

In my previous post, I wrote about one of my biggest software pet peeves – registration forms that have specific password requirements that are not communicated to the user until AFTER a password has been entered. This morning I found one that was even worse than the Google Coder one I showed earlier.

I was playing around with the Intel XDK development tools for web applications. After I got it installed, it prompted me to create an account. I filled in all of the fields and went looking for any indicator that the form had password requirements. None found, so I clicked the Submit button only to find out that for some unknown reason, Intel requires a special character in the password as shown at the very bottom, in small print, in the following figure:

![Intel XDK Registration Form](/images/stories/2014/intel-stupid-password.png "Intel XDK Registration Form")

So, I dutifully added a special character (I’m not telling you which one) and clicked Submit again only to find out that they had yet another requirement. Apparently you also have to have a number in your password, but Intel made no effort to inform me of any of this.

At this point, I’ve failed twice and I still don’t know if my password with a special character AND a number will actually fulfill the requirements. I crossed my fingers and clicked Submit for the third time only to find out that I had actually, unbeknownst to me, complied with the password requirements. Woohoo!

Developers, when you have an input form that has specific input requirements – TELL ME WHAT THEY ARE. I shouldn’t have to guess what your password requirements are; you know what they are, so tell me BEFORE I start typing in my password. I know you have limited screen real estate for listing out the requirements, but there’s no reason you can’t give me a button or a link to click on to view the requirements.

I’m assuming you like your users and actually want us to use your development tools – so don’t make it so hard for us to actually use them.