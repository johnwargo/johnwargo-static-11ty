---
title: Spam Chase Auto Pay Disabled
description: 
date: 2024-07-10
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2024-07-11T11:31:13.802Z
---

I received another supposed [Chase Bank Phishing email](/posts/2024/spam-chase-bank-phishing/){target="_blank"} the other day and thought I'd spend some time analyzing it. 

## The Message

Here's the email I received:

<img src="src/images/2024/spam-chase-auto-pay-disabled.png" alt="" />

And here's the content from the email (just to help search engines find it):

> Auto Pay Disabled #141655165
> Important Update: Check Your Notification Center Now
> We  are pleased to inform you that our notification servers have been successfully upgraded. Kindly log in to our notification center to verify your details and ensure the seamless processing of your scheduled bills and automated transfers.
> Go to Notification Center 

## Initial Take on the Email

I know it is spam or a phishing attempt because:

1. I'm not a Chase customer (I was, but I'm not anymore).
2. I don't have any auto pay setup with Chase (you know, because I'm not a customer).
3. Chase wouldn't send me an email addressed to "Dear john@someaddress.com"; if I was a customer, I know they'd address the message using "Dear John"

The next thing that caught my eye was the Service Mark ([sm](https://en.wikipedia.org/wiki/Service_mark_symbol){target="_blank"}) in the sender email display name. Nobody does that, especially Chase Bank (I went back and checked some old emails I have from them):

> Chase℠NotificationCenter <info@racinglubes.com>

## Domain Issues

The next issue, of course, was the actual sender email address: `info@racinglubes.com`. I could be wrong, but I doubt that Chase Bank would send me emails from racinglubes.com. Double-checking the domain, I noticed that when I navigate a browser window to that domain, it redirects to a real company (I think anyway) at [racinglubes.fr](https://racinglubes.fr){target="_blank"}. That **Unlimited Source of Oil** has nothing to do with Chase Bank as far as I can tell.

Next, I started looking at the links on the page - they all point to the same `racinglubes` domain.

> http://r.mailing.racinglubes.com/mk/cl/f/sh/WCPzyXJTZ6uvfgsK2azUUqgbikbtf74M/wFiEJE1XEtCY

Looking at the domain registration, it looks like a valid registration - created back in 2011. So that one has me a little confused since it doesn't feel like a Phisher would register their phishing domain 13 years ago.

<img src="src/images/2024/spam-chase-20240711-whois.png" alt="Domain registration information" />

Anyway, testing the link and I get a broken link page with the following content:

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://w3.org/TR/html4/strict.dtd">
<title>Security Error</title>
<style type="text/css">
body {
	background: #3499db;
	font: .9em/1.5 sans-serif;
	margin: 10.5em auto 0;
	max-width: 42em;
}
body, a { color: #f8f9fa; }
img { display: block; margin-bottom: 1.5em; width: 3em; }
h1 { font-size: 1.5em; font-weight: 500; margin: 0; }
p { margin: 1.5em 0; }
</style>
<h1>
<img eleventy:ignore src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABvCAMAAAAT8jiuAAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMAL/27zIjdBfkJAuzknRf2xkQpDQHz8Nm1o4FqY1xVIBDo4NaqlntxTz04MyQbE9LArpCMdkrOyYXKbkMAAAKjSURBVGjexdlXbiJBFIXhS5Oa0GQwOZhsm2TAc/a/spFGqOUxUNX4cKu/FZyXUunXFdL5LLHKvrxkJU5LYCkx2raAVkniMweAucQm4QGA9y5xSeKfvcRkiIuhEJgniItMTuKwQGghMSi1EGpuxL0OvumIc+8evvHexLFGBf+pNMStAX4YiFO5V/xQrItLXVzpikObMq6UR+LODDfMxJm1h1vW4kg+hZu+8uJGH3f0xYn6BHdMxuLCEXcdxYEPH3f5NdHXhkFb1FVhpB5K2R2MptqhtISReihtC7AobEXTHEbqoVTzYeUlRE8SESRFzQqRrMSATCEj9VBaIKKTGPApZNcsiYYAkQViQKSQkXYoNfYwUg+lAWzsocSnUHTFnDxXF0b2UOJTyEg9lGYwUg+lNw+PW2unUCUZquCGVF45hRISSuiGUr1oHaAbSkf8bgDSuilkH+B/qKaQfQAOOikUfQCqCilkGKASSj0wA9AT0rhADeBDaQ5uAD7ZFKIG8KHUBjsASS6F+AFYcSnED8hk5bdOYAbwoVRqUQP4UArADQgFxGGWHkAcd/dgBvChNAQ/IDQkUogYQIVSF8wAPpQ2TWoAH0odWBUzoSKsOlwK8bz1Qyn0BxQ6lPpQ0OdSiDepS1RpkMhQGvkgkaF0AIsLpSpoVCjld6BRodSDoh6RQlemqdAUERXGYvOJC+YzIkKp5usO8GtECvED7KG0gvYAnM0ppDrAHkon6A/A0pRC1AD+ohTAxQAEhhTSHGAPpT2YAfxFaQhXAzBkrkKhIB0K8JjXnPkwq29hSCECdVHqwKkOkUIqodTgUogPpQGcGxAp9PxQSoPBh9KoDAYfSgfEYkak0FNDKf+FmOyyXArxeuYU0lfYmlNI39GSQjx7KLURq+RfvHqqm/n3Nn4AAAAASUVORK5CYII=" alt="some image">
Link Unavailable.
</h1>
<p>
The link you clicked on is not available at the moment.

We apologise for any inconvenience caused.</p>
```

I think this means that I just validated my email address for the Spammer/Phisher. The link had a payload, the `WCPzyXJTZ6uvfgsK2azUUqgbikbtf74M/wFiEJE1XEtCY` in the URL, so I imagine they're able to associate that ID with my email address and update their internal system to show the email address is valid.

The big block of code in the `img` tag is the image file displayed on the page. 

## Postscript 

A few days later, I received a very similar email, but this email's links point to [r.mail.mycaptain.in](http://r.mail.mycaptain.in){target="_blank"} with a completely different experience. That domain forwards to [brevo.com/](https://brevo.com/){target="_blank"}.

Surprisingly, this phishing email has an actual email address as the sender: `sruthi.r@mycaptain.in` - I wonder if that points to the actual person who sent the email? I'm not going to reply to the email, but you can if you want to.
