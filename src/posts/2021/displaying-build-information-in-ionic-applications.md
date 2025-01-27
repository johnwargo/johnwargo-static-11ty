---
title: Displaying Build Information in Ionic Applications
description: I was building an Ionic app and I wanted to display the app version in the app without having to hard code it as a constant in the app. Recognizing that the app's `package.json` file contained the app version and I could update it when I needed outside of the app, I built a little utility that writes a data file to the ionic project with build information that can be displayed anywhere in the app.
date: 2021-05-14
headerImage: 
categories: 
  - JavaScript
  - Web Development
  - Mobile Development
tags: post
---

## Introduction

This winter, I worked on a project where I had to build a web-based sales automation tool and, for different reasons, I decided to do the project using Ionic. The project was for desktop browsers, and while Ionic wasn't the best choice for a desktop app, it's the web framework I know the best, so that's what I used.

Since I knew the audience for the app, I knew I'd have to build in specific features to make the app easy to support for non-technical users. One of the things I wanted to make sure I had was the app version and build date easily accessible in the app. I looked around to see if anyone had an existing solution for this, and I found a lot of people looking for a solution but no solution. I decided to make one.

## Manipulating the Project Configuration File

Ionic projects use node-based tooling like most web-based frameworks, so Ionic projects already have an easy to update place to maintain the application's version number - in the project's package.json file. Here's a stripped-down version of the `package.jso`n file from a new project I just created:

```json
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
```

Notice the `version` property, setup and ready for use.

Now, what I needed next was a simple and automated way to update that value every time I built a new version of the app. Fortunately, the Node Package Manager (npm) already has a feature that increments the value for you:

```shell
npm version patch
```

When you execute that command from the Ionic project folder, it automatically increments the patch version (the final value in the version string):

```json
"version": "0.0.2",
```

How cool is that? 

Available options are `major`, `minor`, and `patch`. Updating the major version increments the first value in the package.json file’s version property. Updating the minor version increments the second value in the package.json file’s version property. You’ve already seen what patch does. Here’s links to the docs: https://docs.npmjs.com/cli/v7/commands/npm-version. 

The Ionic project configuration file already has an automated build process:

```json
"build": "ng build",
```

You can easily modify it to automatically update the version number at build time using this instead:

```json
"build": "npm version patch && ng build",
```

## Generating Build Information

Unfortunately, as far as I can tell, an Ionic project doesn’t have access to the project’s package.json file at runtime, so I needed a way to access the version number in my application.

Since Ionic projects already use node and npm, I decided to create a simple node module that takes the version number from the package.json file and copies it into a file in the Ionic project; the module is called [ionic-build-info](https://npmjs.com/package/ionic-build-info). 

You have to install it globally since you can’t easily execute the module locally (that I could figure out anyway), but when you execute it, it creates a file called `buildinfo.ts` in the project’s `src/ap`p folder and copies over the version number from the package.json file and adds the date/time stamp for the build event. Here’s the file:


```typescript
export const buildInfo = {
  buildVersion: "0.0.5",
  buildDate: 1620867856174,
  buildDateStr: "Wed May 12 2021 21:04:16 GMT-0400 (Eastern Daylight Time)"
}
```

To execute the module every time you do a build, just update the build entry in the project’s package.json file:

```shell
"build": "npm version patch && ionic-build-info && ng build",
```

## Displaying Build Information In the App

Now that I had the build information generated and available in the app, it's time to use it in the app. What I wanted to do was display the app build information (version number and build date) on the app’s login page, but I decided instead to simply display it in the console at startup. 

To do this, I opened the project’s src/app/app.component.ts file and added the following import statement to the Top of the file:

```typescript
import { buildInfo } from './buildinfo';
```

This loads the contents of the file into a buildInfo variable I can use in my app like this: 

```typescript
console.log(`Build Number: ${buildInfo.buildVersion}`);
const buildDate = new Date(buildInfo.buildDate);
console.log(`Build Date: ${buildDate}`);
```

And there you have it, a quick and painless way to automatically update Ionic app build information accessible from within the app. 
