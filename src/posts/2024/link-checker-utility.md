---
title: Yet Another Link Checker Utility
description: Describes a node.js-based utility I created and published to validate web links in a web site or page.
date: 2024-11-15
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Web Development
timestamp: 2024-11-15T23:03:56.069Z
---

I played around this week with validating all of the links on this site and trying some tools. As part of my research I found an article called [Using Node.js to Check for Broken Links](https://seancdavis.com/posts/using-nodejs-to-check-for-broken-links/){target="_blank"} that showed how to use the npm package [linkinator](https://npmjs.com/package/linkinator){target="_blank"} to build a command-line tool for validating links on a URI.

I quickly built a command-line tool using information from the article and the linkinator package's documentation. Before long I had a full fledged link checker that met my specific needs. I called my link checker `link-checker` but since there is already a package with that name on npm, I had to add my npm username to the package name: [@johnwargo/link-checker](https://npmjs.com/package/@johnwargo/link-checker){target="_blank"}.

{% sidebar "Validating Links On This Site" %}
In my <a href="/posts/2024/validating-links/">next post</a>, I spend more time explaining how I used the two utilities to fix a lot of the links on this site.
{% endsidebar %}

The utility doesn't require any command-line parameters (which I like because I always forget them, especially for my own command-line tools) but does support a couple of them. What I like best of this utility is that it allows me to save the results to a file, enabling me to open it later in an editor and double-check the links the utility reported as broken. 

The reason for this is that many sites (like the [Adafruit Forums](https://forums.adafruit.com/){target="_blank"}) have a human checker in front of access, so for that site, and sites like it, the link checker fails on those URLs. Something like the [W3C Link Checker](https://validator.w3.org/checklink){target="_blank"} doesn't seem to have that problem.

To use the utility, you have several options, but I generally install tools like this as Global packages so I can execute them from anywhere. With the utility installed, I simply open a terminal window and execute the following command:

``` shell
checklinks
```

The utility then prompts you for all of its operational parameters, then starts scanning:

``` text
┌──────────────────┐
│                  │
│   Link Checker   │
│                  │
└──────────────────┘

by John M. Wargo (https://johnwargo.com)

√ Target site URL ... http://localhost:8080
√ Number of concurrent requests ... 100
√ Timeout value (in milliseconds) ... 10000
√ Select output options » Broken, Skipped
√ Save output to file? ... yes
√ Output file root filename (no extension) ... link-checker-results
√ Output format » Markdown (.md)

Starting scan...

--- scan activity here ---

Results successfully written to file: D:\dev\links\link-checker-results.md

Scan Results
==============================
Scanned: 1,079 links
Broken: 42 links
Skipped: 23 links
==============================
```

For my [Random Errors](https://randomerrors.dev/){target="_blank"} site, the report, in markdown format, looks like this:

``` markdown
# Link Checker Results

**Created:** 11/13/2024, 5:24:33 PM

## Broken Links

| Status | URL |
|--------|-----|
| 404 | http://subname.mysite.com/ |
| 404 | https://capacitor-community-electron-docs-site.vercel.app/ |
| 403 | https://forums.adafruit.com/viewtopic.php?f=57&t=181830&p=884590 |
| 403 | https://forums.adafruit.com/viewtopic.php?f=57&t=182024 |
| 403 | https://forums.adafruit.com/viewtopic.php?p=949364&sid=f94be453911b5999954fb2cfb572ffd2 |
| 999 | https://linkedin.com/in/jmwargo/ |

## Skipped Links

| Status | URL |
|--------|-----|
|   0 | mailto:john@johnwargo.com |

---

Report created by <a href="https://github.com/johnwargo/link-checker" target="_blank">Link Checker</a> by John M. Wargo.
```

The report looks like this in a markdown editor:

{% image "src/images/2024/link-checker-results-md.png", "Link checker results in a markdown editor", "image-full" %}

Give it a try and let me know if you like it.
