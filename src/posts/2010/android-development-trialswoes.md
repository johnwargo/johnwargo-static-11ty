---
title: Android Development Trials & Woes
description: 
date: 2010-01-26
headerImage: 
categories: [Mobile Development]
tags: post
---

As I mentioned last week, I'd been trying to build an Android application for my rich client session at Lotusphere 2010 (AD114). I got off to a very late start, but with the right resources I thought I could throw something together to show in my session.

I took the XML-based web service I created for the BlackBerry Java and Windows Mobile examples (they both provide native support for XML-based web services) and created a new one that used Representative State Transfer (REST) to process the request and return some JSON with the results. The agent is working great, I'll write about it in a little while.

I created a Android Java project in Eclipse and started coding through my sample application, reading a couple of books as I went. I got the main application working, got the search box and the button that called the service working and was finally able to connect to the local Domino server to request the data (read about that here). As I tried to figure out the Android ListView widget, my application crashed and I just couldn't get any further. I poked and prodded in Eclipse and the simulator and just couldn't get anywhere.  Whenever I load the application, I get the following screen:

<img src="src/images/2010/android-error.png" alt="Android Application Error" />

It's something in the startup of the application, but it's not telling me anything about the source of the problem. On the flight home, I read more about the LogCat view in Eclipse that would allow me to see what Android is saying when the application crashes. It turns out that there's an uncaught exception being generated when the application starts. Here's the relevant log lines:

```text
01-25 15:57:16.082: ERROR/AndroidRuntime(244): Uncaught handler: thread main exiting due to uncaught exception  
01-25 15:57:16.092: ERROR/AndroidRuntime(244): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.johnwargo.contactlookup/com.johnwargo.contactlookup.main}: java.lang.ClassCastException: android.widget.TextView  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2496)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2512)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread.access$2200(ActivityThread.java:119)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1863)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.os.Handler.dispatchMessage(Handler.java:99)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.os.Looper.loop(Looper.java:123)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread.main(ActivityThread.java:4363)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at java.lang.reflect.Method.invokeNative(Native Method)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at java.lang.reflect.Method.invoke(Method.java:521)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:860)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:618)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at dalvik.system.NativeStart.main(Native Method)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244): Caused by: java.lang.ClassCastException: android.widget.TextView  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at com.johnwargo.contactlookup.main.onCreate(main.java:58)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1047)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2459)  
01-25 15:57:16.092: ERROR/AndroidRuntime(244):     ... 11 more
```

At least I know what's happening now – all I need to do now is figure out the source of the problem. I'm disturbed that I'm not getting more information in the UI about the problem. On the BlackBerry platform, you'd get an error message identifying that there is an uncaught exception and listing the exception that should be caught. If I had that information, I think I could find this problem pretty quickly.

OK, so I dug into the code and found the problem. I was using EditText and TextView widgets to create some of the UI. EditText widgets to accept user input and TextView widgets to display some text on the screen. When playing around with some things, I'd inadvertently cast the TextView as an EditText object (that happens some time when you're copying and modifying code). As soon as I changed the cast to TextView, the application is running again. Woohoo! 

The line containing the information I needed is here:

```text
01-25 15:57:16.092: ERROR/AndroidRuntime(244): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.johnwargo.contactlookup/com.johnwargo.contactlookup.main}: java.lang.ClassCastException: android.widget.TextView
```

Next step is to figure out how to use an Android ListView widget to display the array of names that is returned by the Domino server. Stay tuned…