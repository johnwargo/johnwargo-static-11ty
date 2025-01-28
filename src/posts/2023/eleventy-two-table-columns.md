---
title: Eleventy Splitting Category Data Across Two Table Columns
description: 
date: 2023-11-18
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - Static Site Generators
---

The Categories list on this site is getting pretty long, so one of the things I wanted to do this weekend was migrate the Unordered List (`<ul></ul>`) the site used today into a two column table. I asked Bard and it generated relatively useless code for me; after three tries I finally got something that looked like it would work, but didn't. 

As I poked around in the Liquid docs, I noticed that Liquid has a [`tablerow`](https://shopify.github.io/liquid/tags/iteration/){target="_blank"} tag I could use for this. Basically you give it a collection and number of columns and it automatically generates columns for you. 

{% highlight liquid %}
<table>
{% tablerow product in collection.products cols:2 %}
  {{ product.title }}
{% endtablerow %}
</table>
{% endhighlight %}

With that in mind, I replaced the site's Category page content with the following code:

{% highlight liquid %}
{% if categories.length > 0 %}
  <table>
    {% tablerow catData in categories cols:2 %}
       <h4>
          <a href="{{ '/' | htmlBaseUrl }}categories/{{ catData.category | slugify }}/">{{ catData.category }}</a>
        </h4>
        Count: {{ catData.count }}
        {% if catData.description.length > 0 %}
          |
          {{ catData.description }}
        {% endif %}
    {% endtablerow %}
  </table>  
{% else %}
    <p>No category data to display</p>
{% endif %}
{% endhighlight %}

It generates the columns exactly as expected and saved me a lot of work hand crafting Liquid code to do it.
