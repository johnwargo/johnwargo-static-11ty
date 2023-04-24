---
title: What Were They Thinking 14
description: 
date: 2013-08-18
headerImage: 
categories: 
  - Mobile Development
  - What Were They Thinking
tags: post
---

OK, so I was registering my daughter for fall Soccer (That's Football to most of the world) at the local YMCA. The person behind the counter scanned my membership card, so had all of the information she needed to complete the registration except for payment. Actually, that's not true – they automatically transfer the monthly fee from my checking account, so they even had the information they needed to collect payment as well.

Anyways, knowing they had everything they needed to register my daughter, they still handed me an iPad with an application I needed to use to fill out her registration. Mind you, they scanned my membership card then validated my name, email address, mailing address and more plus identified the child I wanted to register by name – but still needed me to fill out this form on the iPad.

What a bunch of idiots.

Anyway, I'm filling out the form with my daughter's name and my contact information and one of the fields that I need to fill out is her birth year. I clicked the dropdown and saw that the very first year on the list was 2037.  Yep, it's 2013 and they START the birth year at 2037 and go down from there.

Assuming the sports program starts at 4, it would have to be 2041 before that year would apply.

Did I mention that they're a bunch of idiots?

I'm not sure, but do you think the developer who built the application could have done a little math and done the following:

```text
MaxValue = Current Year – 80  
Min value = CurrentYear + MinimumAgeForSports  
CalculateYearList(minValue, maxValue)
```

This is just another find example of a mobile application developer not thinking as they work on an application.