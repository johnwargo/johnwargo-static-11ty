---
title: Catching Cordova JavaScript Errors
description: 
date: 2013-11-04
headerImage: 
categories: [Mobile Development]
tags: post
---

If you’ve done a bit of Cordova development, one of the things that you probably noticed is that in many cases, when Cordova (PhoneGap) fails, it fails silently. This causes a lot of problems for developers because it’s not easy to tell what’s happened.

Let me give you an example.

When I read through the PhoneGap support forums, a common problem that occurs regularly is that people complain that the Cordova deviceready event doesn’t fire. When I first started working with PhoneGap, my first forum post was about that particular issue. Embarrassing it was, but apparently I had a typo in the <script> tag which loaded the phonegap.js file, so the PhoneGap container simply didn’t even fire the deviceready event. A quick change to my JavaScript code to include the correct name for the phonegap.js file (at the time they were labeling each version of the file with a version number like phonegap-1.0.js, and I’d simply added phonegap.js to my app). A simple typo, but caused problems none the less.

Anyway, when the Cordova or PhoneGap container encounters a JavaScript error, it simply aborts whatever it is doing and doesn’t tell the user anything. Ugh. I can’t tell you how much time I’ve wasted tracking down bugs caused by this simple error.

When I joined the mobile platform product management team at SAP, I mentioned this problem in a room full of developers and my colleague Istvan Nagy quickly provided me with the solution. If you add the following code to your web application’s index.html file, when the application encounters a JavaScript error, it will call fire the window’s onerror event and display the error information for the user.

`<script type="text/javascript" charset="utf-8">   window.onerror = function(msg, url, line) {      var idx = url.lastIndexOf("/");      if(idx > -1) {url = url.substring(idx+1);}        alert("ERROR in " + url + " (line #" + line + "): " + msg);      return false; //suppress Error Alert;   };   </script>`

I’ve started using this in all of my applications as I build them and once I’ve gotten the application working, I remove it before sending it out to real users.