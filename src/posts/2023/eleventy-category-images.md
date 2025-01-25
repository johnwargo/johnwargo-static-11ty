---
title: Eleventy Category Images
description: Describes a solution I implemented in this site to add Category-specific header images to posts. I modified my eleventy-generate-category-pages module to generate additional properties for the header images and some shortcodes to add the image and attribution to the site's pages.
date: 2023-08-04
headerImage: 
headerImageAltText: 
categories:
  - Eleventy
  - JavaScript  
  - Static Site Generators
---

When I built this site, one of the features I wanted in the site was displaying a custom header image based on the category in a post or one of the Category pages. I had a lot of different ideas how to do this, but I wanted to make sure that the solution I picked was easy to manage and added the smallest amount of overhead to the site.

In my [A World Without Apps](https://aworldwithoutapps.com){target="_blank"} site, I decided to grab the header image file from a folder based on the first category name:

{% highlight liquid %}
<section class="wrapper style1">
  <div class="container">
    {% if page.url != '/' %}
      {% if headerImage %}
        <span class="image featured"><img src="{{ headerImage }}" alt="{{ headerImageAltText }}" /></span>
      {% else %}
        {% if categories.length > 0 %}
          <span class="image featured"><img src="/images/headers/category-{{ categories[0] | slugify }}.jpg" alt="{{ categories[0] }} image" /></span>
        {% endif %}
      {% endif %}
      {% if title %}
        <h2>{{ title }}</h2>
      {% endif %}
    {% endif %}
    {{ content }}
  </div>
</section>
{% endhighlight %}

That worked really well, and was easy to setup, but the alternative text was a little lame, simply using the category name plus the word 'image'. The images I used are from [Unsplash](https://unsplash.com){target="_blank"}, so I needed a way to display an image attribution at the bottom of the page, but the approach I took was really ugly as shown below:

{% highlight liquid %}
{% if headerImage.length < 1 %}
  {% if categories.length > 0 %}
    {% case categories[0] %}
      {% when "Artificial Intelligence" %}
        <p>Photo by <a href="https://unsplash.com/fr/@markuswinkler" target="_blank">Markus Winkler</a> on <a href="https://unsplash.com/photos/tGBXiHcPKrM" target="_blank">Unsplash</a></p>  
      {% when "Natural Language Processing" %}
        <p>Photo by <a href="https://unsplash.com/@glencarrie" target="_blank">Glen Carrie</a> on <a href="https://unsplash.com/photos/oHoBIbDj7lo" target="_blank">Unsplash</a>
        </p>
      {% when "Miscellaneous" %}
        <p>Photo by <a href="https://unsplash.com/@elsbethcat" target="_blank">Beth Macdonald</a> on <a href="https://unsplash.com/photos/a1O67ZQmaYc" target="_blank">Unsplash</a>
        </p>
      {% when "Developer Tools" %}
        <p>
          Photo by <a href="https://unsplash.com/pt-br/@ilyapavlov" target="_blank">Ilya Pavlov</a> on <a href="https://unsplash.com/photos/OqtafYT5kTw" target="_blank">Unsplash</a>
        </p>
      {% else %}
        <p>No image credit (this should never happen)</p>
    {% endcase %}
  {% endif %}
{% endif %}
{% endhighlight %}

I'm embarrassed of that solution; as I add categories to the site, it simply becomes much more difficult to manage.

What I really need is a data source I can use to manage the category image file path, alt text, and attribution; something like this:

```json
[  
  {
    "category": "Content Management Systems",
    "imageFilePath": "/images/headers/alvaro-reyes-qWwpHwip31M-unsplash-cropped.jpg",
    "imageAltText": "An image of a board with content blocks pinned to it",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@alvarordesign\" target=\"_blank\">Alvaro Reyes</a> on <a href=\"https://unsplash.com/photos/qWwpHwip31M\" target=\"_blank\">Unsplash</a>."
  },
  {
    "category": "Developer Tools",
    "imageFilePath": "/images/headers/ashim-d-silva-Kw_zQBAChws-unsplash-cropped.jpg",
    "imageAltText": "An image of some tools",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@randomlies\" target=\"_blank\">Ashim D’Silva</a> on <a href=\"https://unsplash.com/photos/Kw_zQBAChws\" target=\"_blank\">Unsplash</a>."
  },
  {
    "category": "Eleventy",
    "imageFilePath": "/images/headers/11ty.png",
    "imageAltText": "Eleventy project logo",
    "imageAttribution": "Eleventy Project Home Page."
  },
  {
    "category": "Events",
    "imageFilePath": "/images/headers/jakob-dalbjorn-cuKJre3nyYc-unsplash-cropped.jpg",
    "imageAltText": "",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@jakobdalbjorn\" target=\"_blank\">Jakob Dalbjörn</a> on <a href=\"https://unsplash.com/photos/cuKJre3nyYc\" target=\"_blank\">Unsplash</a>."
  }
]
```

Due to Eleventy's excellent data management system, I could create and maintain that file, then pull in the different properties when rendering a page during the build process. 

I'm lazy, so I don't want to create and maintain that page. Fortunately, a while back I created the [eleventy-generate-category-pages](https://github.com/johnwargo/eleventy-generate-category-pages){target="_blank"} module that creates and maintains a category data file in my Eleventy site automatically (during the build process). Here's the [`categoryData.json`](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/src/_data/categoryData.json){target="_blank"} file from this site. All I had to do was add the header image properties to the data file and I'd have a permanent place for my category image file properties.

To accommodate this, I added a new configuration option for the category pages module called `imageProperties` and it adds the `imageFilePath`, `imageAltText`, and `imageAttribution` properties to the category data file automatically. To enable the option, just add the `imageProperties` option and set it to `true` when loading the module in the site's `eleventy.config.js` file:

```js
var firstRun = true;
eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
  if (firstRun) {
    firstRun = false;
    generateCategoryPages({
      dataFileName: categoryDataFile,
      imageProperties: true,
      quitOnError: true,
      debugMode: false
    });
  }
});
```

With that in place, the category data file now looks like this (with most of the categories removed):

```json
[ 
  {
    "category": "Content Management Systems",
    "count": 16,
    "description": "Articles related to my usage and experimentation with Content Management Systems (CMS).",
    "imageFilePath": "/images/headers/alvaro-reyes-qWwpHwip31M-unsplash-cropped.jpg",
    "imageAltText": "An image of a board with content blocks pinned to it",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@alvarordesign\" target=\"_blank\">Alvaro Reyes</a> on <a href=\"https://unsplash.com/photos/qWwpHwip31M\" target=\"_blank\">Unsplash</a>."
  },
  {
    "category": "Developer Tools",
    "count": 4,
    "description": "Articles related to developer tools; ones I use or ones I'm evaluating.",
    "imageFilePath": "/images/headers/ashim-d-silva-Kw_zQBAChws-unsplash-cropped.jpg",
    "imageAltText": "An image of some tools",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@randomlies\" target=\"_blank\">Ashim D’Silva</a> on <a href=\"https://unsplash.com/photos/Kw_zQBAChws\" target=\"_blank\">Unsplash</a>."
  },
  {
    "category": "Eleventy",
    "count": 21,
    "description": "Articles related to the Eleventy Static Site Generator",
    "imageFilePath": "/images/headers/11ty.png",
    "imageAltText": "Eleventy project logo",
    "imageAttribution": "Eleventy Project Home Page."
  },
  {
    "category": "Events",
    "count": 1,
    "description": "Articles about events I'm attending, have a speaking slot, or otherwise involved with.",
    "imageFilePath": "/images/headers/jakob-dalbjorn-cuKJre3nyYc-unsplash-cropped.jpg",
    "imageAltText": "An image of a crowd of people at an event",
    "imageAttribution": "Photo by <a href=\"https://unsplash.com/@jakobdalbjorn\" target=\"_blank\">Jakob Dalbjörn</a> on <a href=\"https://unsplash.com/photos/cuKJre3nyYc\" target=\"_blank\">Unsplash</a>."
  }
]
```

That makes this whole process really easy for me as the module adds new category objects to the file when I add a new category to the site. If I edit posts and remove references to the category, it automatically removes the category object from the data file.

Now, all I have to do is use the data file to add the necessary `img` tag and attribution to the site. To do this, I added two custom shortcodes to the site: `CategoryImage` and `CategoryAttribution`. You can see them in use in the following code. My site lets me set a header image per post, so the code tries to load that image first, but if there isn't one, it grabs the first image and alt text it can find for the list of categories assigned to the post; I'll show you that code in a minute.

{% highlight liquid %}
<section class="main">
<section>
  <header>
    {% if headerImage %}
      <span class="image fit"><img
          src="{{ headerImage }}"
          alt="{{ headerImageAltText }}"
          class="image fit" /></span>
    {% else %}
      {% if categories %}
        {% CategoryImage categories %}
      {% endif %}
    {% endif %}
    <h2>
      {{ title }}
    </h2>
  </header>
  {{ content }}
  {% if headerImageAttribution %}
    {{ headerImageAttribution }}
  {% else %}
    {% CategoryImageAttribution categories %}
  {% endif %}
</section>
</section>
{% endhighlight %}

After the post content, the code pulls in the header image attribution (if there is one assigned) otherwise it pulls in the attribution from the category data file using the same algorithm from the header image described above: it loops through all of the categories assigned to the post and grabs the image attributes from the first category entry that has them.

You can find all the code for the two shortcodes in [eleventy.config.headerimage.js](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/eleventy.config.headerimage.js){target="_blank"}. You can use this as a template for your site, replacing my code that generates `img` and `p` tags with whatever code is appropriate for your site's configuration, layout and styling. 

I kept all of the code in a separate file so I can reuse it for other [sites](http://localhost:8888/sites/){target="_blank"} I maintain. Notice that when I load the module, I pass in the name of the category data file (it could be different depending on the site) as well as the style to apply to the generated image tag (which will vary depending on the site).

```js
const pluginImageHeaders = require("./eleventy.config.headerimage.js");
const categoryDataFile = 'categoryData.json';

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(pluginImageHeaders, {
		dataFileName: categoryDataFile,
		imageClass: 'image fit'
	});

};
```

It was a lot of fun to put together this solution, I hope you find this useful and can use it for your sites. I'm trying to decide if I should make this more flexible by passing in the template strings to use for the `img` and `p` tags, that wouldn't be hard to do and would make it easier to copy the code from project to project without modifying the source. I may make that change and add the `eleventy.config.headerimage.js` image file to the module in a future release. Let me know your vote on this.
