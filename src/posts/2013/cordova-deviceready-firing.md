---
title: Cordova DeviceReady Firing
description: 
date: 2013-07-29
headerImage: 
categories: [Mobile Development]
tags: post
---

A colleague taught me something recently that I didn't know about the Cordova deviceready event. This is probably default JavaScript event behavior, but I was just unaware of it. When you register an event listener, if the event has already fired, registering a new event listener will cause the new event listener target function to fire.

I'm not sure how useful this information is, but I had to test it out to make sure it worked as I expected it to. In the sample application below, I have a simple Apache Cordova application that initializes then displays a page with a button on it. When you click the button, the application registers the deviceready event listener (which has already fired by the time the user can click the button) which causes the myNewFunction() function to fire immediately. Cool, eh?

Here's the code:

{codecitation class="brush:javascript; gutter:true"}<!DOCTYPE html>  
<html>  
  <head>  
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">  
    <meta name="viewport" id="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no;" />  
    <script type="text/javascript" charset="utf-8" src="cordova.js"></script>  
    <script type="text/javascript" charset="utf-8">  
    function onBodyLoad() {  
      document.addEventListener("deviceready", onDeviceReady, false);  
    }

    function onDeviceReady() {  
      console.log("DeviceReady Fired");  
      alert("DeviceReady Fired");  
    }  
      
    function myRegistFunction() {  
      console.log("myRegistFunction Fired");  
      console.log("Registering deviceReady listener");  
      document.addEventListener("deviceready", myNewFunction, false);  
    }  
          
    function myNewFunction() {  
      console.log("myNewFunction Fired");  
    }  
    </script>  
  </head>  
  <body onload="onBodyLoad()">  
    <h1>DeviceReady test</h1>  
    <p>Testing the Cordova deviceready event.</p>  
    <input type="button" value="Click me!" onclick="myRegistFunction();" />  
  </body>  
</html>{/codecitation}

Here's the application running on an iOS simulator.

![Sample Cordova Appliction Running on an iOS Simulator](/images/2013/deviceready-sample-app.png)  
Figure 1

And here's the output from the application's call to console.log.

![Xcode Output Log](/images/2013/deviceready-sample-log.png)

Figure 2