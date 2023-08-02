---
title: Added Content Stats to Eleventy Plugin Post Statistics
description: This post describes some new enhancements to my Eleventy Plugin Post Statistics plugin.
date: 2023-07-15
showCoffee: 
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

When I created the [Eleventy Plugin Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} plugin, my plan was to include post content statistics as well (character, word, paragraph counts and more). Unfortunately, I encountered an error in the Eleventy build process whenever I tried to access the post content; Eleventy simply doesn't allow it.

The plugin was functional, so I released it expecting that I'd add support for content statistics later. I recently picked the plugin work again, migrating the plugin to TypeScript and adding some little features. Today I decided to tackle post content stats and I got it working.

I couldn't get around Eleventy's issue with throwing an error every time I tried to access post content using the `collections` API, so I decided to read post files directly and calculate the content statistics that way. 

When looping through the posts in a site, Eleventy tracks the `post.page.inputPath` property which is the relative path to the selected post. Once I had access to that, I simply opened the file directly (using node's `fs.readFileSync` method) and tore through the content.

The plugin delivers a lot more data now:

```json
{
  "avgDays": 11.17,
  "avgCharacterCount": 2034.27,
  "avgCodeBlockCount": 0.02,
  "avgParagraphCount": 3.25,
  "avgWordCount": 366.45,
  "postCount": 100,
  "firstPostDate": "2020-06-20T00:00:00.000Z",
  "lastPostDate": "2023-07-12T00:00:00.000Z",
  "years": [    
    {
      "year": 2021,
      "postCount": 31,
      "avgDays": 11.84,
      "avgCharacterCount": 2045.42,
      "avgCodeBlockCount": 0,
      "avgParagraphCount": 3.24,
      "avgWordCount": 369.06
    },
    {
      "year": 2022,
      "postCount": 29,
      "avgDays": 12.41,
      "avgCharacterCount": 2015.14,
      "avgCodeBlockCount": 0,
      "avgParagraphCount": 3.28,
      "avgWordCount": 361.59
    },
    {
      "year": 2023,
      "postCount": 19,
      "avgDays": 10.37,
      "avgCharacterCount": 1949.47,
      "avgCodeBlockCount": 0,
      "avgParagraphCount": 3.13,
      "avgWordCount": 352.95
    }
  ]
}
```

I also updated the sample statistics page in the plugin repository (and this site) to display all the new data:

{% image "src/images/2023/plugin-stats-example.png", "Plugin Sample Page", "image-full" %}