---
title: Migrating This Site from Joomla To Eleventy
description: Describes the process I used to migrate a 14 year old Joomla site (this one) to Eleventy and the tools I created to simplify the process (that you can use in your Joomla to Eleventy migrations).
date: 2023-05-30
headerImage: /images/headers/header-migration.jpg
headerImageAltText: 
categories:
  - Eleventy
---

Earlier this year, I started playing with the Eleventy (https://www.11ty.dev/) static site generator. I ran this site on Joomla! (https://www.joomla.org/) for many years, and I love it, but they recently released a new update and I simply wasn’t up to doing the version migration. Migrating to a static site generator (SSG) would remove many of the security issues related to running Joomla sites on PHP. 

After playing with Eleventy for a while, I decided I would use it for this site going forward and started planning the migration. This site’s been around since 2009, so I had a lot of content to migrate, and I knew I needed migration tools to make this easier. 

Looking at the tasks I had to complete, the project looked something like this:

1. Build out the Eleventy version of this site (which includes picking out a cool template for the site).
2. Export all of the Article and Category content from the MySQL database running the site.
3. Copy all of the image files from the Joomla site to the Eleventy project.
4. Migrate all of the exported data to Markdown format (what Eleventy uses for post content).
5. Clean up all of the posts.
6. Go live with the new site.
7. Delete the old site.

## Building the Eleventy Version of the Site

Building out the site in Eleventy was easy, I’d just built a couple of sites using Raymond Camden’s [A Guide to Building a Blog in Eleventy](https://www.raymondcamden.com/2022/01/19/a-guide-to-building-a-blog-in-eleventy){target="_blank"}, so I had all the experience I needed with Eleventy. I created a list of features I wanted in the site and built each one out over several weeks.

One of the things I wanted for this site which was easy to do in Joomla but difficult to do in Eleventy is including category pages with pagination. Eleventy easily supports paginating article lists, and it’s also easy to make a categories page in Eleventy (/posts/2023/eleventy-site-categories-page), but Eleventy doesn’t support generating category pages with pagination. To get around this, I built a Node module called [Eleventy Category Pages](https://www.npmjs.com/package/eleventy-category-pages){target="_blank"} which I’ll write about here soon.

For the site template, I decided to use one of the [Pixelarity](https://pixelarity.com/){target="_blank"} templates. It was really easy to apply their templates to Eleventy sites, I’ll write about that here someday too. If you don’t want to pay for a Pixelarity subscription, you can find free versions of many of the Pixelarity templates at [HTML5 Up](https://html5up.net/){target="_blank"}. 

## Exporting Joomla Article and Category Content

In Joomla sites, Joomla links articles and categories using the category ID in the article record. So, in order to export all of the articles along with the category names, I had to export both the Joomla site’s `categories` and `content` tables. 

At the time, I hosted the site at FatCow (https://fatcow.com/) and from the control panel I opened the MySQL database manager, selected my site’s database, then opened the MySQL Admin tool. From there, I selected the `categories` table as shown in the following figure.

{% image "src/images/2023/joomla-migration-01.png", "MySQL Admin Table Columns View", "image-full" %}

Once I had the database table listed, I clicked the Export button at the top of the column list. MySQL Admin opens the export page offering me several options for the table export. In this case, all I needed was a Quick JSON export as shown in the following figure.

{% image "src/images/2023/joomla-migration-02.png", "MySQL Table Export Page", "image-full" %}

This created a `categories.json` file that looked like the following (with many of the categories removed from the example):

```json
[
  {"type":"header","version":"4.8.5","comment":"Export to JSON plugin for PHPMyAdmin"},
  {"type":"database","name":"jmw_cms"},
  {"type":"table","name":"e4hy6_categories","database":"jmw_cms","data": 
    [
      {"id":"1","asset_id":"0","parent_id":"0","lft":"0","rgt":"69","level":"0","path":"","extension":"system","title":"ROOT","alias":"root","note":"","description":"","published":"1","checked_out":"0","checked_out_time":"0000-00-00 00:00:00","access":"1","params":"{}","metadesc":"","metakey":"","metadata":"","created_user_id":"0","created_time":"2009-10-18 16:07:09","modified_user_id":"0","modified_time":"0000-00-00 00:00:00","hits":"0","language":"*","version":"1"},
      {"id":"8","asset_id":"41","parent_id":"18","lft":"20","rgt":"21","level":"2","path":"category-posts\/category-cms","extension":"com_content","title":"Content Management Systems","alias":"category-cms","note":"","description":"<p>I'm interested in many different open source content management systems (CMS), so in this area of the site I'll post articles about particular CMS I'm working with or something related to a specific glitch or feature I've discovered. I'll also try to write about new CMS I've heard of.<\/p>","published":"1","checked_out":"0","checked_out_time":"0000-00-00 00:00:00","access":"1","params":"{\"category_layout\":\"\",\"image\":\"\",\"image_alt\":\"\"}","metadesc":"","metakey":"","metadata":"{\"author\":\"\",\"robots\":\"\"}","created_user_id":"0","created_time":"0000-00-00 00:00:00","modified_user_id":"62","modified_time":"2017-03-08 20:34:03","hits":"0","language":"*","version":"1"},
      {"id":"9","asset_id":"42","parent_id":"18","lft":"28","rgt":"29","level":"2","path":"category-posts\/category-miscellaneous","extension":"com_content","title":"Miscellaneous","alias":"category-miscellaneous","note":"","description":"<p>This area is for posts that just don't fit anywhere else on the site. If I see something interesting, I'll write about it and post it here. <\/p>","published":"1","checked_out":"0","checked_out_time":"0000-00-00 00:00:00","access":"1","params":"{\"category_layout\":\"\",\"image\":\"\"}","metadesc":"","metakey":"","metadata":"{\"author\":\"\",\"robots\":\"\"}","created_user_id":"0","created_time":"0000-00-00 00:00:00","modified_user_id":"62","modified_time":"2013-01-23 18:16:09","hits":"0","language":"*","version":"1"},
    ]
  }
]
```

I repeated the same steps for the `content` table (which contains all of the article content).

## Downloading Joomla Site Images

Downloading the image files was easy too since Joomla sites keep them all in a single folder `/joomla/images`.  I opened an FTP client (I used FileZilla (https://filezilla-project.org/)), connected to the site, and downloaded all of the files in the site’s `images` folder to the Eleventy site’s `src/images` folder.

In both the Joomla and Eleventy versions of this site, I store all of the image files in a separate folder for each year’s content. I didn’t start that process until after I ran the site for a few years on the Joomla side, so I had to do some cleanup to move the downloaded image files into the correct year folder in the Eleventy site.

## Migrating Article Content to Markdown

I knew that converting Joomla article and category data from JSON to markdown was going to be a problem. I expected there might be a tool out there to help me, but I couldn’t find anything, so I had to create my own. I created a Node Module called Joomla to Markdown, you can read all about it inJoomla Article Conversion to Markdown  /posts/2022/joomla-article-conversion-to-markdown/. 

To export the article content, I opened a command prompt (I do most, but not all, of my development on Windows), navigated to the folder where I stored the exported Joomla database table data, and executed the following command:

```shell
j2md export data e4hy6 articles 11ty.md –shortdate
```

Here’s the details on the parameters to the command:

* I exported the database tables to a folder called `data`
* `e4hy6` is the Joomla database prefix for my old site. 
* `articles` is the name of target folder for the generated markdown files
* `11ty.md` is the Eleventy post template for the site
* `--shortDate` tells the command to prefix each article file name with the article year (I’ll explain while I did this later)

The article template looks like this:

{% highlight liquid %}
---
title: {{title}}
description: 
date: {{created}}
headerImage: 
categories: [{{category_title}}]
tags: post
---

{{introtext}}
{% endhighlight %}

When the command runs, it:

1. Validates the parameters
2. Searches for replaceable tokens in the template files (the content in the file between the double braces)
3. Reads all of the categories from the exported `categories` table
4. Reads all of the article content from the exported `content` file 

Once I confirmed everything looked good, I typed `yes` and the migration process began.

{% image "src/images/2023/joomla-migration-03.png", "Joomla to Markdown Configuration Confirmation", "image-full" %}

The module creates a separate file for each article in the `articles` folder.

{% image "src/images/2023/joomla-migration-04.png", "Joomla to Markdown article export completed", "image-full" %}

## Cleaning Up the Data

At the end of the process described in the previous section, the Eleventy project has an `articles` folder that hosts markdown files for each article in the Joomla site. Since I used the `--shortDate` flag in the `j2md` command, each file has its publish year as the beginning of the post file names. For example, if I had a Joomla article called 'this is a test' published in 2017, the migration process generated a file called `2017-this-is-a-test.md`. 

Since my Eleventy site uses a separate folder for each year's posts, the next step is to move the files by year into the appropriate folder. Since each post file name begins with the year, this is really easy to do. Once I copied all of the files, I no longer needed the year at the beginning of the file name. So, at this point I used [Microsoft PowerRename](https://learn.microsoft.com/en-us/windows/powertoys/powerrename){target="_blank"} to remove the year from the file names as shown in the figure below.

{% image "src/images/2023/joomla-migration-05.png", "Microsoft PowerRename in action", "image-full" %}

The data migration process I built isn't perfect. For example, over the years I:

1. Used a lot of different tools in Joomla to edit articles (TinyMCE, JCE, etc.).
2. Used different formats for articles.
3. Didn't assign alt text to images consistently.
4. Used the 'More' link in some longer articles.

So, based on this, I had a lot of work to do to format the posts consistently. I edited each post, cleaning up the text, headings, image tags, and more, until I had everything I wanted. 

The 'more' link caused a problem I didn't expect. I don't know how Joomla references this in post content, I was never able to find it in the data, but the Joomla to Markdown module omits post content after a 'more' link, so about 20 articles were truncated as part of the migration to Eleventy posts. For those, I had to manually copy the additional article content over. 

It wasn't pretty and it wasn't fun, but I finally updated all 400 or so articles and now have the site just like I want it in the Eleventy-based site you're looking at now.

## Going Live

As I mentioned, I hosted the Joomla version of this site was at FatCow; for this new site, I host it at [Netlify](https://www.netlify.com/){target="_blank"} and I'm really happy with the experience. Netlify understands Eleventy projects and it works perfectly for my site's needs. 

Hosting Eleventy sites on Netlify is relatively easy and they have great documentation, so I'm not sure if I need to write anything here about that. Once the site was safely setup on Netlify, I deleted everything from FatCow and moved the domain pointer from FatCow to Netlify.

*** 

Photo by <a href="https://unsplash.com/fr/@ttrapani" target="_blank">Todd Trapani</a> on <a href="https://unsplash.com/photos/hCdMjrL5C0Y" target="_blank">Unsplash</a>
  