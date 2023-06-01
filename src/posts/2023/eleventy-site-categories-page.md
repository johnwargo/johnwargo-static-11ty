---
title: Eleventy Site Categories Page
description: While I worked with Jekyll, I struggled figuring out a way to add a Categories page to a site. In this post, I describe a solution I created for Eleventy that does this.
date: 2023-03-18
headerImage: 
headerImageAltText: 
categories:
    - Static Site Generators
    - Eleventy
---

I used Raymond Camden's excellent A Complete Guide to Building a Blog with Eleventy ([https://cfjedimaster.github.io/eleventy-blog-guide/guide.html](https://cfjedimaster.github.io/eleventy-blog-guide/guide.html){target="_blank"}) to learn how to use Eleventy ([https://www.11ty.dev/](https://www.11ty.dev/){target="_blank"}). In that tutorial, Ray generates a separate categories page for each category, then links to the category page from the list of categories on each Post. That's an excellent feature, and I wanted that for my site, but I also want to present users with a stand-alone list of categories they can browse directly from the site's home page.

To do that with Ray's tutorial, I made a few changes. FIrst of all, I renamed the `categories.liquid` page to `category.liquid` then updated all references to it in the site (basically updating the `post.liquid` include).

Next, I added a new `categories.liquid` page with the following Liquid code:

{% highlight liquid %}
<p>View all of the posts for a particular category by clicking on one of the categories listed below. There are {{ categories.length }} categories on the site today.</p>
{% for category in categories %}
    <ul>
        <li>
            <a href="{{ "/" | htmlBaseUrl }}category/{{ category | slugify }}">{{ category | capitalize }}</a>
        </li>
    </ul>
{% endfor %}
{% endhighlight %}

Once I added the Categories page to my site's menu, I was all set.

This is something I tried to do in a Jekyll site and never figured it out. With Eleventy it took me just a few minutes to set up.