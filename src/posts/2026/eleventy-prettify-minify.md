---
title: Prettifying and Minifying an Eleventy Site
description: Describes how I configured this site for minified code in production but prettified code in development, giving me the best of both worlds while working with the site.
date: 2026-09-18
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-09-18T22:23:24.061Z
---

Years ago, I don't remember where, I found some code I could use to minify the code on this site during deployment in production. Aaah, here it is: [Minifying HTML output](https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output){target="_blank"}. 

Fast forward a few years, I realized that I didn't like how sloppy the site's code was when viewing source when debugging locally. The generated site code often has a lot of extra spacing and no effort is made to align the code. I realized that if I could minimize for production, I could also prettify the site's source when not in production (when working locally or hosting a dev version of the site) and set about making it happen.

I started by creating a `transforms` folder in my Eleventy project then moved the minify code from the article linked above into a file called [`transform-minify.js`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/transforms/transform-minify.js){target="_blank"}.

Next, I went looking for code I could use to prettify the source. A quick Internet search, or perhaps it was AI, pointed me to the npm [`prettier`](https://www.npmjs.com/package/prettier){target="_blank"} package and the following code:

```js
import prettier from 'prettier';

export default async function (value, outputPath) {

  if (outputPath && outputPath.indexOf('.html') > -1) {
    return await prettier.format(value, {
      parser: "html",
      printWidth: 120,
      tabWidth: 2,
    });
  }
  return value;
};
```

I created a new file in my `transforms` folder called [`transform-prettify.js`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/transforms/transform-prettify.js){target="_blank"} and copied the code there.

Finally, I modified the project's `.eleventy.js` file so it checks to see if its running in production or not and loads the right transform (minify or prettify) based on that value.

```js
const isProduction = process.env.NODE_ENV === 'production';

// Only minify HTML if we are in production
if (isProduction) {
  eleventyConfig.addTransform('txHtmlMinify', htmlMinify);
} else {
  // otherwise prettify
  eleventyConfig.addTransform('txHtmlPrettify', htmlPrettify);
}
```

This works because I have an environment variable in my Netlify hosting environment called `NODE_ENV` with a value of `Production` which forces the minification process. In my local development environments, that environment variable is not set, so prettification happens automatically.

I really like this solution because its clean and doesn't require me to act in any way to get the experience I want in both environments. Simple is good.
