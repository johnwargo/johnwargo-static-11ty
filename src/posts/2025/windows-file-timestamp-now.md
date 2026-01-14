---
title: Setting Windows File and Directory Timestamps to Now
description: 
date: 2025-06-29
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
  - Delphi
timestamp: 2025-06-29T10:18:13.944Z
---

When working on a book and sometimes while writing software applications, I like to set my project files (Word documents or other files) to the same timestamp. I'm not sure why I started doing this, but it allows me to set a sort of release grouping on the files based on timestamp. 

For years I used a free Windows application called [Attribute Changer](https://www.petges.lu/){target="_blank"} for this. I don't remember how I found it, but it became a staple on my development systems over the years and I really relied upon it. The Windows Shell Extension allows you to change file attributes (like `hidden` or `read-only`) as well as the timestamps for Created, Modified, and Accessed. The application's grown over the years and added a bunch of very flexible configuration options, but as it did that, it became more complicated to use. In its current version, I can't simply invoke the shell extension like I always have and have it automatically do what I want. Its not that much harder to use than before,  but it does more than I need it to do now and, like I said, the user experience is...cumbersome.

I always wanted to learn how to code a Windows shell extension, so I set about implementing my own version of the utility I needed. I started building something that handled file attributes along with file and directory timestamps, but then I realized that all I was doing was building a clone of Attribute Changer.

I finally settled on building a shell extension that simply changed one or more file and/or directory timestamps to the current date/time (timestamp). I call the application [Timestamp Now](https://fumblydiddle.com/products/timestampnow/){target="_blank"}.

{% sidebar "Free Download" %}
Download <strong>Timestamp Now</strong> from <a href="https://fumblydiddle.com/products/timestampnow/" target="_blank">Fumbly Diddle Software</a>
{% endsidebar %}

The application's interface is very simple and its easy to use. In Windows File Explorer, simply select a set of files and/or directories, then right-click on one of the selected files and select **Timestamp Now**. The shell extension loads and displays the following interface.

<img src="src/images/2025/timestampnow-ui.png" alt="Timestamp Now UI" />

From here, you can select which timestamps you want modified:

+ Created
+ Modified
+ Accessed

Next, you select the format for the timestamp:

| Option        | Description | 
| ------------- | ----------- |
| `##:##:##:##` | Use the full time value as the timestamp. |
| `##:##:##:00` | Use the current time with milliseconds zeroed out. |
| `##:##:00:00` | Use the current time with seconds and milliseconds zeroed out. |

The options allow you to leave the timestamp alone (using the current date/time) or zero out the minor parts to make the changes look cleaner. When changing the timestamp for files, I generally zero out the seconds and milliseconds so the timestamp looks artificial, notifying me that I changed the timestamp. 

The application's a free download from [Fumbly Diddle Software](https://fumblydiddle.com/products/timestampnow/){target="_blank"}. I hope this little utility helps you.
