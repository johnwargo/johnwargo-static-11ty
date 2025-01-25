---
title: Platform-Specific Links in Ionic
description: When I submitted my mobile app to Apple for inclusion in the App Store, they rejected my app since it used Android screen shots in the app's tutorial (using Ionic Slides). This post describes how I updated the app to display different graphics depending on whether the app targets Android vs. iOS.
date: 2020-05-14
headerImage: 
categories: 
  - Mobile Development
  - JavaScript
tags: post
---

When I submitted the Time Slicer app to the Apple App Store, they rejected it. That was not necessarily a bad thing as I really expected them to do so. This was my first App Store submission (I will submit my second one next week) and I had no idea what I was doing, so I expected at least one rejection, possibly more.

What surprised me though was Apple's reason for rejecting me:

> We noticed that your app or its metadata includes irrelevant third-party platform information.
> Specifically, your app includes non-iOS device images in the tutorial screens.
> Referencing third-party platforms in your app or its metadata is not permitted on the App Store unless there is specific interactive functionality.

Aaah, Yes – the app screen shots in the app's Intro and About pages. Well that was unexpected (unexpected because I never read Apple's publishing guidelines), but not a big issue to fix.

I started thinking about how I would solve this problem, and my first thought was to use Ionic platform, or specifically Capacitor platform lifecycle hooks. For platforms that have a CLI (like Ionic and Capacitor), hooks are a way to link your code into different parts of the process the CLI manages. I came up with a different approach, one I'm describing in this post, but it turns out that the Ionic CLI has hooks ([https://ionicframework.com/docs/cli/configuration#hooks](https://ionicframework.com/docs/cli/configuration#hooks){target="_blank"}) and 14 days ago someone added hooks to the Capacitor CLI ([https://github.com/ionic-team/ionic-cli/pull/4417](https://github.com/ionic-team/ionic-cli/pull/4417){target="_blank"}). Pretty cool stuff and something I'm going to have to look into later.

Anyway, I decided to implement a solution that used the platform the app was running on to determine which images to load on the About and Intro pages. I'd essentially make two sets of screen shots, one for Android and the other for iOS, and load the right one dynamically at runtime. This isn't a very clean solution, since it forces the app to hold images for both platforms knowing it would only ever show one on the device. Using hooks to put the right images in the right place for Android and iOS would be the cleaner implementation, I just didn't go there.

Anyway, so I populated the app's assets folder with the appropriate files. The images were originally called intro-01.png, intro-02.png, etc. but with the Android and iOS versions, I appended the platform name to the front of the file name, so my image files were labeled android-intro-01.png, android-intro-02.png, etc. and ios-intro-01.png, ios-intro-02.png, etc. With the files in place, I then had to update the code.

First I updated the TypeScript code for each page (into.page.ts and about.page.ts) with the following:

Added an import for the Platform module:

```ts
import {, Platform } from '@ionic/angular';
```

Next I updated the constructor to instantiate the platform variable:

```ts
constructor(
  public platform: Platform,
) { }
```

Then I added a variable called runningOn to the top of the page class:

```ts
runningOn: String = 'android';
```

This sets the default platform to Android and will cause the Android screen shots to display in the Electron or other platform versions of the app (If I ever make them)

On Init, we need the app to set the platform to iOS if running on iOS, so I added the following code:

```ts
ngOnInit() {
  // If we're on iOS, show iOS images
  if (this.platform.is('ios')) {
    this.runningOn = 'ios';
  }
}
```

This resets the runningOn variable appropriately on iOS devices.

This is what the Intro Page code looks like in its entirety:

```ts
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  runningOn: String = 'android';
  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private storage: Storage
  ) { }
  ngOnInit() {
    // If we're on iOS, show iOS images
    if (this.platform.is('ios')) {
      this.runningOn = 'ios';
    }
  }
  goHome() {
    // if not, set the flag saying we have
    this.storage.set('introShown', true);
    // then show the intro slider page
    this.navCtrl.navigateRoot('/');
  }
}
```

On the app pages, I load the images using the ion-img component:

```html
<ion-img class="screenshot" src="assets/intro-01.png"></ion-img>
```

Now that I have the runningOn variable in the app to let it know on which platform it's running; I can update the link component with the following:

```html
<ion-img class="screenshot" src="assets/{{runningOn}}-intro-01.png"></ion-img>
```

This changes the URL, appending the platform name at runtime and loading the correct image depending on the platform.

The Ionic Platform module does not offer a method to retrieve the platform name (it should), so you must ask it for each platform. So, to add support for Electron-specific images, then the ngOnInit code would look like this:

```ts
ngOnInit() {
  // If we're on iOS, show iOS images
  if (this.platform.is('ios')) {
    this.runningOn = 'ios';
  }
 if (this.platform.is('electron')) {
    this.runningOn = 'electron';
  }
}
```
