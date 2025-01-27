---
title: Google Cloud Multiple Functions in a Project
description: 
date: 2024-01-08
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
  - JavaScript  
  - Node.js
---

In my previous post [Coding Google Functions Using TypeScript](/posts/2024/google-cloud-functions-typescript/){target="_blank"} I showed how to code Google Functions using TypeScript. Something else I wanted for my Google Cloud Functions project was to be able to manage multiple functions in a single GitHub project. This post describes how to do it.

## Cloud Function Weirdness

One of the things that really surprises me about many of the Cloud Functions offerings is that the cloud providers design their solutions so that every function is treated separately by the cloud.  For example, OCI based their Functions offering on the [fn project](https://fnproject.io/){target="_blank"} which creates and deploys a separate docker container for each function. 

In Google Cloud Functions, I don't know what the underpinnings are, but they treat each function separately as well. To create a function, you login to the Google Cloud console, navigate to your Functions project, then click **Create** to make a new function. Once the console creates the function, you must download the function's code as a zip file and extract it to your local development system in a separate folder for each function.

The first Cloud Functions environment I worked in was Firebase and Firebase takes a completely different approach. Firebase allows you to create a single Functions project then code multiple functions in the same project. They even provide multiple ways to structure your functions in the project. 

You can have one big JavaScript or TypeScript file with multiple functions in it, or you can create multiple code files then expose all of the functions in a single project.  Here's an example from part of a Firebase Functions project I created years ago:

```TypeScript
/*************************************************
 * Copyright John M. Wargo - All Rights Reserved
 * Proprietary and confidential
 *************************************************/

// Campaign functions
const campaign = require('./campaign');
exports.campaignList = campaign.list;
exports.campaignGet = campaign.get;
exports.campaignUpdate = campaign.createOrUpdate;
exports.campaignDelete = campaign.del;
exports.campaignFind = campaign.find;

// Meeting invite Click functions
const click = require('./click');
exports.clickList = click.list;
exports.clickGet = click.get;

// Company functions
const company = require('./company');
exports.companyList = company.list;
exports.companyGet = company.get;
exports.companyGetName = company.getName;
exports.companyUpdate = company.createOrUpdate;
exports.companyCanDelete = company.canDelete;
exports.companyDelete = company.del;
exports.companyFind = company.find;

// Contact functions
const contact = require('./contact');
exports.contactList = contact.list;
exports.contactGet = contact.get;
exports.contactUpdate = contact.createOrUpdate;
exports.contactCanDelete = contact.canDelete;
exports.contactDelete = contact.del;
exports.contactFind = contact.find;
```

That's the root `index.ts` file for the Firebase Functions project and it loads other modules in my project and exposes them all through a single functions portal in the console. I was able to manage my code in multiple TypeScript files, but publish them a single collections of Functions.

It just makes no sense to me to force developers to treat each function as a separate project folder. Especially when it comes to deploying the functions, you must execute the cloud platform's CLI `deploy` command individually for each functions folder. If I was an Enterprise developer building a huge app, I'd be pulling out what's left of my hair dealing with this ridiculousness.

## Multiple Google Cloud Functions in a Project

So, back to my Google Cloud Functions (GCF) project. 

My site uses three cloud functions, two that deal with Google Analytics and another that pulls in my [GoodReads feed](https://goodreads.com/user/show/51500942-john-wargo){target="_blank"}. 

**Note:** I didn't need my Goodreads feed deployed as a cloud function, but putting it there let me easily share the code across multiple projects.

I followed the process to create each of the functions in the Google Cloud console. With the new functions deployed, I downloaded the source code zip files for each function into a single folder. From here, I extracted each function's code into a separate folder with the function name as the folder name.  

{% image "src/images/2024/windows-file-explorer-gcp-functions.png", "Windows File Explorer showing the project folder", "image-full" %}

I made the whole folder (containing the different Functions folders) into a git repository and published the project to GitHub. In Visual Studio code, I navigate to each folder using the terminal to code, test, and deploy each function individually. This is slightly annoying, but at least I have everything in one GitHub project so I can easily work on my functions project on different development systems. 

## Automating Deployment of Multiple Google Cloud Functions

What I needed though was a way to publish all of my functions together with one command. The Firebase CLI offers this, but the Google Cloud CLI does not. I could work on each function until they were all tested and ready to go, then execute this one command to publish all of them.

Well, if you remember a while back I presented a session at All Things Open 2023 about Google's [zx](https://github.com/google/zx){target="_blank"}. I also published a post here about it called [## zx for Simplified Node Process Spawning](/posts/2023/zx-for-simplified-node-process-spawning/){target="_blank"}. I knew that I could use zx to create a cross-platform script for automating the deployment process for all of my project's functions. 

I quickly created a zx script called `deploy.mjs`; here's the code:

```js
#!/usr/bin/env zx

/**
 * Deploy all Google Cloud Functions in the project
 * by John M. Wargo
 *
 * Uses Google's zx module to run shell commands so
 * this runs on any platform (linux, macOS, Windows)
 */

console.log('\nExecution location: ' + chalk.green(process.cwd()));

var functionList = [];
var dirPath = process.cwd();
var files = fs.readdirSync(dirPath);
files.forEach(function (file) {
  var newPath = path.join(dirPath, file);
  if (fs.statSync(newPath).isDirectory()) {
    if (file != '.git') functionList.push(file);
  }
});

for (const func of functionList) {
  // add any additional flags needed for the deployment here
  var flagList = `functions deploy ${func} --gen2 --region=us-east1 --runtime=nodejs20 --trigger-http --allow-unauthenticated`;
  // split the flags into an array
  var flags = flagList.split(" ");
  console.log('Deploying the ' + chalk.green(func) + ' function');
  // change to the function directory
  cd(func);
  // deploy the function
  await $`gcloud ${flags}`;
  // change back to the project directory
  cd('..');
}
```

I started by hardcoding an array with the names of each of my project's functions, but then it occurred to me I could just build the array dynamically from the folder names in the project folder. That's what the first part of the code does, build out that function list:

```js
var functionList = [];
var dirPath = process.cwd();
var files = fs.readdirSync(dirPath);
files.forEach(function (file) {
  var newPath = path.join(dirPath, file);
  if (fs.statSync(newPath).isDirectory()) {
    if (file != '.git') functionList.push(file);
  }
});
```

The only hitch was that I had to skip the `.git` folder, but GitHub Copilot added that code for me automatically. Thinking about it, I should probably just ignore any folder that starts with a period; perhaps I'll make that change in the future.

With the folder/function list in hand, the code next loops through the `functionList` array and:

1. Changes the current directory to the function folder (using the name of the function as the folder name)
2. Executes the Google Cloud Platform CLI `deploy` command for the function
3. Changes the current directory back to the project folder (`..`).

Here's the code that handles that part:

```js
for (const func of functionList) {
  // add any additional flags needed for the deployment here
  var flagList = `functions deploy ${func} --gen2 --region=us-east1 --runtime=nodejs20 --trigger-http --allow-unauthenticated`; 
  // change to the function directory
  cd(func);
   // split the flags into an array
  var flags = flagList.split(" ");
  console.log('Deploying the ' + chalk.green(func) + ' function');
  // deploy the function
  await $`gcloud ${flags}`;
  // change back to the project directory
  cd('..');
}
```

**Note:** yes, I know that I loop through the folders as I deployed each function, for debugging purposes as I coded the script I decided to split the tasks so I could check it worked correctly (processing the folder list) before doing any deployments.

Something in the code that you may not get at first is that the code first splits the parameter list into an array and passes the array into the `gcloud` command:

```js
var flags = flagList.split(" ");
await $`gcloud ${flags}`;
```

I did this for multiple reasons:

1. zx automatically quotes and escapes command flags when you pass them as an array.
2. It makes it easier to tell what's happening. The executed command is `gcloud` and the rest is parameters and that's crystal clear from the code.

Actually, there's another, more important reason why I did this. It didn't work unless I split the command parameters into an array. When I passed he whole command line to zx's `$` method, it treated each parameter as a separate command and failed miserably. 

To execute the script, all I have to do is open a terminal window to the project folder and execute the following command:

```shell
zx deploy.mjs
```

Here's a screenshot of the process in action:

{% image "src/images/2024/windows-terminal-gcp-functions-deploy.png", "A terminal window executing the deploy script", "image-full" %}


The only issue I had was that the deployment command for each individual function worked perfectly from the command line. When I deployed using the exact same command from my zx script on Windows, the `gcloud` CLI couldn't find its installed version of Python. To solve this, I added a  `CLOUDSDK_PYTHON` environment variable pointing to the python executable and it resolved the issue.

I hope this helps make your GCF development easier. 
