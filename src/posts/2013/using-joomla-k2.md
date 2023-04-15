---
title: Using Joomla K2
description: 
date: 2013-08-25
headerImage: 
categories: [Content Management Systems]
tags: post
---

I've started work on the web site for my upcoming book, Apache Cordova Programming.

For my [BlackBerry Development Fundamentals](https://www.bbdevfundamentals.com), I created the site using Joomla. For [PhoneGap Essentials](https://www.phonegapessentials.com), I wanted to learn Drupal, so I used it to build the book's web site. For my [What Now? The Essential Guide for New Soccer Referees](https://www.newsoccerref.com/), I used the Concrete 5 CMS. Since I've used a different CMS for each book's web site, it would be cool to continue the tradition, but no other CMS has caught my eye. I wanted to try to use Xoops for something, but that one seems to have withered on the vine.

Drupal is very powerful, but a little hard to work with. You have great power in what you can do with a site, but I found it to be pretty slow and cumbersome. Unfortunately, for the type of site I wanted to build for PhoneGap Essentials, Drupal was a great choice as the very powerful Content Creation Kit (CCK) was moved into the core of Drupal beginning with Drupal 7. The CCK allowed me to easily define custom fields for my different content types and render and sort by those fields in views. It was pretty cool and I was able to quickly do what I wanted with the site – customizing the Chapters ([https://www.phonegapessentials.com/chapters.html](https://www.phonegapessentials.com/chapters.html)) and Errata ([https://www.phonegapessentials.com/errata.html](https://www.phonegapessentials.com/errata.html)) views on the site.

I'm a super big fan of Joomla, and although Drupal would give me the flexibility I needed to make the site I needed, I would really prefer to do it with Joomla. So, I registered a domain, setup a Joomla site (using the latest and greatest version of course) and started looking for a way to get the CCK capabilities I wanted with a Joomla-based web site.

If you search through the Joomla Extension Directory and look at CCK extensions, the JoomlaWorks K2 extension is listed as one of the most popular. I looked around on their web site ([https://getk2.org](https://getk2.org)) and it looked like it had everything I needed. I installed it and figured out how to use it fairly quickly although there is absolutely no documentation available for the extension. There are video tutorials, but no documentation at all that I can find. After playing around with it for a while, I was frustrated to find that it really doesn't provide the capabilities I need. It works (sort of) and it has a pretty cool set of features, but falls down in the critical places where I need it the most.

I was able to add extra fields like Chapter and Page, and built some field groups to group them together.  My Chapter content needed the Chapter field, but the Errata article type needed both Chapter and Page. Unfortunately, for some bizarre reason, you can't have a field in two field groups. Makes no sense to me, but that is the way it works. So, I had to add a Chapter field for the Chapter article type and another Chapter field for the Errata article type. Ugh.

There's no numeric field type. I can add a bunch of extra fields, but not numeric fields. If you look at the previous paragraph, doesn't Chapter and Page Number fields imply they're numeric? Nope, had to create them as text, not numeric fields. Next to useless.

K2 doesn't seem to support any custom views. Now that I have all of my chapter content entered with my shiny new Chapter field added, I want to create a view that allows me to render articles sorted by chapter number. Nope, can't do it. Not only can't you show a custom field in a view, you can't sort on it either. What's the sense of allowing me to add additional fields to an article if I can't use them for anything.  And, since I have to use text fields instead of numeric fields, even if I could use them in views, they would still sort as 1, 10, 2, 3 and so on since that's the way sorting by textual numbers works.

What's the point?

It seems like they expect you to extend Joomla's article system in order to create custom views, but that seems like more trouble than it's worth. I've printed out a tutorial on the topic and we'll see over the next couple of weeks if I can figure it out.

I tried using the Article Manager to force the order of the Chapter articles, but could not make it work any way I tried. The default Joomla article manager allows me to do it, but not K2.

Over the last few months, I've posted some questions to the K2 forums. When I'm up there looking around, there's nobody else but me up there, so it really feels like an unpopular or near death extension.

I've posted question on the forums asking how I can create custom views. I've asked where the documentation is.  I've asked why there's no numeric field type. No response. I did get one response, but the responder used Google Translate to translate my question and the response I got back (translated back into English) was incomprehensible.

It sure feels like K2 is near death. It has great aspirations, but simply doesn't deliver. Too bad, it looked like a good option for me.