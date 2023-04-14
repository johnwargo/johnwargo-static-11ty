---
title: Email Input on the Web
description: 
date: 2015-04-28
headerImage: 
categories: [Mobile Development]
tags: post
---

If you access web applications from a smartphone, you may be asked to provide an email address by the application. This will happen during a registration process, but email is also used as a user's user name, so you may find that you have to type an email in every time you log into a site.

One of the things that HTML5 gives mobile developers is a special input type for email addresses that simplifies email input for users. Unfortunately, most web developers haven't implemented this cool feature yet, and the result for end users is that every one of us has to work harder to input our email address in these applications.

To highlight how this works, I created a sample application that demonstrates the hard way then the easy way to accept email address input in a web application. You'll see screen shots of the application in operation later in the article. You can find the sample application on my GitHub account at [https://github.com/johnwargo/email\_input](https://github.com/johnwargo/email_input).

It seems that most web applications today use the default HTML text input field to capture email addresses:

<input type="text">

When the user places the cursor into this field on a mobile device, he or she will see something like what is shown in Figure 1. The user can type anything they want into the input field using the default input keyboard provided by the mobile device.

![](/images/2015/email_input_1_640.png)

Figure 1

As you can see from the figure, even though I'm trying to type in an email address, the browser doesn't know that and the @ symbol used in all email addresses is not readily accessible on the virtual keyboard displayed to the user. It's not too painful to press the ?123 key shown in the figure and select the @ symbol from the secondary keyboard, but it's extra work – extra work that every user who accesses the form will have to do every time they use the form.

With HTML5, there's a special email input field you can invoke using:

<input type="email">

With this input type, the mobile browser automatically displays an email address-friendly keyboard as shown in Figure 2.

![](/images/2015/email_input_2_640.png)

Figure 2

With this keyboard, the @ symbol is readily available and the user doesn't need to press any modifier keys to access it. Every single user who uses the form with this input tag has to use one less keypress to enter the email address.

This isn't an earth shattering reduction in keystrokes, but at least with this approach an attempt is made to simplify things for users. Developers should always look for ways to simplify things for their users and this is a great example.

It's not a lot of work to implement this, simply change the input type from text to email. Now, many of you may be asking yourself what the impact is for browsers that don't support the HTML5 input tags. Well, HTML5 as a draft has been around long enough that you'll be hard pressed to find a modern smartphone that doesn't support them. However, for those browsers, if the email type isn't supported, the browser will simply ignore the tag and render the default input field.

So, there's no impact on users if the tag isn't supported by the browser, but direct benefit to smartphone users if it is. There's no reason not to update all of your email input fields to use this input tag right away.