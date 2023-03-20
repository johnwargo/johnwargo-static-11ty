---
title: PhoneGap Alerts
description: 
date: 2011-11-20
headerImage: 
categories: [Mobile Development]
tags: post
---

I was working on Chapter 12 of PhoneGap Essentials tonight and I created a quick PhoneGap application to test something I wanted to verify about the JavaScript alert() function. When I tested the application, I noticed something interesting, taking a look at the following code - when I ran the application on an iOS simulator, the Test 2 alert executed before the Test 1 alert.{codecitation class="brush:javascript; gutter:true"}<!DOCTYPE html>  
<html>  
  <head>  
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no;" />  
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">  
    <script type="text/javascript" charset="utf-8" src="phonegap-1.0.0.js"></script>  
    <script type="text/javascript" charset="utf-8">  
      
    function onBodyLoad()  
    {          
        document.addEventListener("deviceready",onDeviceReady,false);  
    }  
      
    function onDeviceReady()  
    {  
        navigator.notification.alert("Test 1")  
        alert("Test 2")  
    }  
      
    </script>  
  </head>  
  <body onload="onBodyLoad()">  
        <h1>Alert Test</h1>  
      <p>This is a test application.</p>        
  </body>  
</html>{/codecitation}

I know that PhoneGap had finished initializing since the deviceready event fired, but apparently there's something going on that would cause the first alert to queue up and only execute after the second alert, the one using the standard JavaScript alert instead of the PhoneGap alert function, fired.

Interesting. Not important, but interesting.

Postscript: OK, I was randomly thinking about something this morning and the solution to this particular item popped into my head. The reason why the PhoneGap alert displays after the JavaScript alert is that the PhoneGap call is asynchronous and the JavaScript alert is a synchronous call. The application passes off the call to display the PhoneGap alert then immediately calls the JavaScript function to display the alert. The JavaScript code executes faster while the PhoneGap code is getting it's work done, the JavaScript code has already fired and is blocking the PhoneGap alert function until the user clicks the OK button.

Yep, it helps when you actually think through things.