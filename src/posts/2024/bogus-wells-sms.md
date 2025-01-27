---
title: Bogus Wells SMS
description: I received a spam text message pretending to be from Wells Fargo,
  but I quickly realized it was fake. The phone number and currency format were
  not typical for the US, making it clear that it was a phishing attempt. It's
  important to pay attention to these details to avoid falling for scams.
generatedDescription: true
date: 2024-02-23
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Miscellaneous
---

I got a spam, malware, phishing text message today that said it was from Wells Fargo but I knew better. After looking at it for a couple of seconds, I had to laugh then write about it. Here's the message I received:

{% image "src/images/2024/bogus-wells-sms.png", "Bogus Wells SMS Message", "image-full" %}

First of all, I'm not a Wells Fargo customer so that was my first clue that this was a phishing message or something.

Next, I looked at the phone number: +1 141 020 0504

The last time I checked, `141` isn't a US area code. From what I remember, area codes can't begin with a 0 or a 1. Neither is `020` a valid NNX. From [NANPA](https://nationalnanpa.com/number_resource_info/co_codes.html){target="_blank"}, the first reference I found using Google:

> A Central Office (CO) code or NXX code refers to the second three digits (also called digits D-E-F) of a ten-digit telephone number in the form of NPA-NXX-XXXX, where N represents any one of the numbers 2 through 9 and X represents any one of the numbers 0 through 9.

So why would Wells Fargo send me a text message about 'my account' from outside the country? Yeah, they wouldn't. 

What made me laugh was that it was apparently from **Wells Farqo** (that's a Q instead of the G in **Wells Fargo**) but the transaction amount had a dollar sign with some interesting character choices in it: $/416,63. I'm not sure what the `/` is for, that's not part of a currency value in the US. But the comma for a decimal separator was the funniest part as we use periods, not commas, to separate dollars and cents.

This just proves that all you have to do is look just for a few seconds to identify spam or dangerous messages. When you can clearly see it's not a US phone number nor is it an American formatted currency amount, it's time to report the message to your phone company.
