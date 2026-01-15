---
title: Outlook Windows Delete Empty Inbox Folders
description: Describes a free utility I published to automatically delete empty Inbox folders in Outlook on Microsoft Windows
date: 2023-11-18
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
  - Microsoft Windows
  - Microsoft Outlook
---

My primary working system runs Microsoft Windows and I use Microsoft Outlook as my email and calendar manager for my personal email account. I've moved my Outlook PST file from system to system over the last, oh I don't know, how many years (at least 20 years or so) and the file's HUGE (about 1.5GB right now). To keep the file size manageable (if you call 1.5GB manageable), I use Outlook's Automatic Archive feature to move older Inbox items to an archive file (which right now is about 5GB).

<img src="/images/2023/outlook-archive-settings.png" alt="Outlook Archive Settings" />

I recently noticed that had a bunch of empty folders left around in my inbox because the archive process emptied them. I wanted to clean them all up, no need to keep empty folders around, but didn't want to delete them manually - mainly because my Inbox has hundreds of folders and right before I wrote this post it had 102 empty ones.

Since I love automating tasks with software, and it's been a while since I've written anything in Delphi (Object Pascal), I decided to create a little utility I can run periodically to delete my Inbox's empty folders. I just completed the app and published it, it's called [Outlook Delete Empty Inbox Folders](https://github.com/johnwargo/outlook-delete-empty-inbox-folders){target="_blank"} and here's the [latest executable](https://github.com/johnwargo/outlook-delete-empty-inbox-folders/tree/v0.0.0.5){target="_blank"}.

To use the app, you simply launch it and it accesses the default Outlook profile's Inbox. When you click the **Analyze** button, it scans the Inbox looking for empty folders. When it finds an empty folder, it adds it to the empty folder list on the app's main screen.

<img src="/images/2023/outlook-delete-empty-folders.png" alt="Outlook Delete Empty Inbox Folders Application" />

When you're all set and you confirmed that the list looks correct, click the **Delete** button and the app deletes all of the empty folders in the Inbox.

Enjoy!