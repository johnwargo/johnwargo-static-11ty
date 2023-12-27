---
title: Eleventy File List Plugin
description: Describes an Eleventy plugin I created that enables a site to display a list of downloadable files.
date: 2023-12-27
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

In the Joomla version of this site (the previous version of what you're looking at now) I used a downloads plugin which allowed me to view and manage site downloads from the admin panel. As I migrated to [Eleventy](https://www.11ty.dev/){target="_blank"} I didn't migrate any of the existing downloads.

When I presented at [All Things Open this year](/posts/2023/all-things-open-2023-session/){target="_blank"}, I added a download for the presentation slides to the site. Yes, I know I could host the file elsewhere, but I decided to host it here. As I sat around this week, with family gone and nothing to do, I decided to create a plugin that allowed me to list the downloads available on the site.

To install the plugin, open a terminal window or command prompt, navigate to an Eleventy project folder, and execute the following command:

```shell
npm install eleventy-plugin-file-list
```

Next, in your Eleventy project's `eleventy.config.js` file, import the plugin as shown below:

```js
const fileList = require('eleventy-plugin-file-list.js');
```

To configure the plugin, you provide a folder location (relative to the Eleventy project's root folder)

```js
eleventyConfig.addPlugin(fileList, { targetFolder: 'files' });
```

With that in place, the plugin creates a Eleventy collection called `fileList` you can access from any page in the site.

The collection exposes an array containing the following file properties:

* `name`
* `extension`
* `path`
* `fileSize`: File size in bytes
* `created`: Create date
* `modified`: Modified date

The plugin is available on GitHub at [Eleventy Plugin File List](https://github.com/johnwargo/eleventy-plugin-file-list){target="_blank"} and on npm at [eleventy-plugin-file-list](https://www.npmjs.com/package/eleventy-plugin-file-list){target="_blank"}.
