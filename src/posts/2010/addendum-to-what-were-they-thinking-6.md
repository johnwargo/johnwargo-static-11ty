---
title: Addendum to What Were They Thinking #6
description: 
date: 2010-03-26
headerImage: 
categories: [Mobile Development]
tags: post
---

A reader was kind enough to comment on my article: [What Were They Thinking #6](https://jmw-test.com/posts/2010/what-were-they-thinking-6/) and pointed out that the issue I was writing about was caused by my personal settings on the BlackBerry. If you look at the figure, you'll see that I'm clearly going blind (just kidding, just having trouble reading things) and have the font on my BlackBerry device cranked up high. The reader was right, the problem I was complaining about was my fault, but I contend that it still never should have happened. Here's my take on this:

First of all, since I'm looking at a listing of free apps, there's no need to list 'Free' for every item in the list. They're all free, there's no need to take up the screen space (and processing time to render) content that is not needed. Do you agree that highlighting the 'freeness' of a free application that's clearly already fee is a waste?

Second, although I agree that the issue I'm reporting is related to my personal font settings, it is the responsibility of the developer to detect the size of the fonts being used and adjust rendering on the screen accordingly. The developer of the application should have detected the font size (they already did since we can see they used my font settings to render the screen) and make sure everything fits correctly using that font. There's no reason he or she couldn't have seen that the text as written was not going to fit into the allocated space (using the settings I've defined) and wrap the text on the screen so me, the user, would be able to read the entire application name. This is something I had to do in my [Official's Record Keeper](https://www.officialsrecordkeeper.com){target="_blank"} application in all of the reports. For any text I wanted to write to the report canvas, I had to check it's width and wrap it manually in the code. It's a pain in the you know what, but it's something that should have been addressed by the developer and I stand by my complaint.

Look at all of the extra, unused space created by the height of the application logo. They clearly had the room to extend the row to accommodate the wrapped application title. I'd rather have the extra space under the icon than under the text block - especially since I can't read the entire application title as it is.