---
title: AI Developer Tools in Action
description: A was doing some coding this morning and encountered an excellent example of AI generated code that I had to share with you.
date: 2023-07-15
headerImage: 
headerImageAltText: 
categories: 
  - Developer Tools
---

**Note:** This article cross-posted from [A World Without Apps](https://aworldwithoutapps.com/posts/2023/ai-developer-tools-in-action/){target="_blank"}.

A while back, I created a plugin for Eleventy web sites; [Eleventy](https://www.11ty.dev/){target="_blank"} is a static site generator I use for this site and [several others](https://johnwargo.com/sites/){target="_blank"}. The plugin calculates some simple statistics from the articles in the site, you can see the plugin in action on [johnwargo.com](https://johnwargo.com/statistics/){target="_blank"}. 

One of the features I've been wanting to add to the plugin is article word, paragraph, and code block counts. My wife is out of town this weekend and my kids work, so I have some extra time this weekend to work on this. I've been a little nervous about these new features because I know I need to use Regular Expressions (RegEx) and I'm not an expert in Regular Expressions. Since the project is open source, free to use by anybody, I knew that my code could get some scrutiny so I wanted to write clean and efficient code.

I read a primer on RegEx in JavaScript and learned quite a few things I didn't already know. Next, I started Visual Studio Code, opened the project, then opened the project's main code file. I opened up some space in the code to add a new function and started typing.

I decided to start with the code that counts the code blocks in the article/post since I figured that would be pretty easy. Article code blocks start with `<pre>` and end with `</pre>`, so I knew exactly how to count them programmatically.

I started typing the function declaration:

```js
function countCodeBlocks(
```

As soon as I did, the AI-based tooling I have installed in Visual Studio Code (I wrote about them in [Coding One-handed](/posts/2023/coding-one-handed)) immediately finished the declaration for me:

```js
function countCodeBlocks(content: string) {
```

That is exactly right; I expected to pass in the post content as a string, so that works so far and the tooling saved me a little bit of work. When I accepted that proposed code, the tooling then suggested the complete function code I needed to complete the task:

```js
function countCodeBlocks(content: string) {
  const regex = /<pre.*?>(.*?)<\/pre>/gis;
  const matches = content.match(regex);
  if (matches) {
    return matches.length;
  } else {
    return 0;
  }
}
```

Looking at it, I saw that it was exactly the code I needed to complete the task. It should workm I've not tested it yet, I immediately wrote this post when it happened.

Now, looking at the code some more, I realized that there is one small change I need to make. The AI-based tooling suggested JavaScript code for me, but this particular project uses TypeScript (a superset of JavaScript), so I had to make one small change to make the code perfect; setting a return type of `number`.

```typescript
function countCodeBlocks(content: string): number {
  const regex = /<pre.*?>(.*?)<\/pre>/gis;
  const matches = content.match(regex);
  if (matches) {
    return matches.length;
  } else {
    return 0;
  }
}
```

The code should work either way, but this is a very good example of the developer efficiencies delivered via AI-based developer tooling. What I expected to take minutes to figure out only took seconds, imagine what this does to developer productivity.