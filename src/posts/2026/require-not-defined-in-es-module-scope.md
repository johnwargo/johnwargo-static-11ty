---
title: Eleventy Require Not Defined in ES Module Scope
description: "I recently published a new Eleventy plugin that generates a list
  of links from the current page. However, when I tried to implement it on my
  site, which was still running on Eleventy 2.x, I ran into module problems.
  After upgrading to Eleventy 3.x, I still encountered errors. It wasn't until I sought help from the
  Eleventy Discord community that I realized I had missed fixing `require`
  statements within my site's modules and global data files."
date: 2026-01-11
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Eleventy
timestamp: 2026-01-11T12:13:54.965Z
generatedDescription: true
---

As I described in [Eleventy Adding Page Links to a Post](/posts/2026/eleventy-adding-page-links-to-a-post/){target="_blank"}, I published a new [Eleventy](https://www.11ty.dev/){target="_blank"} plugin yesterday that delivers a shortCode that generates a list of links from the current page. When I built the plugin, I built it using Eleventy 3.12. 

After publishing the plugin, I tried to implement it on this site but the site crashed and burned (wouldn't build). I suddenly remembered that I never completed this site's upgrade to Eleventy 3.x. I upgraded all of my other sites, but for this one I kept running into module problems, so I reverted it to Eleventy 2.x.

Well, I had this shiny new plugin I wanted to put to work, so I had to figure this out. I went through all of the steps and still bumped up against module problems. 

Here's what I did: 

+ Added `type: module` to my `package.json` file.
+ Changed all my `require`s to `import`s
+ Changed all my plugins to `export default function() {}`
+ Upgraded all my packages to the latest versions (I did this late in the process after I couldn't get this to work any other way), just in case.

Every time I tried to build the site, I received a variant of the following error:

```
[11ty] Eleventy Fatal Error (CLI):
[11ty] 1. Error in your Eleventy config file 'eleventy.config.js'. (via EleventyConfigError)
[11ty] 2. There was a problem importing 'eleventy.config.js' via import(esm) (via EleventyImportError)
[11ty] 3. require is not defined in ES module scope, you can use import instead
[11ty] This file is being treated as an ES module because it has a '.js' file extension and 'D:\dev\11ty\johnwargo\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension. (via ReferenceError)
```

I've tried changing the Eleventy config to `eleventy.config.cjs` as suggested, but then I get a different error (I didn't save it). Changing it to a `.mjs` extension doesn't make it any better. 

Having spent one or more hours on this, I decided it was time to ask the experts over on the [11ty Discord](https://www.11ty.dev/blog/discord/){target="_blank"}. Member **uncenter** quickly pointed out that I was probably still using `require` somewhere in the site (I didn't think I was, but I was wrong). Member **vrutehagel** even went ahead and found all the instances I'd missed and fixed them in a [pull request](https://github.com/johnwargo/johnwargo-static-11ty/pull/96){target="_blank"}; simply amazing. 

{% sidebar "Replacing <code>require</code> with <code>import</code>" %}
Be thorough when upgrading an Eleventy site to version 3, you must fix all of your code's use of <code>require</code>. Not only must you change how you load modules included with your project, you must also replace each module's use of <code>require</code> as well - as shown in the image below.
{% endsidebar %}

What I'd done, likely multiple times as I tried to make this work, was fix the modules/plugins I'd written (or borrowed from other sites), but I missed fixing any of my code-based [Global Data Files](https://www.11ty.dev/docs/data-global/){target="_blank"} and I definitely missed fixing `require` statements used **within** the site's modules. 

That was a huge miss for me and cost me a lot of time. 

Here are some examples from the PR:

{% image "src/images/2026/11ty-3-upgrade-pr.png", "", "image-full" %}
