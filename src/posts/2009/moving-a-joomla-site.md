---
title: Moving a Joomla Site
description: 
date: 2009-11-05
headerImage: 
categories: [Content Management Systems]
tags: post
---

I use Joomla! to manage many of the sites I've built. It's an open source CMS and it's really pretty cool. As I was building blackberrybooks.org yesterday I made a big mistake and thought I'd write about it.  
I host all of my sites on fatcow.com, they're really great and have some amazing tools site administrators like me can use to manage their sites, install open source tools, create databases, create mail accounts and more. One of the tools is something called InstallCentral that basically points to scripts that can be used to install all sorts of open source tools (content management systems, blogs, galleries, forums, e-commerce stuff and more). It was through this tool that I first discovered Joomla! and although Joomla! is pretty easy to install, I've always just let FatCow's InstallCentral install it.

Anyway, yesterday I was working on setting up blackberrybooks.org and I launched the installation like I normally do. When it came time to pick the installation folder, I accepted the default and populated the other fields on the installation form as shown in the following figure:

![FatCow InstallCentral](/images/2009/joomla-install.jpg)

What I forgot to pay attention to was that www.mcnellysoftworks.com actually pointed to a subfolder called 'home' within my FatCow account. That way I can have my 'home' folder and a separate folder for each of the other sites I manage there. So, when InstallCentral installed Joomla!, it dutifully put it exactly where I asked it to be placed and that was '/home/bbbooks'  which is not where I wanted it, I wanted it in a folder called '/bbbooks' off of the root.

After I got the site all up and running and populated all of the book information, I used another cool FatCow tool called 'Domain Pointing Manager' to point www.blackberrybooks.org to the folder where I thought I'd installed the site. When I fired up the browser to test the redirect, I got a file not found error message. I quickly fired up an FTP Client (I use FTP Voyager https://www.ftpvoyager.com/ from Rhino Software) and looked for the folder and it wasn't there! Ouch. I looked and looked and looked and could not find the Joomla! files where I thought they were supposed to be. It took me a while to figure it out but I finally did and located the files – right where I didn't want them but right where I'd told the installer to put them.

Rats, what do I do?

Well, I couldn't tear down the site and reinstall then rebuild in the correct location (I know how I'm supposed to do it, I just forgot to do it) but on principal that didn't make sense to me. I hate completely redoing something – it's just not in my nature.

I thought perhaps I could just use FatCow's File Manager application to move the files, but I thought perhaps it would somehow not work once I got it moved. Also, I didn't want to have InstallCentral thinking it had an installation where it didn't (my form of OCD) so I couldn't do that.

As I thought about it I was suddenly struck by a thought. On a weekly basis I backup all of my sites using JoomlaPack (a free backup utility for Joomla!)- I wondered whether I could use that to backup the site and put it in a new location. I dug out the instruction manual and found to my delight that I could.

So, I performed the following steps:

1.  Backed up my Joomla! installation for the site
2.  Copied the backup file to my local hard drive
3.  Unzipped the backup file to a temporary folder
4.  Uploaded all of the site's files to the /bbbooks folder on my FatCow account
5.  Launched the browser and accessed the site in its new location
  
It worked!  Woohoo, it worked! So, I now had the files where I needed them and it was working. One of the reasons it was working was that both instances were using the same database table. I knew though that as soon as I uninstalled the Joomla! instance created by InstallCentral it would empty (but not remove) the existing database. Well, that wouldn't work – when I uninstalled it, I would lose all of my data. So, I went back in and performed the following steps:

1.  Performed a database backup (because when I uninstall the Joomla! instance, InstallCentral will drop all of the database tables)
2.  Uninstalled the Joomla! instance in InstallCentral
3.  Restored the database from my local backup
  
Who'd a thunkit, it worked!!! I got the whole thing moved and the InstallCentral installation list all cleaned up and it's working great.

I know, I know, I could have used the FatCow File Manager application to just copy the files to the new location then do the second set of steps, but it was fun to see whether JoomlaPack would do what it was supposed to do (I expected it would, but it was fun to find out).

I wrote this article to help others playing with FatCow and Joomla! but probably also to reinforce in my mind that whenever I install another Joomla! instance using InstallCentral, I need to select the Unix root folder name for my FatCow account rather than the high level domain as shown in the figure.

I worked on a project a long time ago with a guy by the name of Russ Chung – he was the most meticulous tech guy I've ever worked with. Whenever he worked through a problem on the Domino server, he would speak all of the steps as he did them (almost a monologue). The result was that he took his time and walked through all of the steps as he was doing them. I know that if I'd taken the time to think while I did the initial install (like Russ would have done) then I could have saved myself all of this work (as fun as it was).