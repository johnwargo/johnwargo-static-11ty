---
title: Parkit Scam
description: 
date: 2024-12-23
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2024-12-23T12:03:40.965Z
---

I received an interesting phishing/scam text message this morning. It seemed to come from a Charlotte Parking company notifying me of an unpaid parking invoice in the amount of $4.35 but there were a lot of things about the message that made me realize it was a scam.

Here's a screenshot of the message:

<img src="src/images/2024/parkit-scam-01.png" alt="Parkit Scam Text Message" />

There's a few things that make it clear its a scam pretty quickly:

1. The text message came from a Montreal Canada area code. It's possible that the City of Charlotte would use a Canadian company to manage their parking fees, but not likely.
2. The supposed late fee value is not formatted properly: 35$ instead of $35
3. The "to avoid disconnection" text in the message doesn't make any sense. How does paying a parking fee protect you from "disconnection"?
4. The message content is an image rather than text. It looks like its text, but it's definitely an image. For that reason, it looks different than any text message I've ever received. Anyone who wanted to send me a text message with a link to pay a parking fine would send it so I could tap on a link in the message to access the payment site.
5. The 'link' in the message is supposed to be for the City of Charlotte parking, but it's a `parkit-nc` dot com address (North Carolina instead of Charlotte). Still suspicious. 

Anyway, at this point I'm certain that it's a scam so I typed in the link address in my mobile device's browser. Chrome quickly blocked access and warned me about the site:

<img src="src/images/2024/parkit-scam-02.png" alt="Browser's Danger warning" />

It's crystal clear at this point that someone's trying to harm me or steal from me. 

## A Little More Research

Just to make double certain, I started searching for "Parkit" as a parking solution in Charlotte. It turns out that the city of Charlotte does have a parking service called Parkit, but the site URL is http://charlottenc.gov/Transportation/Programs/Pages/ParkIT.aspx. This is a city service, so it wouldn't have a `-nc` in its site URL.

<img src="src/images/2024/parkit-scam-03.png" alt="Charlotte Parkit details" />

## Targeted Message

I do live in Charlotte and own several cars so this is clearly an example of a phishing attempt specifically targeted at me or at least Charlotte residents. 

When I first received the message, my firth thought was "OK, which one of my kids didn't pay for parking?". If the message was a text-based text message, I would have tapped the link to see which car it was so I could send the bill to the offending child.

Luckily for me, as I've already shown, the browser would have blocked access to the site and saved me.
