---
title: It's the BlackBerry Browser's Fault
description: 
date: 2010-11-18
headerImage: 
categories: [BlackBerry]
tags: post
---

I'm regularly asked to help suggest a solution for customer having problems using the BlackBerry browser to access certain sites or applications. It's a common problem and rarely actually a problem with the BlackBerry browser. I thought I'd spend some time to talk about what's going on here and hopefully make you understand what's usually going on.

### The BlackBerry Browser

One of the things Research In Motion gets dinged on regularly is the browser, but it's important to note that Research In Motion worked deliberately to make the BlackBerry Browser small, fast and secure. What people see as faults in the BlackBerry Browser are in reality just the side effect of Research In Motion designing the browser for mobile web sites, NOT for viewing desktop web sites. Expecting that mobile web developers would build text-based web sites with limited flash (pun intended) for mobile users, they built a browser specifically for that need.

The BlackBerry browser is a standard browser. All of the standard web technologies you'd expect to be supported are supported. There might be a delay in implementation of a particular technology, such as Adobe Flash for example, but Research In Motion generally implements anything they think regular, everyday web sites use. Recognizing that the world has changed, and the market expects web sites viewed on a mobile device to look and feel like the desktop version (which they shouldn't in my opinion), Research In Motion acquired Torch Mobile and implemented Apple's WebKit web rendering engine in BlackBerry Device Software 6.0.

#### Web Site Issues

So, now that we have a little background on the BlackBerry Browser, let's dig into some of the problems you'll encounter when accessing web applications on a BlackBerry Browser. I'm going to focus primarily on commercial web applications that companies will often be using on their desktop computers and all of a sudden want to extend those applications to mobile devices. The same problems can be encountered in home grown web applications, but generally those are usually simpler applications and aren't doing weird things (I'll explain soon).

#### ActiveX Controls

The biggest problem that plagues web applications running on mobile devices is that many commercial applications utilize ActiveX controls to provide some interesting functionality for the application. ActiveX controls are essentially Windows programs that Microsoft has allowed web developers to wedge into their applications. They provide more interesting looking forms, more dynamic content and much of the same things Java Applets provided web users back in the 90's. The only difference is that they're written using Microsoft's technologies rather than industry standards.

The problem with ActiveX controls (actually, there's many – but I'm not going to get into that here) is that since they're a Microsoft technology, they only work in Microsoft's browser (Internet Explorer - IE). They leverage specific hooks Microsoft has implemented in Internet Explorer (and essentially no other browsers) and allow developers to do some pretty cool things.

The problem that affects mobile users is that IE is not available on anything but a device running Windows Mobile (or the new Windows Phone) operating systems.

If you have a web application that ONLY works on Internet Explorer and you encounter problems running the application on a BlackBerry, you need to ask some questions.

> Does the application leverage ActiveX controls?

If the answer is yes, then the application is never going to work in the BlackBerry Browser as is. It would have to be rewritten to work on other browsers. When your customer or the application's end users start to complain about this limitation, you'll need to ask them another question:

> For desktop users, does it work on any other browser than Internet Explorer? Something like Firefox, Google Chrome or Opera?

If the answer is no, then how could they be complaining that it doesn't work on the BlackBerry when it clearly doesn't work on anything except IE? If the application was coded to IE, then it either uses specific features of IE (and won't therefore work on a BlackBerry) or it was written to address specific limitations within IE (and won't therefore work on a BlackBerry either). You're stuck and shouldn't spend much time trying to fix something that can't be fixed.

If the answer to the last question was yes, then perhaps you have some more work to do. If the app works on most desktop browsers but not the BlackBerry Browser, then there could be something else going on (although still I'm not willing to blame the BlackBerry Browser for this) and you'll need to look at the next two sections for more information.

#### Browser Detection

It's hard for a lot of people to recognize this, but the browser a browser and if an application you're running uses standard web technologies such as HTML, JavaScript and CSS, it should work just fine anywhere. When you encounter a problem where a web application works on one or more desktop browsers but then fails on one or more mobile browsers, it's possible that the server is doing something to break the application on the mobile devices.

A more sophisticated web application will detect what browser is running the application and adjust the content appropriately. Sending desktop content for desktop browsers and smaller, more compact and feature restricted content to a mobile device. To help do this, the browser automatically sends with every request to the server some information about what browser it is and what web technologies/features it supports. The web application retrieves this information (by accessing the HTTP header values USER-AGENT and ACCEPTS) and makes some decisions about what to send to the device.

What I've seen when an application breaks when running on a BlackBerry device is that the web application running on the server was coded to recognize specific browsers and when it encountered the HTTP USER-AGENT header from the BlackBerry Browser, it didn't know what to do and either sent an incomplete page (because of an error in the program) or nothing at all (since it didn't recognize the client requesting the page).

What should happen is the server sends a page to the browser with content announcing that the specific device being used is unsupported by the application. Developers should not leave their users hanging; they should always let them know when something happens that prohibits the application from working. In most cases when I've looked at problems with an application running on the BlackBerry Browser it's because of this, the app wasn't built to recognize the BlackBerry and sent an incomplete page or limited data to the browser. This causes the BlackBerry Browser to display a blank white page and convinces the end user that the BlackBerry Browser is broken.

The way to confirm what is being sent to the BlackBerry Browser by the web server is to view the page's source code. By looking at the page source, you can see exactly what the server sent and see if anything was sent at all. To view the page's source, open the application in the browser then hold down the keyboard's ALT key and type RBVS (which stands I think for RIM BlackBerry View Source). When you finish typing those four characters and release the ALT key, the BlackBerry source viewer application will open and display the source for the page as shown in Figure 1.

![](/images/screenshot-nov1810-073702a.jpg)

Figure 1 – The BlackBerry Browser Source Viewer

You can then poke through the code looking for what's happening with the application. If the page contains properly formatted HTML, then the BlackBerry Browser will render it just fine, if not, you've found the source (no pun intended) of your problem.

To make it easier for you, the BlackBerry Browser source viewer allows you to send the page source via email, so you can just forward the code to your desktop email client and view it in a more eye-friendly way.

Again, 9 times out of 10 when I am pointed at an web application that doesn't 'work' on the BlackBerry Browser, I find that when I open the page's source that the web server didn't send valid HTML or any HTML to the browser. The problem is clearly on the web server or within the web application, not the BlackBerry Browser.

#### Manipulating the DOM

Another reason web applications fail on BlackBerry devices is because the web application was written to use JavaScript to manipulate the applications pages client side (within the browser). While this isn't generally a problem, many web applications do this; it's just that this feature of web applications didn't work on BlackBerry devices until recently (BlackBerry Device Software 4.6). The browser exposes a web page's content to JavaScript through the Document Object Model (DOM). By manipulating the DOM, JavaScript code running within a web page can actually change the page's content dynamically – either moving content in and out depending on user action or pulling new data into the application dynamically using AJAX. Unfortunately, when Research In Motion built the early BlackBerry Browser, they didn't allow JavaScript to change a page's content through the DOM. JavaScript could read the DOM and understand what content was available, but it was read-only – no changes could be made. I expect Research In Motion did this because they expected that mobile web sites wouldn't need this ability and they were very late to add this capability once they recognized it was needed by their customers.

So, if you have a web application that renders content correctly on the BlackBerry Browser but doesn't 'work' as expected you will need to ask:

> Does the application use JavaScript to manipulate page content within the browser?

If the answer is yes and the device in question is running a version of the BlackBerry Device Software older than 4.6, the user is going to have to upgrade their device in order to run the application. Unfortunately there's no way around this; it's a limitation of the BlackBerry Browser, it's well documented and it's been fixed in later versions of the BlackBerry Device Software.

If the answer is yes and the device in question is running BlackBerry Device Software 4.6 or higher, then the problem is very easy to fix. Even though BlackBerry Device Software 4.6 implemented a read-write DOM (rather than the read-only DOM from previous versions), JavaScript for some bizarre reason was turned off by default. You should be able to open browser options, enable JavaScript, reload the page in the browser and see that all is well with the application. With BlackBerry Device Software 6, Research In Motion finally enabled JavaScript by default.

You can actually build your web site so it turns the JavaScript on by default, you can read about this feature in BlackBerry Development Fundamentals (www.bbdevfundamentals.com) or I've written an article about it here: [https://johnwargo.com/index.php/blackberry/programmatically-enabling-javascript-in-the-blackberry-browser.html.](index.php/blackberry/programmatically-enabling-javascript-in-the-blackberry-browser.html.)

### Conclusion

Hopefully I've proven that when a web application encounters problems running on a BlackBerry Browser that it's not always a problem or bug in the BlackBerry Browser. Developers can do things that cause problems for mobile devices or leverage desktop web features that are not fully implemented on mobile devices. Your best course of action when you encounter problems like I've described here is to dig deeper into the problem and try to understand where the problem is – it's not always in the browser.