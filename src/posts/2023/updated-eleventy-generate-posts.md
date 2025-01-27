---
title: Updated Eleventy Generate Posts Utility
description: 
date: 2023-07-01
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
---

When I created the [Eleventy Generate Posts](https://npmjs.com/package/eleventy-generate-posts){target="_blank"} command-line utility, I configured the command to expect all of its configuration parameters on the command-line. I did this thinking it would be simple to use, but weeks later I already forgot which command-line options I needed in what order.

I migrated a couple of Wordpress sites to [Eleventy](https://11ty.dev/){target="_blank"} using the [wordpress-export-to-markdown](https://npmjs.com/package/wordpress-export-to-markdown){target="_blank"} and that utility does an excellent job prompting for all of its configuration options. With that in mind, I decided to do the same thing with my `11ty-gp` utility.

With this version, just published, you can execute the utility using:

```shell
npx eleventy-generate-posts
```

`npm` will pull down the utility and execute, prompting you for the information it needs to execute as shown below:

```text
┌─────────────────────────┐
│                         │
│   11ty Generate Posts   │
│                         │
└─────────────────────────┘
by John M. Wargo (https://johnwargo.com)

√ Target folder for generated posts? ... posts
√ Number of posts to generate? ... 10
√ Post tag? ... post
√ Start year for generated posts? ... 2023
√ Use year folder for posts? ... yes

Settings Summary:
----------------------------------------
Number of posts: 10
Target Folder: posts
Start Year: 2023
Tag: post
Year mode: enabled
Output folder: D:\dev\node\11ty-generate-posts\posts

Generating posts...
----------------------------------------
Writing: D:\dev\node\11ty-generate-posts\posts\2023\navigator-washbasin-dramatize-landside-sensation.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\amusing-peculiar-surgical-borough-impotency-surround-tubular.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\maturely-convene-squishier-verify.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\matchless-overlaid-expend-oxidation-tribesman.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\basis-brunt-swaddling-ladylike-support-epidemic-graded.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\certify-unsheathe-undress-obstacle-tweak-tray-ridden.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\matching-enjoying-contact-atlas.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\android-gecko-penalize-possum.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\contempt-acquire-filtrate-defense-ergonomic-acts.md
Writing: D:\dev\node\11ty-generate-posts\posts\2023\splinter-ecology-computer-nearby-shorts-feminize.md
```

Configuration options are:

* **Posts Folder:** Relative path pointing to the Eleventy project's posts folder; use `.` for the current folder.
* **Number of Posts:** An integer value between 1 and 100 representing the number of posts generated.
* **Post Tag:** The front matter `tag` property applied to the generated posts
* **Start Year:** The starting year used for post date in the generated posts. The command uses the current date or the current date with the specified year (when provided) to for the post date for the first generated post. For subsequent post dates, the command randomly decrements the day.
* **Year Mode:** Specifies whether the module writes generated posts to the Posts folder (`N`) or into a separate folder for each year (`Y`).

Obviously if you generate enough posts to push into the previous year, the posts will save into a folder for the previous year. 

To enable debug mode, pass a `-d` flag on the command-line; in this mode, the module writes additional information to the console as it executes.