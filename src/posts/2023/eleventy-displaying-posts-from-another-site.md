---
tags: post
title: Eleventy Displaying Posts from Another Site
description: 
date: 2023-05-29
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

As I explained in [Relaunched A World Without Apps](/posts/2023/relaunched-a-world-without-apps/) I just relaunched a sister site to this one. After I posted that article, I started thinking about pulling in the most recent posts from that site to this one's home page, just to cross link the sites. You can see the results on the home page, it looks something like this:

{% image "src/images/2023/wwa-posts.png", "A World Without Apps Post List", "image-full" %}

Since the World Without Apps site has a [JSON-based RSS feed](https://aworldwithoutapps.com/feed.json){target="_blank"}, there wasn't a lot I had to do to make this work. 

First, I created a data file called [`wwa-posts.js`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/src/_data/wwa-posts.js){target="_blank"} in this site's `scr/_data` folder that looks like this:

```js
'use strict'

module.exports = async function () {
  const response = await fetch('https://aworldwithoutapps.com/feed.json');
  const data = await response.json();
  return data.items;
}
```

What this does is read the RSS feed, then returns the article items array as a global data set in Eleventy. With that in place, all I had to do was update the home page to use the list of articles:

{% highlight liquid %}
<h3>
  <a href="https://aworldwithoutapps.com" target="_blank">A World Without Apps</a>
</h3>
<p>The latest posts from sister site
  <a href="https://aworldwithoutapps.com" target="_blank">
    <em>A World Without Apps</em>
  </a>.
</p>
<ul>
  {% for item in wwa-posts limit: 5 %}
    <li>
      <a href="{{ item.url }}" target="_blank">{{ item.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endhighlight %}

That's it! 

There are, however, several issues with this approach. 

First of all, the list will only update when I generate this site, not when I add a post to the A World Without Apps (WWA) site. I could, I guess, setup some sort of trigger so that whenever I add a post to the WWA site that triggers a build of this site. I may investigate the best way to do that and get back to you on that one. 

The other issue is that I build and host this site using [Netlify](https://netlify.com){target="_blank"} and the cloud build process didn't like my use of `fetch` in the JavaScript code I showed earlier. That's because the `fetch()` command isn't available in older versions of [node.js](https://nodejs.org/en){target="_blank"} that Netlify apparently uses by default. All I had to do was add an environment variable called `NODE_VERSION` to my site's configuration in Netlify and set the value to `18` and everything works great.

## No JSON RSS Feed?

This all works because the WWA site has a JSON-based RSS feed in place, If you don't have one in your site, you'll have to do this a little differently. 

In the source site, add a global data file to the site's `src/_data` folder, in my case I called it `wwa-latest.liquid`, and populate it with the following code:

{% highlight liquid %}
---
permalink: /wwa-latest.json
---

{% assign posts = collections.posts | reverse %}
[
{% for post in posts limit: 5 %}
  {
  "title": {{ post.data.title | jsonify }},
  "date":"{{ post.data.date | isoDate }}",
  "description":"{{ post.data.description }}",
  "url":"{{ post.url | prepend: metadata.url }}"
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
]
{% endhighlight %}

What this does is create a data file called `wwa-latest.json` in the site's root directory. The code limits the results to 5 posts, but you could easily change that by modifying the number in the `limit: 5` statement in the code.

When Eleventy builds the site, it creates a file that looks like this:

```json
[
  {
    "title": "Islands of AI Everywhere",
    "date": "2023-05-28",
    "description": "You see examples of AI everywhere nowadays, but what we don't see is many examples of multiple models wired together to accomplish something. What we have is little islands of AI which minimizes its impact.",
    "url": "https://aworldwithoutapps.com/posts/2023/islands-of-ai-everywhere/"
  },
  {
    "title": "This Site Restarted",
    "date": "2023-05-24",
    "description": "After a six-year hiatus, I'm finally back to writing articles on this site. Here's why...",
    "url": "https://aworldwithoutapps.com/posts/2023/this-site-restarted/"
  },
  {
    "title": "Amazon Alexa is Not Artificial Intelligence",
    "date": "2017-09-06",
    "description": "Debugs the concept that Alexa is AI, instead it's just a bunch of discrete Machine Learning models.",
    "url": "https://aworldwithoutapps.com/posts/2017/amazon-alexa-is-not-artificial-intelligence/"
  },
  {
    "title": "When the WWA Overlaps the Physical World",
    "date": "2017-08-28",
    "description": "Describes my surprised when my digital presence appeared in the real world.",
    "url": "https://aworldwithoutapps.com/posts/2017/when-the-wwa-overlaps-the-physical-world/"
  },
  {
    "title": "Hacking AI for Fun and Profit",
    "date": "2017-06-09",
    "description": "My reaction to the Google AIY project.",
    "url": "https://aworldwithoutapps.com/posts/2017/hacking-ai-for-fun-and-profit/"
  }
]
```

With that in place, all you have to do is read the file and use it in your site.

The first step is to switch to the target Eleventy project and add a global data file to the project, in this case, it's a slightly different version of the `wwa-posts.js` described in the beginning of this article.

```js
'use strict'

module.exports = async function () {
  const response = await fetch('https://aworldwithoutapps.com/wwa-latest.json');
  return await response.json();
}
```

In this case, the code reads the generated JSON file from the source site and returns it as an array of posts. With that array in hand, you use the exact same code to display the post list on your site:

{% highlight liquid %}
<h3>
  <a href="https://aworldwithoutapps.com" target="_blank">A World Without Apps</a>
</h3>
<p>The latest posts from sister site
  <a href="https://aworldwithoutapps.com" target="_blank">
    <em>A World Without Apps</em>
  </a>.
</p>
<ul>
  {% for item in wwa-posts limit: 5 %}
    <li>
      <a href="{{ item.url }}" target="_blank">{{ item.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endhighlight %}
