---
title: Execa Node Process Spawning
description: This post shares my thoughts on Execa, an older solution than zx but provides very similar capabilities.  I covered both solutions in my All Things Open 2023 session.
date: 2023-12-26
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Node.js
  - JavaScript  
---

At All Things Open session this year, I presented a session on some open source tools that simplify node.js process spawning. I intended to use my whole session to talk about [zx](https://github.com/google/zx){target="_blank"} (which I wrote about in [zx for Simplified Node Process Spawning](/posts/2023/zx-for-simplified-node-process-spawning/){target="_blank"}) but shortly after I learned about zx, I discovered a more mature alternative to zx called [execa](https://www.npmjs.com/package/execa){target="_blank"}. 

The purpose of this post is to share some of my thoughts on execa.

Before I start, here's a link to the session [slide deck](/files/2023-ato-shell-scripts-javascript.pptx){target="_blank"} and [Source Code](https://bit.ly/ato23-shell-scripts){target="_blank"}.

zx and execa both do essentially the same thing, provide a simplified wrapper around the node.js `child_process` capabilities. It's not hard to use `child_process` but there are extra things every developer has to do to use it (i.e. write additional code) which I'm not going to go into here. 

The execa team took a slightly different approach than Google did with zx, but then quickly added similar functionality (the `$`` method zx uses). This means then that there can be very little difference between the two in action IMHO. To demonstrate this, I converted a script in created using zx to execa and only had to change two lines of code.

zx uses the `$` method to spawn external processes, to convert and existing zx script to use execa, all you have to do is load execa's version of `$` using the following code:

```js
import { $ } from 'execa';

const $$ = $({stdio: 'inherit'}); // Setup default output for the script
```

Next, replace any references in your existing script to zx's `$` with `$$` and you're done.

zx automatically handles i/o, redirecting output to the console. execa doesn't, so without the `const $$ = $({stdio: 'inherit'});` execa does everything silently. That was the biggest surprise to me, I'd run my script and everything seemed to work, but nothing showed up on the console.

execa allows node.js code to `await` completion of external processes, just like zx.

It was easier to install zx as a global module (`npm install -g zx`) and simply invoke `zx` to execute the script. execa needs that `import` statement, so it only seems to make sense to use it in node.js projects or a node.js based project like many web development projects.

There's really not a lot more for me to say here. If you look at the [source code](https://bit.ly/ato23-shell-scripts){target="_blank"} examples, you'll see that between the two modules they're both essentially the same except for the code changes mentioned above.

I find that I don't need execa when I have zx in my back pocket. zx's execution environment allows me to code quick scripts and execute them anywhere where execa seems to tie me down to node.js based projects.
