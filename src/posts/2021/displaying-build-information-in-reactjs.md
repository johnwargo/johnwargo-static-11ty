---
title: Displaying Build Information in ReactJS
description: I've been doing a lot of React development lately and I wanted the ability to display the app version number in the app. Now that I have the Ionic Build Info utility I described in the previous post, I copied that project and created a version of it that works for React as well. 
date: 2021-05-15
headerImage: 
categories: [Web Development]
tags: post
---

## Introduction

In an earlier article, I showed how to access build information in an Ionic application. When I created the solution for Ionic, I created a similar solution for ReactJS apps; I describe that solution in this article.

## Manipulating the Project Configuration File

ReactJS projects use node-based tooling like most web-based frameworks, so they already have an easy to update place to maintain the application's version number - in the project's `package.json` file. Here's a stripped-down version of the package.json file from a new project I just created:

```json
{  
 "name": "react-app",  
 "version": "0.0.1",  
 "private": true,  
 "dependencies": {  
 "@testing-library/jest-dom": "^5.11.4",  
 "@testing-library/react": "^11.1.0",  
 "@testing-library/user-event": "^12.1.10",  
 "react": "^17.0.2",  
 "react-dom": "^17.0.2",  
 "react-scripts": "4.0.3",  
 "web-vitals": "^1.0.1"  
 },  
 "scripts": {  
   "start": "react-scripts start",  
   "build": "react-scripts build",  
   "test": "react-scripts test",  
   "eject": "react-scripts eject"  
 },  
 "eslintConfig": {  
   "extends": [  
     "react-app",  
     "react-app/jest"  
   ]  
 },  
 "browserslist": {  
   "production": [  
     ">0.2%",  
     "not dead",  
     "not op_mini all"  
   ],  
 "development": [  
   "last 1 chrome version",  
   "last 1 firefox version",  
   "last 1 safari version"  
   ]  
 }  
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

The React project configuration file already has an automated build process:

```json
"build": "react-scripts build",
```

You can easily modify it to automatically update the version number at build time using this instead:

```json
"build": "react-build-info && react-scripts build",
```

## Generating Build Information

Unfortunately, as far as I can tell, a React project doesn’t have access to the project’s package.json file at runtime, so I needed a way to access the version number in my application.

Since React projects already use node and npm, I decided to create a simple node module that takes the version number from the package.json file and copies it into a file in the React project; the module is called react-build-info (https://
www.npmjs.com/package/react-build-info). 

You have to install it globally since you can’t easily execute the module locally (that I could figure out anyway), but when you execute it, it creates a file called buildinfo.js in the project’s src folder and copies over the version number from the package.json file and adds the date/time stamp for the build event. Here’s the file:

```typescript
module.exports = {
  buildVersion: "0.0.1",
  buildDate: 1615323488524,
}
```

To execute the module every time you do a build, just update the build entry in the project’s package.json file:

```json
"build": "react-build-info && react-scripts build",
```

# Displaying Build Information In the App

Now that I had the build information generated and available in the app, it's time to use it in the app. What I wanted to do was display the app build information (version number and build date) on the app’s login page, but I decided instead to simply display it in the console at startup. 

To do this, I opened the project’s src/App.js file and added the following import statement to the top of the file:

```typescript
import buildInfo from './buildInfo';
```

This loads the contents of the file into a buildInfo variable I can use in my app like this: 

```typescript
console.log(`Build Number: ${buildInfo.buildVersion}`);
const buildDate = new Date(buildInfo.buildDate);
console.log(`Build Date: ${buildDate.toString()}`);
```

And there you have it, a quick and painless way to automatically update React app build information accessible from within the app.
