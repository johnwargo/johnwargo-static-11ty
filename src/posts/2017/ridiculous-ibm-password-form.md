---
title: Ridiculous IBM Password Form
description: 
date: 2017-03-25
headerImage: 
categories: [Stupid Developer Tricks]
tags: post
---

  
I needed to make some changes to my IBM newsletter subscription recently, so I clicked the ubiquitous Update Your Subscription link on the bottom of one of the newsletters. It had been a while since I logged in, so I had to go through the password reset process to get in. No worries, IBM had that covered, right? Yep, they sure did.

When I clicked the “Reset My Password” link I received, I was presented with this form:

![](images/stories/2017/ridiculous-ibm-password-form-01.png)

Figure 1

Now I know IBM cares about password security, and they’d force me to use some ridiculous, convoluted password character combination, but surprisingly the Create your new password form said ABSOLUTELY NOTHING about what those password requirements were.

Sigh.

OK, this makes absolutely no sense. This is IBM, I know they produce security products, and offer consulting services to help their customers with security. They absolutely have to have some sort of requirements for my password, there’s no way they wouldn’t. But, the form, produced by a professional software developer I imagine, makes absolutely no reference to any requirements.

OK, so I thought for a while, and came up with the perfect password to use. As I started typing, the form changed to what you see below.

![](images/stories/2017/ridiculous-ibm-password-form-02.png)

Figure 2

Aaaah, so IBM does care about password security, but chose to wait until AFTER I’d decided on a password to use before telling me what the password requirements are. This makes no sense – why wait until I’ve started typing a password to tell me what I need to include in my password? That is never a good idea. Statistically, there’s limited chance I’m going to get this right without knowing what the password requirements are, so what this means is that EVERY SINGLE USER who uses this form will have to correct their chosen password upon receiving this previously hidden information. Ugh!

Instead of letting users know in advance what the password requirements are, and allowing the user to pick their password with all the information they need at hand, IBM choses to let the majority of their visitors (a small percentage, a very small percentage, will get it right anyway) select a password that won’t comply with the requirements before even telling them what the requirements are.

Now do you see why this is a Stupid Developer Trick (SDT)?

I’ve said this before, and apparently will continue to need to do so, respect your users and give them ALL OF THE INFORMATION THEY NEED before they need it, not after they need it. That’s the minimum any of us should expect from any input form.

OK, so now I know I need an 8 character password, so I’m good, right?

Nope, there’s another warning as well that I can’t figure out. It’s possible the form is telling me that I can’t use a previous password, but that’s not guaranteed since the message is vague. Is it warning me that I shouldn’t use a previous password or telling me that I can’t use a previous password? Also, when it tells me not to use another password, is that another password I used previously on this site? Or another password I’ve used anywhere else at any time? I can’t tell, can you?  
Well, at this point, I’m going to wing it and start to enter the password I’ve picked for myself. As I type this password, the form changes yet again. Only now does it have more password requirement information for me.

![](images/stories/2017/ridiculous-ibm-password-form-03.png)

Figure 3

So, apparently you have to keep adjusting the password you want to use as the password continues to provide pertinent information as you type. You’ve got to kidding me – does IBM hate its customers?

Finally, after poking and prodding at the password, changing what I’m planning to use every time the password form gave me additional information about the password requirements, I was eventually able to enter an acceptable password.

![](images/stories/2017/ridiculous-ibm-password-form-04.png)

Figure 4

What an absolutely horrible experience. Now, it could have been worse, but as password forms go, this is pretty horrible. You know what’s the funniest part of this? Developers, as you work on implementing password forms, or any other type of form, be sure to give the user all of the information they need to accurately populate the form. Don’t wait for them to make an error to tell them what they need to fill out your form. Tell them right up front. Identify all required fields, show input field patterns when they exist (like phone number, date or credit card) and treat them like you like them, not like you consider how to fill out the form to be a mystery.