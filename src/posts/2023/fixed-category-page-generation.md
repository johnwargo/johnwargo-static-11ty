---
title: Fixed Category Page Generation
description: I figured out how to get my Eleventy Generate Category Pages module working in an Eleventy build process.
date: 2023-06-14
showCoffee: 
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

In [Generating Eleventy Category Pages Inside Eleventy Build](/posts/2023/generating-eleventy-category-pages-inside-eleventy-build/) I described how I was trying to migrate my [Eleventy Paginated Category Pages](/posts/2023/eleventy-paginated-category-pages/) command line tool to run inside of the Eleventy build process.

The module is [Eleventy Generate Category Pages](https://github.com/johnwargo/eleventy-generate-category-pages){target="_blank"} and I published it to [npm](https://www.npmjs.com/package/eleventy-generate-category-pages){target="_blank"} today. 

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
