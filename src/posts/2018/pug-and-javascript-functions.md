---
title: Pug and JavaScript Functions
description: I started playing around with Pug and had a problem with JavaScript functions, this article describes how I solved my problem.
date: 2018-05-05
headerImage: 
categories: 
  - JavaScript
  - Web Development
tags: post
---

I'm building a node-based web application using Express and Pug. As part of this project, I wanted a page that triggered some business logic using data I passed to the page (a Pug view) when the user taps a button on the page. My button code looks like this:

{% highlight liquid %}
button(onclick='buttonProcessor({deviceID}, {accessCode})') Push Button
{% endhighlight %}

When I access the page, the code for the onClick event looks just like the code in the snippet above:

{% highlight liquid %}
onclick="buttonProcessor({deviceID}, {accessCode})"
{% endhighlight %}

Which, of course, won't work. Pug wasn't processing the variables at all as long as they were in the onclick quoted string. I poked and prodded at the Internet for a while and couldn't find the solution anywhere. No matter what I did, the variables didn't expand correctly.

After a while, I finally came up with the solution. It's not pretty, but it works; here it is:

```js
script.   
//- Had to do this to get around not being able to process   
//- the page variables in the button's onClick attribute   
function buttonProcessor(){      
  pushButton(!{JSON.stringify(deviceID)}, !{JSON.stringify(accessCode)})   
}   
button(onclick='buttonProcessor()') Push Button
```

Instead of trying to expand the variables in the onclick event, I created a separate function on the page and there the variable values expand correctly. Again, ugly code, but it works.

I'm publishing this here just in case I can help anyone else with the same problem.