---
title: Published Subdirectory Copy v1.1
description: 
date: 2025-06-14
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Delphi
  - Microsoft Windows
timestamp: 2025-06-14T16:45:33.463Z
---

When I created my [Subdirectory Copy](https://fumblydiddle.com/products/subcopy/){target="_blank"} application, my use case was copying a single set of files to a flash drive. As I got closer to releasing the product, I started thinking more about how users would use it and I realized that the application had to be able to manage multiple filesets for copying. 

Even though my new car offers only a single flash drive interface for playing music files, my previous car (an Audi Q7) had two SD card slots that I could play music from. So, as soon as I published version 1 of the application I immediately started working on version 1.1 (v1.1.1.1) which allows users to save the application's copy configuration to an external Project file. With that in place, users can switch between them to copy multiple filesets to external drives.

{% sidebar "Download Version 1.1" %}
You can download the project's source code and installer from <a href="https://github.com/fumblystuff/subdirectory-copy/" target="_blank">GitHub</a> or directly from <a href="https://fumblydiddle.b-cdn.net/subcopy/SubCopySetup-1.1.1.1.exe" target="_blank">Fumbly Diddle Software's CDN</a>.
{% endsidebar %}

Here's the application's new home screen. Notice that I added a menu to the application and moved the **Copy** button to the bottom of the screen.

<img src="src/images/2025/subcopy-v11.png" alt="Subdirectory Copy v1.1" />

## Implementation Details

The first version of the application stored all of its settings in the Windows Registry. This worked great and allowed me to quickly bring the application to market. For this new version, I pulled the Root directory path and Source directory list from the registry and saved them to the Project file.

Project files have a `.scpy` extension, but under the covers they're just a standard Windows `.ini` file:

```text
[Root]
RootDirectory=C:\Users\john\Music\iTunes\iTunes Media\Music

[Source]
source0=Acroma
source1=Airbag
source2=Alan Morse
source3=Alan Parsons Project
source4=Ambrosia
source5=American Noise
.
.
.
source50=The Allman Brothers Band (Live)
source51=The Record Company
source52=Toto
source53=Toy Matinee
source54=Traffic
```

