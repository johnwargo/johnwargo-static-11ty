---
title: Really Stupid Phishing Attempt
description: 
date: 2026-04-07
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2026-04-07T20:56:48.986Z
---

Received a really stupid phishing message today. Here's the message content with my personal email domain replaced with `mydomain`:

``` text
Hello,
We were unable to reset the password for your mydomain.com account 
because there were too many unsuccessful attempts to answer your security questions. 
To protect the security of your account, you will not be able to reset your password for the next eight hours.

If you didn’t make this change or believe an unauthorized person has accessed your account, 
go to support.mydomain.com to reset your password as soon as possible. 

Then sign in at mydomain.com to review and update your security settings.

mydomain.com Support. 
```

Anyway, this is clearly a phishing email; I was just stunned that my personal email domain ended up on their list of companies to phish from (mostly because I'm not a company). 

{% sidebar "Definitely Phishing" %}
If you get a message like this, don't click any of the links in the message.
{% endsidebar %}
The sent the email to the only email address on the domain and the admin for the domain. So stupid. You'd think they'd try to actually build a database of business domains to use. 

Anyway, the reasons I know this is a phishing attempt:

1. Its my email domain and there is no security question prompt to change the password. I use my hosting provider's domain management tools for that, there's no other way to do it. 
2. No corporate branding. My domain wouldn't have any anyways, but if you work for an actual corporation, you'd expect corporate branding on the email. Without it, this is clearly phishing.
3. No reference to my name. Any email from a corporate help desk would reference you by name.
4. Hovering over the two links in the email points to the following URL: `yinugacize dot z4 dot web dot core dot windows dot net` (replacing the `.` with the word dot). That target site has nothing to do with the domain in question, so couldn't possibly be anything but a phishing attempt. 

I don't want the URL showing up in search results or on the page (so you wouldn't accidentally click it), so here it is in all its glory:

![Phishing URL](/images/2026/phishing-address-20260407.png)
