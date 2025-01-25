---
title: Hiding Future Posts in Eleventy
description: Describes how to hide posts with a future publishing date in an Eleventy site.
date: 2024-01-10
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - JavaScript
  - Static Site Generators
---

I often start articles on this site before I'm ready to publish them, especially if they're long articles. I needed a solution that allows me to create the post/article, but not publish it until I was ready.

The [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog){target="_blank"} project has a drafts feather that allows you to work on a post within an Eleventy project without publishing it. You essentially assign a **draft** state to the post and Eleventy doesn't publish it during the build process until you remove the draft state.

For my use case, I wanted something different, I didn't want to manage the **state** of the document, I wanted the document to publish based on metadata in the post (the post's `date` property). The Joomla CMS has this feature, you simply set the publish date and time in the post and it miraculously appears at the selected date and time. WordPress allows you to do both, set a published state and a date to publish it.

I had some time this week to look at the code behind the base blog's draft feature and noticed it would be pretty easy to modify it to suit my needs. Here's the relevant code from the base blog's `eleventy.config.drafts.js` file:

```js
function eleventyComputedExcludeFromCollections() {
	// When using `addGlobalData` and you *want* to return a function, you must 
	// nest functions like this. `addGlobalData` acts like a global data file 
	// and runs the top level function it receives.
	return (data) => {
		// Always exclude from non-watch/serve builds
		if(data.draft && !process.env.BUILD_DRAFTS) {
			return true;
		}
		return data.eleventyExcludeFromCollections;
	}
};

module.exports.eleventyComputedExcludeFromCollections = eleventyComputedExcludeFromCollections;

module.exports = eleventyConfig => {
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", eleventyComputedExcludeFromCollections);	
}
```

The code uses [`eleventyExcludeFromCollections`](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections){target="_blank"} to decide whether to publish the post or not. A simple check for draft state (and whether the environment says to build drafts) and the post is built or not built based on it.

Tweaking this to only publish the post if the post date is before the current date/time looks like this:

```js
module.exports = function (eleventyConfig) {
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var pageDate = new Date(data.page.date);
            if (pageDate > new Date()) {
                return true;
            }
            // otherwise, return what's already set for the post
            return data.eleventyExcludeFromCollections;
        }
    });
}
```

Looking at the code, I realized I was calculating the current time every time the Eleventy build process calls the function, so refactoring the code so its tighter (and slightly faster) looks like this:

```js
module.exports = function (eleventyConfig) {
  var currentDate = new Date();
  eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", 
  () => {
    return (data) => {
      var pageDate = new Date(data.page.date);
      return (pageDate > currentDate) 
        ? true 
        : data.eleventyExcludeFromCollections;
    }
  });
}
```

This code effectively returns true (meaning to exclude the doc from the build process) for any post with a date after the current date. Otherwise it returns `data.eleventyExcludeFromCollections` which is, I think, the current state from any other Global Data functions configured in the Eleventy project (meaning that some other process can mark the post for exclusion as well).

That solution works, but there's one issue I encountered when I tested the code. Eleventy assumes that post date (`data.page.date`) is in Coordinated Universal Time (UTC) but the code's call to `new Date()` returns a local date. So, in order to do the date/time difference math correctly, both dates (current date and post date) have to be in the same time zone. 

I tried getting the current date (`currentDate`) variable rendered in UTC, but everything I tried failed for one reason or another. Instead, I decided to use JavaScript's `getTimezoneOffset` method to convert the page date correctly for me. The code below takes that into account, converting the page date to the same date (which is what matters) but at at midnight (00:00:00) in the current time zone. 

```js
module.exports = function (eleventyConfig) { 
    // get the current date/time (once at the beginning of the build)
    const currentDate: Date = new Date();
    const timeOffsetInMS: number = currentDate.getTimezoneOffset() * 60000;

    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
        return (data) => {
            var pageDate = new Date(data.page.date);
            pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
            return (pageDate > currentDate) 
	            ? true 
	            : data.eleventyExcludeFromCollections;
        }
    });
}
```

The math works, Eleventy generates any post published before or on the build date, for any future posts nothing happens and they're omitted from the site. When the publish date comes around, you simply perform a build and you're all set. With the Base Blog's drafts capability, you must change the state of the post (remove the drafts status) then publish the site.

The Eleventy Base Blog uses the execution mode to control whether to generate drafts or not. Using the code below generates drafts when in development mode but omits them during the build process only (no `serve`). 

```js
if(runMode === "serve" || runMode === "watch") {
	process.env.BUILD_DRAFTS = true;
}
```

This allows you to view drafts while you're editing them. I could have adopted this approach here as well, but for my particular use case, I don't need to see posts in the site as I write them. I can always test them locally before I publish them on the target date.

## Plugin

I created a plugin for this called [Eleventy Plugin Future Post](https://github.com/johnwargo/eleventy-plugin-future-post){target="_blank"} so both of us can add this functionality to our sites without manually copying around the .js file. The project contains sample documents and a simple `index.html` file you can use to test out the plugin. Just clone the project, install packages and build the site. 
