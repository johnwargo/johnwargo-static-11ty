---
title: Added Folder Selection My New Post Utility
description: Added an enhancement to my Eleventy New Post utility to support choosing the target folder during post creation.
date: 2024-02-06
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - Node.js
---

I started working on an Eleventy-based documentation site recently and noticed an issue with my [Eleventy New Post](https://github.com/johnwargo/eleventy-new-post){target="_blank"}. For this site, I planned to use a separate folder under `src/posts` for each product being documented on the site. When creating a new post using the utility, I wanted to select the target folder as part of the new post creation process like this:

```text
┌───────────────────┐
│                   │
│   11ty New Post   │
│                   │
└───────────────────┘

by John M. Wargo (https://johnwargo.com)

√ Enter a title for the post: ... Bonfire Planning
√ Select one or more categories from the list below: » People
? Select the target folder for the new post: » - Use arrow-keys. Return to submit.
>   src\posts
    src\posts\Eleventy
    src\posts\Delphi
    src\posts\Web
```

With this modification, you can select the `posts` folder (controlled through a configuration setting for the utility) or any of the sub-folders underneath the `posts` folder as shown in the example.
