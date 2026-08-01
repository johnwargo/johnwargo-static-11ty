---
title: Eleventy Plugin Image Caption Simple
description: 
date: 2026-08-01
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-08-01T22:36:10.488Z
---

When I coded the [Eleventy Plugin Image Caption](https://github.com/johnwargo/eleventy-plugin-image-caption){target="_blank"} plugin, I did it for my specific requirements:

1. Auto numbered image captions (Figure 1: A boy with a dog)
2. Automated reference to images on the page (see Figure 1)

I did it because I like those capabilities in Microsoft Word and I wanted them available to me in an Eleventy site.  By the way, I wrote about that plugin in [Eleventy Auto-numbering Image Captions](/posts/2026/image-caption/).

Immediately after I published it, I started thinking about how other site owners would use it and I realized that the plugin wasn't...simple enough for use cases where the site didn't need to reference image captions by reference.

I set about updating the plugin, adding an `imageCaptionSimple` shortcode to it that simply added a caption, but didn't store a reference so the `imageReference` shortcode could refer to it later. I quickly realized though that that approach was just complicating things more since the captions wouldn't work if you intermingled them (used both `imageCaption` and `imageCaptionSimple` on the same page).

So, I abandoned those changes and created a new plugin called [Eleventy Plugin Image Caption Simple](https://github.com/johnwargo/eleventy-plugin-image-caption-simple){target="_blank"} ([npm](https://www.npmjs.com/package/eleventy-plugin-image-caption-simple){target="_blank"}).

This plugin takes a much simpler approach, it creates a single shortcode called `imageCaptionSimple` that just takes a single parameter, the caption to add to the page:

{% highlight liquid %}
{% imageCaptionSimple "<caption-text>" %}
{% endhighlight %}

For example, something like this:

{% highlight liquid %}
{% imageCaptionSimple "A boy with a dog" %}
{% endhighlight %}

It creates a paragraph with the following text:

```text
Image 1: A boy with a dog
```

I hope this plugin is a little more useful to a wider audience.