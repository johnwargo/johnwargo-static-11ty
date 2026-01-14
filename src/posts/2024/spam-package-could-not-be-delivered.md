---
title: Package Could Not Be Delivered Spam
description: 
date: 2024-01-12
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
---

It's been a long time since I've torn apart a spam message here. My daughter sent me a screen shot of a text message she received yesterday (supposedly from the United States Postal Service (USPS) and I thought I'd share the screen shot and debunk it.

Here's the text of the message my daughter received:

> Package Tracking: Your package arrived at the transit center but could not be delivered due to incomplete address information. 

Here's the screenshot:

<img src="/images/2024/spam-usps-20240111.png" alt="An image of a spam text supposedly from the USPS" />

I received a bunch of these over the last few months, but surprisingly every one of them was sent from a non-US telephone number (I didn't keep track, but I think the sender primarily used a 46 country code (Sweden)). It was pretty easy to ignore the messages once I noticed that, but I wonder how many people fell for it anyway. I imagine that most Americans don't get a lot of phone calls from outside of North America, so I bet they thought the 46 at the start of the number was a system number or something like that. 

Anyway, for this piece of spam or phishing my daughter received, the text message came from a US telephone number (Washington state) so at least these criminals finally figured that part out.

Looking at the message, I was able to give my daughter the following advice:

1. The US Postal Service isn't going to end a text message with "best regards," in it. 
2. I'm pretty sure that USPS Customer Service doesn't send text messages anyway. As a side note, does the USPS really care about customer service? :-)
3. The USPS likely doesn't have her phone number.
4. What are the chances the post office has her phone number but NOT her correct delivery address?

Another thing about this message struck me as odd, the URL pointing to https://cutt.ly. I'd never heard of that domain, so I fired up a linux box and accessed it and learned two things:

1. [https://cutt.ly](https://cutt.ly){target="_blank"} is a link shortener that I'd never heard of before.
2. The shortened URL had been deleted.

So, even if my daughter had clicked on the URL, nothing would have happened. I assume someone complained and they pulled the nefarious link from their site. You can't always count on that though.

Some good news here is that as far as I know, links you get in text messages can't be hidden behind another URL (which is something you can do in emails and web pages). 

I'm also lucky that I have an extra linux system here I can fire up to do unsafe things (then quickly tear down when I'm done). I've also tested spam and fishing URLs in a virtual machine in the past as well. 

I assume that the postal service isn't going to use a third-party link shortener. At the volume of text messages the postal service likely sends, they're not going to use a third-party URL shortener service because that would cost them a lot of money.

I hope this helps you recognize spam or phishing texts more easily.