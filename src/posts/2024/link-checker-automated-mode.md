---
title: Added Automated Mode to Link Checker
description: 
date: 2024-11-16
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Node.js
timestamp: 2024-11-16T19:32:52.986Z
---

After publishing my [link checker utility](/posts/2024/link-checker-utility/), I realized I wanted the ability to write the utility's settings in a project folder so I could quickly scan links for that project. 

I just published an update that enables **Auto** mode in the utility. With Auto mode, you: 

Run the `checklinks` command the `-s` flag: `checklinks -s`. This causes the utility to prompt you for configuration settings as usual, but then writes all of your choices to a file called `link-checker-config.json` in the current folder. Once it completes writing the settings to the file, the utility exits.

The output looks like this: 

``` text
┌──────────────────┐
│                  │
│   Link Checker   │
│                  │
└──────────────────┘

by John M. Wargo (https://johnwargo.com)

√ Target site URL ... http://localhost:8080
√ Number of concurrent requests; must be greater than zero ... 10
√ Timeout value (in milliseconds); must be greater than zero ... 5000
√ Select output options » Broken
√ Save output to file? ... yes
√ Output file root filename (no extension) ... link-checker-results
√ Output format » Markdown (.md)

Saving configuration to D:\dev\node\link-checker\link-checker-config.json
```

Next, run the `checklinks` command with the `-a` flag: `checklinks -a`

``` text
┌──────────────────┐
│                  │
│   Link Checker   │
│                  │
└──────────────────┘

by John M. Wargo (https://johnwargo.com)

Auto mode enabled
Starting scan...

--- scan activity here ---

Results successfully written to file: D:\dev\node\link-checker\link-checker-results.md
Opening report in Visual Studio Code

Scan Results
==============================
Scanned: 250 links
Broken: 5 links
==============================
```

I hope you like it.
