---
title: Writing a Book, Part 1 – Getting Started
description: 
date: 2010-05-03
headerImage: 
categories: [Miscellaneous]
tags: post
---

After I completed BlackBerry Development Fundamentals, I thought I'd write some articles that outlined some of the process I followed to complete the manuscript. What follows is the first part of a series of articles that document the tools and procedures I used to help make the creation of the manuscript as painless as possible. In this installment, I'll lay out the issues I had to address and in subsequent articles describe each of the solutions I used to solve them.

Writing a large word document is not that hard, but dealing with a complete manuscript (and associated image files) was rather challenging. As I worked, I quickly noticed that I was going to have a problem keeping my chapter files in good shape. I knew I'd be working on the manuscript from both my desktop PC when working at home and my laptop while on the road. The issue then was how do I keep all of the files accurately synchronized between the two systems and how do I maintain the integrity of the files as I worked on them.

The first thing I had to concern myself with was what tool I would use to craft the manuscript. Since I'd written a complete, 600 page product manual for [ADT](adt.wolcottgroup.com){target="_blank"} in Word, I knew that I could easily do it there. Having written my first book in Word then switched to Adobe FrameMaker for layout, I knew that I didn't want to do anything with the book in FrameMaker. I thought of using Open Office just for grins or perhaps Google Docs, but I know just how to put Word through its paces, so I knew I had to do all of my writing in Word.

The first thing I did then was created a folder for the manuscript and create separate Word documents for each chapter. Since I knew I'd have a different document for each chapter, I knew I wouldn't have to deal with any issues Word had with large files. I had a pretty good outline of what I wanted in the book (the end book ended up looking nothing like it) so I thought I'd be OK setting up each chapter and plugging through one at a time until I got it done.

When I started the project, I forced myself to work on one chapter at a time, in sequence. I knew that if I jumped around, I'd never feel like I was making any real progress and I also knew I'd omit things. I started on chapter one then wrote each chapter in sequence until I completed it. That ended up being a very good decision and allowed me to demonstrate real progress to my publisher. Most published authors I've spoken with complained regularly about the schedules imposed on them by their publishers. I was already 6 chapters into the book when I received my contract from [Pearson](https://www.pearson.com/){target="_blank"} and ended up never getting a schedule from my editor. He got chapter by chapter from me in timely installments, so he knew he didn't have to worry.

I made a couple of big mistakes with my manuscript as I started writing…

First of all, I put each chapter file into the same folder. This seemed like a good idea until I started associating image files with each chapter. With each of the chapters in the same folder, all of the image files were there too. As I started placing images into the chapters as I worked through them, it got harder and harder to navigate through the folder to get to later chapter's image files. I quickly learned (well OK, not that quickly; I think I figured this out long past the halfway mark in the book) that the best thing to do was make a separate folder for each chapter and image files. That way, everything was together and it was very easy for me to zip up each chapter folder to submit a chapter to the editor for review. With the files all in one folder, I was able to right click on a folder in Windows Explorer and have WinZip package up all of the files in a zip file already named for the chapter (since the folder already referenced the chapter name). Once I got all that figured out, it became much easier to manage the manuscript files. If you're writing a novel, you can probably put all chapter files in the same folder; if writing a technical book or a book with a lot of illustrations; use a separate older for each chapter.

The second mistake I made was related to the Word Template my publisher wanted me to use. I took a look at it as after I began the project and felt that it was too ugly to work in day to day as I wrote the manuscript. They had a lot of special stuff you had to put in there (like a separate style for the first and last bullets in a list) and I thought it would be easier to write in a generic template then apply the publisher's template before submitting it for review by the editor. Wrong! As I got further and further into my manuscript, I started having to submit early ones for editing and found myself wasting a lot of time fixing a document (by applying the publisher's template and applying all of the special styles the publisher wanted me to use) when I should have been finishing up other chapters. When you write a book, get the publisher's template ASAP and start working with it right away – it will save you a lot of stress later (and ultimately shorten the amount of time required to create the manuscript).

OK, now that I've described the mistakes I made, let's dig into the issues I had to address and how I addressed them.

The first thing I needed to do was figure out how I was going to be able to keep every possible version of every chapter's content. Being a developer geek, you'd think I'd use some sort of version control system, but I didn't have one at my disposal and didn't want to take the time to set one up and learn its tricks when I just needed to be writing.

When working with deliverables for my employer or a customer, I always save a new version of the file every time I open it for editing and use the current date in the file name to keep them separate. What I do is append the date to the end of the file name in the following format: `yyyymmdd`. Using this format, the file names for a particular file would look like this:

```text
Samplefile 20100131.docx  
Samplefile 20100215.docx  
Samplefile 20100303.docx  
Samplefile 20100421.docx  
```

What happens when you do it this way is Windows automatically sorts the file names by date in the file name. It's easy to do and automatic in Windows. It always surprises me when people try to do this, but use the date in a different format (`mmm-dd-yyyy`, `mmddyyyy, mmm ddyyyy` or `ddmmmyyyy`) because Windows will sort these alphabetically and December will come before January. If you're going to append the date to a file name, do it in a way that saves you time later searching for the file (use yyyymmdd format).

Anyway, when it came to my chapter files, I didn't want to use that approach. I knew that when I submitted the chapter files to the publisher that I had to have them in a particular format (author initials plus chapter number – so: JMW01, JMW02, JMW03 and so on) and I didn't want to have to rename the files before I submitted them (remove the date from the file name). So, I had to stick with a single file name for each chapter, but still wanted to keep an archival copy of each file. What I ended up doing was using the batch processing capabilities of WinZip to create a file I would execute at the end of every editing session (or in the middle as well if I was making a lot of serious changes) to create a zip archive of the manuscript. By doing this, I used more disk space than I needed to, but had every single version of every file at my disposal. It was never any trouble to go back and find a previous edit of the file. I'll walk you through how I set this up in a later installment of this series.

The next thing I had to do was figure out how to make sure an exact copy of the manuscript was available to me on both my desktop and laptop systems. I knew that Windows has the ability to sync files with the server, but I didn't want to sync the whole My Documents folder – only the manuscript files. A very long time ago, a customer (Jay Luteran from Euclid Hitachi) introduced me to an award winning piece of software called [Second Copy](https://www.centered.com/){target="_blank"}. I've been using this software package for years and it allows me to easily synchronize files between multiple systems. In a subsequent article in this series, I'll show you how I used Second Copy to accomplish this.

Synchronizing the files ended up creating a huge problem for me as I adjusted the chapters and moved things around; I'll explain this too in a subsequent article.

Another thing I wanted to do was make a single file out of all of the individual chapter files. I wanted this file so I could easily look at the complete page count and occasionally print out a full copy of the manuscript so I could stare at it in awe. What I did to accomplish this was use Adobe Acrobat Professional to create a complete PDF out of each chapter file and use Acrobat's 'Combine' function to merge multiple chapter files into one complete manuscript. I'd written a program to do (in Delphi) a very long time ago, but for some reason the program wasn't working on Vista 64, so I had to use the tools available from Adobe. Unfortunately with my home grown program, I could save the file list with the project and easily recreate the file by launching the program and clicking a button. For some bizarre reason, Acrobat doesn't allow you to do that, so you have to select all of the files every time – I wish it worked differently, but Adobe hasn't been asking me for my opinion.

OK, that's about it – that's all I have to tell you now. I will be writing subsequent articles that dig deeper into the topics I described above.

*** 

Look for other articles in the series.

* [Writing a Book, Part 1 – Getting Started](/posts/2010/writing-a-book-part-1-getting-started/)
* [Writing a Book, Part 2 – Batch Archiving](/posts/2010/writing-a-book-part-2-batch-archiving/)
* [Writing a Book, Part 3 – Synchronizing Files](/posts/2010/writing-a-book-part-3-synchronizing-files/)
* [Writing a Book, Part 4 – Fixing File Synchronization Errors](/posts/2010/writing-a-book-part-4-fixing-file-synchronization-errors/)
