---
title: Internet Scam 20091207
description: 
date: 2009-12-17
headerImage: 
categories: [Miscellaneous]
tags: post
---

I received another really interesting email the other day and I thought I'd write about it in my continuing series on Internet Scams. I got an email supposedly from American Express as shown in the following figure:

{% image "src/images/2009/internet-scam-20091207-blurred.png", "Figure 1", "image-full" %}
Figure 1

The thing about it though was I knew that American Express didn't have this email address. My ISP flagged it as Spam, always a useful aid and there were a lot of other things about the message that confirmed that it was just another scam.

In my Outlook inbox I used [Qurb](https://qurb.com/){target="_blank"} (now called 'CA Anti-Spam Plus') which makes sure that no messages make it into my inbox unless I have them in my contact list, I've written to that address or manually approved the address previously. That makes it easy to spot Spam since all suspect messages are siphoned off into a special folder that I can peruse later to free up messages from new, approved senders. Thunderbird on the other hand doesn't have (that I know of) a whitelisting Spam filter, so I have to drill through my Spam manually. Fortunately it does support the identification of Junk senders and uses [Bayesian Probability](https://en.wikipedia.org/wiki/Bayesian_probability){target="_blank"} to identify Spam based upon the messages I've marked as Spam previously. Here's an article from [Wired Magazine](https://wired.com/wired/archive/8.02/autonomy_pr.html){target="_blank"} where I first heard of this technology.

Anyway, as I read through the email I saw a lot of things that assured me that this was spam. For the screen shot I turned on message headers - which provide me with a whole bunch of additional information about the source of the message. I blurred some if the information in the screen shot to help protect my ISP's servers.

Let's go through the list:

1. Message Subject: Not likely that American Express is going to send me a message about an 'American Express Online Form.' There couldn't possibly be anything like that I'd need to address.
2. American Express would always address me by name, not using 'Dear American Express Customer.'
3.  Message Body: It just doesn't make sense.
4. Logo: There's no American Express logo in the email anywhere. The scammer sent an HTML format email message rather than plain text, so you'd think since it's already HTML that a logo file would be displayed (further luring me into believing that the message actually came from American Express).
5. To Address: The message was sent to 'info@mdecorporation.com' which isn't where it was delivered (it was delivered to info@mcnellysoftworks.com). That's a sure sign that it's Spam!
6. Received Address: From looking at the message headers, it's clear that the message thinks it was received from an account at The University of Texas at El Paso (utep.edu). Ya, I'm pretty sure American Express is not going to send me a message from a University computer system/account.
7. Return-Path: The headers show that the return address is set to an email account in Russia. I'm pretty sure American Express isn't going to be sending me email messages from Russia.
8. X-Mailer: The headers show that the message was sent by Microsoft Outlook Express 6.00.2900.2180. I'm pretty sure American Express is not going to be sending me email messages from Outlook Express.

That's all I have for this one. I'll keep posting these things as they come up – it's just fascinating (for me anyway) to see these messages dissected.