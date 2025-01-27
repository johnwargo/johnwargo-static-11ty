---
title: American Airlines Poor Unsupported Browser Implementation
description: In the typical Stupid Developer Tricks approach, the American Airlines iPad app doesn't support rendering video content in Chrome, but still offers a Play button even though it knows it won't work. Sigh.
date: 2023-09-23
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Stupid Developer Tricks
---

It's been a really long time since I've published a Stupid Developer Tricks post. Aaaah, it feels good to have one again.
 
I wife and I flew home from Colorado this week; we vacationed in Telluride and attended the [Telluride Blues and Brews Festival](https://tellurideblues.com/){target="_blank"}. I tested positive for COVID while we were there and delayed our trip home. On the flight home, I decided to watch movies instead of reading books and when I launched the app to access streaming media I received the following message: "Free entertainment is not supported on this browser" as shown in the image below.

{% image "src/images/2023/unsupported-browser.png", "Unsupported browser message", "image-full" %}

I use my iPad every day, but I hate Safari, so my default browser on the device is Chrome. I'm a little surprised by this issue as apparently this works on Chrome on Android. I didn't dig into the details, but I imagine its because of an issue on the iOS side rather than Chrome because Chrome is Chrome. 

Anyway, when you look at the image, notice that the **Play** button for *The Little Mermaid*. The Stupid Developer Trick here is that the Engineering team that built this web site knows I'm trying to access "Free entertainment" on an incompatible browser but still decided to give me a button to launch the entertainment.

If the browser doesn't support this, the product team should have instructed Engineering to hide or disable the **Play** button. At the time I was COVID foggy, so I don't remember what happened when I tapped the button, but I think I saw another error message when I did. 

However, it makes absolutely no sense to offer users an option you know does not work. As soon as the app detected it was running on an incompatible browser, it should have removed all Play buttons from the page. 

At this point, the user has to switch browsers, so the next thing that should happen is the app should help the user do that. 

One option could be to launch Safari on behalf of the user, but I'm not sure a web app can do this. In this case, the American Airlines app opened the browser window, so why didn't the app open Safari instead of the default browser? That would be an easy fix, right?

Another option is to give the user a button to copy the page URL to the clipboard to save some steps when they get over to Safari. 

I'm just so surprised because American Airlines has a pretty good app and web sites. It feels like nobody took the time to think about how users act or what users need in this case. 