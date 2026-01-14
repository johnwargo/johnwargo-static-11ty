---
title: Eleventy 3 Upgrade
description: I run quite a few sites on Eleventy; you can see the complete list on this site's Sites area. The Eleventy team released version 3.0 a while back and I finally got around to upgrading some of the sites. This post describes the process I used to migrate a couple of the sites.
date: 2024-12-29
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - JavaScript  
  - Static Site Generators
timestamp: 2024-12-29T15:11:56.230Z
---

I run quite a few sites on [Eleventy](https://11ty.dev/){target="_blank"}; you can see the complete list on this site's [Sites](/about/sites/){target="_blank"} area. The Eleventy team released version 3.0 a while back and I finally got around to upgrading some of the sites. This post describes the process I used.

Eleventy provides some tooling to help with this process, specifically the Upgrade Helper, but I also found some other sites with articles explaining the upgrade process:

- [Major Version Upgrade Helper](https://11ty.dev/docs/plugins/upgrade-help/){target="_blank"}
- [eleventy-upgrade-help v3.0](https://github.com/11ty/eleventy-upgrade-help){target="_blank"}
- [Upgrading to Eleventy v3](https://mxb.dev/blog/eleventy-v3-update/){target="_blank"}
- [Upgraded to Eleventy 3.0 (Beta)](https://raymondcamden.com/2024/08/05/upgraded-to-eleventy-30-beta){target="_blank"}

For this post, I upgraded my 2024 US Presidential Candidacy site: [Wargo 2024](https://wargo2024.com/){target="_blank"} which I'll pull down as soon as the domain expires and I don't expect to run again. I'll keep the source code available online, you can find it on GitHub at [wargo-2024-11ty](https://github.com/johnwargo/wargo-2024-11ty){target="_blank"}.

## Setting The Package Type

In [Upgrading to Eleventy v3](https://mxb.dev/blog/eleventy-v3-update/){target="_blank"}, the author instructs you to change your Eleventy project's package type to `module`, but I found that I didn't need to do that because my development system runs Node.js 22 which makes this change unnecessary. 

Not changing this caused me some problems later, refer to the **Netlify Hosting Issue** section below for details.

If you're not running Node.js 22, you must manually convert all of the packages used by your site to use ESM Modules. Instructions for doing so are in the Upgrade Helper output below and the link at the beginning of this section.

## Eleventy Upgrade & Tools Install

The Eleventy team published a helper plugin that helps you identify problems with your site during the upgrade process. To perform the initial upgrade, open a terminal window in your Eleventy project folder and execute the following commands:

```shell
npm install @11ty/eleventy@3
npm install @11ty/eleventy-upgrade-help@3
```

This replaces the Eleventy 2.x package with the 3.x package and installs the helper. 

Before executing those commands, my project's `package.json` file looked like this:

``` json
{
  "name": "wargo-2024",
  "version": "0.0.1",
  "description": "Internet home for US Presidential candidate John M. Wargo",
  "author": "John M. Wargo",
  "license": "MIT",
  "scripts": {
    "clean": "rimraf _site",
    "build:eleventy": "eleventy",
    "watch:eleventy": "eleventy --serve",
    "start": "npm-run-all --sequential clean watch:eleventy",
    "build": "npm-run-all --sequential clean build:eleventy"
  },  

  "dependencies": {
    "@11ty/eleventy": "^2.0.1",
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

After the changes: 

```json
{
  "name": "wargo-2024",
  "version": "0.1.0",
  "description": "Internet home for US Presidential candidate John M. Wargo",
  "author": "John M. Wargo",
  "license": "MIT",
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
    "@11ty/eleventy-upgrade-help": "^3.0.1",
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

**Note:** I changed the minor version of the package manually to 0.1.0.

With those changes in place, you must modify the project's `eleventy.config.js` file to load the helper plugin:

``` js
 const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function(eleventyConfig) {
  // UpgradeHelper must be listed last in the list of plugins
  eleventyConfig.addPlugin(UpgradeHelper);
};
```

**Note:** For Upgrade Helper to work correctly, it must be the last plugin loaded.

Here's a complete example of the modified file from the project (with shortcodes and some other stuff removed):

```js
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const pluginDate = require('eleventy-plugin-date');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const embedYouTube = require('eleventy-plugin-youtube-embed');
// upgrade helper
const UpgradeHelper = require('@11ty/eleventy-upgrade-help');

// local plugins
const pluginImages = require('./eleventy.config.images.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(pluginDate);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginImages);
  // upgrade helper
  eleventyConfig.addPlugin(UpgradeHelper);

  [
    // Data files
    'src/robots.txt',
    'src/_data/*',
    // Template files
    'src/assets/css/',
    'src/assets/js/',
    'src/assets/sass/',
    'src/assets/webfonts/',
    // Images folders
    'src/images/*',
    'src/images/headers/*',
  ].forEach((path) => {
    eleventyConfig.addPassthroughCopy(path);
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    }
  }
};
```

At this point, the site's been upgraded to Eleventy 3.x. With that in place, you're ready to test the upgraded site; this is where the fun starts.

## Testing The Upgrade

To test the upgraded site, execute the Eleventy build process:

```shell
npm run build
```

The Upgrade Helper will analyze your site and display the results of multiple tests it performed against the site. You'll also see the normal build process output as shown in the following image:

<img src="src/images/2024/11ty-upgrade-01.png" alt="Eleventy Upgrade Helper output" />

Here's the complete output from the process:

```text
D:\dev\11ty\wargo-2024>npm run build

> wargo-2024@0.0.1 build
> npm-run-all --sequential clean build:eleventy

> wargo-2024@0.0.1 clean
> rimraf _site

> wargo-2024@0.0.1 build:eleventy
> eleventy

[11ty/eleventy-upgrade-help] ---
[11ty/eleventy-upgrade-help] This plugin will help you migrate from 2.0 to 3.0.
[11ty/eleventy-upgrade-help] If you are migrating from 0.x or 1.x, please use a previous version of this plugin.
[11ty/eleventy-upgrade-help] ---
[11ty/eleventy-upgrade-help] PASSED You are using Node v22.12.0. Node 18 or newer is required.
[11ty/eleventy-upgrade-help] PASSED Eleventy will fail with an error when you point `--config` to a configuration file that does not exist. You are not using `--config`—so don’t worry about it! Read more: https://github.com/11ty/eleventy/issues/3373
[11ty/eleventy-upgrade-help] PASSED You aren’t using `--formats=` or  `--formats=''` but if you were you should know that these are now empty template format sets. In previous versions, they were aliased to "*". Read more: https://github.com/11ty/eleventy/issues/3255
[11ty/eleventy-upgrade-help] PASSED No {pug,ejs,haml,mustache,handlebars} templates were found in this project. If you were, you would have needed to install plugins for these: https://github.com/11ty/eleventy-plugin-template-languages. Learn more: https://github.com/11ty/eleventy/issues/3124
[11ty/eleventy-upgrade-help] NOTICE The `js-yaml` dependency was upgraded from v3 to v4 to improve error messaging when folks use tabs in their front matter. GitHub issue: https://github.com/11ty/eleventy/issues/2126 Most folks will be unaffected by this change but you can read the `js-yaml` migration guide: https://github.com/nodeca/js-yaml/blob/master/migrate_v3_to_v4.md
[11ty/eleventy-upgrade-help] PASSED The Serverless plugin was removed from Eleventy core in 3.0. Any use will throw an error, so if you don’t see an error you’re not using it. Learn more: https://11ty.dev/docs/plugins/serverless/
[11ty/eleventy-upgrade-help] PASSED The Edge plugin was removed from Eleventy core in 3.0. Any use will throw an error, so if you don’t see an error you’re not using it. Learn more: https://11ty.dev/docs/plugins/edge/
[11ty/eleventy-upgrade-help] PASSED The `htmlOutputSuffix` feature was removed. It doesn’t look like you were using it! Learn more: https://github.com/11ty/eleventy/issues/3327
[11ty/eleventy-upgrade-help] PASSED No aliases were added via `eleventyConfig.addExtension()`. If you had added an alias, it would need to be also added to your active template formats. Learn more about template formats: https://11ty.dev/docs/config/#template-formats or about this change: https://github.com/11ty/eleventy/issues/3302
(Use `node --trace-deprecation ...` to show where the warning was created)
[11ty] Writing ./_site/algolia.json from ./src/algolia.liquid
.
. (details removed)
.
[11ty] Writing ./_site/posts/2023/debt-ceiling-ridiculousness/index.html from ./src/posts/2023/debt-ceiling-ridiculousness.md (liquid)
[11ty/eleventy-upgrade-help] This plugin is intended for temporary use: once you’re satisfied please remove this plugin from your project.
[11ty/eleventy-upgrade-help] NOTICE Your project has .html output files (×22) that don’t have a populated <meta name="generator" content> tag. It would be helpful to Eleventy if you added it (but isn’t required). Applicable input files: ./src/articles.liquid, ./src/index.md, ./src/search.liquid, ./src/store.liquid, ./src/categories/news.liquid, ./src/categories.liquid, ./src/policies.liquid, ./src/categories/announcements.liquid, ./src/categories/ridiculousness.liquid, ./src/about.md, ./src/404.md, ./src/policies/fiscal-responsibility.md, ./src/policies/womens-rights.md, ./src/posts/2020/announcing-my-presidential-campaign.md, ./src/policies/immigration.md, ./src/policies/legalizing-marijuana.md, ./src/policies/firearm-responsibility.md, ./src/posts/2024/suspending-campaign.md, ./src/posts/2023/connecting-with-voters-in-west-virginia.md, ./src/posts/2024/age-limits-all-around.md, ./src/posts/2024/the-stupidity-of-our-electorate.md, ./src/posts/2023/debt-ceiling-ridiculousness.md Read more: https://11ty.dev/docs/data-eleventy-supplied/#use-with-meta-namegenerator
[11ty] Copied 110 Wrote 26 files in 0.69 seconds (v3.0.0)
```

As you can see from the results, most of the tests passed with only a single recommended change; I'll explain that change in the next section.

If the Upgrade Helper identifies any errors, you must fix those errors before continuing. 

{% sidebar "Upgrade Hell" %}
When I first attempted to upgrade this site, I tried to follow the instructions regarding converting all of the site's modules to ESM. This was a nightmare because every time I fixed one issue, another one popped up. After trying for a couple of hours to squash all of the errors, I finally gave up and started the upgrade process on a smaller, less complicated site. It's there that I realized I didn't need to migrate everything to ESM, it all just worked on Node.js 22.
{% endsidebar %}

If you're using a version of Node.js older than 22, the Upgrade Helper will likely report errors for every non-ESM module used by the site. It reports one at a time, so you must fix an error before running the build again to find the next one.

## Generator Tag

In a fit of self-promotion (that I don't disagree with), the Upgrade Helper recommends adding a `generator` meta tag to the site's pages:

```text
[11ty/eleventy-upgrade-help] NOTICE Your project has .html output files (×22) that don’t have a populated <meta name="generator" content> tag. It would be helpful to Eleventy if you added it (but isn’t required). Read more: https://11ty.dev/docs/data-eleventy-supplied/#use-with-meta-namegenerator
```

**Note:** I removed the list of affected pages from the message to make reading it easier.

This was easily done before Eleventy 3 (I'll write about this in my next post), but I had to take a different approach for this site. 

The `eleventyConfig` object exposed by Eleventy doesn't contain a version property; I'm not sure why, but it should. So, in order to get the generator version number, the site has to read and parse the @11ty/eleventy package's `package.json` file to obtain the value. 

I created a file in the project's `_data` folder called [`eleventyinfo.js`](https://github.com/johnwargo/wargo-2024-11ty/blob/main/src/_data/eleventyinfo.js){target="_blank"} that looks like this:

``` js
const fs = require('fs');

module.exports = function () {
  const packageJson = JSON.parse(fs.readFileSync('./node_modules/@11ty/eleventy/package.json', 'utf8'));
  return { generatorStr: `${packageJson.name} v${packageJson.version}` }
}
```

**Note:** The code is a hack that I'm not proud of, but it works. What it does is reads the contents of the `@11ty/eleventy` package and converts it to a JSON object. With that in place, it's super easy to pull out the package name and version from the object.

During the build process, Eleventy executes the file and makes the data result available via the `eleventyinfo` object. Then, to use it in the site, you simply reference it in HTML using:

{% highlight liquid %}
{{ eleventyinfo.generatorStr }}
{% endhighlight %}

**Note:** I use Liquid templating language in my site, so that's a liquid example.

So, in the the `head` section for each page template, I added the following code:

{% highlight liquid %}
<meta name="generator" content="{{ eleventyinfo.generatorStr }}" />
{% endhighlight %}

Here's a complete example from the site:

{% highlight liquid %}
<head>
  <title>{{ siteTitle }}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <meta name="generator" content="{{ eleventyinfo.generatorStr }}" />
  <link rel="stylesheet" href="assets/css/main.css" />
  <link rel="manifest" href="/manifest.json">
  {% include "google-analytics.html" %}
</head>
{% endhighlight %}

With that in place, when you run the build again, the warning message disappears.

## Finishing The Upgrade

When you finish addressing all of the issues identified by the Upgrade Helper, you're ready to deploy the upgraded site. Before you do that, you must remove the Upgrade Helper from the project.

First, open a terminal window in the project and execute the following command:

```shell
npm uninstall @11ty/eleventy-upgrade-help 
```

This removes the Upgrade Helper from the site's `package.json` file.

Next, you must remove all references to the Upgrade Helper from the site's `eleventy.config.js` file. Look for these two lines in the file and remove them:

``` js
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

eleventyConfig.addPlugin(UpgradeHelper);
```

With that in place you're ready to deploy your upgraded site.

## Netlify Hosting Issue

When I completed the upgrade, everything worked perfectly on my development system. When I deployed the updated site to [Netlify](https://netlify.com/){target="_blank"} I encountered an unexpected error:

```text
10:07:18 AM: [11ty] Eleventy Error (CLI):
10:07:18 AM: [11ty] 1. Error in your Eleventy config file 'eleventy.config.js'. (via EleventyConfigError)
10:07:18 AM: [11ty] 2. `require("@11ty/eleventy")` is incompatible with Eleventy v3 and this version of Node. You have a few options:
10:07:18 AM: [11ty] 1. (Easiest) Change the `require` to use a dynamic import inside of an asynchronous CommonJS configuration
10:07:18 AM: [11ty] callback, for example:
10:07:18 AM: [11ty]
10:07:18 AM: [11ty] module.exports = async function {
10:07:18 AM: [11ty] const {EleventyRenderPlugin, EleventyI18nPlugin, EleventyHtmlBasePlugin} = await import("@11ty/eleventy");
10:07:18 AM: [11ty] }
10:07:18 AM: [11ty]
10:07:18 AM: [11ty] 2. (Easier) Update the JavaScript syntax in your configuration file from CommonJS to ESM (change `require`
10:07:18 AM: [11ty] to use `import` and rename the file to have an `.mjs` file extension).
10:07:18 AM: [11ty]
10:07:18 AM: [11ty] 3. (More work) Change your project to use ESM-first by adding `"type": "module"` to your package.json. Any
10:07:18 AM: [11ty] `.js` will need to be ported to use ESM syntax (or renamed to `.cjs`.)
10:07:18 AM: [11ty]
10:07:18 AM: [11ty] 4. (Short term workaround) Use the --experimental-require-module flag to enable this behavior. Read
10:07:18 AM: [11ty] more: [https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require) It is possible that the
10:07:18 AM: [11ty] newest version of Node has this enabled by default—you can try upgrading your version of Node.js.
10:07:18 AM: ERROR: "build:eleventy" exited with 1.
```

The beauty of this error message, and big kudos to the Eleventy team for writing it, is that it's perfectly clear what the issue is and the possible steps required to resolve it. In my case, I didn't do any of the ESM migration recommended by the docs and several bloggers, I plugged away without it and it worked. What I didn't realize was that my Netlify project runs Node.js 20 and my desktop runs 22. 

To fix the problem, all I had to do was change the build environment for my site to Node.js 22 and the site published correctly.

<img src="src/images/2024/11ty-upgrade-02.png" alt="Netlify Build Settings" />
