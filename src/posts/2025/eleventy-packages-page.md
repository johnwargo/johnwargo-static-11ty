---
title: Eleventy Packages Page
description: Describes an Eleventy global data file I created that allows me to easily display a list of my npm packages on this site.
date: 2025-01-03
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - JavaScript  
  - Static Site Generators
timestamp: 2025-01-04T14:07:55.886Z
---

When I migrated this site to [Eleventy (11ty)](https://11ty.dev/){target="_blank"} Eleventy last year, one of the reasons I did it was because I wanted to have more control over how my site worked and what features it had.  The previous site ran on [Joomla!](https://joomla.org/){target="_blank"}, and I didn't have the PHP skills to tweak and tune the behavior of the site. Eleventy, being JavaScript/Node.js-based, allows me complete control over the site's capabilities and I love it. 

A while back, I started thinking about adding a list of all of my published [npm](https://npmjs.com/){target="_blank"} packages. I didn't believe it was critical to list them on the site, but I wanted to figure out how. I created a Eleventy plugin project for this and worked on it for a while, but left it alone for a while. This week I rediscovered the project and started working on it again. 

npm makes it easy to get a package list for a specific publisher (in my case johnwargo) through a public API. As I worked on the plugin, I realized that I didn't need a plugin for this, all I needed was a little bit of JavaScript code.

With that in mind, I scrapped the plugin project and added a file called `packageList.js` to this site's `_data` folder.  The code essentially `fetch`es the package list using npm's REST API and returns the data object. 

```js
/**********************************************************
 * packageList.js
 * 
 * Fetches all packages from the npm registry for a 
 * given author.
 **********************************************************/

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md

const author = 'johnwargo';

function _compareFunction(a, b) {
  if (a.package.name < b.package.name) return -1;
  if (a.package.name > b.package.name) return 1;
  return 0;
}

module.exports = async function () { 
  console.log(`[packageList] Fetching npm packages for "${author}"`);
  try {
    var response = await fetch(`https://registry.npmjs.com/-/v1/search?text=author:${author}`);
    var data = await response.json();
    var packages = data.objects;
    packages.sort(_compareFunction);
    return packages;
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

I also published the code in a [Ghist](https://gist.github.com/johnwargo/6890b6adc8aa4b242052c0e19fc28755){target="_blank"}.

Next, I created a page on the site that renders the package list in a two-column table:

{% highlight liquid %}
---
layout: generic
title: npm Packages
description: Displays a list of all of my published npm packages.
---

<p>As <a href="https://npmjs.com/settings/johnwargo/packages" target="_blank">@johnwargo</a>, I published {{
  packageList.length }} public packages in the <a href="https://npmjs.com/" target="_blank">npm Package Repository</a>.
</p>

{% if packageList.length > 0 %}
<table>
  {% tablerow item in packageList cols:2 %}
    <h4>
      <a href="https://npmjs.com/package/{{ item.package.name }}" target="_blank">{{ item.package.name }}</a>
    </h4>
    {% if item.package.description %}
      <p>{{ item.package.description }}</p>
    {% endif %}
    <p>Version: {{ item.package.version }} | Created: {{ item.package.date | dateOnly }}</p>
  {% endtablerow %}
</table>
{% else %}
  <p>No package data to display.</p>
{% endif %}
{% endhighlight %}

You can see the resulting page here: [Packages](/sightings/packages). Enjoy!
