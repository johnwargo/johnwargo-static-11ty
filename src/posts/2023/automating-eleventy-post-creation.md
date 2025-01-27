---
title: Automating Eleventy Post Creation
description: Describes a utility I created to automate creating a new post in an Eleventy site.
date: 2023-05-11
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

I really prefer writing blog posts here using Markdown instead of the CMS-based tooling of my old site. Its faster, easier to highlight code segments, and I can use whatever tooling I want.

Not having a CMS underneath the site, it’s not just a click of a button to create a new post. I basically have to copy an existing post, then update the post’s front matter to reflect the current date, title, and categories. I could keep an empty post lying around in the site’s root folder and copy that file to eliminate some of the steps (replacing front matter content and post content) but I’m still copying and pasting.

Since I plan to do a lot of writing here this year and beyond, I started looking for a way to automate the process. I wanted a process where the only typing I had to do was entering new information in the post, not replacing existing stuff.

Since Eleventy is node-based and I love working in JavaScript and writing node-based command-line utilities, I (surprise!) decided to build a node package/command for this.

The package is called Eleventy New Post and you can find the source on [Github](https://github.com/johnwargo/eleventy-new-post){target="_blank"} and [npm](https://npmjs.com){target="_blank"}.

To install the command, open a terminal window or command prompt and execute the following command:

```shell
npm install -g eleventy-new-post
```

When you're done, you have a new command called `11ty-np` you can use to quickly and easily add a new post to your Eleventy site.

After you install it, execute the command to initialize the environment to use the command. 

```shell
11ty-np
```

To avoid command line options I'd never remember the order of, the command creates a configuration file that contains all the required settings for the command:

```text
D:\dev\11ty\johnwargo>11ty-np
┌───────────────────┐
│                   │
│   11ty New Post   │
│                   │
└───────────────────┘

by John M. Wargo (https://johnwargo.com)

Configuration file '11ty-np.json' not found
Rather than using a bunch of command-line arguments, this tool uses a configuration file instead.
In the next step, the module will automatically create the configuration file for you.
Once it completes, you can edit the configuration file to change the default values and execute the command again.

? Create configuration file? » (Y/n)
Writing configuration file 11ty-np.json
Output file written successfully

Edit the configuration with the correct values for this project then execute the command again.
```

When its done, you'll have a new file in your Eleventy project's root called `11ty-np.json`:

```json
{
  "postsFolder": "src/posts",
  "templateFile": "11ty-np.md",
  "useYear": false,
  "paragraphCount": 4
}
```

Hopefully the configuration options are self-explanatory, but I'll help you out anyway.

Use the `postsFolder` to define the relative path to the folder in your Eleventy project where you store your post files. The command checks what I think are the standard places for posts, so you should see this configuration option already populated for you.

The command uses a template file as the template for every post file it creates. Take one of of the posts from  your site, remove the title, date, and categories properties from the file's front matter plus the post content from the file and save it to the project root folder. Next, populate the `templateFile` configuration value with the file name for the template.

Some Eleventy project stores posts in a separate folder per year (this site does). When you set this value to `true`, the command places the new post in a sub-folder of the `postsFolder` for the current year. When `false`, the command puts all posts in the `postsFolder` folder.

The command supports a command-line flag that enables population of the new post body with dummy content generated using the popular [Bacon Ipsum](https://baconipsum.com/){target="_blank"} generator. The `paragraphCount` configuration option defines the number of content paragraphs generated with this option enabled.

This site's template file is called, unsurprisingly, [`11ty-np.md`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/11ty-np.md){target="_blank"} and it looks like this:

```markdown
---
tags: post
title: 
description: 
date: 
headerImage: 
categories: []
---

```

Put as much or as little content in the file as you need to create posts that work for your site's configuration.

With all that stuff in place, execute the `11ty-np` command with no command line options. The first thing that happens is that you're prompted to enter the title for the post:

```text
D:\dev\11ty\johnwargo>11ty-np
┌───────────────────┐
│                   │
│   11ty New Post   │
│                   │
└───────────────────┘

by John M. Wargo (https://johnwargo.com)

? Enter a title for the post: » Automating Eleventy Post Creation
```

Next, the command reads all the posts for your site and builds a list of all the categories in use in the site. With that list ready, it prompts you to select one category to use for this post:

```text
D:\dev\11ty\johnwargo>11ty-np
┌───────────────────┐
│                   │
│   11ty New Post   │
│                   │
└───────────────────┘

by John M. Wargo (https://johnwargo.com)

√ Enter a title for the post: ... Automating Eleventy Post Creation
? Select an article category from the list: » - Use arrow-keys. Return to submit.
>   BlackBerry
    Content Management Systems
    Eleventy
    Guests
    IBM Lotus Domino
    Internet of Things (IoT)
    Miscellaneous
    Mobile
    Mobile Development
  ↓ Static Site Generators
```

It only supports selection of a single category, but you can add more categories when you edit the post to add your content. If you don't want to assign a category to the post, select the 'Uncategorized' option in the list and the command will leave Category blank in the new post.

At this point, you're done - the command generates the post, writes it to disk (in the posts folder or a separate subdirectory for the current year) and you're all set.

```text
D:\dev\11ty\johnwargo>11ty-np
┌───────────────────┐
│                   │
│   11ty New Post   │
│                   │
└───────────────────┘

by John M. Wargo (https://johnwargo.com)

√ Enter a title for the post: ... Automating Eleventy Post Creation
√ Select an article category from the list: » Eleventy

Writing content to D:\dev\11ty\johnwargo\src\posts\2023\automating-eleventy-post-creation.md

D:\dev\11ty\johnwargo>
```

If you want to see more stuff in the terminal as the command executes, add the `-d` flag to the command-line. 

To generate bacon ipsum text for the generated post, add the `-p` flag to the command-line.
