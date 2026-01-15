---
title: Firebase Hosting a HTML Boilerplate Site
description: 
date: 2025-11-20
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
  - Web Development
timestamp: 2025-11-20T22:45:14.895Z
---

Last night, I started playing around with a new [Firebase](https://firebase.google.com/){target="_blank"} project; deploying a hosted web app with some functions. I decided to use the [HTML Boilerplate](https://html5boilerplate.com/){target="_blank"} template for the web app and want to run a build before deploying the web app to Firebase. Looking around at the documentation, I struggled to find an easy way to do this.

## Hosting Project Configuration 

I started by placing my HTML project in a folder within the Firebase project, lets call the folder... `static`. With the standard settings (including functions), my project folder looks like the following:

<img src="/images/2025/firebase-01.png" alt="Firebase Folder Structure" />

Within the `static` folder, I have a `dist` folder where the HTML Boilerplate project build process puts the generated site files. To configure Firebase hosting to deploy the site using the files in the `dist` folder, all I had to do was make a small change to the project's `firebase.json` file:

The file has a `hosting` section with a `public` property that points to the site's deployable files.  

```json
"hosting": {
  "public": "static/",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ]
}
```

To configure this for my project, all I had to do was change the `public` property to point to the `static/dist` folder instead of the `static` folder I selected when I initialized the project.

```json
"hosting": {
  "public": "static/dist",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ]
}
```

Here's the completed configuration file:

``` json
{
  "firestore": {
    "database": "(default)",
    "location": "us-east1",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "disallowLegacyRuntimeConfig": true,
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ]
    }
  ],
  "hosting": {
    "public": "static/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],    
  }
}
```

With that in place, the project deploys successfully to Firebase Hosting.

## Automating Site Builds

For this to work, I had to manually build the project every time I deployed the site. That isn't fun and I knew I could automate it somehow.

Firebase allows you to add a pre-deploy step to your deployment process, simply add a `predeploy` property to the `firebase.json` file's `hosting` section as shown below:

```json
"hosting": {
  "public": "static/dist",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ],
  "predeploy": "npm run build"
}
```

But, with that in place, it doesn't work since the project's `package.json` file that contains the `build` command definition is in the `static` folder, not the project's root. 

Hacking away at this, I decided to make a little batch file that did the work for me:

```cmd
cd static && npm run build && firebase deploy --only hosting && cd ..
```

But that approach required that I manually execute the batch file every time I wanted to deploy the project. This isn't a good solution. 

The only solution I could come up with was to copy the web application project to the project root. With that in place, the web application project's `package.json` file was where it needed to be and the `predeploy` option worked as expected.

Here's the modified `hosting` settings for my project:

```json
"hosting": {
  "public": "dist",
  "ignore": [
    "firebase.json",
    "**/.*",
    "**/node_modules/**"
  ],
  "predeploy": "npm run build"
}
```

and here's the complete `firebase.json` file for the project:

```json
{
  "firestore": {
    "database": "(default)",
    "location": "us-east1",
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "disallowLegacyRuntimeConfig": true,
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ]
    }
  ],
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "predeploy": "npm run build"
  }
}
```
