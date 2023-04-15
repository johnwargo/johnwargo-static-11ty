---
title: Displaying Build Information in ReactJS
description: 
date: 2021-05-15
headerImage: 
categories: [Web Development]
tags: post
---

Introduction
------------

In an earlier article, I showed how to access build information in an Ionic application. When I created the solution for Ionic, I created a similar solution for ReactJS apps; I describe that solution in this article.

Manipulating the Project Configuration File
-------------------------------------------

ReactJS projects use node-based tooling like most web-based frameworks, so they already have an easy to update place to maintain the application's version number - in the project's package.json file. Here's a stripped-down version of the package.json file from a new project I just created:

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
   "extends": \[  
     "react-app",  
     "react-app/jest"  
   \]  
 },  
 "browserslist": {  
   "production": \[  
     ">0.2%",  
     "not dead",  
     "not op\_mini all"  
   \],  
 "development": \[  
   "last 1 chrome version",  
   "last 1 firefox version",  
   "last 1 safari version"  
   \]  
 }  
}

Notice the \`version\` property, setup and ready for use.