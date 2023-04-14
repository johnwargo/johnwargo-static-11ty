---
title: Outlook Populating Country Only in Contact
description: 
date: 2015-10-07
headerImage: 
categories: [Miscellaneous]
tags: post
---

For years, I've had this problem in Microsoft Outlook where Outlook will populate only the country field for select contacts. I've never done it purposefully, but somehow either because of some weird sync process or other reason, I had a bunch of contacts with no address, only a country set for them.

![](/images/2015/michael-palin-contact-card.png)

Figure 1 – Michael Palin Contact Card (NOT his real contact information)

Anyway, this has been bugging me for some time and I've been too lazy to fix this manually. So, with all the Outlook integration code I've been doing lately, I decided I'd write an app that whacks the Country fields value (there are 4 of them: mailing, home, work and other) from every Outlook contact.

I've posted the [Delphi project code to GitHub](https://github.com/johnwargo/Outlook-Kill-Country-Delphi). The app basically opens a memo field and processes all of the contact records, blanking out the country if it's 'United States of America'. I got the code working then cleaned up my contact list.

Thought about it a bit and realized that I could have done a better job with the code. I made separate blocks of code to check each country field individually, turn out that there isn't (that I could find) a way to retrieve a contact record field value by name, so I don't think there's a better way to do this. Also, whenever the app whacks a country field, it saves the record. I could have easily tracked whether a change was made and save only once, but I didn't.