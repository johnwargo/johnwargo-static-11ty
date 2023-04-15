---
title: Simplifying Moddable Deployments
description: 
date: 2021-05-21
headerImage: 
categories: [Internet of Things (IoT)]
tags: post
---

As I mentioned in my previous post, the [Moddable SDK](https://github.com/Moddable-OpenSource/moddable) is a command-line driven SDK. It really has to be that way because it's an SDK that works with a variety of devices and each device platform has its own SDK which is usually also command-line driven.

Each supported platform has its own environment setup as well. For example, the Espressif platform uses Python and other client side tools and there are special PATH settings needed on the system when working with that platform. Since many developers may switch between hardware platforms on different projects, there's commands developers must configure and use to switch between the different hardware SDKs.

As I worked with the Moddable SDK, I realized that depending on your project's configuration (host and module folders) and the selected hardware platform, you're using the exact same Moddable commands but with different command-line options. I realized that there was a way to simplify the commands and eliminate a lot of the repetitive typing you had to do.

Let me give you some examples…