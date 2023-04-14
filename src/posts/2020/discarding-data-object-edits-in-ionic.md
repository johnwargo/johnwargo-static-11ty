---
title: Discarding Data Object Edits in Ionic
description: 
date: 2020-06-06
headerImage: 
categories: [Web Development]
tags: post
---

When I first learned Ionic development a little over three years ago, the default examples for editing a data object didn’t make any accommodation for the user cancelling their edit. All examples showed how to build a details or settings page which included a back button which takes the user back to the previous screen. Any edits they made to the data presented in the page were automatically saved and updated in other parts of the app that displayed the data. For some edits, especially for configuration settings, I always give my app users the ability to cancel changes.

The issue in doing that is that Ionic is a very capable Reactive framework, so it’s designed to automatically wire the app UI to its data so any change in one place is automatically reflected elsewhere. This is a great feature, but frustrating when you don’t want it to work this way.

When I first encountered this, I poked and prodded at the issue for a long time before turning to Ionic Support for help. They finally helped me understand how to resolve the issue. The solution? When I open a page to edit some data, if I want to be able to discard changes, I must first clone the object then wire the page UI to the cloned object. When the user taps the cancel button, I throw away the clone. When the user taps the Done or Save button, I update the original object from the clone, then close the dialog.

It’s a simple and elegant solution, but a solution I had a hard time finding when I needed it.

Back with Ionic 3, the recommended solution was to use the Lodash ([https://lodash.com/](https://lodash.com/)) clone method to make the clone, and that worked great for a while. Later versions of either Ionic or the Lodash library broke things, so I could no longer use Lodash to solve this particular problem.

When this happened, I reached out again to Ionic and they provided me with a little, custom clone object I could use for my Ionic apps. Since I originally had a problem finding a solution for this, I decided I’d publish a complete sample application that demonstrated the solution. I finally got around to completing the sample yesterday and published the project (with a complete explanation of the code) to the Ionic Edit Object Sample [https://github.com/johnwargo/ionic-edit-object-sample](https://github.com/johnwargo/ionic-edit-object-sample) repository.

The app’s main screen looks like the following figure. It lists a couple of simple data object properties plus options for the traditional Ionic back button edit process plus a second option where the user can make changes to the data then cancel or save their changes.

![](/images/2020/home.png)

I also recorded a video demonstration of the app at [https://www.youtube.com/watch?v=nJPmmxR8\_iY](https://www.youtube.com/watch?v=nJPmmxR8_iY)

{youtube}nJPmmxR8\_iY{/youtube}