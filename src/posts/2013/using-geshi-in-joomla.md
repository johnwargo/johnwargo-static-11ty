---
title: Using GeSHi in Joomla
description: 
date: 2013-02-21
headerImage: 
categories: [Content Management Systems]
tags: post
---

If you've been poking around within this site, you may have noticed that I used to post a bunch of source code to the site. I don't write as much code as I used to and much less than I'm accustomed to, but when I setup this site, I found myself posting a bunch of code and wanting to make it render properly on the site's pages.

Being new to Joomla!, I poked around a bit and noticed that there was a code highlighting plug-in called GeSHi installed as one of the core plug-ins in any Joomla! implementation. I thought all of my problems were solved, so I started trying to figure out how to make this code highlighter work. A search of the Joomla! documentation proved to me that nobody on the Joomla! project though it was important to document how this plug-in worked. I continued my search and found the GeSHi plug-in's home page at [https://qbnz.com/highlighter](https://qbnz.com/highlighter){target="_blank"}  As I poked around on the site, I found a bunch of information about how to implement GeSHi within a php-based web site, but nothing that told me how to use the plug-in in my Joomla! site. I quickly gave up on GeSHi and started looking elsewhere.

In the Joomla! extension directory, I found another plug-in called Code Citation which seemed to be exactly what I was looking for. It was a standard Joomla! plug-in, so it was installed in no time, and there was actually documentation on how to use it in your Joomla! web sites. I quickly installed it and over the years used it everywhere in this site.

When I upgraded to Joomla! 2.5, I encountered problems with Code Citation but eventually worked through them and got the site up and running. The developer's stopped work on the project and it isn't compatible with anything newer than Joomla! 1.6; I wrote about that experience here #######. Last week I noticed that my [BlackBerry Development Fundamentals](https://bbdevfundamentals.com) web site was running on a discontinued version of Joomla! and I needed to upgrade it. As I upgraded it, I noticed that I had some source code on the site, so I had to install Code Citation on this upgraded site.

Even though I was able to get it working on this site, something was different about the BlackBerry Development Fundamentals site, and the plug-in wouldn't work there. Every time I got close to a page that used Code Citation, the server would deliver a blank page.  I'd pestered the developer of the plug-in so much when I was trying to get Code Citation working on this site, that I didn't feel right bugging him again. Besides, I really wanted to figure out the GeSHi plug-in anyway, so I set about finally buckling down and figuring it out.

First, I found this site: [https://bitsensei.com/web/joomla/9-using-geshi-in-joomla/](https://bitsensei.com/web/joomla/9-using-geshi-in-joomla/){target="_blank"} which explained how the default Joomla! implementation of GeSHi didn't include all of the supported language plug-ins (Joomla! only includes a few of the many included with the default GeSHi installation) and how to update the site to include all languages. Additionally, it mentioned how to invoke the plug-in within your web site, but not how to actually implement that on your site's pages. Ugh! So close.

Next, I found the following site:  [https://dotcomxl.com/index.php/tutorials/web-design/115-joomla-syntax-highlighter](https://dotcomxl.com/index.php/tutorials/web-design/115-joomla-syntax-highlighter){target="_blank"} which finally had the information I needed to make this work. The article first provided all sorts of information about how to enhance the output of GeSHI then finally at the end of the article I saw this:

Now that the plugin is enabled, if you want to show code in your articles you should switch to HTML view in your WYSIWYG editor and use this format:

{% highlight liquid %}
<pre xml:lang=”java”>  
Inert your Java Code here  
</pre>
{% endhighlight %}

That's exactly what I'd been searching for – the other sites mentioned the pre tag, but not how you inserted the code into your article. When using Code Citation, the Code Citation processing tags go at the beginning and end of your code – you don't need to switch to the HTML editor to enable it. GeSHi apparently requires that, but it wasn't described that way in all of the sites I looked to for help.

So, now I finally knew how to enable GeSHi in a Joomla! web site. Simply bracket the code you want highlighted with the pre and /pre tags, but do it within the HTML editor as shown in the following figure:

{% image "src/images/2013/geshi-example.png", "GeSHi Example", "image-full" %}

Of course, going back to the GeSHi web site, I see now that the documentation describe the pre tags but doesn't mention that you have to insert them from the HTML editor. Another perfect example of how many developers write documentation from the standpoint that you already know how to do something instead of writing it from the standpoint of someone who DOESN'T know how to do something.

It…works – the BlackBerry Development Fundamentals site's code samples render like they should, but I like Code Citation much better. I wish the developer of the plug-in would continue to work on it and update it for Joomla! 2.5 or even 3.0. It's a much simpler solution and doesn't require you to go into the HTML editor to format some source code. Right now this site is still working, so I won't have to revisit this topic until a Joomla! upgrade breaks Code Citation here or until the Code Citation developer releases an update. I hope the latter happens first.