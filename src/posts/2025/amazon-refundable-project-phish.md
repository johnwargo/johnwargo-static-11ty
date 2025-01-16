---
title: Amazon Refundable Order Scam
description: 
date: 2025-01-16
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2025-01-16T12:34:33.500Z
---

I received an interesting text message the other day purporting to be a message from Amazon letting me know about a "refundable order that needs to be processed." I could tell immediately that it was a scam or phishing attempt, so I thought I'd share what I saw.

{% sidebar "Don't click the link" %}
This message is definitely a scam or Phishing attempt.
{% endsidebar %}

First of all, here's the content of the message I received:

> [Amazon]You have a refundable order that needs to be processed. Due to issued caused by the seller, no return is required. Please proceed with the refund request at your earliest convenience. If you have any questions, feel free to contact our customer service team. 

and here's a screenshot of the message I received:

{% image "src/images/2025/amazon-refundable-01.png", "A screenshot of a scam message purportedly from Amazon", "image-full" %}

There's a lot of things wrong about this message:

1. The use of [Amazon] at the start of the message. There's no reason Amazon would do that.
2. The lack of the space between the [Amazon] and the first letter of the remainder of the message. If Amazon actually sent the message, it would have been reviewed multiple times and that would have been corrected.
3. The URL in the message uses https://t.co which is a Twitter domain: "Twitter uses the t.co domain as part of a service to protect users from harmful activity, to provide value for the developer ecosystem, and as a quality signal for surfacing relevant, interesting Tweets." Amazon doesn't use a Twitter (I refuse to call it X) domain for their url shortener; they have their own at amzn.to. 
4. The message is a group chat. Amazon would never send a group chat message to any customer. 

When I tapped on the message details at the top of the text, my SMS application displays the list of phone numbers included in the group. Again, Amazon would never send a group chat message to a customer.

{% image "src/images/2025/amazon-refundable-01.png", "A screen shot of the group membership for the message", "image-full" %}

If you get this message, don't click on the link. It's either a scam or some sort of phishing attack.
