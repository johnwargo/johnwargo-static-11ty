---
title: Programmatically Enabling JavaScript in the BlackBerry Browser
description: 
date: 2009-10-26
headerImage: 
categories: [BlackBerry]
tags: post
---

One of the most interesting things I learned while I was writing the book was how to enable JavaScript programmatically within the BlackBerry browser. As RIM reviewed the chapters, several people commented on how, even if JavaScript was turned off in the browser, it could be enabled programmatically. I searched and searched for information about how to do this, but couldn't find anything until I finally begged someone from RIM to explain to me how to do it. Here's how it's done:

In the NoScript section of an HTML page, put in some JavaScript. It doesn't have to be script that does anything, it just has to be JavaScript. When the browser encounters the JavaScript, it sees that it's disabled and prompts the user to enable it.

Here's a sample web page that enables this:{codecitation class="brush:html; gutter:false"}<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN">  
<HTML>  
<HEAD>  
<TITLE>JavaScript Test</TITLE>  
</HEAD>  
</HEAD>  
<BODY>  
<h1>JavaScript Test</h1>  
<SCRIPT type="text/javascript">  
document.write("JavaScript is enabled!")  
</SCRIPT>  
<NOSCRIPT>  
JavaScript is disabled!<br />  
Please <A href="javascript:void()">click here</A> to enable JavaScript.  
</NOSCRIPT>  
</BODY>  
</HTML>{/codecitation}

What's interesting about how this works is that MDS will normally process the HTML page and remove any content not supported by the browser - it doesn't make any sense to send anything to the browser that the browser won't recognize. So, it the HTTP Accepts header indicates that JavaScript is not enabled, then MDS will remove all of the JavaScript code from the page. Since JavaScript isn't expected to be in the <NoScript> area of the page, MDS ignores it and delivers that script to the browser. When the link is clicked, the browser performs its check and prompts the user to enable JavaScript. 

Pretty cool, right?