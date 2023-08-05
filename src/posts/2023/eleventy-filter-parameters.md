---
title: Eleventy Filter Parameters
description: How to add parameters to an Eleventy filter.
date: 2023-07-05
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

I hate it when software products and sites publish large numbers (greater than 1,000 - notice the comma?) without using thousands separators and the like. When I built the [Statistics](/statistics/) page, I made sure to add a `commaize` filter to ensure my site stats larger numbers displayed the correct punctuation:

```js
eleventyConfig.addFilter("commaize", function (num) {
  return num.toLocaleString("en-us");
});
```

With that in place, as I displayed statistics on the page, I'd comma-ize the values like this:

{% highlight liquid %}
<li>
  <strong>Post Count:</strong>
  {{ collections.postStats.count | commaize }}
</li>
{% endhighlight %}

This works really well, but renders all numbers using the English US locale (`en-us`) which is fine for this site, but hard-coded. I also wanted to understand how to use parameters with an Eleventy filter. With that in mind, I made an update to the filter, adding an optional parameter I could use if I wanted to format a number using a different locale (I don't, but this is just an exercise).

To do this, I added a `locale` parameter to the `commaize` filter's function and gave it a default value as shown in the function signature below:

```js
eleventyConfig.addFilter("commaize", function (num, locale="en-us") {
  return num.toLocaleString(locale);
});
```

Next, I use the passed locale (or default value) as input to the `toLocaleString` method. With this in place, the filter defaults to English, so the following Liquid code renders to 1,024:

{% highlight liquid %}
{% assign tmpVal = 1024 %}
test: {{ tmpVal | commaize }}
{% endhighlight %}

However, if I want to render the number with another locale's formatting, like Portugal (`por`) for example, I can pass the locale parameter to the filter as shown below:

{% highlight liquid %}
{% assign tmpVal = 1024 %}
test: {{ tmpVal | commaize: "por" }}
{% endhighlight %}

This renders the number as 1.024 (which is the Portuguese way of doing thousands separators).

And now I know how to add an additional parameter to an Eleventy filter.