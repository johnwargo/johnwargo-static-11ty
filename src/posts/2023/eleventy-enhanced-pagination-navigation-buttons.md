---
tags: post
title: Eleventy Enhanced Pagination Navigation Buttons
description: null
date: 2023-04-23
headerImage: null
categories:
  - Eleventy
---

I added navigation buttons to this site on the [Articles](/articles/) and [Categories](/categories/) pages. I started with the standard Previous/Next buttons but quickly realized that I also wanted First and Last buttons, but only under certain conditions.

For example:

1. I didn't want the Previous and First buttons displayed when the site visitor was on the first page, that's just silly, because the button wouldn't do anything. 
2. I also didn't want the First button displayed on the second pagination page because the Previous button already delivers the same functionality. 
3. For the same reasons, I wanted tighter control over the buttons at the end of the list as well, so not displaying the Last and Next buttons on the last page nor the Last button on the penultimate page. 

Here's the Liquid block I came up with to implement this:

{% highlight liquid %}
{% assign endPage = pagination.pages.length | minus: 2 %}
{% if pagination.pages.length > 1 %}
  <p>Page {{ pagination.pageNumber | plus: 1 }} of {{ pagination.pages.length }}</p>
  <p>    
    {% if pagination.pageNumber > 1 %}
      <button type="button" onclick="location.href='{{ pagination.href.first }}'">First</button>
    {% endif %}
    {% if pagination.href.previous %}
      <button type="button" onclick="location.href='{{ pagination.href.previous }}'">Previous</button>
    {% endif %}
    {% if pagination.href.next %}
      <button type="button" onclick="location.href='{{ pagination.href.next }}'">Next</button>
    {% endif %}
    {% if pagination.pageNumber < endPage %}
      <button type="button" onclick="location.href='{{ pagination.href.last }}'">Last</button>
    {% endif %}
  </p>
{% endif %}
{% endhighlight %}

The only real tricky part was determining the delta from the last page to use for comparison purposes. Liquid wouldn't let me do the math I needed in the comparison, so I had to pull the calculation out into a variable assignment:

{% highlight liquid %}
{% assign endPage = pagination.pages.length | minus: 2 %}
{% endhighlight %}

The first line inside the conditional delivers the traditional 'Page # of #' heading above the buttons. 

{% highlight liquid %}
<p>Page {{ pagination.pageNumber | plus: 1 }} of {{ pagination.pages.length }}</p>
{% endhighlight %}

The rest is, I hope, self explanatory. 

Since I used this block in two places in my site, I moved the code to an include and referenced it from both pages that need it.

I hope this helps you with your Eleventy projects.
