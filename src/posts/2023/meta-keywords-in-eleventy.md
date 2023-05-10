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

For keywords, building the comma separated list of categories is a little ugly in Liquid (doable, but not elegant): 

{% highlight liquid %}
{% if categories.length > 0 %}
  <meta
    name="keywords"
    content="
  {% for cat in categories %}
    {{ cat }}
    {%- unless forloop.last %},
    {% endunless %}
  {% endfor %}">
{% endif %}
{% endhighlight %}

Instead, I decided to add a `getKeywords` shortcode in the project's `eleventy.config.js` like this:

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

The difference is in code readability and output. In the first example, Eleventy generates the following HTML:

```html
<meta
  name="keywords"
  content="
John M. Wargo,
  
John Wargo,
  
johnwargo
">
```

For the second, Eleventy generates the following:

```html
<meta name="keywords" content="John M. Wargo, John Wargo, johnwargo">
```

Which, as I hope you see, is much cleaner; with the solution I picked I got cleaner code and output - always a goal for me.
