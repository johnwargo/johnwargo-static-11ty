---
tags: post
title: Meta Description and Keywords in Eleventy
description: 
date: 2023-05-01
headerImage: 
categories:
  - Eleventy
---

As I built out this site, I realized that since I had a description for many of the posts and an array of one to many categories for each, I could populate each page's meta `description` and `keywords` properties.

Description was easy, I added a `description` property to my post template and populated it for my newer posts. With that in place, the code simply checks to see if the description property is populated and, if so, adds it to the page:

{% highlight liquid %}
 {% if description %}
  <meta name="description" content="{{ description }}" />
{% endif %}
{% endhighlight %}

For keywords, I knew that building a comma separated list of categories was going to be difficult, so I simply added a shortcode for it in the project's `eleventy.config.js` file:

```js
eleventyConfig.addShortcode("getKeywords", function (categories) {
  let returnString = "";
  for (let category in categories) {
    returnString += categories[category] + ", ";
  }
  // Remove the last comma
  return returnString.slice(0, -2);
});
```

Now, with access to the keywords array of categories, adding it to each page's header was as easy as:

{% highlight liquid %}
{% if categories.length > 0 %}
  <meta name="keywords" content="{% getKeywords categories %}">
{% endif %}
{% endhighlight %}
