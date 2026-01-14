---
title: Outlook Pastel Categories macOS
description: I recently had an issue with Microsoft Outlook on my work MacBook
  where the Calendar view displayed categories in annoying pastel colors instead
  of solid ones. After searching for a solution online and contacting IT support
  with no luck, I stumbled upon a fix in the Outlook for macOS Help menu under
  **Clear Application Data**. By selecting the option to clear data for
  Experimental Features, I was able to revert the category colors back to solid.
date: 2025-06-05
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Microsoft Outlook
timestamp: 2025-06-05T22:41:03.019Z
generatedDescription: true
---

A few weeks ago, I launched Microsoft Outlook on my work MacBook and noticed that the Calendar view displayed categories in pastel colors. I don't know what happened and I know I didn't do anything, but those had always been solid colors. The pastel colors were really annoying and made it hard to see my appointments the way I wanted to see them. 

I did a quick search online and couldn't find any current documents that provided a solution to this problem. Poking around in Settings (both in Outlook and in macOS), I couldn't find anything I could do to revert the colors to solid.

I submitted an IT ticket with my employer's help desk and didn't get anywhere. Even with the support technician controlling my system and poking around in the same places I did.

At this point, I gave up and realized I was stuck with these ridiculous pastel colored categories in Outlook. 

Around the same time, I noticed that my Zoom plugin for Outlook no longer worked. As I poked around looking for a solution to that problem, I found a way to fix the pastel categories issue.

In the Outlook for macOS **Help** menu, there's an option called **Clear Application Data** :

<img src="src/images/2025/outlook-macos-appdata-1.png" alt="macOS Outlook Help Menu" />

Select that menu item and Outlook will open the following dialog:

<img src="src/images/2025/outlook-macos-appdata-2.png" alt="macOS Outlook Clear Application Data dialog" />

Next, select the option to clear data for **Experimental Features** and click the **Clear** button. 

When I did this and restarted Outlook, all my solid category colors came back; the pastels are gone.

## Postscript

I made the change described above and it worked for me, **but only temporarily.** Sigh. Clearing experimental features clears them from the local config, but then Outlook pulls them down from the server some time later. So, the next morning when I started outlook the pastels were back.  

I performed the reset steps again, restarted Outlook,  and the pastels came back a few minutes later.

What a horrible, horrible experience. Why would Microsoft even consider forcing pale/muted colors for categories when I've used solid colors in Outlook for DECADES. It's a ridiculous change and as far as I can tell there's no getting around it. WTF?

Searching around I found a Microsoft Feedback site with feedback called [Calendar Category Colors Only Pastel Now!](https://feedbackportal.microsoft.com/feedback/idea/6ae6581c-7bf8-ef11-a4dd-7c1e52c1c6b2){target="_blank"}. Follow that link and make your voice heard if you hate this 'feature' as much as I do.
