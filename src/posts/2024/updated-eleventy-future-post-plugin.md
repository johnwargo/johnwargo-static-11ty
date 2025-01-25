---
title: Updated Eleventy Future Post Plugin
description: 
date: 2024-01-11
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - JavaScript	
---

In yesterday's post, I announced my [Future Post plugin for Eleventy](https://www.npmjs.com/package/eleventy-plugin-future-post){target="_blank"} and mentioned that I didn't configure the plugin so it would render posts with a future date when testing the site. Since then I found some time to look at the implementation for that and decided to go ahead and add it to version 0.0.2 which I published today.

The Eleventy Base Blog does something weird with a environment variable to implement this and I wanted to make my code cleaner.

In the plugin's code, I added a new Boolean variable called `isServing`:

```typescript
var isServing: boolean = false;
```

Next, as the Eleventy Base Blog does, I added a `before` event handler where the plugin can access the `runMode` and set the `isServing` variable. This allows that check between the two options (`serve` and `watch` as shown below) to happen only once, at the start of the Eleventy build process, and should help improve overall performance. 

```typescript
eleventyConfig.on("eleventy.before", ({ runMode }: { runMode: string }) => {
	// initialize the `isServing` flag once before the build starts
	isServing = runMode === "serve" || runMode === "watch";
	if (isServing) log.debug('Serving site, not excluding any posts');
});
```

Finally, I updated the `addGlobalData` method to skip the date check when `isServing` is true:

```typescript
eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", () => {
	return (data: any) => {
		// If we're serving the site, don't exclude anything
		if (isServing) return data.eleventyExcludeFromCollections;
		// when not serving, check the date
		var pageDate = new Date(data.page.date);
		pageDate.setTime(pageDate.getTime() + timeOffsetInMS);
		log.debug(`${data.title}: Date: ${pageDate}`);
		return (pageDate > currentDate) ? true : data.eleventyExcludeFromCollections;
	}
});
```

This approach eliminates the date comparison while serving the site which should improve performance while testing. 
