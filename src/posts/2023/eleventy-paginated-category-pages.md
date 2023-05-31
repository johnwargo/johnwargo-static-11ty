---
tags: post
title: Eleventy Paginated Category Pages
description: Something I wanted to do with this site, but wasn't supported by Eleventy, is generate paginated pages of content for each category. This article explains how I solved this problem and how you can use it for your Eleventy site(s).
date: 2023-05-31
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

One of the features many content management systems (CMS) give users is the ability to generate paginated lists of posts/articles as well as a way to display a paginated list of all posts in a particular category. Static site generators like [Eleventy](https://www.11ty.dev/){target="_blank"} deliver pagination capabilities which allow you to generate pages that break up a list of items into batches on each page. 

Eleventy has a limitation in that you can use its pagination feature to generate a separate page per category (which then lists all posts in the category) or pages which display a paginated list of posts for a particular category, but not both. What I want for this site is for Eleventy to generate separate pages for each category as well as to paginate the posts on each category page, something I call Nested Pagination (or paginated paginating pages). Eleventy can do it, just not automatically.

Earlier this year, I published an article that shows how to generate a simple page of categories for a site: [Eleventy Site Categories Page](/posts/2023/eleventy-site-categories-page/){target="_blank"}, that's not hard. What I'll show in this post is how to link that categories page to a separate set of pages for each category with pagination for the post listing.

To deliver what I want here, I could manually create a separate page for each category using the Eleventy pagination feature to display the posts in batches. Unfortunately, I don't want to do that because that means manually managing the category pages, creating a new one every time I add a new category for the site, and deleting pages when a category goes out of use. 

To solve this problem, I created the *Eleventy Category Pages* preprocessor module (find it on [GitHub](https://github.com/johnwargo/eleventy-category-pages){target="_blank"} and [npm](https://www.npmjs.com/package/eleventy-category-pages){target="_blank"}). You can see it in use in this site at [Categories](/categories){target="_blank"}.

This module essentially does two things:

1. Generates a global data file containing metadata about all the categories used in the site. You'll use the file to generate links to all the category pages in your site.
2. Generates a separate page for each category used in the site with pagination for the posts in the category. These pages display all of the posts for the particular category.

In the rest of the article, I’ll walk through all of this and show you how it all works.

## Installation

The method you use to install the module differs depending on whether you want to run the preprocessor from a command-line or as part of an external build process or whether you want to execute it as part of the Eleventy site build process.

### Global Installation

When you install the module globally, any process on the system can access it, for example if you want to execute it from the command line or as part of an external (to Eleventy) build process. To install the module globally, open a command prompt or terminal window and execute the following command:

```shell
npm install -g eleventy-category-pages
```

This creates a `11ty-cat-pages` command you can execute from anywhere on the system.

### Local Installation

If you want to run the module as part of the Eleventy site generation process, you’ll install the module in the Eleventy project and add module execution to the site’s `package.json` as a build task. To do this, open a terminal window or command prompt, navigate to the eleventy project’s root folder, and execute the following command:

```shell
npm install eleventy-category-pages
```

This creates a `11ty-cat-pages` command you can execute during the Eleventy project build process since commands executed through `npm` now have access to the module. 

To configure your project to execute it every time you build the site, update your Eleventy project’s `package.json` file to add or update the `build` command line this:

```json
"build": "11ty-cat-pages && eleventy"
``` 

The rest of the steps in this article require real time execution of the module.

## Configuration

To make this module as simple as possible to use, I built it so it uses a configuration file instead of command-line options to drive the process. Then, when you’re running it from the command-line, you don’t have to remember any parameters, all you have to do is execute `11ty-cat-pages` and you’re done.

You don’t have to create the configuration file manually, the module does it for you the first time you execute the command. With that in mind, open a terminal window or command prompt and navigate to the Eleventy project folder. Once there, if you installed the module globally, simply execute the following command:

```shell
11ty-cat-pages
```

If you installed it locally, execute the following command instead:

```shell
npx eleventy-category-pages
```

The module will see that there isn’t a configuration file in the current folder and prompt you to create it.

```text
┌───────────────────────────────────────┐
│                                       │
│   Eleventy Category Files Generator   │
│                                       │
└───────────────────────────────────────┘
by John M. Wargo (https://johnwargo.com)
Validating project folder
Locating configuration file

Configuration file '11ty-cat-pages.json' not found
Rather than using a bunch of command-line arguments, this tool uses a configuration file instead.
In the next step, the module will automatically create the configuration file for you.
Once it completes, you can edit the configuration file to change the default values and execute the command again.

? Create configuration file? » (Y/n)
```

Press the `y` key to create the configuration file.

### Configuration File

The generated configuration file is called `11ty-cat-pages.json` and the module places it in the root of the Eleventy project.

When the module creates the configuration file, it scans the project folder to see if it can pre-configure the file for you from the current project’s configuration. The file it generates looks something like this:

```json
{
  "categoriesFolder": "src/categories",
  "dataFileName": "category-meta.json",
  "dataFolder": "src/_data",
  "postsFolder": "src/posts",
  "templateFileName": "11ty-cat-pages.liquid"
}
```

This aligns with the configuration for this site. 

**Note:** The template file, described later, doesn’t exist at this time, so the default file name is used in the generated configuration file.

Here’s what the different configuration file options mean:

* `categoriesFolder`: The target folder for the category pages generated by the module
* `dataFileName`: The category list metadata file created by the module
* `dataFolder`: The location where the module should write the data file (defaults to `scr/_data`)
* `postsFolder`: The location for the project’s Post files.
* `templateFileName`: The file name for the template file used to generate category pages.

You’ll see how this all comes together later, I promise.

### Category Template

For each category the module finds used in your site’s posts, it creates a separate paginated file in the folder specified by the `categoriesFolder` configuration property. This template file should reflect the needs and requirements of your site, because this file will be used by Eleventy to generate paginated pages for each category. 

Create a template file in the project’s root folder, I used `11ty-cat-pages.liquid`for mine so it lists in the folder right next to the configuration file.

For this site, the [template file](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/11ty-cat-pages.liquid){target="_blank"} looks like this:

{% highlight liquid %}
---
layout: generic
pagination:
  data: collections.post
  size: 20
  alias: catposts
category: 
description: 
eleventyComputed:
  title: "Category: {{ category }}"
permalink: "categories/{{ category | slugify }}/{% if pagination.pageNumber != 0 %}page-{{ pagination.pageNumber }}/{% endif %}"
---

{% include 'pagination-count.html' %}

{{ description }}

<p>This page lists all posts in the category, in reverse chronological order.</p>

<ul class="posts">
  {% for post in catposts %}
    <li>
      <h4>
        <a href="{{post.url}}" style="cursor: pointer">{{ post.data.title }}</a>
      </h4>
      Posted {{ post.date | readableDate }}
      {% if post.data.categories.length > 0 %}
        in
        {% for cat in post.data.categories %}
          <a href="/categories/{{ cat | slugify }}">{{ cat }}</a>
          {%- unless forloop.last %},
          {% endunless %}
        {% endfor %}
      {% endif %}
      <br/>
      {% if post.data.description %}
        {{ post.data.description }}
      {% else %}
        {% excerpt post %}
      {% endif %}
    </li>
  {% endfor %}
</ul>

{% include 'pagination-nav.html' %}
{% endhighlight %}

You’ll need to know quite a bit about Eleventy and Liquid to understand this template file, but basically:

1. The template’s front matter contains the standard stuff I use to render paginated pages in my site. 
2. The module populates the front matter’s `category` property when it generates a separate page for each category. You don’t have to have the empty property in your template, I just added it there, I don’t know, because?
3. The module populates the front matter’s description property from the categories metadata file generated by the module, I’ll describe this in the next section.
4. The `pagination`front matter section describes the Eleventy pagination settings for the page. You can change the number of posts per page (it is 20 right now) and the alias defined there is used in the Liquid code on the page to loop through all posts in the category.
5. The liquid code in the template’s body renders a loop of all of the posts (paginated) for the specified category. 

## Usage

With the configuration file and template in place, execute the command to process your site’s posts and generate the metadata file and category pages. If you installed the module globally, execute `11ty-cat-pages`, if you installed it locally, for this first test execute `npx eleventy-category-pages`. When the module runs, it generates the following output in the console:

```shell
┌───────────────────────────────────────┐
│                                       │
│   Eleventy Category Files Generator   │
│                                       │
└───────────────────────────────────────┘

by John M. Wargo (https://johnwargo.com)
Validating project folder
Locating configuration file
Configuration file located, validating
Reading template file 11ty-cat-pages.liquid
Reading existing categories file D:\dev\node\11ty-cat-pages\src\_data\category-meta.json
Building file list...
Located 6 files
Building category list...
Deleting unused categories (from previous runs)
Identified 6 categories
Writing categories list to D:\dev\node\11ty-cat-pages\src\_data\category-meta.json
Writing category page: D:\dev\node\11ty-cat-pages\src\categories\cats.liquid
Writing category page: D:\dev\node\11ty-cat-pages\src\categories\dogs.liquid
Writing category page: D:\dev\node\11ty-cat-pages\src\categories\turtles.liquid
```

When its done, take a look in the project’s `_data` folder (wherever the configuration file’s `dataFolder` property points) and you’ll see a new file called whatever file name you have specified in the configuration file’s `dataFileName` property. In my site, it’s called `category-meta.json`. Based on the output just shown, the file should look like this:

```json
[
  {
    "category": "Cats",
    "count": 1,
    "description": "lorem catsum"
  },
  {
    "category": "Dogs",
    "count": 1,
    "description": ""
  },
  {
    "category": "Turtles",
    "count": 1,
    "description": ""
  }
]
``` 

This is where the fun starts. Do you remember me mentioning that I can display a description on the category pages? Notice the empty `description` property in the JSON object? Open the file in your editor of choice and populate the description with whatever you want, and the next time you execute the `11ty-cat-pages` command, the module will leave existing category data in place (updating the post count, of course), delete any categories that are no longer in use, and adding any categories that you added to the site posts since the last time you ran the command.

Wait, here comes more fun. When you pull a directory listing of the project’s `src/categories` folder (or wherever you have the module configured to store your categories pages), you’ll see new files, one for each category in use in your site:

```shell
c:\dev\mysite\src\categories>ls -l
total 3
-rw-r--r-- 1 john 197609 847 May 30 17:33 cats.liquid
-rw-r--r-- 1 john 197609 845 May 30 17:33 dogs.liquid
-rw-r--r-- 1 john 197609 861 May 30 17:33 turtles.liquid
```

If you open one up, you’ll see something like the following (I picked Dogs because they're my favorite):

{% highlight liquid %}
---js
{
  "layout": "default",
  "pagination": {
    "data": "collections.post",
    "size": 20,
    "alias": "posts",
    "before": function(paginationData, fullData){ let data = paginationData.filter((item) => item.data.categories.includes('Dog')); return Array.from(data).sort((a, b) => { return a.date < b.date ? 1 : -1; });}
  },
  "permalink": "/categories/{{ category | slugify }}/index.html",
  "eleventyComputed": {
    "title": "Category: {{ category }}"
  },
  "category": "Dog",
  "description": "Posts about the greatest animals and friends in the world."
}
---

<header>
  <h2>Category: {{ category }}</h2>
</header>

<p>All posts for a single category, in reverse chronological order.</p>

{% for post in posts reversed %}
  <div>
    <a href="{{post.url}}">{{ post.data.title }}</a>, posted {{ post.date | niceDate }}
    {% excerpt post %}
  </div>
{% endfor %}
{% endhighlight %}

OK, so a lot of things happened here, so let me explain.

First of all, notice that the generated file’s front matter changed from `yml` to `js`; that’s because on order to be able to filter the pages correctly using some JavaScript code, the front matter must be in JavaScript format (for details on this, refer to the Eleventy Pagination’s [`before` documentation](https://www.11ty.dev/docs/pagination/#the-before-callback){target="_blank"}).

The `pagination` section of the front matter now has a new property called `before`; this contains the JavaScript code the page executes to filter out all posts except the ones with the assigned category.

Now, you may be asking yourself “why didn’t he just do this with a custom collection in Eleventy?” I did it this way because I didn’t want to have to rely upon anything else in the Eleventy configuration and, because the module runs as a preprocessor to the Eleventy build, any custom collection I created in Eleventy wouldn’t be available to the module anyway.

The rest of the page is basically the same as it was before, except that the front matter’s `category` and `description` fields now contain the category and description values from the categories metadata file.

## Categories Page

Alright, now how do you get all of these category pages into your site? Well, you can add them all to your site’s menu if you want, but what I did was add a separate [`categories.liquid` file](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/src/categories.liquid){target="_blank"} to my site that looks like this:

{% highlight liquid %}
---
title: Categories
description: Displays a list of all post categories on the site. From here you can click a link to open a page displaying all of the posts for the particular category.
layout: generic
---

{% assign categories = category-meta | sort %}

<p>View all posts for a particular category by clicking on one of the categories listed below. There are {{ categories.length }} categories on the site today.</p>

<ul class="posts">
  {% for catData in categories %}
    <li>
      <h4>
        <a href="{{ "/" | htmlBaseUrl }}categories/{{ catData.category | slugify }}/">{{ catData.category }}</a>
      </h4>
      Count: {{ catData.count }}
      {% if catData.description.length > 0 %}
        |
        {{ catData.description }}
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% endhighlight %}

This page loops through the contents of the `category-meta.json` data file and renders a list of links to each category page.

## Conclusion

Alright, wow, that’s a long article. I tried to explain all of this clearly, I apologize if I missed anything. There’s also a more generic version of this content on the module’s [GitHub page](https://github.com/johnwargo/eleventy-category-pages){target="_blank"}. 

To see all of this in action, just click here: [Categories Page](/categories).

If you have any questions or comments about this post or using the module, you can ask it in [discussions](https://github.com/johnwargo/johnwargo-static-11ty/discussions){target="_blank"}.
