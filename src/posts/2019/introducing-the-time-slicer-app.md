---
title: Introducing the Time Slicer App
description: 
date: 2019-11-27
headerImage: 
categories: [Mobile Development]
tags: post
---

I was watching the evening news one day and started thinking about how much of the show was allocated to different topic categories (local news, national news, sports, etc.); I was especially curious about what the ratio was of news vs. commercials (there seemed to be a lot of car commercials). I decided to build an app that enabled me to capture (measure) the amount of time allocated across multiple categories. I thought perhaps that others would like a similar app, so I decided to publish it as my first app store app.

I worked a bit with the [Ionic framework](https://ionicframework.com/){target="_blank"} (I published a couple of Ionic sample apps for Microsoft when I worked on the Visual Studio docs, and my [Garage Controller](https://garagecontroller.com/){target="_blank"} app is an Ionic app) and I knew I wanted this app to be a cross-platform app (Android and iOS, perhaps Electron), so I decided to build this app using Ionic.

I completed the app a few months ago, but finally got around to publishing it in the Google Play Store last week. The app's public web site is [https://timeslicer.app](https://timeslicer.app){target="_blank"} and you can view the app in the Google Play Store using the link immediately following this paragraph. The iOS version is ready to go, so I'll submit it to Apple soon.

[<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />](https://play.google.com/store/apps/details?id=com.fumblydiddle.timeslicer&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1){target="_blank"}

The way I describe the app is as a stopwatch with categories. Let me show you how it works.

The app uses projects to define a grouping of categories. When the app launches, you're presented with an empty project list. You can quickly create your own, or load a set of sample projects to work with. The list of sample projects is shown in the figure below.

<img src="/images/2019/time-slicer-01.png" alt="Time Slicer Project List" />

Swipe left on an item to edit or delete it. Tap the plus sign at the top of the list to add a new project. When adding or editing projects, you'll see the following screen.

<img src="/images/2019/time-slicer-02.png" alt="Time Slicer Project Edit" />

From the main screen, tap a project to open it; you'll see a screen similar to the one shown below.

<img src="/images/2019/time-slicer-03.png" alt="Time Slicer Project (Stopwatch)" />

Tap the start button or one of the categories to start the stopwatch. When you tap one of the categories, the stopwatch starts tracking time spent on that category as shown in the following figure.

<img src="/images/2019/time-slicer-04.png" alt="Time Slicer Stopwatch (running)" />

When you stop the stopwatch, you can share the results with any local application using the mobile device's standard sharing process.

Overall, it's a pretty simple application. Figuring out how to track multiple timers simultaneously was the biggest challenge, but I eventually came up with a very elegant solution for this. I won't publish the source code for the app, but I likely will write a post here about how I solved the timer problem.

If you think about it, it's not a very useful app, but it does solve the problem it was designed to solve. I do think that many people will find it useful; I think its most useful for user experience and other types of researchers who watch people work or solve problems and need to track time spent on different types of activities. 

I'm certain that many users will think this is an app for tracking time (like lawyers and consultants billing their time). It can be used for that, but there are a lot of better solutions out there for that type of problem.