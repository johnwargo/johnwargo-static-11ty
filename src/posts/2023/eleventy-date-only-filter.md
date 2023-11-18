---
title: Eleventy Date-only Filter
description: I noticed recently that the site's stats page displayed the first and last post dates with time information even though the values only contained dates. I created a simple Eleventy Filter to trim them to date only with the format I wanted. This post shows how I did it.
date: 2023-10-31
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

I was looking at the site's [stats page](https://johnwargo.com/statistics/){target="_blank"} yesterday and noticed that the output for First Post and Last Post date included an empty time `00:00:00 GMT+0000 (Coordinated Universal Time)`.  This is unnecessary since there was no time component in those values, only a date. Here's what it looked like:

{% image "src/images/2023/stats-page-post-dates-1.png", "This site's initial Stats Page Post Statistics", "image-full" %}

So I set out to fix the output so it looked exactly the way I wanted, which is:

1. No time displayed
2. The date formatted as text strings rather than numbers only

The site captures the first and last post dates through my [Eleventy Site Statistics](https://johnwargo.com/posts/2023/eleventy-site-statistics/){target="_blank"} plugin and I started there thinking I would simply force the date format I wanted there. I checked the plugin's source code and saw that the plugin captures those dates as JavaScript Date objects. That was the right thing to do, and I was glad I did the right thing when I created that plugin. Saving it as a Date object allows the user (in this case me, but it could very well be you) to do whatever they want with the date format.

If I switched the plugin to store the date as a formatted string, formatted the way I wanted it, then I'd implement a breaking change in the plugin and force a particular date format on all other users of the plugin. I don't want to do either of those things.

Next, I popped open the site's [`eleventy.config.js`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/eleventy.config.js){target="_blank"} file and decided to add a new filter for this behavior called `dateOnly`:

```js
eleventyConfig.addFilter("dateOnly", function (dateVal, locale = "en-us") {
  var theDate = new Date(dateVal);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return theDate.toLocaleDateString(locale, options);
});
```

The filter accepts a JavaScript date value and an optional locale; if the user doesn't specify a locale, the filter uses the default "en-us". 

Inside the filter, the code converts the incoming date value into a JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date){target="_blank"} object. This allows the code to apply all sorts of Date-supported formatting options. In this case, the code specified the exact formatting options to use in the `options` constant. 

With my formatting options defined, the code then returns the date value as a formatted string using the `toLocaleDateString()` method passing in the `locale` (which adds locale awareness and language to the output (for month names, for example)) plus the `options` constant (which applies my formatting options to the output). The resulting output is the date formatted just the way I want it.

To use the filter in your site, simply add the filter to the templated content like this:

{% highlight liquid %}
<li>
  <strong>First post date:</strong>
  {{ collections.postStats.firstPostDate | dateOnly}}
</li>
<li>
  <strong>Last post date:</strong>
  {{ collections.postStats.lastPostDate | dateOnly}}
</li>
{% endhighlight %}

And now the resulting page looks exactly like I want it:

{% image "src/images/2023/stats-page-post-dates-2.png", "This site's final Stats Page Post Statistics", "image-full" %}

To use a specific locale, like Portuguese for example, simply add the locale to the filter like this:

{% highlight liquid %}
<li>
  <strong>Last post:</strong>
  {{ collections.postStats.lastPostDate | dateOnly: "por" }}
</li>
{% endhighlight %}
