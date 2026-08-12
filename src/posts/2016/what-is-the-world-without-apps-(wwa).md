---
title: What is the World Without Apps (WWA)?
description: Introduces this site and the World Without Apps.
date: 2016-08-01
headerImage: 
categories:
---

> This post copied from my World Without Apps site.

As I launch this site, it seems appropriate to describe the overall premise its built on.

Mobile as a product category is changing lives everywhere. Everyone reading this article probably has a smartphone and likely has at least one tablet as well. It’s even likely that this article’s being read on a mobile device as well since desktop PCs and even laptops are less frequently used for web browsing. What makes mobile devices so useful and popular are the apps the devices execute to enable its user (you) to accomplish things. From the beginning of computer time, apps have been hand crafted by one or more software developers to accomplish something. App users use one or more apps to deliver some result. If one app is enough for a job, users fiddle with fields, buttons and menus to, well, do something. If one app isn’t enough, users learned that they could take the outcome (results) from one app and plunk it into another app to get the next result, stitching apps together in series to reach a specific goal.

What then is The World Without Apps? Well, it’s being able to accomplish a specific goal without using any apps at all. We’re in a world driven by apps today, but we’re quickly moving to a place where apps are no longer necessary for many tasks. Let me see if I can explain…

## Early Inter-app Interaction

When Microsoft created Dynamic Data Exchange (DDE) and later Object Linking and Embedding (OLE), amazing new things were possible. An app could now call out to another app and execute some task, then use the results. This enables developers to dynamically link apps, building apps that focused on a limited set of tasks, then stitch together those apps to deliver a more…sophisticated result. This was a great capability, although a bit flaky. This inter-app communication capability created dependencies and the potential for memory leaks that could wreak havoc in complicated processes and on computers with limited resources.

## Inter-app Interaction on Mobile Devices

In mobile apps, this interconnection is easier – it’s a simple process to enable capabilities in an app that can be invoked from another app. Apps can publish capabilities that only sibling apps can invoke (a secure approach) or an app can publish capabilities that any app can invoke. With this last approach, an app tells the OS it wants to do something (usually through a file or URI) and any arbitrary handler can respond indicating that it can handle the task. This works, but unless each program involved in the activity was coded by the same developer, the app initiating the request can’t necessarily control what happens in the invoked app.

## Agents to the Rescue

Voice added an interesting interaction to mobile devices. Now, instead of poking around at different apps, you could simply tell the device what you wanted and it would try to figure it out for you. Basically this is nothing but voice enabled search – the ability to speak a query instead of type it in. The voice interaction system had the ability to perform certain tasks for you such as opening an app, calling a specific contact or specified phone number or even sending or responding to text messages. Beyond delivering search results for you, the extra capabilities provided by voice enabled search exist only because the browser or the mobile device OS developer added additional capabilities – code-locked capabilities that can only deliver what a developer has coded the engine to deliver.

With Google Now, Google added capabilities to the Android OS that enables the device to guess some information that you might find helpful and deliver that to you through a special panel and, later, through notifications. Apple even added a vaguely similar capability to iOS where an extra panel was added to the home screen where iOS tries to guess what apps or information you’ll want to use next. Microsoft’s Cortana can do a little of that as well, but you have to invoke her to gain access to that feature. This means is that your mobile device is figuring out how it can help make your next task easier for you. This approach is the first step in the World Without Apps.

It’s pretty interesting how quickly this became a very capable service. I remember going to a concert with my son and noticing that my Android device starting letting me know that it knew how to get me back to my car and also how long it would take me to drive home. When out for lunch, Google Now would start notifying me how much time I had before I’d need to start heading home in time to make my next call or how long before I’d have to leave to make my next appointment.

The most startling example was when I was driving from Raleigh to Charlotte and Google Now notified me about an accident on the highway in front of me. What was most surprising about this is that I wasn’t using the device’s navigation capabilities (Google Maps), I was instead using the navigation system built into my car (which my phone new nothing about). The device knew I wasn’t home, but knows where home is. It also knew that I was on the highway and that there was an accident in front of me and decided to let me know about it (how it knew about the accident escapes me). That’s the best existing example of the WWA that I have – the device using information it has about me and my environment and deciding what to do about it.

Now, in all of the examples I just provided, it was an app doing this – Google Now, but that particular app is tightly integrated with the device OS (and other apps running on the device). It won’t be long before Google Now stops being a stand-alone app and instead becomes a core service running in the OS. Once that happens, individual apps will start to disappear; they’ll be subsumed by Google Now (or Google Assistant, the new flavor of this) and any app-specific capability that is needed will be converted to a system service running in the background and available to the OS.

Keep in mind though that everything Cortana, Google Now, and Siri can do, they can do because some developer has written code to enable that feature. All of the intelligence we’re feeling from our devices isn’t intelligence at all, it’s simply code-locked features a developer has written and included in the OS or in a virtual agent. All of this gets much more interesting when mobile devices, or any sort of device in our surrounding environment, is able to deliver capabilities beyond actions that have been pre-coded by a developer. That’s the end game WWA and ultimately why I started this site – to write about the ever changing capabilities in this space ultimately leading to the day where we’re not writing mobile apps, but instead enabling capabilities that can be consumed by anything in order to make our lives easier.