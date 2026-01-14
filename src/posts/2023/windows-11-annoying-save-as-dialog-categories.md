---
title: Windows 11 Annoying Save As Dialog Categories
description: In the Windows 11 browser download dialog, Microsoft categorizes the target folder contents based on which folders you accessed most recently. They did this, I think, in the mistaken belief that this is helpful for the user. I hate it, absolutely hate it, and I finally found a way to disable this.
date: 2023-10-23
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
---

In the Windows 11 browser download dialog, Microsoft categorizes the target folder contents based on which folders you accessed most recently. Windows shows folders categorized by Today, Yesterday, Last Week, Earlier This Month, Last Month, then Earlier this year as shown in the following figure:

<img src="src/images/2023/windows-save-dialog-before.png" alt="Windows Browser Download Save Dialog" />

They did this, I think, in the mistaken belief that this is helpful for the user but I think they really missed the mark. I can see the value in doing this when downloading multiple files, but the browser automatically returns to the same folder for subsequent saves, so it still doesn't make sense. 

I hate this 'feature', I absolutely hate it and I gnash my teeth every time I encounter that f#cked up dialog.

In my use case, I save all downloads to my system's Downloads folder and that folder contains a hundred folders or more. When I'm saving a file, I'm looking for a specific folder to put it in and I automatically scroll and scan looking for the folder name. The list of folders should be listed alphabetically, so scrolling and scanning for a specific folder is no big deal. With this abomination, Microsoft leaves me no choice but to actively look at each folder name in each category to find the target folder. 

More gnashing of teeth.

Periodically, when I get really frustrated by this 'feature', I hop online and start looking around for a way to put that list back to an alphabetical listing. 

Search Engines gleefully show me instructions for how to remove categorization in a single folder in Windows Explorer, but generally have nothing to say about this Save Download folder. Sigh.

The other day though I hit the jackpot!!! I found a support ticket where a Microsoft Support engineer recommended a third-party tool called [WinSetView](https://lesferch.github.io/WinSetView/){target="_blank"} that allowed me to fix this horrible problem.

I downloaded the utility, extracted the files to a folder, then executed the main application. The app has a lot of options, but I didn't pay attention to any of them, I simply accepted the default options and clicked the **Submit** button. A PowerShell window opened and a bunch of results flew past before the window closed itself then suddenly it was done. 

The next time I saved a file from the browser the dialog was fixed and everything is good with the world.

<img src="src/images/2023/windows-save-dialog-after.png" alt="Windows Browser Download Save Dialog FIXED" />

If you look close, the default settings turns on a denser mode in the dialog which I really like since I can scan more folder names without having to scroll the list. 

This utility supports a lot of different options, and I've only played with a few of them so far, but this utility has a lot of power and I'm going to continue to try different settings out.