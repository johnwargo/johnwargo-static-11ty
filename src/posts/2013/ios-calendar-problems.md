---
title: iOS Calendar Problems
description: 
date: 2013-01-24
headerImage: 
categories: [Mobile]
tags: post
---

I was supposed to be on a conference call a while back with a colleague who never showed up. He emailed later asking about the time of the call and I couldn't figure out why there was confusion – a calendar entry is a calendar entry, right? As long as he accepted the meeting invite, it should be on his calendar, right? Wrong.

Of course, those of you who work in Mobile are already thinking you know what happened. He was looking at his calendar on a mobile device and was in a different time zone than the meeting and the mobile device didn't update accordingly. Well, you're partially right – he was on a mobile device, but the device OS actually transpired against him. The calendar entry was on his calendar and his mobile device knew which time zone he was in – what happened was that the device actually ignored all of the information it had and deliberately showed the appointment on his calendar at the wrong time.

I was in Madrid a while back (at the SAP SAPPHIRE NOW! & TechEd conferences) and was trying to figure out where I was supposed to be. As I looked at my iPad calendar, I saw something similar to what is shown in Figure 1. If you look at the top of the image, you'll notice that it clearly states that it's 11:03 AM. Looking at the image, on the right side of the calendar, you'll notice a red circle and line indicating what time on the calendar I'm working with. Notice the discrepancy? Even though the device knows it's 11:03 AM, it is forcing the calendar to highlight a completely different time. 

Yeah, that's a feature I want on my mobile device.

<img src="/images/2013/calendar-entry.png" alt="Calendar Entry" />

Please don't even get me started on why there are duplicate entries on the calendar – my BlackBerry doesn't do this, but my iPad does. Ugh.

Anyway, I suddenly understood why my colleague missed the meeting. He was in a different time zone and his device was telling him that the meeting was at a different time than it actually was.

I poked around at this for a while and I finally found the answer. For some bizarre reason, Apple iOS doesn't show appointments on your calendar at the correct time unless you change one of the settings on the device. Take a look at Figure 2, it shows Calendar settings under the General tab, notice the setting labeled 'Time Zone Support'? Well, when you turn that setting off, the device shows appointments using the current time zone set on the device.

<img src="/images/2013/ios_calendar_settings.png" alt="iOS Calendar Settings" />

This isn't something I think should be configurable, but apparently Apple does. When I switch time zones, my BlackBerry simply detects it for me automatically then displays all appointments  in the current time zone – which is exactly how it should work.