---
title: TeraCopy Disable Check Free Space Check
description: 
date: 2025-05-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
  - Miscellaneous
timestamp: 2025-05-24T15:49:07.845Z
---

I purchased a new car recently, and I'm trying to setup a Flash drive with a lot of (but not all) of my music so I can listen to my favorite artists while driving and not need Pandora or Youtube Music. I'm building a simple utility I can use to refresh the files on the flash drive when I pick up something new for a particular artist or when I want to add a new artist's music to the drive. 

Rather than directly managing the process of copying thousands of files, I decided to spawn a copy of the [TeraCopy](https://www.codesector.com/teracopy){target="_blank"} utility to do all that work for me. I've used this utility for years and purchased a license a long time ago. It's an excellent utility for managing multiple file copies automatically and it offers more flexible options for retrying, renaming, and other issues that pop up on Windows file copies.

Anyways, TeraCopy provides excellent [command-line options](https://support.codesector.com/en/articles/8789945-teracopy-command-line){target="_blank"} I knew I could use to successfully drive TeraCopy from my utility (I'll write more about this later).

I finished the utility and everything was working great until I tried to copy the files to the flash drive a second time (refreshing the contents and overwriting only older versions of the files). As soon as my utility launched TeraCopy, TeraCopy immediately complained that "more space is required" to complete the copy. 

Well, sure, it looks that way, but I knew if TeraCopy tried to actually copy the files, it would see that it did have enough space to complete the copy.

So I looked around and couldn't find anything online that explained how to fix this issue. The CodeSector web site has an AI Support agent, so in desperation I asked it for help:

> I'm trying to copy a bunch of files to a flash drive and many of those files already exist. So I'm overwriting only older files. When I do this, TeraCopy reports "More space is required" when it really isn't. How do I disable that check or make the app do the copy anyway?

And the agent quickly replied with the solution:

``` text
You can disable the free space check in TeraCopy by editing the Options.ini configuration file:

1. Navigate to the TeraCopy configuration folder:  
    • Windows 10/11: C:\Users[YourUsername]\AppData\Roaming\TeraCopy  
    • Windows 7/Vista: Same location as above  
    • Windows XP: C:\Documents and Settings[YourUsername]\Application Data\TeraCopy
2. Open the Options.ini file in a text editor
3. Find the line `CheckFreeSpace=1` and change it to `CheckFreeSpace=0`
4. Save the file and restart TeraCopy

Alternatively, you can use the command line with the `/OverwriteOlder` parameter to specifically overwrite only older files:

`TeraCopy.exe Copy "SourceFolder" "DestinationDrive" /OverwriteOlder`

This will copy files and automatically overwrite only those that are older at the destination.
```

Opening up Explorer, I navigated to the application data folder and found the configuration file. 

<img src="src/images/2025/teracopy-disk-space-fix-01.png" alt="" />

After a quick edit, changing the highlighted value from 1 to 0 (as shown in the figure below), everything worked as expected. I'm so happy they had a solution for this.

<img src="src/images/2025/teracopy-disk-space-fix-02.png" alt="" />
