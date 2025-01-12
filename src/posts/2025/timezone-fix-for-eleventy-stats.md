---
title: Timezone Fix for the Eleventy Stats Plugin
description: I noticed a bug in my Eleventy Plugin Post Statistics where posts
  published on January 1st were counted as being published on December 31st of
  the previous year. The issue stemmed from the plugin converting dates to UTC.
  To fix it, I added the timezone offset to the date values, converting them to
  the local time zone. I also had to adjust some code to resolve a TypeScript
  compiler error.
date: 2025-01-12
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Eleventy
timestamp: 2025-01-12T13:10:17.007Z
generatedDescription: true
---

In a short post yesterday, I mentioned that I noticed that my [Eleventy Plugin Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} wasn't working correctly. For this year's posts, the post count was short one post. 

I did some initial troubleshooting and noticed that the issue arose for any year where I published a post on January 1st (it didn't matter the year). The plugin treated any post published on that date as being published on December 31st of the previous year; the post wasn't missing from the stats, it simply was reported in the previous year's post count.  

This morning I started working on the fix; I knew what the issue was, just not how to fix it cleanly.

{% sidebar "Previously Encountered Issue" %}
I ran into this issue previously and wrote about it in <a href="/posts/2024/added-timestamp-to-posts/">Added Timestamp to Posts</a>. 
{% endsidebar %}

In an Eleventy site, you write the post date as a string representation of the date to the post's front matter; its as a date value, no timestamp. You can skip that property in the front matter and Eleventy will use the create date for the post file.

When the plugin's JavaScript code reads the date string from the post, it converts it into a JavaScript `Date` object but represents the date in Coordinated Universal Time ([utc](https://en.wikipedia.org/wiki/Coordinated_Universal_Time){target="_blank"}). So, my post published in the US Eastern Time Zone (GMT-5), but in UTC the post date is 5 hours earlier (because UTC is -5 hours from US ET). In my timestamp post linked earlier, I fixed this problem by forcing the US ET time zone on the cloud system that builds the site. That worked for my timestamp issues, but didn't work for this plugin.

## Validating the Issue

I figured out the issue by taking a look at how the plugin represented the date values. In my plugin project, I modified posts at the beginning and end of the date range so they both show publishing on January 1st. Then, there's a section in the plugin where it stores the first and last post dates to variables, so I modified the code to write those values to the console:

**Note:** All the code in this post is in TypeScript.

```typescript
statsObject.firstPostDate = posts[0].data.page.date;
statsObject.lastPostDate = posts[postCount - 1].data.page.date;  
log.debug(`First post date: ${statsObject.firstPostDate}`);
log.debug(`Last post date: ${statsObject.lastPostDate}`);
```

When I executed a site build, the console reported that both January 1 posts were viewed as December 31st (in their respective years), 5 hours earlier than I expected. That's why the plugin stored posts published on January 1st in the previous year, because 12:01 AM in US ET on January 1st is 5 hours earlier (late evenining) on December 31st.

## Implementing the Fix

OK, with that confirmed, I knew what I had to do. I had to add the timezone offset to the date values and all would be well. JavaScript has a `getTimezoneOffset()` method I can use to query the local system for its number of minutes offset from UTC. My development system is in US ET, so the method returns 300 (5 hours times 60 minutes per hour = 300). 

JavaScript treats Date/Time objects as if they were in milliseconds, so to use this offset in my plugin, all I had to do was convert it to milliseconds. There are 60,000 milliseconds in a minute, so the conversion of time zone offset to milliseconds looks like this:

```typescript
var timeOffset = new Date().getTimezoneOffset() * 60000;
```

With that in hand, I added a little function that took the date string from the Post and converted it into a JavaScript `Date` object adjusted to the local time zone:

```typescript
function convertPostDateToLocal(dateStr: string, offset: number): Date {
  var date = new Date(dateStr);
  return new Date(date.getTime() + offset);
}
```

Then, in the code where I grab the post date from the post, I converted it using:

```typescript
var timeOffset = new Date().getTimezoneOffset() * 60000;
statsObject.firstPostDate = convertPostDateToLocal(posts[0].data.page.date, timeOffset);
statsObject.lastPostDate = convertPostDateToLocal(posts[postCount - 1].data.page.date, timeOffset);
```

I ran into one other issue that broke when I implemented the fix; I don't know why and I didn't dig too deep into it. When the TypeScript compiler hit this code in my plugin:

```typescript
let daysBetween: number = (postDate - prevPostDate) / oneDayMilliseconds;
```

It generated the following error message:

> The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts

I code my site in Visual Studio Code, so since I know that code is good code, I could simply add a [`//@ts-ignore`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments){target="_blank"} to the line above the code and the error would go away. I don't like hacks like that, I'd rather fix errors if I can rather than telling the compiler to ignore them. 

What I did instead was use the `getTime()` method on the `Date` object to do the subtraction in milliseconds directly:

```typescript
let daysBetween: number = (postDate.getTime() - prevPostDate.getTime()) / oneDayMilliseconds;
```

With that in place, the error went away and the plugin's fixed.
