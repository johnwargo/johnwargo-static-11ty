---
title: Eleventy 3 Upgrade Fixed
description: In my Eleventy 3 Migration post yesterday, I described a process I used to migrate several Eleventy sites from V2 to V3. As part of that process, I was able to skip some important upgrade/migration steps because my development and deployment environments run Node.js version 22. Specifically, even though Eleventy 3 expects all modules to use ESM, a feature in Node.js 22 allowed my sites to build and deploy successfully without it. This post describes how I completed the successfully migration to ESM.
date: 2024-12-30
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - Static Site Generators
timestamp: 2024-12-30T16:05:16.217Z
---

In [Eleventy 3 Migration](/posts/2024/eleventy-3-migration/){target="_blank"}, I described a process I used to migrate several Eleventy sites from V2 to V3. As part of that process, I was able to skip some important upgrade/migration steps because my development and deployment environments run Node.js version 22. Specifically, even though Eleventy 3 expects all modules to use [ESM](https://nodejs.org/api/esm.html){target="_blank"}, a feature in Node.js 22 allowed my sites to build and deploy successfully without it.

Even though this worked, I didn't want to leave the sites in that state. Eleventy 3 uses ESM, and I didn't want to run into issues later due to me skipping that conversion step. 

At first, I was intimidated by the process, but it turns out it's really easy to do. What hung me up was that I made an stupid developer (me) error while converting one of the site's imports. I wrote about my failure in [Eleventy cannot be invoked without 'new'](https://randomerrors.dev/posts/2024/eleventy-cannot-invoked-without-new/){target="_blank"}. Once I resolved that error, the rest of the process was easy. 

## Converting to Module

The first step in the process is adding a `type` property to the site project's `package.json` file:

```json
"type": "module",
```

Here's my example project's `package.json` file with the modification:

```json
{
  "name": "wargo-2024",
  "version": "0.1.0",
  "description": "Internet home for US Presidential candidate John M. Wargo",
  "author": "John M. Wargo",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "clean": "rimraf _site",
    "build:eleventy": "eleventy",
    "watch:eleventy": "eleventy --serve",
    "start": "npm-run-all --sequential clean watch:eleventy",
    "build": "npm-run-all --sequential clean build:eleventy"
  },
  "dependencies": {
    "@11ty/eleventy": "^3.0.0",
    "@11ty/eleventy-img": "^3.1.0",
    "@11ty/eleventy-navigation": "^0.3.5",
    "@11ty/eleventy-plugin-rss": "^1.2.0",
    "@google-analytics/data": "^3.2.2",
    "eleventy-category-pages": "^0.0.7",
    "eleventy-plugin-date": "^1.0.0",
    "eleventy-plugin-youtube-embed": "^1.9.0",
    "generate-build-info": "^0.0.3",
    "html-minifier": "^4.0.0",
    "markdown-it": "^13.0.1",
    "markdown-it-attrs": "^4.1.6",
    "npm-run-all": "^4.1.5",
    "outdent": "^0.8.0",
    "rimraf": "^5.0.1"
  },
  "keywords": [
    "Eleventy"
  ]
}
```

With that change in place, when you build the site, Eleventy will start complaining about module imports. You must fix them next.

## Migrating to Imports

The site originally used the JavaScript `require()` to load modules:

```js
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const pluginDate = require('eleventy-plugin-date');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const embedYouTube = require('eleventy-plugin-youtube-embed');
```

All I had to do was convert them, all `requires` used by the site, to this format:

```js
import module from 'module_name';
```

Here's the previous example converted:

```js
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import EleventyNavigationPlugin from '@11ty/eleventy-navigation';
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import pluginDate from 'eleventy-plugin-date';
import pluginRss from '@11ty/eleventy-plugin-rss';
import embedYouTube from 'eleventy-plugin-youtube-embed';
```

**Note:** Use the search capabilities in your code editor to find all references to `requires(` and replace them as shown in the example above. If you miss any, you'll find them during the Eleventy build process.

Don't try to build the site yet, it still won't work.

## Default Exports

The last step is to modify the exports of all of the packages loaded by your site. That means that you must migrate all versions of this code:

```js
const plugin = require('plugin-package');

module.exports = {
    // plugin code goes here
}
```

to this: 

```js
import plugin from 'plugin-package'

export default {
    // plugin code goes here
}
```

If the exported function uses parameters like the following:

```js
const plugin = require('plugin-package');

module.exports = (someVariable) => {
    // plugin code goes here
}
```

You must convert it to something like this:

```js
import plugin from 'plugin-package'

export default function(someVariable) {
    // plugin code goes here
}
```

**Note:** the `function` in the example above is required, it's not an example for a generic function name.

That's it, that's all I did to complete the site's migration to ESM.
