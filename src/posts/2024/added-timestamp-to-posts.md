---
title: Added Timestamp to Posts
description: 
date: 2024-04-07
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - JavaScript  
timestamp: 2024-04-07T23:08:47.167Z
---

In my [previous post](/posts/2024/new-post-timestamp/), I described how I updated my [Eleventy New Post](https://github.com/johnwargo/eleventy-new-post){target="_blank"} utility to add a `timestamp` property to new post's front matter. With that in place, I updated the site's Home Page, Articles Page and at the top of every Post. I encountered a little issue with that implementation related to time zones, so I decided to dig deeper into the implementation on this site and how I solved the time zone issue.

## How I Implemented Timestamp in this Site

The first thing I did was add a filter called `readableTimestamp` to the site's `eleventy.config.js`. Well, that's not actually true, it wasn't the first thing I did, but it's the first thing I want you to know about the implementation.  Here's the code:

```typescript
eleventyConfig.addFilter("readableTimestamp", function (dateVal, locale = "en-us") {
  var theDate = new Date(dateVal);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  };
  return theDate.toLocaleString(locale, options);
});
```
With this code, if you pass in a timestamp from the previous post's markdown file: `2024-04-06T12:10:59.445Z`, the filter returns `Saturday, April 6, 2024 at 08:10 AM`. When testing this code on the site, everything worked great, but when I deployed it to my hosting provider the timestamp was incorrect. More on this later.

Next, I updated the different layouts to display the `timestamp` property when there was one, but the `date` property when there wasn't. There are 500 or so posts in this site, but only the most recent ones will have a timestamp.

Originally, the site used something like this to display the post date:

{% highlight liquid %}
Posted {{ post.date | readableDate }}        
{% endhighlight %}

It uses the readableDate filter from the [eleventy-plugin-date](https://npmjs.com/package/eleventy-plugin-date){target="_blank"} plugin to format the date for output.

**Note:** You may have noticed the name of the filter I listed above - I specifically picked the filter name to align it with the one from the Eleventy date plugin.

To implement the timestamp, I changed the code to look like this:

{% highlight liquid %}
Posted {%- if post.data.timestamp %}
{{ post.data.timestamp | readableTimestamp }}
{%- else %}
{{ post.date | readableDate }}
{%- endif %}
{% endhighlight %}

That's basically all there is to it.

## The Problem

Like said earlier, when I tested the site locally, all the dates appeared correctly. That's because I executed the Eleventy New Post (11ty-np) utility in GMT-4 (US Eastern Time) and served the site locally in the same time zone. As soon as I published the site to Netlify, the timestamp displayed 4 hours delayed. For example, `2024-04-06T12:10:59.445Z` is 8:10 AM GMT-4 but also, at the same time, 12:10 PM GMT. Netlify's servers dutifully render the site using GMT and therefore all of my timestamps (there was only one at the time, but you get what I mean, right?) were off by 4 hours.

What to do?

## The Solution

I started poking around at the code, looking for a way to convert the timestamp to my local timezone for all cases, but didn't come up with anything. Then I realized I'd bumped up against this earlier (although I couldn't remember what it was). A quick search and I found the solution. 

Netlify allows you to set environment variables to control the runtime environment. My site runs on a Linux server (I assume) and you can set a timezone environment variable (`TZ`) and force the server to think in a specific timezone.

I could set the environment variable in the Netlify portal, but they also allow you to include variable definitions in a text file checked into the repository. I created the `netlify.toml` file shown below, checked it into the site's repository, pushed the code to the server, and the problem went away.

```toml
[build.environment]
  TZ = "America/New_York"
```

The site serves in `America/New_York` time zone (which updates automatically for Daylight Savings Time (I assume)) and I'm all set.
