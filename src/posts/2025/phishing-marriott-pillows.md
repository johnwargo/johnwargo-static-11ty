---
title: Phishing Marriott Pillow Promotion
description: 
date: 2025-12-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Phishing
timestamp: 2025-12-24T12:38:55.490Z
---

I received a lot of new spam and phishing messages lately; I have some analysis articles queued up to write. For this post, I'm writing about a very professional looking phishing email that appears to be from Marriott. I'll prove here that the message is not from Marriott and they're not giving customers free pillows.

Here's the email I received:

<img src="/images/2025/phishing-marriott-1.png" alt="Marriott Phishing Email" />

Notice how its very professional looking, that's what first caught my eye when I received it. The writing is excellent and there's only one misspelled word that I noticed. 

To help the search engines, here's the main body from the message:

```text
An Appreciation for Your Recent Stay

Because your travels included a Marriot or partner hotel in the last twelve months, we are pleased to provide a two-piece luxury cooling pillow set at no charge to your household.

Program Details: This is open to you based on your past-year stay. You will not be billed for the pillows or the qualifying stay nights. After a brief questionnaire, you may also secure a two-night stay at participating locations, provided at no charge. One pillow set per household. Total allocation for this program is 800 sets. This concludes tomorrow.
```

{% sidebar "Confirmed Phishing Email" %}
This is clearly a spam or phishing email. Marriott is not giving 800 customers a free two night stay and pillows.
{% endsidebar %}

This is clearly a spam or phishing email. Marriott is not giving 800 customers a free two night stay and pillows. There are few glaring issues with this email, but it is very clear that it's fake.

First of all, the only place the email spells Marriott correctly is in the subject line:

> Your thank you gift from your Marriott stay

In the body of the email its spelled 'Marriot'. Its possible that Marriott would send an email with that mistake, but it's not likely. You'll notice too that there's no Marriott logo anywhere on the message; Marriott usually includes a logo and/or a banner image in promotional emails.

Those are really the only ways I could tell at first glance that the email was fake. 

Looking deeper at the email, I noticed a block of text at the bottom of the email in a very small text size and greyed out so it's hard to see. Here's the content I found there:

> He leaned back in the chair, the leather creaking softly. "So, the entire concept hinges on that initial moment of recognition," he said, gesturing with his pen. "Not a transaction, but an acknowledgment." Across the table, she nodded, tapping her notebook. "Exactly. It's the difference between handing someone a manual and showing them the first step. The rest follows naturally if the foundation is solid." Outside the conference room window, the city moved in its usual patterns, cars flowing like rivers of light in the gathering dusk. They had been at this for hours, mapping out sequences and user pathways. "Remember the feedback from the pilot group" she asked. "The common thread was appreciation for clarity, for not having to decipher intent." He made a note. "Clarity. Simplicity. Directness. They're not just buzzwords here; they're the operating system." A quiet settled between them, the productive kind filled with turning gears. She thought about how complex systems often boiled down to elegant, simple principles. The coffee in the carafe had gone cold, but neither moved to get more. "We should break," he said finally, stretching his arms. "Let it settle overnight." "Agreed," she said, closing her laptop. The ideas would percolate, find their own connections in the background. As they gathered their things, the cleaning staff's vacuum hummed from a distant hallway, a familiar end-of-day sound. Walking to the elevator, they discussed mundane things: weekend plans, a new restaurant opening, the relentless march of garden weeds. The work was important, but so was this, the easy shift from collaboration to casual conversation. The elevator doors slid open with a soft chime, offering a bright, mirrored interior. They stepped in, the day's diagrams and discussions folding away for the evening, leaving room for thoughts of home, of dinner, of quiet hours ahead. 

In the very early days of spam messages, scammers hid paragraphs of text in the message to trick malware scanners into believing it was an actual email between two people. So many years later, I'm not sure why this is there as I thought scammers and scanners moved on from that.

When you look at the link behind the **Participate to Get Your Pillows + 2 Night Stay** button on the email, you can definitely see that this email is a problem. The link points to the following URL:

<img src="/images/2025/phishing-marriott-2.png" alt="Marriott Phishing Email Link" />

**Note:** I'm showing this as an image so people don't accidentally click on it and I don't want to get blocked by search engines.

When you click on a link, a browser window opens and redirects to the following link (with a bunch of data omitted):

<img src="/images/2025/phishing-marriott-3.png" alt="Marriott Phishing Email Link Redirected" />

It opens a page that looks very much like a Marriott page asking you to fill out a survey in order to earn your prize. Its not a Marriott page, look at the URL in the previous image. I didn't try this, but I assume that when you click the **Start Survey** button you'll be prompted to provide your Marriott credential and that's where they get you.

<img src="/images/2025/phishing-marriott-4.png" alt="Marriott Phishing Site" />

Notice the sense of urgency they create at the bottom of the page: *Offer expires in 4 minutes*. When they do this, they're trying to get you to ignore any issues with the page and start the survey as quickly as possible.
