---
title: American Express Contact Details Scam
description: 
date: 2024-11-26
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2024-11-26T15:12:42.277Z
---

I received an interesting email today that seemed to be from American Express indicating that someone (most likely a hacker) updated the phone number associated with my account. The email subject said: "Request To Update Your Contact Details Was Successful." and I almost panicked and clicked the link before I gave this careful thought.

{% sidebar "" %}
The email message discussed in this post is NOT a valid email from American Express. It's a phishing email designed to capture your American Express account credentials when you click the primary link in the email. Do not click any links in the email and do not let Outlook load images for the email.
{% endsidebar %}

First of all, when you look at the image, you'll see that Outlook blocked downloading images. I am an American Express customer, but outlook knows to trust email messages from them and automatically download images. The fact that images didn't download automatically means this wasn't a message from American Express, or, American Express changed the email user and/or domain for messages they send to me

<img src="/images/2024/spam-amex-profile-update.png" alt="A scam email claiming to be an American Express contact details update" />

## About the Email Address

Taking a quick look at the email, I realized that it wasn't that American Express made changes to their system, it was because this message didn't come from American Express. Instead, take a look at the source email:

``` text
no_reply_americanexpress_com_amex_welcome_apex@testmail.develtio.dev
```

Notice how they populated the email address with things you'd expect from a business email:

+ `no_reply`
+ `americanexpress_com`
+ `amex`
+ `welcome`

Although I don't know why American Express would use welcome in an email to me about a profile change. 

All of that text is designed to make you believe this is from American Express. It's not.

## About the Email Domain

This is the source domain for the email:

``` text
testmail.develtio.dev
```

Definitely not American Express.

When you check the registration for the `develtio.dev` domain, you'll see the following:

<img src="/images/2024/spam-amex-profile-update-registration.png" alt="Domain registration details" />

This tells you that it's an individual domain registration, not for a corporation.

## More Clues

I love how they knew that the mail client (outlook in this case) would block images so they added a message to get you to download them. 

> Please select "Show blocked content and enable links" to access secure message. 

They even made the text look like a link even though you can't click on it. I'm not sure why. 

Even if you don't click any of the links in the email, downloading images allows them to at least know that the email address they sent the message to is valid and that you opened the email. 

Finally, looking at the link they want you to click:

``` text
product.pusti-microservices.ahmedul.com/app/r.php?email=john@myemaildomain.com
```

**Note:** Yes, I replaced the email domain in my email address - that's not a valid domain.

I'm not sure what it does and I'm not going to click on it (neither should you) but this is clearly NOT an American Express corporate web site. I assume it will open a page that looks like an American Express login page.

Normally I'd fire up a Virtual computer, install an operating system then open the link in that environment but the last couple of times I tried that the domain was blocked by the time I did so. Lets see what happens. Yep, here it is, a bogus login page:

<img src="/images/2024/spam-amex-profile-update-target.png" alt="Phishing web site image" />

Notice the URL of the target site:

```text
daivalorealtuocuore.wplab.live/AM2.html
```

Definitely not an American Express site. Stay away.

## Conclusion

Hopefully I was able to successfully convince you that the email message I shared here is a phishing attempt and you should delete the message as soon as you get it.
