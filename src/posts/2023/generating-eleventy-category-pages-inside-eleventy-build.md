---
title: Generating Eleventy Category Pages Inside Eleventy Build
description: After my announcement of my command-line utility for generating Eleventy Paginated Category pages, I learned how to do this inside of Eleventy and need some help finishing it for general use.
date: 2023-06-05
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
  - JavaScript  
---

Last week I published an article, [Eleventy Paginated Category Pages](/posts/2023/eleventy-paginated-category-pages/), that described a command-line utility I created that runs as a preprocessor to the Eleventy build process and generates paginated category pages for every category in use in an Eleventy site. 

I wrote it as command-line tool because I didn't know how to build something like that and inject it into the Eleventy build process. I expected that I should be able to publish it as a Node module and call it from the build process, but I didn't want it to be clunky.

A few minutes after I published the article, I finished reading [Eleventy by Example](https://packtpub.com/product/eleventy-by-example/9781804610497){target="_blank"} and found the answer I needed there. I wasn't aware of the Eleventy build events and the book showed me everything I needed to know to execute the module `before` Eleventy starts its build process like this:

```js
  eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
    generateCategoryPages({
    dataFileName: 'categories.json',
    dataFolder: 'src/_data',
    outputFolder: 'src/categories',
    postsFolder: 'src/posts',
    templateFileName: '11ty-cat-page.liquid'
    }, true, true);
  });
```

So, that afternoon I created a new Node module project on GitHub called [Eleventy Generate Category Pages](https://github.com/johnwargo/eleventy-generate-category-pages){target="_blank"} and pulled into the project the guts of the command line utility into something you can execute during the `before` event.

It works great as far as I can tell in my tests, but I wrote the original module in TypeScript and I'm in module hell trying to get this generated code to run in an Eleventy project. This isn't something I can't figure out, but as you'll see in tomorrow's post, I'm getting shoulder surgery on Wednesday and I don't have time to fix this issue before then.

The issue is getting the right settings in the project's `tsconfig.json` file so it will execute properly in an Eleventy project. Its not rocket science, I just don't have the time right now to experiment with different settings. 

I'll get to fixing this as soon as I can, but I'll be without use of my left hand for almost two months, I don't expect to do a lot of coding while I'm recovering. If someone in the community wants to fix this, I'll make sure I check for pull requests as often I can. 

Looking for the community's help.
