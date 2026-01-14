---
title: zx for Simplified Node Process Spawning
description: A recap of a portion of my All Things Open 2023 presentation covering the `zx` project.
date: 2023-11-26
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Developer Tools
  - JavaScript
  - Node.js    
---

At the All Things Open conference this week, I presented a session entitled Write Shell Scripts Using JavaScript and zx. The session introduced Google’s zx (https://github.com/google/zx) project and another project called execa (https://github.com/sindresorhus/execa) and highlighted examples of each. The tools are pretty cool and help developers in some very specific use cases. This post covers the zx specific content from the session; I’ll publish the execa content from the presentation in a [separate post](/posts/2023/execa-node-process-spawning){target="_blank"}.

Zx provides JavaScript developers with a simplified interface around Node’s `child_process` module, delivering a quick, easy and simple way to spawn external processes from a Node application. 

Note: When I wrote the title and abstract for the session, my view was that zx helped developers deliver a single script to automate processes on multiple platforms (Linux, macOS, and Windows). But that’s really not true since zx only helps with spawning external apps, for general purpose file system manipulation (copying, deleting, moving files and so on) Node already has the `fs` (https://nodejs.org/api/fs.html) and `fs_extra` (https://npmjs.com/package/fs-extra) modules. 

## Background

Software developers frequently need to automate stuff. There’s a lot of tools available to manage things like installing dependencies, executing build and deployment processes, executing integration tests and so on, things like DevOps pipelines, node package manager (npm), GitHub actions and so on. There’s so many tools and options that I’m not going to even try to list even a small portion of them. 

For a single developer like me working in local developments in Windows and macOS, or when deploying software or tooling to setup a demo environment for repeated demonstrations (that need to be executed by others), I often resort to writing shell scripts (linux or macOS) or batch/command files (Windows) to simplify the process. These are short little scripts that do one or more simple things that dramatically simplify the work required to perform the individual steps repeatedly.

But since I write software on both macOS and Windows, to do this I have to write both shell scripts and command files every time. The command palette available to me on each side is different, so when I do this I’m writing in two completely different languages with some overlap between the two.

## Why I’m Interested in zx

As I started looking at zx, I was looking for:

* A way to execute shell commands on multiple platforms without having to code a bunch of if/then statements to deal with different platform’s inconsistencies
* Support for: 
  * At a minimum Microsoft Windows
  * Support macOS and/or Linux too
* Stand-alone scripts, no overhead files polluting the current project folder.
* No new language learning.
* Support for asynchronous tasks.

Since I’m already a JavaScript/TypeScript developer, I’d prefer to be able to do all this in either one of those languages (preferring TypeScript).

## I Could Use Node For This, Right?

As an experienced JavaScript/TypeScript and [Node.js](https://nodejs.org/){target="_blank"} developer, I know I can write scripts in JavaScript or TypeScript and Node to do a lot of this automation. Node’s `fs` and `fs_extra` modules deliver a lot of capabilities developers can use to interact with the file system to copy, move, delete, and manipulate files. 

Doing these types of things in Node however, especially in a non-Node project folder, leaves some extra files around (like the `package.json` file and `node_modules` folder) when installing packages used by your scripts. What I’m looking for is a cleaner way to do this.

Node even offers a `child_process` module that exposes capabilities that allows developers to spawn external applications or processes from a Node application/module. Unfortunately, using Child Process is sometimes difficult since you must carefully manage executing steps in sequence plus you must also directly manage process output sent to `stdout` or `stdio`.

I simply don’t want the hassle. Since zx abstracts away the complexity of `child_process`, the resulting code just looks simpler and easier to maintain.

## Why not use PowerShell?

You’re right, I could use PowerShell for this. There are, however, some problems with this approach (for me anyway):

1. It requires that I have PowerShell installed on every system where I want to use it. As I’m installing zx everywhere for this, installing PowerShell instead is no big deal.
2. I don’t know how to code scripts in PowerShell.

The second bullet for me is the most important, I don’t want to have to learn any new languages to accomplish my goals.

## Introducing zx

zx is a Google project that delivers a Node module that dramatically simplifies spawning processes in Node applications. It also delivers a runtime environment for node scripts so, unless I need to use external Node modules (zx loads a couple of common ones by default), I can run my scripts without leaving a bunch of detritus lying around in the project folder.

Here’s how Google describes zx (from the repo):

* Bash is great, but when it comes to writing more complex scripts, many people prefer a more convenient programming language. 
* JavaScript is a perfect choice, but the Node.js standard library requires additional hassle before using. 
* The zx package provides useful wrappers around child_process, escapes arguments and gives sensible defaults.

Here’s how I describe it:

* It’s a node-based runtime for executing JavaScript-based scripts and managing spawning external apps (in those scripts).
* Provides a simplified wrapper around node’s `child_process` API.
* Returns promises from calls to spawn.
* Automatically initializes several standard node modules (chalk, fetch, fs_extra, minimist).
* Automatically escapes and quotes parameters.

## Installing zx

The repo says that you can install zx using the following:

```shell
npm install zx
```

However, that approach creates a dependency on zx in the current folder plus either adds a `package.json` file if the project is not a Node project or adds dependencies to the project’s `package.json` file. 

I prefer to install it globally:

```shell
npm install zx -g
```

With that in place, I can execute zx ‘scripts’ from anywhere on my system.

## Example Use Cases

For the work I do, I have two solid use cases for zx that I’ll describe in the following sections.

### Particle Platform

I love working with the [Particle](https://particle.io/){target="_blank"} platform for IoT projects. Particle allows you to remotely execute code on a device (like the Particle Photon); an application calls an API in the Particle Cloud and that triggers execution of a specific function on the device. 

Over the years, I built several native mobile apps that remotely invoke code on Particle Photon devices. In order to be able to call a Particle API, the application must include a Particle API access token and device ID with each request and rather than hard code the values in the app, I use a settings page instead.

<img src="/images/2023/flutter-garage-controller-settings.png" alt="An image of an Android Application with an input field for Particle Access Token" />

Every time I test the app on a new device or when I wipe the memory on one of the device emulators, I must re-enter the required values (Particle access token and device ID). Since the values are long strings of numbers, it’s painful to type those values in or copy from a file on my development system and paste them into the appropriate fields on the device.
Fortunately, the Android SDK offers a command you can execute to poke characters into the keyboard buffer on a connected device. The command looks like this:

```shell
adb shell input text the_text_to_send_to_the_device
```

To use this on my Windows development system, I simply created a command (batch) file and pasted in the correct command. When I want to poke an access key or device ID, I simply execute the correct command file (`input-access-token.cmd` or `input-device-id.cmd`).

That works great for Windows, but what about macOS or Linux? To do the same thing, I need files with a different file extension and content. On macOS, the script file looks like this:

```shell
#!/bin/sh

adb shell input text the_text_to_send_to_the_device
```

If I make separate command/script files for API Key and Device ID, that means I must create and maintain 4 separate files to execute these two tasks on different operating systems.

With zx, I can create a single zx script called `send-access-token.mjs` that looks like this:

```shell
#!/usr/bin/env zx
await $`adb shell input text the_text_to_send_to_the_device`
```

With that in place, to send the access token to the Android device keyboard, I simply execute the following command:

```shell
zx send-access-token.mjs
```

The single command works on Linux, macOS, and Windows.

This approach still means that I need two script files to handle my use cases. With some extra code, I can make a script that passes the access token or device id to the connected device’s keyboard using a single command:

```js
#!/usr/bin/env zx

const accessToken = 'YOUR_ACCESS_TOKEN';
const deviceID = 'YOUR_DEVICE_ID';

// zx includes minimist, so we can use argv
// https://npmjs.com/package/minimist
if (!argv.a && !argv.d) {
  console.log(chalk.red('\nInvalid command line: requires an "-a" (API Key) or a "-d" (Device ID) argument.'));
  process.exit(1);
}

var theCode = argv.a ? accessToken : deviceID;
try {
  await $`adb shell input text ${theCode}`
} catch (p) {
  console.log(`\nExit code: ${p.exitCode}\n`);
  console.log(chalk.red(p.stderr));
  process.exit(1);
}
console.log('Task completed');
```

With this in place, I can send the access token by passing a `-a` to the end of the command or the device ID by passing a `-d`.

I accommodate all of my use cases with a single script that runs on any OS.

### Publishing Eleventy Sites

This site uses the Eleventy(https://11ty.dev/) static site generator and for a lot of different reasons, I run a variety of command-line tools when updating my site’s codebase and/or content. For example, while I post new content, I may also want to update the site’s search index on Algolia and/or update the site’s package version; each of those require execution of an external executable during the deployment process. 

To make it easy for me to control this process using a single command, I created a zx script that handles all of the options through a couple of simple command-line options. Here’s the script:

```js
#!/usr/bin/env zx

const algoliaPrefix = 'JMW_';

// With ZX the first three commands are the node executable, the zx executable, and the script name
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\john\\AppData\\Roaming\\npm\\node_modules\\zx\\build\\cli.js',
//   'pub.mjs'
// ]
var theArgs = process.argv.slice(3);
var updatePackage = false;
var updateIndex = false;

console.log('\nStarting project publish...');

// Check the command line arguments to see if we should increment the version
let idx = theArgs.indexOf('-i');
if (idx > -1) {
  updatePackage = true;
  // remove the -i argument from the array
  theArgs.splice(idx, 1);
} else {
  console.log('Skipping package version increment');
}

// Check the command line arguments to see if we should update the Algolia index
idx = theArgs.indexOf('-a');
if (idx > -1) {
  updateIndex = true;
  // remove the -a argument from the array
  theArgs.splice(idx, 1);
} else {
  console.log('Skipping Algolia index update');
}

// Do we have a commit message?
if (theArgs.length === 0) {
  console.log('\nMissing commit message on command line (in quotes)');
  process.exit(1);
}

// Do we have too many command line arguments?
if (theArgs.length > 1) {
  console.log('\nToo many command line arguments, make sure the commit message is in quotes');
  process.exit(1);
}

if (updatePackage) {
  // have to do this here, otherwise the site will have the wrong
  // build information in it. This means two commits, because
  // you can't do a version increment unless all local changes
  // are committed to the repo first. 
  await $`git add -A`;
  await $`git commit -m ${theArgs[0]}`;
  let msg = "Incrementing package version";
  console.log(`\n${msg}`);
  await $`npm version patch`;
}

console.log();
await $`gen-build-info src/_data`;

console.log('\nBuilding site');
await $`eleventy`;

if (updateIndex) {
  console.log('\nUpdating Algolia Index');
  await $`algolia-idxup _site/algolia.json ${algoliaPrefix} -f ../algolia-creds.json`;
}

await $`git add -A`;
await $`git commit -m ${theArgs[0]}`;
await $`git push`;
```
To publish the site with new content, all I have to do is this:
```shell
zx pub.mjs “commit message”
```
To update the Algolia search index during the publishing process, I use:
```shell
zx pub.mjs “commit message” -a
```
And when I modify the site’s codebase, I use the following:
```shell
zx pub.mjs “commit message” -i
```

## Conclusion

There’s a whole lot more you can do with zx, all I’ve done here is show you some of the use cases that drove my adoption for my development workflows. I didn’t dig into the details for how to use zx in your scripts as the project documentation is good and complete, anything else I wrote here would simply duplicate the docs. You can find all of the example code I shared during my ATO session at https://github.com/johnwargo/ato-2023-shell-scripts-code. 
