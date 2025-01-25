---
title: JavaScript Writing a Backslash to a File
description: In this article, I encountered a problem while converting a
  certificate to an Arduino header file due to the use of backslashes in the
  file. Since JavaScript requires escaping backslashes, I had to find a
  workaround to include a single backslash in the file.
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - JavaScript
  - Node.js
  - Web Development
timestamp: 2025-01-25T00:09:00.924Z
generatedDescription: true
---

As I worked on the two Cert2Arduino projects ([Web](https://johnwargo.com/posts/2025/public-cert-arduino/){target="_blank"} and [Node.js](https://johnwargo.com/posts/2025/certificate-to-arduino-command-line/){target="_blank"}) I wrote about recently, I ran into a problem with one aspect of the conversion process.

## The Situation

Most of the articles I found online that covered converting a certificate to an Arduino header file used a backslash as a line continuation character in the header file. Like this:

```c
const char* cert= \
"-----BEGIN CERTIFICATE-----\n" \
"MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw\n" \
"TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\n" \
"cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4\n" \
.
.
.
"4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA\n" \
"mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d\n" \
"emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=\n" \
"-----END CERTIFICATE-----\n";
```

## The Problem

As I coded this, I realized that there was no way for me to physically write the backslash (`\`) to the file. It drove me crazy. 

Here's why...

To use a backslash in a JavaScript string, you must 'escape' it with another backslash. So, if I want to make a string with a single backslash in it, I have to use two of them:

```c
let mySlash = "\\";
```

Basically, the backslash character tells the JavaScript compiler to ignore the character in the string that follows. But when I wrote this to the file, it had both backslashes. Sigh.

Let me give you another example, say I want to use quote marks in my string, I can't do that because a quote mark ends the previous quote mark. If the JavaScript compiler finds them in the middle of the string it won't know what to do. I have to use the backslash to tell the compiler to ignore the quote marks in the middle of the string. 

**BAD**

```js
let myQuoteString = "this is a "string"";
```

As you may be able to tell from the formatting of the text, JavaScript doesn't understand that. The string ends right before the s in string. JavaScript doesn't know what to do with the rest of that stuff.

**GOOD**

```js
let myQuoteString = "this is a \"string\"";
```

But, if you escape the middle quotes with a backslash, JavaScript's happy. 

## The Solution

I had to get creative. To get the backslash I needed, I created a variable called `slash`:

```js
const slash = String.fromCharCode(92);
```

`slash` is the representation of the backslash without actually being a string with a backslash in it. I don't know, all I know is it works. 92 is the ANSI character code for the backslash character.

```js
import fs from 'fs';
import path from 'path';

const slash = String.fromCharCode(92);
const cr = String.fromCharCode(13);

let outputFile = path.join(process.cwd(), "myfile.txt");

const content = 'Here is a backslash: ' + slash + cr;

fs.writeFile(outputFile, content, 'utf8', (error) => {
  if (error) {
    console.error('An error occurred while writing to the file:', error);
    return;
  }
  console.log('Successfully written to the file.');
});
```

JavaScript has something called [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals){target="_blank"} or Template Strings that I could use for this as well:

```js
import fs from 'fs';
import path from 'path';

const slash = String.fromCharCode(92);
const cr = String.fromCharCode(13);

let outputFile = path.join(process.cwd(), "myfile.txt");

const content = `Here is a backslash: ${slash} and some more text ${cr}`;

fs.writeFile(outputFile, content, 'utf8', (error) => {
  if (error) {
    console.error('An error occurred while writing to the file:', error);
    return;
  }
  console.log('Successfully written to the file.');
});
```

## Writeable Streams

I also started looking at alternative ways to write content to a file. JavaScript supports [Writable Streams](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream){target="_blank"} as a way to stream content to a file. 

Then, to write it to a file, I simply did this:

```js
const slash = String.fromCharCode(92);  // backslash character
const cr = String.fromCharCode(13);     // carriage return

let outputFile = "/test/myfile.txt";

const writableFileStream = fs.createWriteStream(outputFile);
writableFileStream.write("my string with a " slash + " in it." + cr);
writableFileStream.close();
```

or, using template strings:

```js
import fs from 'fs';

const slash = String.fromCharCode(92);
const cr = String.fromCharCode(13);

let outputFile = "/test/myfile.txt";

const writableFileStream = fs.createWriteStream(outputFile);
writableFileStream.write(`my string with a ${slash} in it.${cr}`);
writableFileStream.close();
```

The examples I just gave were in Node.js; to do this in JavaScript in the browser it's a little different (see [FileSystemWritableFileStream](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream){target="_blank"}):

```js
const slash = String.fromCharCode(92);  // backslash character
const cr = String.fromCharCode(13);     // carriage return

let outputFile = "/test/myfile.txt";

// open the browser's Save File dialog to get a file handle
const fileHandle = await window.showSaveFilePicker();
// create a writableFileStream against the file handle
const writableFileStream = await fileHandle.createWritable();
// write to the file
await writableFileStream.write(`my string with a ${slash} in it${cr}`);
// close the file
await writableFileStream.close();
```

I hope this helps you.
