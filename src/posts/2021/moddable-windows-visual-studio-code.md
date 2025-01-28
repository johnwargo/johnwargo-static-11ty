---
title: Moddable, Windows, & Visual Studio Code
description: I spent some time recently setting up a development environment for the Moddable platform (JavaScript microcontrollers). Since I'm on Windows and the docs were a little confusing, I setup my environment then wrote about it here so others could learn how to configure their environments.
date: 2021-05-20
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I've been working a bit lately with the [Moddable](https://moddable.com/){target="_blank"} platform; I set up their SDK on my macOS and Windows systems, but for several reasons I prefer to code on Windows unless I have to use macOS. The [Moddable SDK](https://github.com/Moddable-OpenSource/moddable){target="_blank"} is very command-line heavy (for reasons I agree with) and as I started coding Moddable JavaScript projects in Visual Studio Code, I realized that there are some tweaks I can document here that may help other Moddable developers using Visual Studio Code on Windows.

### Environment Setup

I'm primarily using Moddable with Espressif devices (specifically the ESP32 devices from Moddable and M5Stack) and the [Moddable ESP32 installation instructions](https://github.com/Moddable-OpenSource/moddable/blob/public/documentation/devices/esp32.md){target="_blank"} show how to configure a command-line environment setup with all of the environment variables and PATH entries you need to execute Moddable SDK instructions that invoke the Espressif SDK.  
The idea is that you'll double-click a shortcut to open a properly-configured terminal window (what Windows calls a Command Prompt) and execute all of the Moddable SDK commands from there.

The problem for my environment is that I want to do all of my work inside Visual Studio Code (I'm going to start calling it VSC from here) and VSC has its own terminal built in that I can use instead of switching to an external one.

On Windows, the Moddable SDK uses some tools from Visual Studio, and one of the things that comes along with that is a Start menu shortcut that opens a terminal window and executes some commands to configure the terminal window for the Visual Studio tools. On most systems, that shortcut points to the following file: 

```text
"C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars32.bat"
```

The Espressif SDK also creates a shortcut that properly configures a terminal window for the Espressif SDK, it executes the following:

```text
C:\Windows\system32\cmd.exe /k ""C:\Users\<username>\.espressif\idf_cmd_init.bat" 
"C:\Users\<username>\AppData\Local\Programs\Python\Python38-32\" "C:\Program Files\Git\cmd\""
```

What Moddable tells you to do is update Espressif shortcut so it instead executes both commands when you click it:

```shell
%comspec% /k ""%ProgramFiles(x86)%\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars32.bat" && pushd %IDF_PATH% && "%IDF_TOOLS_PATH%\idf_cmd_init.bat" "%LOCALAPPDATA%\Programs\Python\Python38-32\" "%ProgramFiles%\Git\cmd" && popd"
```

What I did was make a copy of the Espressif SDK shortcut and modified that one so I’d still have a clean Espressif SDK environment if I wanted it later. 

Unfortunately, none of this does me any good in VSC, since VSC can’t access the terminal window directly (it has its own). What I did instead is break those commands out into a command file (an executable text file with a .cmd extension) called mod-set-env.cmd (https://gist.github.com/johnwargo/9cd1a6c15e98a2ef8a6adeed927f0a7f) that looks like this:

```shell
ECHO OFF
REM set UPLOAD_PORT=COM6
REM Do we have the `VCToolsVersion` environment variable?
IF "%VCToolsVersion%"=="" (
    call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars32.bat"
    pushd %IDF_PATH% 
    call %IDF_TOOLS_PATH%\idf_cmd_init.bat C:\Python39\ "C:\Program Files\Git\cmd\"
    popd
) ELSE (
    echo: 
    echo Skipping, environment already configured
    exit /b 1
)
```

I originally included this command file in my Moddable project folder, but I quickly realized I didn’t want to have to copy that file around into every project, so I put it in a folder full of other random executables that I happened to have on my PATH environment variable. This allows me to execute this file from anywhere.

With the file in place, every time I launch VSC to work on a moddable project, I open the VSC terminal windows and execute mod-set-env.cmd and VSC is all set up to work with the project.

## Understanding the Command File

There’s a lot going on in this simple command file, so I thought I’d explain the different parts of it. 
At the start of the file is a commented-out line that looks like this:

```shell
REM set UPLOAD_PORT=COM6
```

What this does is sets an environment variable the Espressif SDK uses to identify the port number for a connected device. Apparently the SDK is pretty good at figuring this out on its own, but if it can’t, you can uncomment this line (remove the REM at the start of the line) then specify the port number for your device and the SDK should find it. 

I disabled that line since on my system the SDK has no issue finding connected devices. 

Next, the command file checks to see if a specific environment variable is set:

```shell
IF "%VCToolsVersion%"=="" (
 
) ELSE (
 
)
```

The command file sets the `VCToolsVersion` environment variable when it executes, so I added this check to keep me from running the command file twice. If the environment variable is missing (empty) then the command file executes all the steps to configure the environment:

```shell
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvars32.bat"
pushd %IDF_PATH% 
call %IDF_TOOLS_PATH%\idf_cmd_init.bat C:\Python39\ "C:\Program Files\Git\cmd\"
popd
```

Which should look familiar since it’s the same code the Moddable folks told you to use in your modified shortcut.
Why did I pick the VCToolsVersion environment variable? No reason. I randomly picked something in the environment that I knew only existed after I configured a terminal window for the Visual Studio development environment. I just needed some way to know I’d already executed the command file and this environment variable check worked the first time.

If the environment variable is already set, then the command file warns you and exits:

```shell
echo: 
echo Skipping, environment already configured
exit /b 1
```

The echo: by itself enters a blank line in the terminal window.

## Deploying to Devices

Now, when it comes to deploying JavaScript code to devices, the Moddable SDK  has specific commands you must use depending on whether you’re deploying a Host or Module. Since the two commands are very similar (and have the same command parameters), I decided to create command files for each. Here’s the code I used to deploy the host model; I put in a file called deploy-host.cmd in my Moddable project folder:

```shell
cd host
mcconfig -d -m -p esp32/moddable_two
```

The code assumes the host project is in a folder called host (it is, and I’m guessing will normally be by convention). 
And here’s the code I used to deploy a module called main; I put in a file called deploy-mod.cmd in my Moddable project folder:

```shell
cd main
mcrun -d -m -p esp32/moddable_two
```

This isn’t a perfect approach, but it dramatically reduces the amount of typing I must do to deploy hosts and modules in a Moddable project. In the VSC terminal window, all I have to do is type de and hit the Tab key and Windows Auto Complete will prompt me to select the file to execute. In four (host) or five (module) keystrokes I can complete my deployment tasks - a lot less typing than typing the Moddable SDK commands. 

In my next article, I’ll illustrate a better and easier way to manage Moddable project deployments (on Linux, macOS, and Windows).
