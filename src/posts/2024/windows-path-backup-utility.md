---
title: Windows Path Backup Utility
description: 
date: 2024-05-25
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
timestamp: 2024-05-25T18:49:04.860Z
---

At the beginning of the year, I had a problem with my Windows Path and a bunch of my apps stopped working correctly or stopped working altogether. I poked around a bit and figured out what went wrong: my system path somehow got corrupted and, you know, broke my apps.

You can read about the original problem in [Windows Path Items Not Available in Visual Studio Code](https://randomerrors.dev/posts/2023/windows-path-items/){target="_blank"} and you can read a little about what I plan on doing about it in [Windows Path Viewer App](/posts/2024/windows-path-viewer-app/){target="_blank"}. 

Anyway, as I set about building a utility I could use to repair my system's corrupted Path, I realized that the first thing I needed was a way to quickly and easily backup and restore the system Path so I could test my repair utility while not harming my system's Path. The Windows Path isn't stored in an easy to access area on the system; first of all you need Administrator access to even see it and it's stored in the Windows Registry in two places, so there's no quick and easy way to save it to a file.

So, what I did was create a little Windows utility called [Path Backup & Restore](https://fumblydiddle.com/products/pathbackup/){target="_blank"} (catchy name, eh?) that allows me to quickly and easily backup my Windows Path to one of three different file formats:

+ `.reg` - The Windows standard Registry file format
+ `.json` - JavaScript Object Notation (JSON) format
+ `.yaml` - Yet Another Markup Language (YAML) format

Using the utility, you can backup the path to a file or use an existing backup file to restore the system path (replacing the existing Path entries).

<img src="/images/2024/path-backup-home.png" alt="Path Backup & Restore application" />

I chose supporting the `.reg` format because it allowed me to let Windows restore the Path using the file (a standard capability of the Windows RegEdit utility). This allows you to take a working Path backup and share it with another user who can restore it without needing access to the Path Backup & Restore application.

I added support for JSON and YAML files because I wanted to offer options and I wanted users to be able to access the files in an easy to edit format in case they wanted to manually edit a backup file then restore it.

I wanted to release the application through the Windows App Store, but after getting almost all the way through the process, I finally realized it was too complicated (and possibly expensive) to sign my application securely for distribution. It just doesn't seem easy to do and wasn't setup for small development teams like me trying to distribute software through the store.

**Note:** If anyone wants to help me figure out how to sign my app for distribution in the Windows App Store, please let me know.

I decided to release the application through my recently relaunched software company [Fumbly Diddle Software](https://fumblydiddle.com){target="_blank"}; please check it out when you get a chance.
