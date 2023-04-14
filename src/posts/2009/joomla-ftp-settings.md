---
title: Joomla FTP Settings
description: 
date: 2009-11-03
headerImage: 
categories: [Content Management Systems]
tags: post
---

I've been catching up on my Joomla reading; I picked up a few Joomla books over the last few months and I had some time the other day flying forth and back from Houston for a job interview so I took the books with me. One of the things they mention in some of the books is that to avoid file ownership problems, you should configure Joomla to use FTP to upload files. I have been trying to get the [Joomla Content Editor (JCE)](http://www.joomlacontenteditor.net/) installed (with NO success) so I thought I'd try this configuration option to see if it helped me with my JCE problems.

I pulled out [Joomla! 1.5: A User's Guide: Building a Successful Joomla! Powered Website (2nd Edition)](http://www.amazon.com/gp/product/0137012314?ie=UTF8&tag=mcnsof-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0137012314) and looked up the page covering FTP settings and found...nothing. Just a screen shot and no explanation of how this should actually be configured. So, I created an FTP account for Joomla and went into the Joomla Server configuration to enable the settings. Here's a picture of the settings page:

![](images/stories/joomla ftp.png "Joomla FTP Settings")

I had the FTP account configured, but I couldn't figure out what to do with the 'FTP Root' field. Originally I configured the FTP account so it's root was the root folder for the particular Joomla implementation. I did this assuming that Joomla would want to login and see it's own folder structure. Nope, wrong approach. What I had to do was configure the FTP client to use the domain's root folder as it's root folder then leave the FTP root folder blank in the dialog shown above. That way, both Joomla and the FTP login are looking at the same folder structure.

It took me some trail and error to figure this out. I mentioned the book wasn't any help and the field help didn't tell me anything - so that's why I decided to write about it here.

I still can't get JCE installed. the tool's web site says I should use Joomla's installation tools (doesn't work) and the manual installation instructions if the automated install doesn't work. The problem is that the manual instructions refer to files that I can't seem to find in the packages I downloaded from their site. I'm at a loss and when I tried to access the forums today I got a page not found error. If you can help me get JCE installed into a Joomla instance please let me know.