# John Wargo (Eleventy)

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c776198-312a-450e-a329-fbb33e7afa79/deploy-status)](https://app.netlify.com/sites/johnwargo/deploys)

The static site generated version of [johnwargo.com](https://johnwargo.com), implemented using [Eleventy](https://www.11ty.dev/) hosted on [GitHub](https://github.com/johnwargo/johnwargo-static-11ty).

## The Site at Launch

![Home Page 20230415](images/image-02.png)

## Previous version

![Home Page](images/image-01.png)

## Resources I Used

The following list is a likely incomplete list of all of the resources I used to migrate this site from Joomla! to Eleventy:

* [Raymond Camden: A Guide to Building a Blog in Eleventy](https://www.raymondcamden.com/2022/01/19/a-guide-to-building-a-blog-in-eleventy)
* [Raymond Camden: Adding Algolia Search to Eleventy and Netlify](https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify)
* [Organizing the Eleventy config file](https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/)
* [target="_blank" links in markdown](https://github.com/11ty/eleventy/issues/2301)
* [HTML Transforms](https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output)
* [Minimizing HTML Output](https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output)
* []()
* []()
* []()

The following lists the tools I created to help me better migrate and manage the site:

* [Joomla! to Markdown](https://www.npmjs.com/package/joomla-to-markdown)
* [Eleventy Category Pages](https://www.npmjs.com/package/eleventy-category-pages)
* [Generate Build Info](https://www.npmjs.com/package/generate-build-info)
* [Eleventy New Post](https://www.npmjs.com/package/eleventy-new-post)
* [Algolia Index Update](https://www.npmjs.com/package/algolia-index-update)
* [YAML Add Property](https://www.npmjs.com/package/yaml-add-property)
* []()
* []()
* []()

## Notes to Self

Site Template: [Pixelarity: Faction](https://pixelarity.com/faction)
FavIcon Generator: [Favicon.ico & App Icon Generator](https://www.favicon-generator.org/)

How to make a markdown link open in a new tab: 

```markdown
[](){target="_blank"}
```

### Links to Book cover images:

![Blackberry Development Fundamentals Cover](/images/covers/bbdf-cover-160.png)
![Apache Cordova API Cookbook Cover](/images/covers/acac-cover-160.png)
![Apache Cordova 4 Programming Cover](/images/covers/ac4p-cover-160.png)
![PhoneGap Essentials Cover](/images/covers/phonegap-essentials-cover-160.png)

### How to hide Liquid from Liquid

Use the following codes to show Liquid template language in a post

```liquid
{% highlight liquid %}

{% endhighlight %}
```