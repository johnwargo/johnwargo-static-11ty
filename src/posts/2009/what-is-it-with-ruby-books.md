---
title: What is it with Ruby books
description: 
date: 2009-07-10
headerImage: 
categories: [Miscellaneous]
tags: post
---

I work for a company (BoxTone) that has a web-based enterprise software product using Rails. Being a product manager, I wanted to know more about the technologies being used to create the product I'm responsible for managing - makes sense, right?  So I set out looking for a book to read on Ruby then later I'll dig into Rails.  Being a huge fan of O'Reilly books (even though they passed on my BlackBerry book) I purchased a copy of [Ruby by Example: Concepts and Code](http://www.amazon.com/gp/product/1593271484?ie=UTF8&tag=mcnsof-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1593271484)![](http://www.assoc-amazon.com/e/ir?t=mcnsof-20&l=as2&o=1&a=1593271484) and started reading it.

Hated it.

I've been a professional software developer for more than 20 years now and I thought I could leverage that experience and just pick up rails by example. The book's examples were so obtuse and the descriptions of the code so incomplete that I spent a lot of time scratching my head, trying to figure out what the sample code was actually doing. Not a good thing for a 'by example' book.

So, I set that book aside and started reading [Learning Ruby](http://www.amazon.com/gp/product/B0028N4W6A?ie=UTF8&tag=mcnsof-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=B0028N4W6A)![](http://www.assoc-amazon.com/e/ir?t=mcnsof-20&l=as2&o=1&a=B0028N4W6A) (also from O'Reilly). It's a better book in that it's fast hitting, short code samples and a direct explanation of every topic as it's presented. My problem with the book is that the many of the code examples actually make it harder to understand the topic being discussed.  When discussing Regular Expressions, the book gives repeated examples **that all have the same result**! It's crazy. When learning RegEx, I don't want to see example after example of a RegEx applied to a two line string return the first line of the string over and over and over again. What I want to see is a big string and how I can use RegExes to pull out part of it in several ways.  It just makes it harder to learn when you see the same result of an expression repeatedly.

Anyway, after reading hundreds of computer books in my life, why are Ruby books so poor?  

The final straws for me were twofold.

An example of how to use  the .reverse method to reverse the order of characters in a string. One of the examples the author gave was to use this method to **reverse the order of a palindrome**! How is that a good example of how to use a method? "OK, I'm going to show you how to reverse the order of characters of a string comprised of characters that spell the same thing forward and backwards." Huh? How do you even tell the difference between before and after? What's the point? Wow!

Later on, there is a discussion of using .ljust and .rjust to left and right justify strings. Right in the middle of the discussion, the author says:

"Still confused? So am I, but we'll go on"

Huh?  Seriously? Is that how the author feels about me? "ya, I know you're confused, so am I, let's ignore it and move on." Uh, that doesn't help me learn how things work. It's weird that he spends so much time discussing something that's pretty easy to understand anyway then tells us he's confused? No, not what I expect.

Ruby is a little different and it's a cool language, but I just don't understand why the two leading books on the topic I picked up by a very respectable publisher are so bad.  Please don't get me wrong, I'm not trying to bash O'Reilly, I have almost 40 of their books in my library, it must just be ruby authors ;-).