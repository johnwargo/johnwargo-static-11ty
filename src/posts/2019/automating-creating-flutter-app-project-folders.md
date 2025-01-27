---
title: Automating Creating Flutter App Project Folders
description: I recently started working in earnest in Flutter. I poked and prodded at it for a while, but I finally worked through a couple of books and articles and have a good feel for the framework. This article describes a little command-line utility I created to automatically setup a Flutter project folder structure.
date: 2019-12-06
headerImage: 
categories: [Miscellaneous, Flutter]
tags: post
---

I've been wanting to dig into [Flutter](https://flutter.dev/){target="_blank"} development for some time now. I've followed the project for years now and I'm convinced that Flutter is the next big thing for client software development. It feels like Flutter solves a lot of the cross-platform development issues mobile developers faced for years (and many, many commercial and open source products tried to solve, but most failed). 

What Flutter should solve with their Hummingbird project is also cover cross-platform development for web apps as well - enabling developers to build their native mobile app and web app with mostly the same code base. Mark my words - this is gonna be big.

Anyway, I'm working through one of the Flutter books on the market (this one is OK, but it has a lot of issues) and one of the things I noticed is that the default Flutter project uses a simple lib folder for all your app's source code. The book suggests building a suite of subfolders there to structure your app's code and I agree. The author even suggests adding an assets folder for, well, assets, and I agree with that as well.

Expecting that I'm going to be making a lot of Flutter apps in the future (I've already started working on my second app store project in Flutter) I decided to streamline the folder creation process with some code. Using the suggested project folder structure from the book, I created a node module called flutter-folders that implements a CLI a developer can use to create the following folder structure inside a Flutter project:

* assets
* assets/images
* assets/other
* lib/models
* lib/pages
* lib/services
* lib/utils
* lib/widgets

You can find the project's GitHub repository at [https://github.com/johnwargo/flutter-folders](https://github.com/johnwargo/flutter-folders){target="_blank"}, and the CLI is available from NPM at [https://npmjs.com/package/flutter-folders](https://npmjs.com/package/flutter-folders){target="_blank"}. I hope this helps make your Flutter development a little easier.