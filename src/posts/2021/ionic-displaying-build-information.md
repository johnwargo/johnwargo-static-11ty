---
title: Ionic Displaying Build Information
description: 
date: 2021-05-14
headerImage: 
categories: [Web Development]
tags: post
---

Introduction
------------

This winter, I worked on a project where I had to build a web-based sales automation tool and, for different reasons, I decided to do the project using Ionic. The project was for desktop browsers, and while Ionic wasn’t the best choice for a desktop app, it's the web framework I know the best, so that’s what I used.

Since I knew the audience for the app, I knew I’d have to build in specific features to make the app easy to support for non-technical users. One of the things I wanted to make sure I had was the app version and build date easily accessible in the app. I looked around to see if anyone had an existing solution for this, and I found a lot of people looking for a solution but no solution. I decided to make one.

Manipulating the Project Configuration File
-------------------------------------------

Ionic projects use node-based tooling like most web-based frameworks, so Ionic projects already have an easy to update place to maintain the application’s version number - in the project’s package.json file. Here’s a stripped-down version of the package.json file from a new project I just created:

{  
 "name": "ionic-app",  
 "version": "0.0.1",  
 "author": "Ionic Framework",  
 "homepage": "[https://ionicframework.com/](https://ionicframework.com/)",  
 "scripts": {  
 "ng": "ng",  
 "start": "ng serve",  
 "build": "ng build",  
 "test": "ng test",  
 "lint": "ng lint",  
 "e2e": "ng e2e"  
 },  
 "description": "An Ionic project"  
}

Notice the \`version\` property, setup and ready for use.