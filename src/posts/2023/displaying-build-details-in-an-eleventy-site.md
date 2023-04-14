---
title: Displaying Build Details in an Eleventy Site
description: 
date: 2023-03-15
headerImage: 
categories: [Content Management Systems]
tags: post
---

I recently started using [Eleventy](https://www.11ty.dev/), a node-based static site generator and quickly put up a new site using it. With that under my belt, I migrated my [Random Errors](https://randomerrors.dev/) site from Jekyll to Eleventy pretty quickly. My long term plan is to migrate this site from Joomla to Eleventy as soon as I figure out a couple of extra features I need for this site’s migration.

In the meantime, I will share my learnings along the way.

As I played around with the Random Errors site during the migration, I realized I wanted to be able to show the site’s build date in the footer. Not because it was necessary to do so, but because I wanted to figure out how to do it in Eleventy.

Since Eleventy is a static site generator, you can simply write the current date/time to the appropriate pages at generation time. Using Liquid, this is pretty easy:

`This page was last updated at {{ "now" | date: "%Y-%m-%d %H:%M" }}.`

If you have a large site, and it takes a long time to generate all the pages (more than a minute for example), I imagine you could see different times on different pages because of that processing, but that’s something I didn’t validate. I’m not sure if Eleventy parses templates once then uses a cached version during site generation or whether it parses it every time.

I know that over time I’m going to add new features to the site, updates to the site’s structure or capabilities rather than just publishing new articles, how can I display platform build information on the site?

Since Eleventy is node-based, Eleventy projects have a \`package.json\` file that contains a build number in its \`version\` property. Here’s the file contents from the Random Errors site:

    {
    "name": "random-errors-11ty",
    "version": "0.0.3",
    "description": "",
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "John M. Wargo",
    "repository": {
    "type": "git",
    "url": "https://github.com/johnwargo/random-errors-11ty"
    },
    "license": "MIT",
    "devDependencies": {
    "@11ty/eleventy": "^2.0.0",
    "@11ty/eleventy-plugin-rss": "^1.2.0",
    "@11ty/eleventy-plugin-syntaxhighlight": "^4.2.0"
    },
    "keywords": []
    }

That means I can use the \`version\` property along with the date/time that the version number was updated and display that data as my platform version and timestamp in the site. Let me show you how I did that.

In Eleventy projects, you can create data files in the project’s \`\_data\` folder and the site generator will automatically load the file’s contents as a data set named with the data file’s root file name (the part before the dot and file extension). So, as described in [Global Data Files](https://www.11ty.dev/docs/data-global) in the Eleventy documentation, if I create a JSON file in the \`\_data\` folder with the package version and a date/time stamp, I can automatically access the data as Eleventy generates the static site files.

I could just add a \`buildDate\` property to the site’s \`package.json\` file and copy that file into the \`\_data\` folder every time I generate a new version of the site’s files. But I’m an automation guy, so I knew there had to be a better way.

The npm CLI exposes the \`[npm version](https://docs.npmjs.com/cli/v9/commands/npm-version)\` command that allows you to automatically update the version number in the \`package.json\` file. I can use that to increment the \`version\` property automatically during the build process.

Update the \`scripts\` section of the \`package.json\` file and add a \`build\` section as shown below:

`"build": "npm version patch && eleventy",`

When you’re ready to do a new build of the site, open a terminal window or command prompt and execute the following command:

`npm run build`

At this point, npm updates the version number in the \`package.json\` file (represented by the v0.0.4\` shown in the output below. Next, the Eleventy site generator kicks in and generates the site’s files as shown below (with most of the site’s pages omitted).

`D:\dev\11ty\random-errors>npm run build   > [random-errors-11ty@0.0.3](mailto:random-errors-11ty@0.0.3) build   > npm version patch && eleventy   v0.0.4   [11ty] Writing _site/algolia.json from ./src/algolia.liquid   [11ty] Writing _site/feed.xml from ./src/feed.njk   [11ty] Writing _site/about/index.html from ./src/about.md (liquid)   .   .   .   [11ty] Writing _site/posts/2021/firebase-hosting-google-domains-subdomain/index.html from ./src/posts/2021/firebase-hosting-google-domains-subdomain.md (liquid)   [11ty] Writing _site/posts/2021/firebase-hosting-google-domains/index.html from ./src/posts/2021/firebase-hosting-google-domains.md (liquid)   [11ty] Copied 46 files / Wrote 33 files in 15.34 seconds (464.8ms each, v2.0.0)`

That gets me an updated version number for my site, but doesn’t help me put the data I need (the version number plus the build timestamp) into the site’s \`\_data\` folder.

Since Eleventy is a npm-based static site generator and I like to write node-based command-line utilities, I realized I could build a little utility that took care of building the data file I needed, even copying the file to the \`\_data\` folder in my site.

The utility is called Generate Build Info and you can find it on npm at [https://www.npmjs.com/package/generate-build-info.](https://www.npmjs.com/package/generate-build-info.) What it does is read the \`version\` property of the current project’s \`package.json\` file, then writes a \`buildinfo.json\` file to a folder you specify containing the build details for the project:

    {
    "buildVersion": "0.0.2",
    "buildDateMs": 1678725607879,
    "buildDateStr": "3/13/2023, 12:40:07 PM"
    }

The \`buildVersion\` property is the \`version\` property from the \`package.json\` file, and the \`buildDate\` properties are the current time in two different formats you can use in your Eleventy site: [Milliseconds since Epoch](https://en.wikipedia.org/wiki/Unix_time) or a date/time string.

To use it, open a terminal window or command prompt in your eleventy project’s root folder and execute the following command:

`npm install generate-build-info --save-dev`

This adds the utility to the project’s development dependencies (you don’t need it at runtime); you’ll use \`gen-build-info\` to generate the data file. With that in place, update the \`package.json\` build command like this:

    "scripts": {
    "build": "npm version patch && gen-build-info src/_data && eleventy"
    },

In this example, my \_data folder is in the project’s src folder, so I want the utility to put the data file there. When you execute the \`npm run build\` command again, it updates the project’s npm patch version, generates the \`buildinfo.json\` file and copies it to the \`src/\_data\` folder, then executes an Eleventy site generation. Easy peasy.

In your Eleventy project, Eleventy automatically makes the \`buildinfo.json\` file available to the application as \`buildinfo\`, so referring to the data file and properties is as easy as:

    <p>Version {{ buildinfo.buildVersion }}, Deployed {{ buildinfo.buildDateStr }}</p>

When you look at the site, you’ll see this in the footer of every page:

![](/images/stories/2023/random-errors-footer.png)

I built this with the understanding that I would run this process locally on my development workstation. Once the process updates the package version and writes the JSON file, I can just commit the files to my local repo and synchronize them with the cloud. My hosting site, in this case [Netlify](https://www.netlify.com/) picks up the changes, generates the site (again), and publishes it.

I set it up this way because I don’t want to change the package version when I publish a new post. I only want to update the build information when I make changes to the platform (my Eleventy App), and that means I’m perfectly happy doing this manually when I need it.

What I should do, and I’m going to make that change now, is setup my builds so I have a platform build and a new article build like this:

    "scripts": {
    "pbuild": "npm version patch && gen-build-info src/_data && eleventy",
    "build": "eleventy"
    },

If you wanted to run all of this in the cloud, you could probably do this in GitHub Actions or some other CI/CD process running in the cloud. The issue is that the package version update requires committing the changes it makes to Git, and cloud hosting providers won’t be able to do that without using continuous delivery which understands committing code to a repository. This is not my area of expertise, so I’m going to stop talking now.

Some implementation notes:

*   Your Eleventy project won’t automatically have a data folder, so you must set that up first. Start by adding the folder to wherever you put your Eleventy project source files, then remember to update the project’s \`eleventy.js\` file to copy the data folder to the generated site: eleventyConfig.addPassthroughCopy("src/\_data/\*");
*   If you think you did everything right and your site doesn’t have the \`buildinfo.json\` file, make sure you refer to the previous bullet.