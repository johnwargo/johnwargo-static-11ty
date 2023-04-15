---
title: Using jUpgrade
description: 
date: 2013-02-17
headerImage: 
categories: [Content Management Systems]
tags: post
---

I've upgraded a few sites lately from Joomla! 1.5 to Joomla! 2.5 using [jUpgrade](https://extensions.joomla.org/extensions/migration-a-conversion/joomla-migration/11658){target="_blank"}. The upgrade from 1.5 to 2.5 isn't exactly an upgrade, it's more of a migration, so you really have to use tools like jUpgrade to make it work.

JUpgrade installs as a Joomla! Component and adds its own options to the Joomla! Components  menu. It essentially downloads a version of Joomla! 2.5, installs it in a sub-folder from your original Joomla! 1.5 installation then copies 'all' of your stuff to the new site. At the end of the rather quick and painless process, you have two copies of your Joomla! site; one in the site's original location and another in a sub-folder called 'jupgrade'. You maintain access to your original site, but have this new version to work with to test to make sure everything migrated OK (it didn't, trust me) and to upgrade your template, extensions and so on. Chances are your Joomla! 1.5 template won't be compatible with Joomla! 2.5, so no matter what, you'll have to acquire, install and configure an updated template in your upgraded (migrated) web site.

You may have noticed that I said above that everything won't migrate correctly – that wasn't a complaint, simply a statement of the truth. jUpgrade is amazing considering what it does and how much it costs (it's free). Unfortunately, there's so many plug-ins, components and modules available for Joomla! that there's no way for any migration tool to be able to accommodate everything which might be running in your site.

The developer(s) of jUpgrade have done what they can to accommodate the most popular options, but after the conclusion of the jUpgrade migration, you'll have all of your articles, categories and menus copied over into the new site, but not much else. When you go into the new version of the site, you'll have to start adding back your extensions and putting everything back where it belongs. It's a challenging task, but I found it to be a fun process. It forces you a chance to rethink your site's structure, layout and configuration – and ultimately my 'new' sites look nothing like my original sites when I'm done.

## What Didn't Work

Having migrated three sites, I thought I'd fill you in on some of the things that simply did not migrate properly using jUpgrade.

### Categories

The first thing I noticed was that Joomla! article categories got copied over to the new site, but didn't work correctly. In some cases, I had to go in and edit then save each category before things would work correctly. In other cases I found that my top level categories were setup as sub-categories to the Uncategorized category. Either way, expect that you're going to have to do some work on your categories before you can go live with your migrated site.

### Newsfeeds

I also noticed that on several of my migrated sites, any Newsflash Module settings don't make it across correctly. In several of my sites, I had a newsflash module rendering a random article on part of the site. After the migration, that module was still there, but was configured to show many articles in a particular order – rather than the one article with random as I originally had it setup.

### SH404SEF

I use the [SH404SEF](https://anything-digital.com/sh404sef/seo-analytics-and-security-for-joomla.html){target="_blank"} SEO, analytics and security module from Anything Digital on several of my sites. I noticed that during the jUpgrade migration process, something goes wrong and SH404SEF stops working correctly. For this site, I've not been able to resolve the issues I have – even with support from Anything Digital. If you look at links on this site, you'll notice that I have the external link symbol appearing to let you, my readers, know when I'm sending you somewhere else. It's a feature of the SH404SEF component and I like it. If you look at some of the articles that precede this one on the site, you'll notice that some links (but not all) that point to external sites have the symbol but not others. I can't figure it out nor can I fix it.

Recommendation is to completely uninstall SH404SEF before starting the migration, and then reinstall it later. I'm not sure it that will help, but it's worth a try.

## Going Live

After you've completed the migration process and made sure everything is working well on your new site, migrating from the old site to the new one is quite painless. Simply delete the old site's files (I download them first, then copy them to another folder on my server – can't have too many copies) then copy the files from the jupgrade folder to the original site's folder. With that done, you're all set – just be sure to test everything before you decide you're done.

After you've made sure everything is working OK, go into your MySQL manager and open your site's database – you'll find two sets of tables there, your original Joomla! tables plus a new set created by jUpgrade. It's not required, but you will want to remove (drop) the original tables when you're sure the new site's working as expected.