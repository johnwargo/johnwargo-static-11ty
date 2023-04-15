---
title: Writing a Book, Part 4 – Fixing File Synchronization Errors
description: 
date: 2010-05-20
headerImage: 
categories: [Miscellaneous]
tags: post
---

![](/images/common/book.jpg)

OK, here's final article in the series. So far I've talked about the method I used to backup my manuscript files through every part of the editing process and I've covered how I synchronized the files between my laptop and desktop computers as I went. In today's installment, I'm going to address a problem I created by synchronizing the files between systems. It caught me by surprise several times and forced me to make changes to how I managed the files. Ultimately it's the reason I decided to write the article series.

As I worked through the manuscript, I regularly moved things around within the chapters. I would reorder chapters as I worked through them to get the right order (Research In Motion never, ever, agreed with the placement of chapter 3) and I would rework the order of the content within the chapters as well. On top of all that, as I neared completion of the manuscript and started seeing how long it was going to be (it was approaching 600 pages and I only had a contract for a 400 page book) my editor started whacking images (a lot of them) in order to get the book within the budgeted size.

Anyway, one of the things I noticed when I started giving my editor updated copies of each chapter was that the image files for the chapter were getting overwritten with different (wrong) image files. I scratched my head for a while then finally figured out what was going on.

Before I tell you what happened, I have to give you a little background. My publisher required that the manuscript be delivered using a particular Word template and a special naming convention for all files. The chapter content would be in a document named using the author's initials and the chapter number. So, for my book, the chapter files were called JMW01, JMW02, JMW03, and so on. Image files used in the chapter would be named in a similar manner – in this case, it was chapter file name plus an underscore and the sequential image number. So, using the previous example as a guide, the image files for the chapter would be named JMW01_01.jpg, JMW01_02.png, JMW01_03.jpg and so on. It allows for a very structured arrangement for the chapter files and I'm sure saves the editor and production people a lot of time and saved them from extra work trying to make sure they have all the image files required for the book.

Now that you understand how the chapter's files were named; take a look at the following folder listing:

```text
Folder listing of C:\Users\John Wargo\Documents\Publications\FoBAD\JMW01\  
  
Backup of JMW01.wbk    8/11/2009 9:05:59 AM    40 kb  
JMW01.docx             8/11/2009 9:06:30 AM    41 kb  
JMW01.zip              8/11/2009 9:06:36 AM    377 kb  
JMW01_01.jpg           4/10/2009 7:25:20 AM    65 kb  
JMW01_02.jpg           4/1/2009 7:24:41 PM     63 kb  
JMW01_03.jpg           4/10/2009 7:24:41 PM    63 kb  
JMW01_04.jpg           4/1/2009 7:37:29 AM     73 kb  
JMW01_05.jpg           4/15/2009 7:47:13 AM    71 kb
```

As I was removing image files from the manuscript and renaming subsequent files behind it, I was creating a situation where Second Copy thought it was doing the right thing by replacing the local copy of a file with the backed-up copy from the server. Here's what happened…

Say for example I needed to remove image 1 (JMW01_01.jpg) from the manuscript; it was something that wasn't that important for the book and because of space constraints my editor has asked me to remove it. Now, once the file was been removed, I had to rename all of the following image files so there's a consistent naming scheme for everything. So, removing the first image file and renaming all of the other files (quite a pain I might say) would result in the following folder listing:

{codecitation class="brush:text; gutter:false"}Folder listing of C:\Users\John Wargo\Documents\Publications\FoBAD\JMW01\  
  
Backup of JMW01.wbk    8/11/2009 9:05:59 AM    40 kb  
JMW01.docx             8/11/2009 9:06:30 AM    41 kb  
JMW01.zip              8/11/2009 9:06:36 AM    377 kb  
JMW01_01.jpg           4/1/2009 7:24:41 PM     63 kb  
JMW01_02.jpg           4/10/2009 7:24:41 PM    63 kb  
JMW01_03.jpg           4/1/2009 7:37:29 AM     73 kb  
JMW01_04.jpg           4/15/2009 7:47:13 AM    71 kb{/codecitation}

Now, knowing that Second Copy has been diligently copying all of the files up to the server, it already has a copy of JMW01_01.jpg up on the server and, because of the renaming of the local files, has a different file date and time than the one on my local hard drive (remember, it used to be JMW01_02.jpg and it had a newer file date/time). The next time Second Copy runs, it's going to see that the server copy of the file has a newer date/time stamp than the one on my local hard drive. It's going to replace the local copy of the file (the former JMW01_02.jpg) with the newer file from the server (the former JMW01_01.jpg).  
When Second Copy gets done with its sync, the old JMW01_02.jpg (now called JMW01_01.jpg) will be replaced by the original JMW01_01.jpg from the server. Because JMW01_03.jpg has replaced JMW01_02.jpg (due to me renaming the files) the old JMW01_02.jpg is gone, deleted by Second Copy as it copied the old JMW01_01.jpg down from the server. Ouch! This created quite a mess.

Not only was this process screwing up the files, it was also deleting files that I ultimately needed later. Very painful! It was a lot of work to completely rebuild the file structure every time this happened. I had to rename the files back to where they belonged and retrieve (hopefully) the right version of the archive. Since it might be some time before I noticed the problem I created, I would have to go back archive by archive until I found the one that contained the right version of the file I needed. I was frantically trying to finish the manuscript on schedule and keep my employer and my wife happy and now I'd created more work for myself. Crikey!

Note: if the file extensions for the renamed files were different (a .tif file instead of a .jpg file for example) then this would not have created a problem for me. Second Copy would have copied down the old .jpg file and left the .tif file in place. The folder listing would still be broken, but it would be an easier problem to fix.

OK, I identified the problem, developed a method for recovering from it, but the next question I had to answer was: 'how do I keep this from happening again?' The answer of course is to reset all of the files to the same date/time before allowing Second Copy to do its thing. If all files are set with the current date/time stamp, there will be no 'newer' versions of the files for Second Copy to find. Since I synchronized before I started working and I know this should be the 'reference' version of the files, there's no risk in doing this.

If any of you are old Turbo Pascal developers, you may remember that Borland shipped a little DOS program called touch.com that could be used to reset the date and time stamp of files. Apparently it's an offshoot from a Unix command of the same name. Anyway, it was a very useful utility and I immediately thought of it for my solution to this problem. The problem is that it's a DOS program and this was Windows (Vista 64-bit). I probably could have dug up an old copy of the program (yes, I still had my old Turbo Pascal discs) but I was afraid I would encounter side-effects using it so I started looking for something else.

Well, I was reading O'Reilly's [Windows Vista Annoyances: Tips, Secrets, and Hacks](https://www.amazon.com/gp/product/0596527624){target="_blank"} at the time and came across a reference to a product from [Creative Element](https://www.creativelement.com/){target="_blank"} called 'Power Tools'. They had a little utility that would allow me to easily change the date and time for a set of selected files. In an excited frenzy, I downloaded the tools, installed them and went to work.

I quickly encountered a problem – I was running Vista 64 and the Power Tools 'worked' with that version of Windows, but there were some limitations. In order to be able to use this tool, I had to do it in the 32-bit version of Windows Explorer. Not a big deal, I located the icon for that version of Explorer and went to work.

To use the utility, you open Windows Explorer, select the files you want to manipulate the right-click to bring up a list of options. Select 'Change Date' from the list of options and you will be presented with a dialog similar to the one shown in the following figure.

![Figure 1](/images/2010/powertools2.png)  
Figure 1

In this case, I change all date/time stamps (created, modified an accessed) and set them all to the current time. Once everything's set the way I needed it, I would click the 'Accept' button to commit the changes. The following listing shows the results.

```text
Folder listing of C:\Users\John Wargo\Documents\Publications\FoBAD\JMW01\  
  
Backup of JMW01.wbk    8/11/2009 9:05:59 AM    40 kb  
JMW01.docx             5/20/2010 7:54:33 AM    41 kb  
JMW01.zip              8/11/2009 9:06:36 AM    377 kb  
JMW01_01.jpg           5/20/2010 7:54:33 AM    65 kb  
JMW01_02.jpg           5/20/2010 7:54:33 AM    63 kb  
JMW01_03.jpg           5/20/2010 7:54:33 AM    63 kb  
JMW01_04.jpg           5/20/2010 7:54:33 AM    73 kb  
JMW01_05.jpg           5/20/2010 7:54:33 AM    71 kb
```

Problem solved! I'd only selected the manuscript files, not the local zip archive I would send to my editor or the backup Word created. That's why some of the files have different time stamps. All of the manuscript files though are set with the same time stamp which was what I needed to solve this problem.

Look for other articles in the series.