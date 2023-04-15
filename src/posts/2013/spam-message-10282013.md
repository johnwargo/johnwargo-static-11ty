---
title: Spam Message 10282013
description: 
date: 2013-10-28
headerImage: 
categories: [Miscellaneous]
tags: post
---

I've always been fascinated by spam messages. I had a personal email account back in the very early 90's, back in the dial-up ISP days, so I've seen spam from its infancy.

Notice I'm calling it spam and not SPAM or Spam. In an email context, spam is not an acronym, so I'm truly not sure why people capitalize all of the letters in the word. Spam on the other hand is a tasty breakfast meat (although it can be eaten at any time during the day or night) that I used to have all the time while camping as a boy scout.

Anyways, spammers have been trying all sorts of tricks to get past filters, and it's always interesting to see how it works inside. This morning I received the following email message.

![](/images/2013/spam-1-10-28-2013_640.png)
Figure 1

My email client recognized the from address, so it let the graphics display (the PayPal logo), but I knew immediately that it couldn't have been from PayPal mostly because I'm pretty sure they'll never email me to tell me that my account has been limited. They might email me to tell me that my account has been disabled, and probably tell me why, but what the heck does “your account has been limited” even mean?

Looking at the email, you can see that the email content is in a san serif font and the click here link is in a serif font. Clearly the person who crafted this email isn't very good with HTML. Also, in reading the email, you can see it was written by someone who doesn't speak English as a primary language.  For example, the phrase “The account will continue to be frozen until it is approved And Validate Your Account Information” is a dead giveaway as it's not really English.

Anyway, I always look at the email message source to make sure and when I looked at the source for this message, I found the following:

![](/images/2013/spam-2-10-28-2013_640.png) 
Figure 2

The way to tell that this email did not come from PayPal is through the links to resources embedded within the email as well as links to outside entities. For example, as you can see from Figure 2, the logo image comes from a site called jewelleryminx dot com. Hmmm, that doesn't sound like a paypal server to me.

Notice too the link to 'validate my account info' – this one is the tricky part. If you look at this, you should notice immediately that it looks like it is pointing you to PayPal because the link points to paypal.com, right? Wrong. The link URL begins with paypal.com, but in reality, the URL is a very long and complicated subdomain of givarperu dot org. Anyone who thinks they know what they're doing, including spam filters I think, will see that the URL begins with [https://paypal.com](https://paypal.com){target="_blank"} and assume it's pointing to PayPal when it is actually pointing to a server registered in Lima Peru, see the domain registration below.

![](/images/2013/spam-3-10-28-2013.png)
Figure 3

So, these are a few simple things you can do to tell whether an email is spam or not.