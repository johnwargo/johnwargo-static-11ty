---
title: Eleventy Adding Page Links to a Post
description: 
date: 2026-01-10
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-01-11T00:04:51.178Z
---

I often put a lot of links in my longer posts and a few months ago I started thinking about adding a list of links to the top of my posts on this site. I had some extra time this week, so I created a plugin to do that for me. This post introduces the plugin.

The plugin's called **Eleventy Plugin Markdown Post Links** and you can find the source code on [GitHub](https://github.com/johnwargo/eleventy-plugin-markdown-page-links){target="_blank"} and the installable package on [npm](https://www.npmjs.com/package/eleventy-plugin-markdown-page-links){target="_blank"}

## About the Plugin

The plugin adds an 11ty shortcode called `pageLinks` to the site you can use to add a list of the page's links to the page.

Add the shortcode to a page's template to have the links appear on every page, or place the shortcode at the top or bottom of a long article to generate links for just that page. The plugin also supports a configuration option, `minimumLinks`, that instructs the shortcode to generate links only if there are a specific number of links on the page.

The plugin supports the following options:

**List Types:**

+ **Simple list** - Generates a simple list of page links with each as a separate paragraph in the page.
+ **Ordered list** - Generates a list of page links as an ordered list using the `<ol>` and `</ol>` tags
+ **Unordered list** - Generates a list of page links as an ordered list using the `<ul>` and `</ul>` tags

**List Options:**

+ **Collapsible list** - Link list and renders it in a collapsed section on the page using the `<details>` and `<summary>` tags.
+ **New Tab** - Links open in a new tab using `target="_blank"`.
+ **Styled List** - Allows you to apply a CSS class to the list container on the page.
+ **Minimum Links** - Only generate the link list when there's at least a specified number of links on the page.

## Implementation on this Site

My favorite features of the plugin are the `minimumLinks` setting (which allows me to only generate the link list when there's more than the specified minimum links on the page) and the Collapsible link type which uses a very small amount of space on the page; click the list title to expand the links on the page. You can see this in action on this site, most pages don't have a link list, but the site's [Mounting Breadboard-friendly NeoPixels](https://johnwargo.com/posts/2025/mounting-neopixel/){target="_blank"} article has enough links to exceed the minimumLinks threshold defined on the site and generate the link list.

Here's how I've implemented the plugin on this site:

``` javascript
eleventyConfig.addPlugin(pageLinks, {
  listType: 1,
  collapsible: true,
  sectionTitle: "Links On This Page",
  minimumLinks: 5
});
```

Here's what it looks like in action:

{% image "src/images/2026/pagelinks-collapsible-example.png", "An article from this site with a link list displayed", "image-full" %}

## Sample Application

Rather than duplicating the docs here, you can learn more about the plugin in the project's [readme](https://github.com/johnwargo/eleventy-plugin-markdown-page-links/blob/main/readme.md){target="_blank"} file. I also built a [Demonstration](https://mdpagelinks.netlify.app/){target="_blank"} Eleventy site that demonstrates all of the options available in the plugin.

{% image "src/images/2026/pagelinks-sample-app.png", "Sample App screenshot", "image-full" %}

## Future Plans

Right now, the plugin uses positional parameters in the shortcode; I want to get away from that and use named parameters. Expect an update soon.