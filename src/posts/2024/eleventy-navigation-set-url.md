---
title: Eleventy Navigation Set URL to First Item in Collection
description: 
date: 2024-03-24
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

I'm building a new web site for a software company I created using [11ty](https://www.11ty.dev/){target="_blank"}, and one of the things I want to do in this site is have the Products menu item open the product page for the first product in a sorted list of product pages. 

## Hard-coding a Navigation Menu URL

The site uses the [Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/){target="_blank"} plugin, and as a potential solution for this. The plugin offers the ability to [override the url](https://www.11ty.dev/docs/plugins/navigation/#overriding-the-url){target="_blank"} for a specific menu item. 

The way this works is you make a page on the site for the menu item and set the front matter's `url` property to the URL you want opened when a site visitor clicks the menu item. The URL can point to a local page or an external page, the plugin doesn't care as it's just a URL. Here's an example of this in action:

{% highlight liquid %}
---
title: Products
description: This page lists all of the software products we produce.
layout: product
eleventyNavigation:
  key: Products
  order: 3
  url: https://fumblydiddle.com/products/pathbackup/
permalink: false
---

Update this page with an updated `url` property if you add another product that starts with an earlier letter.

This page doesn't render in the `_site` folder.
{% endhighlight %}

That example was taken from the site's **Products** page and its important to note that all this page does is populate the Navigation plugin's data about the site's menu structure, this page doesn't generate an HTML file in the project's `_site` folder. Eleventy reads the file, adds the Key, Order and URL to the site's navigation data set, then throws the file away.

This solution definitely works for my use case, but not the way I want it to. It works as long as I remember to change the product URL when I add a new product with a name that starts earlier in alphabetical order than the one I have hard-coded now. If I don't remember to do this, and I promise that I won't, then site visitors may be confused when the site's Products menu takes them to the middle product in the product list. 

No, what I want here is a menu item link that calculates the URL for the first product in the site's product collection.

## Calculating the Menu URL

In this site, I tag each product with `product`, so Eleventy builds a product page collection for me I can access as `collections.product`. I know this works, because that is how I build the product list in the Products page sidebar:

{% highlight liquid %}
<h3>All Products</h3>
{%- if products.length > 0 %}
<ul class="alt">
  {%- for product in collections.product %}
  <li>
    <h4><a style="cursor: pointer" href="{{product.url}}">{{ product.data.title }}</a></h4>
  </li>
  {%- endfor %}
</ul>
{% endhighlight %}

What I couldn't figure out was how to calculate the URL on the Products page. I knew I could use `eleventyComputed` to calculate it, but I didn't know how to access collections there. I reached out on the [Eleventy Discord](https://discord.com/channels/741017160297611315/1210750763685511168){target="_blank"} and asked for help with this; with the help of some others, like [Shiv Jha-Mathur (Aankhen))](https://github.com/shivjm/){target="_blank"} and [Bob Monsour](https://mastodon.social/@bobmonsour@indieweb.social){target="_blank"}, we got it working.

The solution is to add data a file called `products.11tydata.js` to the project alongside the `products.liquid` file. With that file in place, I can calculate the URL there using JavaScript. 

The first thing I did was remove the `url` property from the Products page:

{% highlight liquid %}
---
title: Products
description: This page lists all of the software products we produce. We only have one right now, so the list is a little light.
layout: product
eleventyNavigation:
  key: Products
  order: 3
permalink: false
---

Update this page with an updated `url` property if you add another product that starts with an earlier letter.

This page doesn't render in the `_site` folder.
{% endhighlight %}

Next, in the `products.11tydata.js` file, with Aankhen's help, I create an `eleventyCompted` property that calculates the `url` like this:

```js
module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      url: (data) => {
        const productCollection = data.collections.product;
        return productCollection[0].page.url;
      },
    }
  }
};
```

Now, before you run off and use this code in your project, note that it doesn't work for a couple of reasons. 

First of all, Eleventy sorts the product list by date, so that solution always pull the first product I created rather than the first product in alphabetical order. What I need is a sorted list, so I created a sorted collection in the project's `eleventy.config.js` file like this:

```js
eleventyConfig.addCollection('productList', function (collection) {
  return collection.getFilteredByGlob("src/products/**/*.md")
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
});
```

I could do that work in the `products.11tydata.js` file, but since I know I need to list the product in order on the Products page sidebar, doing it there allows me to use the same ordered list twice in the site.

The other reason the `eleventyComputed` approach above doesn't work, and I have to admit that I really don't understand it, is that (from the Discord conversation):

> It runs with placeholder values the first time so Eleventy can figure out the dependencies between different things and catch any loops. So you have to allow for that possibility in your code.

Bob Monsour came up with the solution, it looks something like this (slightly modified by me, but you can see the original on Discord):

```js
module.exports = {
  eleventyComputed: {
    eleventyNavigation: {
      url: (data) => {
        const productCollection = data.collections.productList;
        if (productCollection.length > 0) {
          return productCollection[0].page.url;
        }
      },
    }
  }
};
```

Since the code executes twice, it has to catch when it actually has a value to return then only return it then. Weird, I know, I'm still scratching my head on that one. 

The first time the code runs, `productCollection` is empty, the second time it's not. In the early version of the code, I imagine what happened was that the code dutifully returned `undefined` where in the later version it rightfully returns the sorted product collection as expected. 

Whew, what an interesting solution and I learned a few things doing this. I especially love how the community helped me figure this out.

## Alternate Solution

In the solution above, the code checks to see if `productCollection` contains any values. That certainly works, but another possible solution is to check to see if `productCollection` is not `undefined`.
