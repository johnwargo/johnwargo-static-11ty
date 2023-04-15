---
title: My ReactiveConf 2017 Sessions
description: 
date: 2017-11-18
headerImage: 
categories: [Mobile Development]
tags: post
---

![ReactiveConf Logo](/images/2017/reactiveconf.png)

**Note:** removed obsolete attachments November 11, 2022

Soon after joining Microsoft, I accepted an invitation to deliver a presentation at ReactiveConf 2017. My manager had a speaking slot, but due to a promotion to a different team, he was no longer able to fulfil his commitment to the conference.  

ReactiveConf is held in Bratislava, Slovakia; it is a dual stage conference focusing on development topics; mostly web, but some mobile. Presenters came from all over the world (most from the US), so there was a good variety of topics on the agenda. Apparently the conference grew to more than 1,000 attendees this year.

I brainstormed a topic with a colleague, and quickly submitted my session title and abstract along with my bio and photograph. For my session, I wanted to do something with React Native and Visual Studio App Center (the Microsoft product I work on), so I decided to show how to use Visual Studio App Center's CodePush and Push services to implement A/B testing in a React Native application.

To make this work, you publish multiple versions of your React Native application into different App Center CodePush deployments. With those in place, you use the App Center Push service to send a push notification to multiple devices, inside the notification, you include a custom object containing the Deployment ID for the version of the application you want the device to use. On receipt of the notification, code in the application uses CodePush to pull down the specified version of the app content. At the conclusion of the A/B test, you simply send another push notification to the devices, resetting the Deployment ID to the app's original version.

I've attached my presentation at the bottom of this article, for more details on my session, check out my blog post on the Visual Studio App Center blog (coming soon).

Even though I only planned on delivering one session at the conference, I found ways to deliver some additional sessions:

* The conference scheduled several quick, 10-minute lightning talks on a variety of topics, so I volunteered to deliver one. They had an online vote to see if anyone wanted to see my presentation, and I got voted in. In my session (they only allocated me 4 minutes, but that was enough) I demonstrated how to use a new feature of Visual Studio Code to enhance developer productivity. You basically add [//@ts-check to](mailto://ts-check to) the top of any JavaScript file, and Visual Studio Code applies the TypeScript compiler to the file and highlights JavaScript errors you wouldn't know about otherwise.
* The third day of the conference was Festival Day, and was held at a local university. The conference asked me (and some other presenters) to participate in an inspirational talk, to describe to University students how I got started in this field and what inspires me. There was no preparation for this session, I merely talked about myself and answered some questions. You can watch the session at [https://www.youtube.com/watch?v=ivCI2YJPCDQ&mc\_cid=e04ae2b8ed&mc\_eid=7c7ec0b350](https://www.youtube.com/watch?v=ivCI2YJPCDQ&mc_cid=e04ae2b8ed&mc_eid=7c7ec0b350){target="_blank"}.
* In my final session, I delivered a thirty-minute session about the state of mobile development, you can watch the video at [https://www.youtube.com/watch?v=DrHx9ei\_-2o&feature=youtu.be&mc\_cid=e04ae2b8ed&mc\_eid=7c7ec0b350](https://www.youtube.com/watch?v=DrHx9ei_-2o&feature=youtu.be&mc_cid=e04ae2b8ed&mc_eid=7c7ec0b350){target="_blank"}.