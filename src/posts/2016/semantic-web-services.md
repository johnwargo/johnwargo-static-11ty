---
title: Semantic Web Services
description: Expanding the concept of the Semantic Web to Semantic Web Services.
date: 2016-08-04
headerImage: 
headerAltText:
categories: 
  - Miscellaneous
---

> This post copied from my World Without Apps site.

When I first started thinking about the World Without Apps, I wasn’t thinking it would be a smartphone phenomenon; instead I imagined everything except the smartphone being the key to this revolution (my house, car, office and so on). I never expected smartphone processors to be able to handle the load or that cloud technologies would be so prevalent and so powerful that they could support things like Google Now and Apple’s Siri. How wrong I was - smartphones are core to this WWA revolution, and I’ll write more about that later.

Regardless of how WWA is implemented, there’s a core piece of technology that enables it, the ability for web services to self-describe themselves to any consumer. As I mentioned in an earlier post, Amazon Alexa, Apple Siri, Google Now, and Microsoft’s Cortana are code-locked; they can only do things that they’re coded to do and nothing more. Now, these technologies have an out that enables them to handle most any request (at least most but Siri): when they can’t figure out what you’re asking them, they revert to delivering search results hoping you’ll find the answer you want there.

However, sometimes search doesn’t work that well for consumers as shown in the following figure. In this example, I asked Siri how long it would take me to drive to the moon. A reasonable question, I thought; I was watching a special on the Apollo program and I was curious. Siri heard my question correctly as you can see from the figure (although she skipped adding a question mark for some reason), but even when correctly ascertaining the meaning of my words, she still didn’t get it and instead told me how long it would take me to drive to Howl at the Moon (I didn’t even know we had one of those locally).

![Siri's Silly Answer](/images/2016/siri-drive-to-the-moon-cropped.png)

For voice interaction to work (whether it’s through an app or some universal agent), the data aggregator (the agent) has to know how to know a lot of different things. It has to know things, and it has to know how it knows things or at least where to find things. I’m not talking about Watson playing Jeopardy, but some sort of universal agent that just, well, knows things.

How does it know what it knows? Semantic Web Services.

We have the Semantic HTML, technology that lets web pages self-describe itself so computers can divine information from the page more easily. In order for digital assistants, agents, or whatever you want to call these things to be able to do your bidding, they have to have a catalog capabilities available to them. That means that developers expose their capabilities through web services then describe them in such a way that multiple agent platforms can consume them when they need to.

The flaw of the Google Now, Siri, Cortana or Alexa approach is that there’s no way to augment a service’s capabilities without writing platform-specific code. Google Now, Siri and Cortana expect local apps to provide services, so to extend those services you’ll have to build an app and convince users to load it on their phones. You can extend Google search by publishing data in a way Google can easily consume, and therefore make your stuff available to Google Now, but that’s a hack and there’s no guarantee Google will use your data in the way you intended.

Alexa and Viv on the other hand expose a cloud API developers can use to publish their capabilities to the service. Alexa enables developers to define what words they want used to invoke their service, and you can only consume your services when those specific words (or their variants) are uttered. Viv on the other hand is supposed to be exposing an SDK developers can use to describe their services and publish them to Viv. Once there, Viv can use them in any way she wants to deliver results to her users.

The way I look at this is that development organizations have to start thinking about how they’re going to expose their money making capabilities in a very generic way so that they can be consumed by ANYTHING. The web and mobile apps become core channels, ones that always need accommodation, but new channels, or at least new agent technologies, will pop up and demand attention. What we need to accommodate this is a standard definition of semantic web services, so developers can focus on only one way to easily expose their capabilities to the world. Instead of wrapping services in each vendor’s SDK, we need one common SDK that accommodates all. With this in place, there’s no limit to what the World Without Apps can accomplish.