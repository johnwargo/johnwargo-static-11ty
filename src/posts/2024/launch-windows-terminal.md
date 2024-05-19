---
title: Launching a Windows Terminal to a Specific Folder
description: Describes two options for opening a Windows terminal window to a specific folder. Years ago I learned an interesting trick for opening a Windows terminal window to a specific folder; there are two ways, but I don't think many people know about the second one.
date: 2024-01-01
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Microsoft Windows
---

In [Windows Path Items Not Available in Visual Studio Code](https://randomerrors.dev/posts/2023/windows-path-items/){target="_blank"} I mentioned opening a command prompt or terminal window from Windows File Explorer but didn't explain what I meant. Years ago I learned an interesting trick for opening a Windows command prompt to a specific folder; there are two ways, but I don't think many people know about the second one. This article describes both options.

## Right-Click

I think most people know about this one, but sharing just in case you don't. To open a command prompt/terminal window to a specific folder:

1. Open Windows File Explorer
2. Navigate to the parent folder of the target folder (the folder you want to open a terminal window into)
3. Hold down the Shift key and hover the mouse over the target folder
4. Right-click on the folder and select **Open in Terminal** as shown in the following figure

{% image "src/images/2024/file-explorer-open-windows-terminal-01.png", "An image showing a user right-clicking on a folder to open a Windows Terminal", "image-full" %}

At this point, File Explorer opens the command prompt/terminal window to the scope of the selected folder as expected.

## Command Approach

Another method for opening a terminal window to a particular folder, is to type the executable name for the terminal window (`cmd`) into the address bar in Windows File Explorer. Here's how to do it:

1. Open Windows File Explorer.
2. Navigate to the target folder (the folder you want to open a terminal window into).
3. In the folder location input field highlighted in the following figure type `cmd` and press enter.

Selecting the folder input field:

{% image "src/images/2024/file-explorer-open-windows-terminal-02.png", "An image of Windows File Explorer with the folder location entry field selected", "image-full" %}

Entering the command into the folder location input field:

{% image "src/images/2024/file-explorer-open-windows-terminal-03.png", "An image showing the `cmd` command entered in the folder location field", "image-full" %}

At this point, File Explorer opens the terminal window to the scope of the selected folder as expected.

{% image "src/images/2024/file-explorer-open-windows-terminal-04.png", "Windows terminal window open to the selected folder", "image-full" %}

**Note:** If you have the [Windows Terminal App](https://apps.microsoft.com/detail/9n0dx20hk701?amp%3Bgl=US&hl=en-us&gl=US){target="_blank"} installed, which is different from the default command prompt application, you can also type `wt` instead of `cmd` to open the Windows Terminal app. With the Windows Terminal app installed either command opens the app.

I hope this helps you use Windows more efficiently.
