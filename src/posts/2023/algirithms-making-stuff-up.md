---
title: Algorithms Making Stuff Up
description: The recent incident involving a lawyer using ChatGPT to write a
  court brief and it backfiring due to fabricated content highlights the
  limitations of the algorithm. ChatGPT is a next word prediction algorithm, not
  a research engine, so it generates content based on its training data. In this
  case, the algorithm made up references in the legal brief because it lacked
  real examples. To avoid such issues, combining next word prediction algorithms
  with research algorithms can ensure accuracy and relevance in generated
  content. The incident underscores the importance of understanding the
  capabilities and limitations of standalone AI algorithms.
date: 2023-05-31
headerImage: /images/headers/quino-al-7agL8aasVzE-unsplash-1024.jpg
headerImageAltText: A picture of a clown
categories:
  - Artificial Intelligence
generatedDescription: true
---

> This post copied from my World Without Apps site.

Not long after posting my previous article about [ChatGPT](/posts/2023/what-is-chatgpt){target="_blank"}, articles started popping up about a lawyer who used ChatGPT to write a brief for a court case and how it backfired on him because the generated brief had made up stuff in it.

Of course it did.

As I mentioned in the previous post, ChatGPT is a next word prediction algorithm at its core. It’s job is to generate content based on its interpretation of the request made by the user. It has a huge body of work to pull from, so it ‘knows’ (notice the quotation marks) what a legal brief looks like and will dutifully write one for you.

The algorithm knows, from the content used to train the model, that legal briefs generally include one or more references to other relevant court cases. It knows this because, I expect, it’s seen a lot of legal briefs in its training materials, especially if it’s a model tuned to legal matters. It also knows this because in the body of content used to train the model there are examples of arguments (writers making a point or trying to convince someone of something) and those arguments list examples to help prove the argument.

What’s the algorithm going to do?

Its a next word prediction algorithm, not a research engine, so it ‘knows’ it needs examples and ‘knows’ it doesn’t have any in its ‘memory’. Of course it’s going to make them up.

The algorithm isn’t broken, it’s doing exactly what you want it to do.

Now, if you wire the next word prediction algorithm with a research algorithm, then you can ensure that the references in the generated content are both real and relevant. 

That’s the point I tried to make in Islands of AI Everywhere (/posts/2023/islands-of-ai-everywhere/). Stand-alone algorithms do one task and only one task (likely pretty well). While they appear intelligent, they’re only a highly trained software-based model (an algorithm) doing one thing as best it can. It's not until you wire hundreds, thousands, or millions of models together that you get AI useful for more complicated tasks (like writing legal briefs).

**Note:** My most sincere apologies for all the quotes around so many words in this post. I generally hate it when people do that, especially for commonly used words, but I did it here to highlight that I mean the word, but a different view of what the word means.

## Articles

Here are some links if you haven’t seen the story yet:

* [Here’s What Happens When Your Lawyer Uses ChatGPT](https://www.nytimes.com/2023/05/27/nyregion/avianca-airline-lawsuit-chatgpt.html){target="_blank"}
* [A lawyer used ChatGPT to prepare a court filing. It went horribly awry.](https://www.cbsnews.com/news/lawyer-chatgpt-court-filing-avianca/){target="_blank"}
* [Lawyer apologizes for fake court citations from ChatGPT](https://www.cnn.com/2023/05/27/business/chat-gpt-avianca-mata-lawyers/index.html){target="_blank"}

Photo by <a href="https://unsplash.com/@quinoal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Quino Al</a> on <a href="https://unsplash.com/photos/7agL8aasVzE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"  target="_blank">Unsplash</a>
