---
title: Eleventy Nav Menu Top Level Highlighting
description: 
date: 2026-09-10
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-09-10T23:06:58.820Z
---

In my [Fumblu Workshop](https://fumblyworkshop.com/){target="_blank"} site, the template I used ([Relativity](https://pixelarity.com/relativity){target="_blank"} from Pixelarity) allows me to highlight the currently selected menu item using a class assignment to the highlighted entry (`class="current"`). The site uses submenus, and when I launched the site I didn't spend any time figuring out how to highlight the high level menu when one of its submenus was selected. So, when a high level menu item was selected, everything worked as expected, but when one of the submenus was selected, nothing highlighted. The result of this was an inconsistent menu highlighting.

I had some time this evening and decided to fix this.

In the initial version of this, I used the following code for my page navigation.

{% highlight liquid %}
{% assign navPages = collections.all | eleventyNavigation %}

<nav id="nav">
  <ul>
    <li>
      <a href="{{ '/' | htmlBaseUrl }}search/">
        <i class="icon solid fa-search"></i>
      </a>
    </li>
    {%- for entry in navPages %}
    <li {%- if entry.url==page.url %} class="current"{%- endif %}>
      <a href="{{ entry.url }}" {%- if entry.children.length > 0 %} class="icon solid fa-angle-down"{%- endif %} >{{ entry.title }}</a>
      {%- if entry.children.length > 0 %}
      <ul>
        {%- for child in entry.children %}
        <li>
          <a href="{{ child.url }}">{{ child.title }}</a>
        </li>
        {%- endfor %}
      </ul>
      {%- endif %}
    </li>
    {%- endfor %}
  </ul>
</nav>
{% endhighlight %}

In this example, the code highlights the menu item when `entry.url` matches `page.url` by assigning `class="current"` to just that menu item. This lame comparison is why only high level selections are highlighted. For submenus, the top level nav entry will never match the page url.

To fix this, I added a couple of lines of code and modified the comparison:

{% highlight liquid %}
{% assign navPages = collections.all | eleventyNavigation %}

<nav id="nav">
  <ul>
    <li>
      <a href="{{ '/' | htmlBaseUrl }}search/">
        <i class="icon solid fa-search"></i>
      </a>
    </li>
    {%- for entry in navPages %}
      {% assign menuSegments = entry.url | split: '/' %}
      {% assign pageSegments = page.url | split: '/' %}
      <li {%- if menuSegments[1] == pageSegments[1] %} class="current"{%- endif %}>
        <a href="{{ entry.url }}" {%- if entry.children.length > 0 %} class="icon solid fa-angle-down"{%- endif %} >{{ entry.title }}</a>
        {%- if entry.children.length > 0 %}
        <ul>
          {%- for child in entry.children %}
          <li>
            <a href="{{ child.url }}">{{ child.title }}</a>
          </li>
          {%- endfor %}
        </ul>
        {%- endif %}
      </li>
    {%- endfor %}
  </ul>
</nav>
{% endhighlight %}

First, I created assignments for `menuSegments` and `pageSegments` which creates arrays containing each path segment for the `entry.url` and `page.url`.

{% highlight liquid %}
{% assign menuSegments = entry.url | split: '/' %}
{% assign pageSegments = page.url | split: '/' %}
{% endhighlight %}

With that in place, my highlighting comparison becomes:

{% highlight liquid %}
<li {%- if menuSegments[1] == pageSegments[1] %} class="current"{%- endif %}>
{% endhighlight %}

Which checks to see that the menu item and page segments both start with the same value. Since this check only happens on high level nav menu items (the submenus are built later) the highlighting works as expected. 

## Postscript

You may wonder why I didn't use menu highlighting in this site, that's because the menu for this site is hard-coded, not generated like the Fumbly Workshop site. Perhaps some day I'll use the Eleventy `nav` plugin for this site as well.
