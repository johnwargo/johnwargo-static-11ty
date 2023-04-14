---
title: Writing a Book, Part 3 – Synchronizing Files
description: 
date: 2010-05-16
headerImage: 
categories: [Miscellaneous]
tags: post
---

![](/images/stories/book.jpg)This article is the third in a series about some of the technical hurdles I faced while trying to write [BlackBerry Development Fundamentals](https://www.bbdevfundamentals.com) on my laptop (while on the road) and my desktop (when at home).  I’m trying to focus on the technical solutions I implemented so that others who begin writing a manuscript can benefit from my experience.  The [first article in the series](index.php?option=com_content&view=article&id=194:wb1&catid=9&Itemid=17) laid out an overview of the problems and the technical solutions I selected to solve them. The [second article](index.php?option=com_content&view=article&id=195:wb2&catid=9&Itemid=17) covered how I was able to ensure that I had a backup copy of every edit I’d made to the manuscript. This article covers how I synchronized the files between my two systems and, spoiler alert, caused some problems by doing so.

Looking at the site’s statistics, it’s clear that not many of you are interested in this topic – I’m only getting a few hits on the articles. I’m going to wrap up this series this week (hopefully) then move on to some more interesting topics. In the mean time, here we go…

As I mentioned in one of the earlier articles of this series, while I was working on the book, I spent a fair amount of time on the road. It was ultimately a good thing since I was able to work long nights in the hotel room and make better progress on the manuscript without feeling guilty about ignoring my family. Because of this, I needed some way to work on the manuscript from my laptop and my desktop, but I didn’t want to store the files up on a server somewhere – I wanted them physically on whichever system I was working on so that I could access them even if I didn’t have network connectivity (which wasn’t that often, but I didn’t want to have to worry about it).

While Windows has the ability to synchronize files with a server, it wouldn’t work in my case because my laptop connected to my work domain and my desktop system didn’t. I didn’t want to have to deal with network domain issues. The solution I selected for this problem is a piece of software I’ve been using for years now called [Second Copy](https://www.centered.com). Second Copy is an award winning synchronization and backup tool that has supported me very well for a great many years. I use the solution to synchronize each system with a Windows server I have in my home office (The server is called [Dinsdale](https://en.wikipedia.org/wiki/Piranha_Brothers); Monty Python fans might recognize the name) but it can also be used to write files to removable media.

The way I use this solution is to regularly synchronize the contents of my desktop system’s ‘My Documents’ folder to a dedicated drive I have in Dinsdale for backups. Since my laptop was to be used primarily for work purposes, I only synchronized the contents of my laptop’s ‘FoBAD’ folder (described in the second article in the series) with the corresponding folder on Dinsdale.

At first, I’d have the synchronization run every two hours, but before long I was getting regularly yelled at by Second Copy as it was trying to synchronize a file I currently had open. I later switched the process so my desktop would synchronize every morning at 6:00 AM (way before I was ever up working on the manuscript) and my laptop would synchronize on startup (as soon as I turned it on after returning from a trip) and every night at about 11 or midnight. With this in place, I had everything synchronizing nicely between the systems and it wasn’t until much later that I realized I’d inadvertently created a problem by using this setup. The problem wasn’t related to Second Copy, it had to do with some rearranging of files I was doing as I worked with the book’s chapters. I’ll explain more about this in the next installment of this series called Writing a Book, Part 4 – Fixing File Synchronization Errors. Stay tuned.

Just in case you’re interested in how Second Copy works, I’m going to show below how I setup the synchronization process in the program. When you install Second Copy, it launches on startup and puts a little application in the Windows system tray. It sits there patiently waiting for a scheduled job to begin then kicks off the process at the appropriate time and takes care of my file synchronization needs for me.

To setup a job, you have to create a profile; a profile in Second Copy defines actions taken upon a particular file folder on a computer system Second Copy has access to. The figure below shows the profiles I have defined on my desktop system.

![](/images/stories/2010/secondcopy0.png)

Figure 1

When you create a new profile, Second Copy walks you through a wizard that allows you to select all of the options for the job. The first step in the wizard allows you to select Express or Custom setup for your profile. With Express setup, you’re presented with amore simplified menu of options to use for your profile – this option is for inexperienced users who just want to get something done without looking at every possible option. For the profile I’m setting up here, I’m going to select the Custom option (as shown in the following figure) and click the ‘Next’ button.

![](/images/stories/2010/secondcopy1.png)

Figure 2

The wizard will next prompt you to select the source folder you will be copying using Second Copy.

![](/images/stories/2010/secondcopy2.png)

Figure 3

You can then select to copy all files and folders or only a specific set of files and folders.

![](/images/stories/2010/secondcopy3.png)

Figure 4

Once the source files have been selected, the next step is to select the destination folder for the copied files.

![](/images/stories/2010/secondcopy4.png)

Figure 5

Of course, if the destination folder does not exist, the program prompts you before creating it.

![](/images/stories/2010/secondcopy5.png)

Figure 6

Once the program knows which files it needs to copy and where to copy them to, you’re next prompted to specify when the job sill be scheduled to run. As shown below, you have the ability to specify a specific schedule but also to execute on certain triggers. You can also omit specific days if for example you don’t want the job to run on weekends or run every other day.

![](/images/stories/2010/secondcopy6.png)  
Figure 7

In the next step, you’re prompted to select the type of copy used for this profile. If you know you’re going to make edits in another copy of the file like I am for this profile, select the Synchronize option. If you want the profile to merely back up the files, then select the Simple Copy or Exact Copy options.

![](/images/stories/2010/secondcopy7.png)

Figure 8

Once you’ve selected the type of copy, you’re prompted to select options for the job. In general, I usually synchronize deletions also but ensure that I make multiple backups of any file. This allows me to keep a very clean synchronized copy, but also maintain copies of files I’ve edited or deleted elsewhere. With this in place, I have even more options for recovering from an error.

![](/images/stories/2010/secondcopy8.png)

Figure 9

With all of the settings defined for the job, you’re prompted to provide a name for the profile and you’re all set.

![](/images/stories/2010/secondcopy9.png)

Figure 10

That’s it for this installment, be sure to check out the other articles in the series:

[Writing a Book, Part 1 = Getting Started](index.php?option=com_content&view=article&id=194:wb1&catid=9&Itemid=17)  
[Writing a Book, Part 2 – Batch Archiving](index.php?option=com_content&view=article&id=195:wb2&catid=9&Itemid=17)  
Writing a Book, Part 4 – Fixing File Synchronization Errors