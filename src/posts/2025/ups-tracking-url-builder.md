---
title: UPS Tracking URL Builder
description: 
date: 2025-09-26
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Miscellaneous
  - Delphi
timestamp: 2025-09-27T00:52:17.580Z
---

- [ ] Write readme?
- [ ] Publish GitHub repo
- [ ] Publish release through GitHub repo


When you order packages online, a lot of vendors provide you with a tracking number instead of a tracking URL for your package. Or, when you get a tracking URL from UPS, the URL has a bunch of extra junk in it that isn't needed to actually track the package. In frustration, I built a little Windows app (in Delphi, of course) that takes a UPS tracking number and converts it into a tracking URL you can use to, you know, track the package.

{% image "src/images/2025/ups-tracking-url-builder.png", "UPS Tracking URL Builder App window", "image-full" %}

You can find the app's source code at [UPS-Tracking-URL-Builder-Delphi](https://github.com/johnwargo/UPS-Tracking-URL-Builder-Delphi){target="_blank"} and download a Windows installer from [Releases](https://github.com/johnwargo/UPS-Tracking-URL-Builder-Delphi/releases){target="_blank"}.

A tracking link shared by UPS looks something like this:

```text
https://www.ups.com/track?loc=en_US&Requester=SBN&tracknum=1ZYR##############&AgreeToTermsAndConditions=yes&WT.z_eCTAid=ct1_eml_Tracking__ct1_eml_tra_eml_sb_resi_3mde&WT.z_edatesent=09232025/trackdetails
```

It includes internal tracking stuff UPS uses to track your use of the URL (I guess). If you paste the actual tracking number into the UPS site, the site opens a tracking page using a URL in the following format:

```text
https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=1ZYR##############/trackdetails
```

My little application takes a UPS tracking number (in the US they begin with a `1Z`) and converts it to the URL format shown above.

In the app, you simply click the **Copy** button to copy the generated URL to the system's clipboard or click the **Open Tracking URL** to open the generated URL in the browser.

The **Auto close** checkbox, when enabled, automatically closes the application after you click either the **Copy** or **Open Tracking URL** buttons.

## Why do I want the tracking URL in short format?

You may have asked yourself why I want the tracking URL in short format. I use [todoist](https://www.todoist.com){target="_blank"} to track all of my incoming packages and I store the tracking URL in the comments field so I can click the link to check the current delivery timeframe. 
