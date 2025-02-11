---
title: Coding Unihiker Programs Using Pycharm
description: I recently had the opportunity to work with the Unihiker M10 device
  from DF Robot. Using PyCharm, I was able to easily create a new project, write
  Python code, and deploy it to the Unihiker device. By configuring the
  deployment settings in PyCharm, I was able to upload my code to the device and
  run it successfully. Overall, the process was straightforward and allowed me
  to quickly test and run my Python programs on the Unihiker device.
date: 2025-02-10
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Internet of Things (IoT)
timestamp: 2025-02-10T23:02:03.847Z
generatedDescription: true
---

A while back, the folks at [DF Robot](https://www.dfrobot.com/){target="_blank"} sent me one of the new [Unihiker M10](https://www.dfrobot.com/product-2691.html){target="_blank"} devices to play with. I had a specific use case in mind for the device, but it took me a while to get around to using it.

The getting started documentation is really good and I was able to quickly get Visual Studio Code configured to talk to the device. It wasn't long before I had some of my code running on the device. I'm a huge fan of Visual Studio Code, I use it all the time, especially when coding or writing posts on this site. For python development though, I prefer to use the [PyCharm](https://www.jetbrains.com/pycharm/){target="_blank"} IDE from JetBrains. JetBrains offers a free community edition, but I've had a Professional license for many years - mostly because you need the Professional license to deploy code to a remote device using FTP (or one of its variants).

{% sidebar "PyCharm Professional License Required" %}
The remote deployment capabilities of PyCharm demonstrated in this post require a Professional license for PyCharm. As far as I know, you can't do this in the Community Edition. I purchased a Professional license specifically for this capability as I used it repeatedly while programming and testing Raspberry Pi projects.
{% endsidebar %}

## Creating a PyCharm Project

To start coding for the Unihiker using PyCharm, start by creating a new project in PyCharm. When PyCharm loads, it prompts you to either open an existing project or create a new one, select the new project option as highlighted in the following figure:

{% image "src/images/2025/unihiker-pycharm-00.png", "Pycharm Launch Dialog", "image-full" %}

In the **New Project** dialog that appears, select a folder for the new project. The project folder must already exist, but you can click the folder icon on the far right side of the dialog to select a folder or create a new one. Once you have a target folder selected, click the **Create** button to create the project.

{% image "src/images/2025/unihiker-pycharm-01.png", "Pycharm New Project dialog", "image-full" %}

Create a new python file in the new project, in the example below, I called the program `unihiker_demo.py`. In the Editor, paste in one of the sample programs or write your own. 

{% image "src/images/2025/unihiker-pycharm-02.png", "PyCharm IDE with a new project opened", "image-full" %}

Once you have a program coded, you're ready to deploy it. 

## PyCharm Deployment Settings

In the PyCharm IDE, select the **Tools** menu, then **Deployment** and finally **Configuration...**. PyCharm will open the following dialog:

{% image "src/images/2025/unihiker-pycharm-03.png", "PyCharm Deployment menu", "image-full" %}

Click the **+** in the upper left corner of the dialog to create a new deployment configuration. PyCharm, for some bizarre reason, assumes you're connecting to a web server to deploy server code. This makes no sense to me; you'd think they'd consider other options as well like deploying Python code to a Raspberry Pi or Unihiker device. 😄 Ignore the "Please add a web server to configure" since that doesn't matter here.

{% image "src/images/2025/unihiker-pycharm-04.png", "PyCharm Deployment Dialog with new Deployment highlighted", "image-full" %}

PyCharm first prompts for you to select the deployment connection type; I chose **SFTP** since that made the most sense to me. You may be able to use **FTP** or one of the other options as well.

In the **Create New Server** dialog (again, we're not creating a server location here, so just ignore the nomenclature) enter a name for the new deployment. I chose **Unihiker** for my deployment configuration since that made the most sense to me. 

{% image "src/images/2025/unihiker-pycharm-05.png", "PyCharm Create New Server Dialog", "image-full" %}

Next, PyCharm opens the configuration dialog for the new Deployment connection. The first thing you must do is configure an SSH configuration for the deployment. Click the **...*** button highlighted in the figure.

{% image "src/images/2025/unihiker-pycharm-06.png", "PyCharm Deployment Configuration", "image-full" %}

In the **SSH Configurations** dialog that appears, click the **+** button to create a new connection.

{% image "src/images/2025/unihiker-pycharm-07.png", "PyCharm SSH Configuration Dialog", "image-full" %}

In the dialog that appears, enter:

+ `10.1.2.3` for the **Host** IP address
+ `root` for the **Username**
+ `dfrobot` for the **Password**

Select a location for storing the SSH configuration, I selected `~/ssh/config` for my system. My Windows desktop is broken, so I'm not sure what this looks like on Windows.

Click the **Test Connection** button to validate the settings. If it doesn't work, change the parameters until it does. 😄

Click the **OK** button when you're all set the the SSH connection works.

{% image "src/images/2025/unihiker-pycharm-08.png", "PyCharm SSH Configuration Settings", "image-full" %}

Back at the Deployment configuration, the **SSH Configuration** field should populate with the SSH configuration you just created (and validated).

For **Root path** use `/`.  Again, ignore the stuff about the web server URL, you don't need one since we won't have one.

{% image "src/images/2025/unihiker-pycharm-09.png", "PyCharm Deployment Configuration with an SSH Configuration configured", "image-full" %}

Switch to the **Mappings** tab on the dialog and set the **Deployment path** to `root` since that's the folder where the Unihiker expects to find python programs it can execute. Click the dialog's **OK** button to save your changes. 

{% image "src/images/2025/unihiker-pycharm-10.png", "PyCharm Deployment Mapping", "image-full" %}

Back in the code editor, right-click on the python program you want to deploy to the Unihiker device. In the menu that appears, select **Deployment** then **Upload to Unihiker** as highlighted in the following figure. 

**Note:** PyCharm doesn't know anything about a connected Unihiker; Unihiker was just the name I chose for my deployment profile. Naming it that way makes it crystal clear what I'm deploying to, right?

{% image "src/images/2025/unihiker-pycharm-11.png", "PyCharm Deployment Menu", "image-full" %}

The selected python program should deploy to the connected device. On the Unihiker device, when you press the Home button to open the app menu, select **2-Run Programs** and pick the `root/` folder and you should see your deployed python program in the menu as shown in the following figure. 

{% image "src/images/2025/unihiker-pycharm-12.jpg", "An image of a UniHiker device with a new Python program loaded", "image-full" %}
