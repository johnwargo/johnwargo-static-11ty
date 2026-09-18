---
title: Ignoring Pages in an Algolia Index
description: Described how I tweaked one of my site's Algolia indexing process to include more than just posts in the index.
date: 2026-09-17
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2026-09-17T23:39:10.681Z
---

When I built this site, I followed the instructions in Ray Camden's [Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify){target="_blank"} post to add an [Algolia](https://www.algolia.com/){target="_blank"} index to my site and allow visitors to use search to locate specific articles. This worked well for this site for many years although, like with Ray's site, not many people use search. I assume this is because its just too easy to let Google point people to posts anywhere.

As I built out my new [Breakfast Quest](https://thebreakfastquest.com){target="_blank"} site, I realized that I wanted to include more than just the site's posts in the search index, I wanted to include some additional pages as well, but not all of the pages.

Ray's post recommended using an `algolia.liquid` file to generate a permalinked `.json` file with the index for the site. The file is called `algolia.json` and 11ty stores the generated file in the site's root folder. Here's the code for the file.

{% highlight liquid %}
---
permalink: /algolia.json
---

{% assign posts = collections.post | reverse %}
[
{% for post in posts %}
  {
  "title": {{ post.data.title | json }},
  "date":"{{ post.date }}",
  "date_timestamp": {{ post.date | date: '%s' }},
  "url":"{{ post.url | prepend: site.url }}",
  "content":{{ post.templateContent | algExcerpt | json }},
  "tags":[
  {% for tag in post.data.tags %}
    {{ tag | json }}{% unless forloop.last %},{% endunless %}
  {% endfor %}
  ],
  "categories":[
  {% for cat in post.data.categories %}
    {{ cat | json }}{% unless forloop.last %},{% endunless %}
  {% endfor %}
  ]
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
{% endhighlight %}

As you can see from the first line of liquid code in the file, it generates the Algolia index using just the site's posts: 

{% highlight liquid %}
{% assign posts = collections.post | reverse %}
{% endhighlight %}

For my site, I wanted more than just those pages. One of the things I could do is use the 11ty `collections.all` to get all pages for the index: 

{% highlight liquid %}
{%- for item in collections.all %}
{% endhighlight %}

But then that would get all generated files/pages (like the paginated lists of posts which didn't need to be in the index), so I needed to do something else. 

The solution I settled on was to set a `idxIgnore` property in the frontmatter on pages I didn't want included in the index. For example, here's the categories page:

```yaml
---
layout: generic
title: Article Categories
eleventyNavigation:
  key: Categories
  parent: Articles
  order: 2
idxIgnore: true
---
```

With that in place and all the skipped pages marked with the property, all I had to do was update indexing algorithm to ignore those pages. 

Here's the updated `algolia.liquid` file:

{% highlight liquid %}
---
permalink: /algolia.json
idxIgnore: true
---

[
  {%- assign comma = "" %}
  {%- for item in collections.all %}
  {%- unless item.url == page.url or item.data.idxIgnore or item.url == false %}
    {{ comma }}{
      "objectID": {{ item.url | json }},
      "title": {{ item.data.title | default: item.fileSlug | json }},
      "date": "{{ item.date }}",
      "date_timestamp": {{ item.date | date: "%s" }},
      "url": {{ item.url | prepend: site.url | json }},
      "content": {{ item.templateContent | algExcerpt | json }},
      "tags": {{ item.data.tags | default: empty | json }},
      "categories": {{ item.data.categories | default: empty | json }}
    }
    {%- assign comma = "," %}
  {%- endunless %}
{%- endfor %}]
{% endhighlight %}

I didn't write that file, AI gave it to me and I had to study it to understand exactly what it was doing. The comma thing threw me the most, but I finally figured it out. 

The use of `unless` flips the code on its head, I don't know why it was written that way, I assume you could right it the opposite way, but I didn't try since this worked.

The code starts with comma blank/empty, so the index doesn't start with, you know, a `,`. After that though, and it has to reset the variable in every loop, comma contains a comma, so that separates every index entry. 
