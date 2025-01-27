---
title: Certificate to Arduino Command-line
description: 
date: 2025-01-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Arduino
  - JavaScript  
  - Internet of Things (IoT)
timestamp: 2025-01-24T11:59:08.380Z
---

Before I created the web application described in [Automated Public Cert to Arduino Header Conversion](/posts/2025/public-cert-arduino/){target="_blank"}, I started with a simple [node.js](https://nodejs.org/en){target="_blank"} command-line utility. I like command-line tools and starting with the Node version made sense to me. I switched to the web app version once I realized that most people who needed to do the certificate conversion to Arduino wouldn't have node installed on their development systems. 

So I stepped away from the incomplete command-line utility then built, deployed, and documented the web app version. Last night, I finished the command-line version and published it. Its called, hopefully not surprisingly, Cert2Arduino and you can find it on npm at [Certificate to Arduino Header Converter](https://npmjs.com/package/cert2arduino){target="_blank"}.

When you execute it, it prompts for the same information the web application does:

1. The path to the downloaded certificate file
2. Whether you want to append a backslash (Arduino's line continuation character: `\`) or not.
3. The variable name assigned in the Arduino header file generated from the certificate file.

```text
Cert2Arduino

Converts a certificate file to a C char array for use in Arduino sketches.

√ Select the input file to convert: » google.crt
√ Append backslash to output lines? ... no / yes
√ Enter the name for the Arduino certificate variable: ... cert

Input file: D:\dev\node\cert2arduino\google.crt
Output file: D:\dev\node\cert2arduino\cert.h

Done!
```

Like the web application, it saves the outputted file to a file using the variable name as the file name. The web app allows you to change it, but I didn't do that here. 

Anyway, for you node users like me, you now have a tool you can use to convert a downloaded certificate file into an Arduino header file to use in your Arduino sketches.
