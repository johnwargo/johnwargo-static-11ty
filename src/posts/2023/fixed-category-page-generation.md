---
title: Fixed Category Page Generation
description: I figured out how to get my Eleventy Generate Category Pages module working in an Eleventy build process.
date: 2023-06-14
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
  - JavaScript
---

In [Generating Eleventy Category Pages Inside Eleventy Build](/posts/2023/generating-eleventy-category-pages-inside-eleventy-build/) I described how I was trying to migrate my [Eleventy Paginated Category Pages](/posts/2023/eleventy-paginated-category-pages/) command line tool to run inside of the Eleventy build process.

The module is [Eleventy Generate Category Pages](https://github.com/johnwargo/eleventy-generate-category-pages){target="_blank"} and I published it to [npm](https://npmjs.com/package/eleventy-generate-category-pages){target="_blank"} today. 

To use it in you Eleventy projects follow the instructions in the project repository, but basically:

Install the module in your Eleventy project using:

```shell
npm install eleventy-generate-category-pages
```

Create a `before` event handler in your project's `eleventy.config.js` file using the defaults:

```js
eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
  generateCategoryPages({}, true, false);
});
```

or, specifying specific settings for your project:

```js
eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
  generateCategoryPages({
  dataFileName: 'categories.json',
  dataFolder: 'src/_data',
  outputFolder: 'src/categories',
  postsFolder: 'src/posts',
  templateFileName: '11ty-cat-page.liquid'
  }, true, false);
});
```

Finally, Create a template file for the generated paginated Category pages, you can find an example template in this site or in the module's readme file.

## Postscript

After publishing this post, I realized that I created an infinite loop when running Eleventy with the `--watch` or `--serve` flags. Eleventy would generate the category pages then build the site, but whenever I made a change to the site, it would generate the category pages again which, of course, caused the site to generate itself again. Sigh, creating an infinite loop is never fun. 

Anyway, I updated my code to force it to only run once in this situation using the following code:

```js
var firstRun = true;
eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
  if (firstRun) {
    firstRun = false;
    generateCategoryPages({}, true, false);
  }
});
```

This works quite well!