---
title: Eleventy Auto-numbering Image Captions
description: 
date: 2026-07-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-07-24T10:59:12.218Z
---

One of the things I like about Microsoft Word is the ability to caption images with an auto-numbered label. Once you do that, its easy to insert a reference to the image file elsewhere in the document.

While working in a new Eleventy ([11ty](https://www.11ty.dev/){target="_blank"}) site, I realized that I missed that capability and set about implementing it. The result of this work is the [Eleventy Image Caption](https://github.com/johnwargo/eleventy-plugin-image-caption){target="_blank"} plugin that I published today. I built a sample site that demonstrates the plugin's capabilities and included it in the plugin repository and [available here (on Netlify)](https://eleventy-plugin-image-caption.netlify.app/){target="_blank"}.

The plugin allows you to do two things:

+ Add a auto-numbering label and caption to an image.
+ Add a reference to one of the captioned images elsewhere in a page.

The plugin is configurable, so you can easily:

+ Set the label text used in the caption
+ Bold (**strong**) or not bold the label
+ Set the CSS `class` assigned to the caption paragraph.

Let me show you some examples...

Below is a picture from a recent vacation, to caption it with a label and image number, all I have to do is add a liquid tag immediately following the picture:

{% highlight liquid %}
{% imageCaption "vacationFeet" "Vacationing Feet" %}
{% endhighlight %}

The plugin adds a paragraph tag with a label, number, and provided caption.

![vacation feet](/images/2026/vacation-feet.jpg)
{% imageCaption "vacationFeet" "Vacationing Feet" %}

Say for example that I want to refer to an image later in the document. To do that, add a different shortcode:

{% highlight liquid %}
{% imageReference "vacationFeet" %}
{% endhighlight %}

This shortcode returns the label and image number for the specified image file. Here's an example:

> Yes, the feet you see in {% imageReference "vacationFeet" %} are mine.

The plugin has a couple of small limitations, but it works really well within those limitations. For me, this plugin is most useful for tutorials, especially long ones, where you may want to refer to an image later on a page and not need to describe it to the reader, just use an image caption and reference and you're all set. 
