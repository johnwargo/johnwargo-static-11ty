---
title: Batching YAML Front Matter Updates
description: This article describes a command-line utility I created to do batch add/update to YAML front matter of all of the markdown files in a folder. This is especially helpful when working with static site generators (SSG).
date: 2023-07-10
headerImage: 
headerImageAltText: 
categories:
  - Developer Tools
  - Eleventy
---

When I migrated this site from Joomla! to Eleventy, I realized about halfway through the process (after migrating 400 or so articles to .md files) that I wanted to include a `description` property in articles through YAML front matter properties. This description value became the description for the article in site list views and I also use it to set the `description` meta tag in the page's HTML Head.

For example, here's the front matter for this post:

```yml
---
title: Batching YAML Front Matter Updates
description: This article describes a command-line utility I created to do batch add/update to YAML front matter of all of the markdown files in a folder. This is especially helpful when working with static site generators (SSG).
date: 2023-07-10
showCoffee: 
headerImage: 
headerImageAltText: 
categories:
  - Developer Tools
  - Eleventy
---
```

Here's the description on the home page:

{% image "src/images/2023/yaml-home-page.png", "This article on the home page", "image-full" %}

And here's the `description` meta tag:

```html
<head>
    <title>John M. Wargo: Batching YAML Front Matter Updates</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <meta name="generator" content="@11ty/eleventy v2.0.1" />
    <meta name="author" content="John M. Wargo">    
    <meta name="description" content="This article describes a command-line utility I created to do batch add/update to YAML front matter of all of the markdown files in a folder. This is especially helpful when working with static site generators (SSG)." />
    <meta name="keywords" content="Developer Tools, Eleventy">    
    <link rel="manifest" href="/manifest.json">
    <link rel="stylesheet" href="/assets/css/main.css" />    
</head>
```

So, now that you know why I wanted to add the `description` property to all of my site's articles, the question is how to add it to every article. 

Now, I knew I'd have to write the description for each article, but that generally means copying the first paragraph from the article and editing it. What I needed was a simple way to add the property to the front matter, then I can go back in and start copying the content in. For other use cases, I could add a property and value at the same time, even overriding existing values in the process.

I decided to build a command-line utility to do it for me. The utility I created is called [YAML Add Property](https://github.com/johnwargo/yaml-add-property){target="_blank"} and you can find it on [npm](https://npmjs.com/package/yaml-add-property){target="_blank"}.

You can use it to:

* Add empty properties to YAML front matter
* Add properties and values to YAML front matter
* Update existing front matter property values.

To execute the utility, open a terminal window or command prompt, navigate to the Eleventy project folder (it doesn't have to be an Eleventy project), and execute the following command:

```shell
npx yaml-add-property
```

The module will prompt you for the operational parameters to use while executing:

| Prompt                 | Input  | Description                                                              |
| ---------------------- | ------ | ------------------------------------------------------------------------ | 
| **Source folder**      | String | The folder name, relative to the execution folder, for the source files. |
| **Property name**      | String | The property name added to the YAML front matter.                        |
| **Property value**     | String | The value assigned to the property added to the front matter. When omitted, defaults to a blank string (`''`) |
| **Override existing**  | Yes/No | Controls whether the package overrides the property value if the file already has the property in its front matter. |
| **Process subfolders** | Yes/No | Controls whether the package recurses through sub folders when building the file list |

To display additional information in the console during execution, enable debug mode by adding a `-d` to the command line.

When the command executes, it will update the console as shown in the following figure:

{% image "src/images/2023/yaml-add-property-terminal.png", "an image of the command running in the terminal", "image-full" %}

I hope you find this utility helpful. 