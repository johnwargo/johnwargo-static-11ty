---
title: Generating Post Batches in Eleventy
description: This article describes a Node command-line utility I created to generate batches of new posts in an Eleventy site.
date: 2023-05-16
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

As I built the [Eleventy Post Stats](/posts/2023/eleventy-site-statistics) plugin, I realized I needed a bunch of posts (hundreds) distributed over multiple years to test the plugin as I developed it. Also, since I worked on at least two different development systems (Windows and macOS) and I didn't want to store the dummy posts in GitHub, I had to create posts on each system to do my testing. 

Now I could copy over the posts from this site or make a few posts and copy them multiple times, I decided I didn't want to do anything like that. I knew that I'd build other plugins or Eleventy sites and hopefully present at conferences about Eleventy, so I decided to build a post generator that would accept as an input the number of posts and then generate the posts for me. 

I didn't want to have to create a configuration file and post template like I did for my [Eleventy New Post](https://npmjs.com/package/eleventy-new-post){target="_blank"} package, so everything had to work from a simple command-line interface.

Because of the way my Post Stats plugin works, I also needed the posts spread across time to affect the average days between posts calculation the plugin does, so I needed a way to [optionally] give the package a start year for posts and a way to spread posts across a time period.

I use a `post` tag on my posts to tell Eleventy how to display them, so I needed a way to pass that `tags` value.

Finally, since Eleventy sites can have different folder structures, I needed to be able to tell the package where to put the generated post files.

The result of this is my [Eleventy Generate Posts](https://github.com/johnwargo/eleventy-generate-posts){target="_blank"} package available on [npm](https://npmjs.com/package/eleventy-generate-posts){target="_blank"}

Install the package using:

```shell
npm install -g eleventy-generate-posts
```

This adds a `11ty-gp` command to the system.

With that in place, you can generate batches of posts using the following command:

```shell
11ty-gp [options] <numPosts> <targetFolder> <tag> [startYear]
```

Supported command-line options are:

* `numPosts` (required) An integer value representing the number of posts generated.
* `targetFolder` (required) Relative path pointing to the Eleventy project's posts folder; use `.` for the current folder.
* `tag` (required) The post tag applied to the generated posts
* `startYear` (optional) The starting year used for post date in the generated posts. 

So, how does it work?  When you execute the following command:

```shell
11ty-gp 10 posts post
```

the command creates ten posts in the Eleventy project's `posts` folder with the post's front matter `tags` assigned the property `post`. The date for the first post is the current date, then the command works backwards by random days decrementing the date for future posts. 

If you need posts in your site for a particular year, just add the year to the end of the command line like so:

```shell
11ty-gp 20 posts post 2021
```

In this case, the command takes the current date and replaces the year with the provided year and uses that date for the starting point for the generated posts.

For content, the command uses the [Free Random Word Generator API](https://random-word-api.vercel.app/){target="_blank"} to generate post titles using between 3 and 7 random words for each post. Here's some sample posts titles from a run I just did:

* Barista Comfy Evasive Resent Refold Murky
* Drinkable Clavicle Mop Subprime
* Eloquent Anaconda Shorts Trousers Stifle Hertz Outplayed
* Enroll Canola Chewy Librarian
* Hence Stability Astound Vigorous Stimulus Unheated

The command also uses the infamous [Bacon Ipsum Generator](https://baconipsum.com/){target="_blank"} to generate a random number of meat inspired paragraphs. 

You can generate between 1 and 100 posts per command execution; I added the limit because I figured I'd never need more than 100 and I didn't want to bump up against any API calls per minute limits from these free APIs.

Here's an example of the command in action:

<img src="src/images/2023/11ty-generate-post-example.png" alt="Eleventy Generate Posts Command in Action" />

Please let me know what you think of it; I'm unsure whether `tags` is the most flexible way to identify posts.
