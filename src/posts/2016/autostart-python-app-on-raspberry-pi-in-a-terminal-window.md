---
title: Autostart Python App on Raspberry Pi in a Terminal Window
description: 
date: 2016-08-23
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

I’ve coded a few Raspberry Pi Python projects recently that need to execute when the device boots:

*   Raspberry Pi Weather Station: [https://github.com/johnwargo/pi\_weather\_station](https://github.com/johnwargo/pi_weather_station)
*   Raspberry Pi Reminder App: [https://github.com/johnwargo/pi\_remind](https://github.com/johnwargo/pi_remind)

As these apps throw status and diagnostic information out to the console as they run, I wanted to be able to run the applications in a terminal window once the Pi boots. I poked and prodded at Google search results and found a couple of solutions, but, until recently, none of them worked quite right for me. I finally figured out why, so I thought I’d write about it here.

Of the articles I found online, several had startup process running the app, but others started the app using a script file. Some Pi libraries need to execute with supervisor privileges, so I had to be careful of that as well. In order to easily accommodate that potential requirement, I decided to implement my solution using a script file.

To start, I created a simple script file that starts my Python app:

`#!/bin/bash`  
`echo "Starting Pi Remind"`  
`/usr/bin/sudo python /home/pi/pi_remind/remind.py`

Notice that for this app, it will only run under supervisor privileges, so I execute the python command using sudo. The python command happens to be in the /usr/bin/ folder, alongside sudo, so I didn’t need to provide a full path to the python command in the bash script.

Before enabling auto startup, I’d probably better test the script first, right? Open a terminal window, navigate to the folder where the script is located and execute the following command:

`./start-remind.sh`

You got a permission denied error message, right? That’s the first fault point in this process, the bash script is solid, but the OS simply doesn’t know it can execute it. So, before you can execute the bash script, you have to set its execution bit using the following:

`chmod +x start-remind.sh`

With that in place, you should be able to execute the script from the terminal.

Now on to the next potential problem. When I first crafted my app, I expected that I’d execute it directly from the app folder using:

`sudo python ./remind.py`

So I didn’t pay any special attention to how the app accessed local files. That creates a problem for auto startup. Let me give you an example.

In one of my apps, I opened the app’s configuration file using the following code:

`# setup the config parser`

`Config = ConfigParser.ConfigParser()`

`print("\nOpening configuration file")`

`try:`

   `# read the configuration file`

   `Config.read("/config.ini")`

`except:`

   `print("Exception:", sys.exc_info()[0], slash_n)`

   `sys.exit(1)`

That worked wonderfully when executing my app from the folder where it resides. As soon as I tried to execute it from a startup script, it would fail miserably and NOT show me any indicators as to why it wasn’t working. The solution? Test the script from another folder, like this:

`cd /`

`/home/pi/pi_remind/start-remind.sh`

The terminal window will remain open and you can view, and correct, any errors that appear. For my app, I had to replace the code anywhere where I tried to open a local file, and instead pass the complete path to the project folder like this:

`# setup the config parser`

`Config = ConfigParser.ConfigParser()`

`print("\nOpening configuration file")`

`try:`

   `# read the configuration file`

   `# this could be executed from anywhere, so be sure to append the script path`

   `# to the file name so it loads via an absolute path instead`

   `Config.read(os.path.dirname(os.path.abspath(__file__)) + "/config.ini")`

`except:`

   `print("Exception:", sys.exc_info()[0], slash_n)`

   `sys.exit(1)`

With that script file in place, the script will execute from anywhere and I’m ready to go.

I found two ways to execute my script that worked for me. The first is to create a .desktop file and copy it to ~/.config/autostart. For my use case, I called the file start-remind.desktop. Populate the file with the following information:

`[Desktop Entry]`

`Name=Pi Remind`

`Comment=Raspberry Pi Calendar Reminder App`

`Exec=lxterminal -e "/home/pi/pi_remind/start-remind.sh"`

`Icon=`

`StartupNotify=true`

`Terminal=true`

`X-MultipleArgs=false`

`Type=Application`

`Categories=Utility;TerminalEmulator;`

When you reboot the system, the OS parses the .desktop file and loads the bash script.

Note: the only lines, I think, you really need are the following:

`[Desktop Entry]`

`Name=Pi Remind`

`Exec=lxterminal -e "/home/pi/pi_remind/start-remind.sh"`

`Type=Application`

Here’s where I learned this trick: [https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=80096](https://www.raspberrypi.org/forums/viewtopic.php?f=91&t=80096).

The next solution is a little easier and you can read about it here: [http://www.raspberrypi-spy.co.uk/2014/05/how-to-autostart-apps-in-rasbian-lxde-desktop](http://www.raspberrypi-spy.co.uk/2014/05/how-to-autostart-apps-in-rasbian-lxde-desktop). All you have to do is add an entry into a specific file and it will run your bash script at startup. Open a terminal window and execute the following command:

`sudo nano ~/.config/lxsession/LXDE-pi/autostart`

Add the following lines to the end (bottom) of the file (you can see an example of this in the figure below):

`@lxterminal -e /home/pi/pi_weather/start-station.sh`

To save your changes, press ctrl-o then press the Enter key. Next, press ctrl-x to exit the nano application. Reboot the Raspberry Pi. When it restarts, both python processes should execute in terminal window as expected.

Here’s an example from a project I’m working on that opens two windows:

![](images/stories/2016/pi-weather-monitor-startup-640.png)