---
title: Postal Scam Urtye dot com
description: 
date: 2024-04-14
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2024-04-14T12:21:25.987Z
---

I received an interesting text message yesterday that is clearly a scam. Just in case others received a similar message, I assume many did, this post tears down the message proving its a scam.

Here's the message I received:

```text
Since the package does not have a house number, the package transportation is interrupted, please update (web address withheld for safety reasons)
```

**Note:** The `(web address withheld for safety reasons)` is my placeholder for the actual web address urtye dot com. I didn't want someone to accidentally click the link, so I removed it.

I don't want to show the actual URL because I don't want to be responsible for someone clicking on it and getting hacked. Here's an image of the message with the full URL:

<img src="/images/2024/urtye-scam.png" alt="An image of a text message with a suspicions URL" />

Looking at this message, I was fairly certain it was some sort of scam or phishing attempt since the country code for the sender (`+63 906 755 6259`) is the Philippines. I don't expect to get text messages from the Philippines, especially since I've never ordered a package from the Philippines. 

I also know from reading a lot of Wired Magazine and other sources that the Philippines is the source of a lot of scams; for example: [Hundreds rescued from love scam centre in the Philippines](https://bbc.com/news/world-asia-68562643){target="_blank"}.

Anyway, since I wasn't sure about this message and I didn't recognize urtye dot com as a safe domain, I did some more research. First I looked up the domain registration and found that the domain is registered via Alibaba Cloud Computing Ltd. d/b/a HiChina (https://net.cn). 

<img src="/images/2024/urtye-domain-registration.png" alt="Urtye dot com domain registration information" />

That's interesting because I have some purchases on the way from Ali Express in China but since no additional information is available, like an order number or vendor, I'm still wary at this point.

Finally, I opened up a Windows VM, took a snapshot of the system, then launched the snapshot. Once the system came up, I opened a browser window and typed in the URL from the text message. What did I get? The United States Postal Service web site.

So I'm pretty confused by this. I don't understand why someone would go to all the trouble to send me that message only to redirect me to the USPS web site. I double checked and the text message has that exact URL referenced at the beginning of this article. No hidden parameters embedded in it.

I think what happened is that the hackers or scammers had a specific target in mind for the hack or scam and since I triggered the URL from a Windows desktop browser (and they were looking for an Android or iOS device) that the target site simply redirected me to the USPS web site. I'm not going to click the link on any of my mobile devices, so I guess I'll never know what would happen.
