---
title: Phishing American Express Message Ready to View
description: 
date: 2025-02-22
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2025-02-22T15:48:20.084Z
---

I received an email message the other day that seemed to be from American Express, but wasn't.

{% sidebar "Definitely a Phishing Email" %}
This message, for a lot of reasons, is not from American Express and you shouldn't click any of the links in the message.
{% endsidebar %}

The message said it was from "American Express Customer Care", but I've never received a message from American Express Customer Care. When you look at the message, you notice that Outlook blocked the images in the message. If the message had actually come from American Express (it didn't) the images automatically appear since I've already allowed image files from AmEx.

<img src="src/images/2025/phishing-amex-message.png" alt="The contents of a phishing message supposedly from American Express" />

Looking at the actual email for the message, I saw the following:

```text
no-reply.AmericanExpress-americanexpress.com=parcelhub.com.my@mail.parcelhub.com.my; 
on behalf of; American Express Customer Care no-reply.AmericanExpress-americanexpress.com@parcelhub.com.my
```

They tried to make it look like it came from American Express, but the sender domain is `parcelhub.com.my` which is definitely NOT from American Express. Looking at the domain, it seems that this is ParcelHub instead which seems like a weird redirect.

Looking at the link behind the **View Message** button, the link there points to `https://destinyeshop.com` which, again, is not American Express. 
