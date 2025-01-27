---
title: Simplifying Moddable Deployments
description: Moddable is one of the JavaScript based microcontroller I've been working with lately and these guys are really serious about their JavaScript. I encountered some inefficiencies with their CLI tooling so I built a wrapper that simplifies its operation.
date: 2021-05-21
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

As I mentioned in my previous post, the [Moddable SDK](https://github.com/Moddable-OpenSource/moddable){target="_blank"} is a command-line driven SDK. It really has to be that way because it's an SDK that works with a variety of devices and each device platform has its own SDK which is usually also command-line driven.

Each supported platform has its own environment setup as well. For example, the Espressif platform uses Python and other client side tools and there are special PATH settings needed on the system when working with that platform. Since many developers may switch between hardware platforms on different projects, there's commands developers must configure and use to switch between the different hardware SDKs.

As I worked with the Moddable SDK, I realized that depending on your project's configuration (host and module folders) and the selected hardware platform, you're using the exact same Moddable commands but with different command-line options. I realized that there was a way to simplify the commands and eliminate a lot of the repetitive typing you had to do.

Let me give you some examples…

When you’re deploying a host module on a device using the Moddable SDK, you’ll use the following commands:

```shell
cd host
mcconfig -d -m -p esp32/moddable_two
```

The first command switches the terminal window to the folder hosting the files (in this example it is the `host` folder), and the second command invokes the Moddable SDK’s `mcconfig` command to build and deploy the Moddable core application and host module to the selected device. 

As I’m testing the host module on a specific device, the commands change little and every time I start my development environment, I have to type the same commands the first time I use them. I can use the command stack feature of my terminal program to repeat the commands later, but when I first open the terminal window, I’m typing those commands every time.

If I’m building my project for multiple devices, the commands change a little. Say for example I want to install the host on a M5Stack Fire device, the commands look like this:

```shell
cd host
mcconfig -d -m -p esp32/m5stack_fire
```

All that changes is the parameter passed in the platform option (`-p`).

When I want to deploy the HelloWorld module to a device already running the host module, the commands change just a little:

```shell
cd helloworld
mcrun -d -m -p esp32/moddable_two
```

I have to change to a different folder and the `mcconfig` becomes `mcrun`. And, of course, if deploying the same module to the M5Stack Fire device, the command changes to:

```shell
cd helloworld
mcrun -d -m -p esp32/m5stack_fire
```

## Moddable Project Options

A Moddable project could have all of its JavaScript stuff in the host module, but then deploying the host is a very time consuming process because of all the work the SDK has to do to build the core application for the target device plus deploy the JavaScript code as well. 

Most Moddable projects consist of a host module plus one or more additional JavaScript modules. Developers deploy the host module less frequently (since that takes so long) and do most of their work in JavaScript modules which deploy pretty quickly. 

This means that a Moddable project typically has a host folder (the folder holding the host module) and additional folders for each of the JavaScript modules used by the project. 

## Recognizing The Patterns

It didn’t take me very long to recognize the patterns in this process and realize that I could simplify this dramatically while still giving Moddable developers the flexibility they need to support complex Moddable projects deploying to multiple target devices.

Here’s what I learned:

* A Moddable project can have multiple folders (one for each module). 
* A Moddable project can have only one host module.
* A Moddable project can have zero or more, I’m not quite sure how to say this, non-host modules
* Developers only use the Moddable `mcconfig` command for deploying host modules.
* Developers deploy most modules using the Moddable `mcrun` command.
* The only command-line options for `mcconfig` and `mcrun` that really changes during development is the platform parameter (specifying which hardware device family to which you’re deploying)

So I started thinking, what if I abstracted away the complexities of the project into a set of simple commands a developer could use to deploy Moddable modules flexibly without having to remember which Moddable SDK commands to use and which command-line parameters to use? 

To accommodate that I’d need some sort of project-specific configuration file that described the different folders in the project (which folders held JavaScript modules and which one was the host module for example).

I’d also need a configuration file (or a section of a configuration file) to describe the different hardware platforms I’m using for the project.

With those three components, I’d have a simplified way to manage my Moddable projects and deployment to a variety of devices.

## Introducing Moddable Helper

Based on the requirements listed at the end of the previous section, I created a node package called [Moddable Helper](https://npmjs.com/package/moddable-helper). When you install the module on your Moddable development system (it works on Linux, macOS, and Windows), it adds a `mddbl` command you can use to streamline your command typing when working with Moddable projects.  `mddbl` is ‘moddable’ without any vowels; I did that in case the Moddable team someday releases a `moddable` package via [npm](https://npmjs.com); I didn’t want there to be a conflict with ‘official’ software.

At the core of `mddbl`'s' capabilities is a simple configuration file you add to your Moddable project folder containing settings about your project. The file is called, wait for it, `mddbl.json` and when you first create it, it looks like this:

```json
{
  "debug": false,
  "modules": [],
  "targets": [],
}
```

The `debug` option controls how much information the module writes to the terminal window as it executes. The `modules` array defines an array of `module` objects that describe the different source code folders in your project. The `targets` array defines an array of `target` objects that describe the different hardware targets (hardware devices) to which you deploy the project’s modules. 

A complete configuration file will look something like this:

```json
{
  "debug": true,
  "modules": [
    {
      "name": "host",
      "description": "The project's host module",
      "isHost": true,
      "debugFlag": true,
      "makeFlag": true,
      "folderPath": "host"
    },
    {
      "name": "hw",
      "description": "Text-only version of the project",
      "isHost": false,
      "debugFlag": true,
      "makeFlag": true,
      "folderPath": "helloworld"
    },
    {
      "name": "hwg",
      "description": "Hello World Graphical version",
      "isHost": false,
      "debugFlag": true,
      "makeFlag": true,
      "folderPath": "helloworld-gui"
    }
  ],
  "targets": [
    {
      "name": "mdbl2",
      "description": "Moddable Two",
      "platform": "esp32/moddable_two",
      "formatFlag": false,
      "formatStr": "",
      "rotationFlag": false,
      "rotationValue": 0,
      "wipeCommand": "python %IDF_PATH%\\components\\esptool_py\\esptool\\esptool.py erase_flash"
    },
    {
      "name": "m5fire",
      "description": "M5Stack Fire device",
      "platform": "esp32/m5stack_fire",
      "formatFlag": true,
      "formatStr": "gray16",
      "rotationFlag": false,
      "rotationValue": 0,
      "wipeCommand": "python %IDF_PATH%\\components\\esptool_py\\esptool\\esptool.py erase_flash"
    }
  ]
}
```

This is a configuration file for the Chapter 1 Hello World project in the IoT Development for ESP32 and ESP8266 with JavaScript book repository (https://github.com/Moddable-OpenSource/iot-product-dev-book) and supports deployment to Moddable Two and M5Stack Fire devices.

The project’s readme file provides all the information you need to configure and use the package, so I’m not going to duplicate any of that information here. Install the package, read the readme, and play around with it in your Moddable projects.

Please let me know if you think this helps with Moddable development (it certainly makes things easier for me - less typing). If you find bugs, create an issue (https://github.com/johnwargo/moddable-helper/issues) in the source repository. If you have an enhancement to the package or a bg fix, please submit a pull request (https://github.com/johnwargo/moddable-helper/pulls) and I’ll consider adding it to the package. I don’t read my personal email much during the work day, but I tend to get to GitHub messages at least once a day, so you should hear back from me pretty quickly unless I’m traveling.
