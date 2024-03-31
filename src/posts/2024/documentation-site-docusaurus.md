---
title: Building a documentation Site Using Docusaurus
description: 
date: 2024-03-30
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Static Site Generators
---

As I mentioned in a post last week, I'm building a web site for my software company: [Fumbly Diddle Software](https://fumblydiddle.com){target="_blank"}. Along with the site, I also need a place to publish product documentation. I thought I'd just build an [11ty](https://www.11ty.dev/){target="_blank"} site for both the product information, news, blog, and documentation but as I started working through all of that I decided that wasn't the path I wanted to take. I decided instead to use one of the documentation static site generators. I wanted to be able to work in markdown files like I do for my 11ty sites, but I also wanted something that took care of page navigation, search, and other capabilities for me automatically.

I played around with a couple of the documentation site toolsets and finally settled on [Docusaurus](https://docusaurus.io/){target="_blank"} and you can see the simple site I created (only one product) at [Fumbly Diddle Docs](https://docs.fumblydiddle.com/){target="_blank"}.

To learn Docusaurus, I created the standard tutorial site and started playing around with it. What's interesting is the getting started site delivers a full web site with pages, a blog, as well as documentation. The full site looked capable with a good looking template and a bunch of options for content. However, all I wanted was a documentation site, so the process of turning that getting started site into a solely documentation site consisted of pulling functionality out of the generated site. Once I deleted the pages and blog folder, the most complicated thing I had to do was get the site to open the documentation area by default. 

Docusaurus implements its configuration through a `docusaurus.config.js` file just like 11ty does with its `eleventy.config.js` file, so that was familiar to me. To make the site a solely documentation site, I first deleted the project's `index.js` file, then added the `routeBasePath` property to the configuration file as shown below:

```js
 presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',    
        },        
      })
    ],
  ],
```

Something else that really threw me, and caused me some extra debugging time, is configuring plugins in the site. Making the site installable as a PWA and implementing Google Analytics was as easy as adding a couple of plugins and setting some configuration properties, but what really threw me was the format of that configuration object:

```js
 plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.svg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      }
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-##########',
        anonymizeIP: true,
      }
    ]
  ]
```

Its a JavaScript array, but it wasn't formatted like I expected it to be. Instead of property key/value pairs like this: `"property_name" : "property"`, the configuration object consists of an array of plugins and each plugin configuration is an array of a nameless property (I don't know what else to call it) for the plugin name followed by a configuration object for the plugin. 

What I expected to see was something like this:

```js
 plugins: [
      '@docusaurus/plugin-pwa': {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.svg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
      '@docusaurus/plugin-google-gtag': {
        trackingID: 'G-LNWBDGJ3YY',
        anonymizeIP: true,
      }    
  ],
```

I've never seen a JSON Object rendered that way, but perhaps you have. 

Anyway, the site is up and operational, and I'm going to spend tomorrow trying to publish the app to the Windows App Store - wish me luck.
