---
title: Eleventy GitHub Repositories Plugin 
description: 
date: 2023-12-27
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

As I wrote in [Adding a GitHub Repository List to an Eleventy Site](/posts/2023/github-repository-list-eleventy/){target="_blank"} and [Adding a GitHub Repository List to an Eleventy Site (part 2)](/posts/2023/github-repository-list-eleventy-2/){target="_blank"}, I've been playing around with generating a GitHub repository list in an Eleventy site. 

Both posts show how to do it with the first post demonstrating how to use unauthenticated access and the second authenticated access to the GitHub `repos` API. Both approaches required modifying the code and what I ultimately wanted was the ability to implement this capability as a plugin and therefore make it more easily configurable. 

I created a plugin, but I just couldn't get it to work and it seemed like Eleventy wasn't allowing me to call asynchronous code from a plugin. Well, it turned out that it was just developer stupidity (me) and after I had some success with the [Eleventy File List Plugin](/posts/2023/eleventy-plugin-file-list/){target="_blank"} I decided to go back and it and I figured it out.

Anyway, I published the plugin today along with a demonstration Eleventy site (I love how easy it is to bundle an Eleventy Plugin and site into the same repository); it's available on GitHub at [Eleventy Plugin GitHub Repositories](https://github.com/johnwargo/eleventy-plugin-github-repos){target="_blank"} and npm at [eleventy-plugin-github-repos](https://www.npmjs.com/package/eleventy-plugin-github-repos){target="_blank"}. I'll add both plugins to the Eleventy Plugin page before the end of the year.
