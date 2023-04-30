---
tags: post
title: Eleventy Extra Spaces in Category List
description: I noticed that the category lists on this site had an extra space before and after the comma and set out to fix it.
date: 2023-04-30
headerImage: 
categories:
  - Eleventy
---

As I built out this site, I added a list of category links to the post page as well as any post listings on the site. I grabbed the code from to do this from [A Complete Guide to Building a Blog with Eleventy](https://cfjedimaster.github.io/eleventy-blog-guide/guide.html){target="_blank"} and it looks like this:

{% highlight liquid %}
<p>
	<strong>Categories:</strong>
	{% for cat in categories %}
	<a href="/categories/{{ cat | slugify }}">{{ cat }}</a>{% unless forloop.last %}, {% endunless %}
	{% endfor %}
</p>
{% endhighlight %}

In this site, I display a little more information on the line as shown below:

{% highlight liquid %}
Posted {{ post.date | readableDate }}&nbsp;
{% if post.data.categories.length > 0 %}
   in
   {% for cat in post.data.categories %}
     <a href="/category/{{ cat | slugify }}">{{ cat }}</a>
     {% unless forloop.last %}, 
     {% endunless %}
   {% endfor %}
{% endif %}
{% endhighlight %}

What I noticed is that on my site, Eleventy put an extra space before the comma for every category. I got a category list, but it didn't format correctly, there was a space before the comma and another one after the comma. Not exactly what I wanted.

Looking at the code, notice how the lines break a little differently than in Ray's example, that's because, I think, I'm using the [vscode-liquid](https://github.com/panoply/vscode-liquid){target="_blank"} plugin for Visual Studio Code and it restructures liquid code and removed the space after the comma. I love the automatic restructuring, but I think that's what broke this for me. 

I searched around and couldn't find a solution for this online. I eventually got help on the [11ty Discord](https://discord.com/channels/741017160297611315/1102205485425365032/1102205485425365032){target="_blank"}. Apparently Liquid helpfully adds a space for you (even though you may not want it to); the solution is to use a dash (`-`) in the start of the Liquid template to tell Liquid not to add the extra space. 

{% highlight liquid %}
{%- unless forloop.last %},
{% endhighlight %}

The complete code block looks like this:

{% highlight liquid %}
Posted {{ post.date | readableDate }}&nbsp;
{% if post.data.categories.length > 0 %}
   in
   {% for cat in post.data.categories %}
     <a href="/category/{{ cat | slugify }}">{{ cat }}</a>
     {%- unless forloop.last %},
     {% endunless %}
   {% endfor %}
{% endif %}
{% endhighlight %}
