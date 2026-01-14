---
title: Spam Chase Bank Autopay Halted
description: I received a phishing attempt the other day and thought I'd poke some holes in it.
date: 2024-06-29
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2024-06-29T19:35:04.669Z
---

I received an email the other day that I was certain was a phishing attempt; here's the email message:

<img src="src/images/2024/spam-chase-20240626.png" alt="Phishing email contents" />

## Initial Take on the Email

I knew it was a phishing attempt because:

1. I'm not a Chase customer.
2. I don't have any auto pay setup with Chase.
3. Chase wouldn't send me an email addressed to "Dear john@someaddress.com"; if I was a customer, I know they'd address it "Dear John"

## Domain Issues

It's pretty easy to tell from those few things that this isn't an email I should act upon, but I sure want to tear it apart. Looking at the from address in the image, notice that it's supposedly from `mazon.sp.org.br`. That's interesting because If I actually was a Chase customer, they wouldn't send send me an email from that domain, they'd send it from something that ended in `chase.com`.

It is funny that these guys would make it look like it came from Amazon (it didn't) considering it's supposed to be from Chase Bank.

Besides, if I was a Chase customer, I'd likely be a customer of theirs in the US, not in Brazil (the `.br` ending on the sender domain name). And, if I was a Brazilian, why would the domain have `sp` in it (which indicates Spanish language) especially since the message to me is actually in English.

## Link Analysis

Taking a look at the link behind the **Get Started** button in the email; it points to `notifications-center dot su`. When I lookup that domain at [https://who.is/whois/notifications-center.su](https://who.is/whois/notifications-center.su){target="_blank"}, here's what I get:

<img src="src/images/2024/spam-chase-20240626-whois.png" alt="Who is registration for the phishing web site" />

Notice that its registered to a private person, not Chase Bank as you'd normally expect. 

Yep, this is a phishing email. Now, I wonder what happens when you click the link?

I fired up VMWare Workstation and loaded a new Windows VM, opened the browser and entered the URL, but whatever site was there has already been pulled down.
