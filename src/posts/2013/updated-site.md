---
title: Updated Site
description: 
date: 2013-01-24
headerImage: 
categories: [Content Management Systems]
tags: post
---

Well, I finally did it – I completed the site's upgrade from Joomla! 1.5 to 2.5. I started the project back in August and I haven't been working on the project the whole time. I just ran into a couple of small, nagging issues and stepped away from it for a while as I worked on other things (like my day job). Of course, Joomla! 3.0 came out in the meantime, so I have to make plans to do that upgrade soon (as 3.0 is way, way cool and implements some features I really want to use on the site).

I used a Joomla! extension called JUpgrade to manage the upgrade process. You install it on your site and execute the process and it creates a new folder (under the current site's folder) and a new set of database tables (with new table prefix) then migrates all of your 1.5 data into the 2.5 format. It is really slick and works really well – especially for a free piece of software created and (I think) maintained by one guy.

At the conclusion of the migration, I had two sites – the old one and a relatively stable new one. The next task was to go through EVERYTHING in the new site and make sure it worked. JUpgrade only supports a subset of the Joomla! extensions I was using, so I found an awful lot of places where I had to install an updated version of an extension (I couldn't in some cases install the upgrade before migrating, because the new version might not be compatible with the old site). I should have gone through and updated everything first, but I think (can't remember now) I forgot to do that.

Anyways, I poked and prodded at this thing and finally got almost everything back up and running in a few hours. It was fun and exhilarating work, I don't know what it was about the task, but I really, really enjoyed it. I guess the prospect of taking a completely new look at the site and its functionality (it's been up for almost 4 years now) was fun.

The 'old' site (it was live just a day ago and now it's old?) used a template from Joomlashack called Weblogic and it was cool in the fact that it used the entire width of the page (which modern Joomla Templates, until very recently, did not do) and because of that I had components on the left and right of the page with content in the middle. As I started this project, none of the Joomla! 2.5 compatible templates I could find supported that. So, I set out to find a new template and selected Simple Tech (also from JoomlaShack); it's really cool and I love orange. I hired a local design firm to make the logo and I was all set.

Since then of course, Joomla! templates have now gone 'responsive' and can again make use of most of a page's width. I'm waiting for the folks at JoomlaShack to upgrade Simple Tech to use the responsive layout, but for now you (and I) are stuck with the 960 layout popular these last few years (ugh).

So, what held me back? Getting CodeCitation to work. When I first built the site, I quickly found myself needing to be able to highlight application source code in a neat way on the site. I found that the Joomla! project team had implemented a syntax highlighter called GeSHi – but I couldn't find information about how to use it ANYWHERE. Even the GeSHi site only shows you how to implement GeSHi, not use it. So, I went searching and found a plug-in called CodeCitation that was free, worked and was documented at least well enough that I could get started. So, after the upgrade, I went looking for an updated version of the CodeCitation  plug-in and couldn't find one. The last version was only compatible with Joomla! 1.6. I installed that version and quickly learned that I still had the same problem. When you loaded pages that had source code highlighted, you'd get an error when the page loaded. I located the plug-in's author and emailed him – he was kind enough to respond, but was 'planning' on updating the plug-in but had no timeline in mind. Crikey.

I thought about switching to the built-in GsSHi, which was now better documented – I at least knew better how to use it, but that would take a lot of work. The CodeCitation developer was responsive, but didn't have a lot to say – clearly he's moved on to other things.

So, I put everything down and stepped away for a while. Of course, life happens and holidays too, so it was not until a couple of days ago that I picked it back up again (about 5months later). I started really looking at the content, trying to figure out why the plug-in was failing. I quickly learned that only some of the pages were generating errors, the plug-in worked on some articles, but not all. Of course, then I started looking at the differences between the articles that worked and the ones that didn't – and found the problem. It was my fault all along!

CodeCitation uses some markup you add to your content to identify the areas that you want it to manipulate. In that markup, you add a class element and identify the brush you want to use (language) to markup the content as shown below.

```text
class="brush:vb; gutter:false"
```

In this example, the brush is set to vb (for Visual Basic). Notice the semicolon between the 'brush' and 'gutter' attributes? Well, in the articles I was having trouble with, I'd forgotten to include the semicolon separator between those two elements. Apparently Joomla! 1.5 didn't have a problem with that but Joomla! 2.5 did. That's it, that's all was wrong; I updated a couple of articles and the site was ready to go live.

I'm going to let this thing sit for a while then start the upgrade to Joomla! 3.0. Stay tuned.