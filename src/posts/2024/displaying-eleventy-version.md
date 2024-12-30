---
title: Displaying Eleventy Version On A Page
description: Describes how I display Eleventy build information on this site and how I had to change the process for Eleventy 3.0.
date: 2024-12-29
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
  - Content Management Systems
  - Web Development
timestamp: 2024-12-29T16:25:44.548Z
---

A while back, I added the Eleventy build details to the footer of this site; here's what it looks like today:

{% image "src/images/2024/jmw-site-footer.png", "A screenshot of this site's footer", "image-full" %}

Doing this was pretty easy. First, I added a data file to the site, creating a file called `eleventyinfo.js` in the site's `_data` folder (`_data/eleventyinfo.js`) with the following code:

```js
'use strict'

const eleventyPackage = require('@11ty/eleventy/package.json')

module.exports = function () {
  return { generatorStr: `${eleventyPackage.name} v${eleventyPackage.version}` }
}
```

The code loads the Eleventy `package.json` file as an object using [`require()`](https://nodejs.org/api/modules.html#requireid){target="_blank"}, then returns an object with a string representing the package name and package version. 

With that in place, any page in the site can display the `generatorStr` value using `eleventyinfo.generatorStr`. So, in the site's footer is the code that displays the value shown in the image above.

{% highlight liquid %}
 <footer id="footer">
  <div class="copyright">
    &copy; John M. Wargo; All rights reserved | Powered by <a href="https://www.11ty.dev/" target="_blank">{{ eleventyinfo.generatorStr }}</a> | Template by <a href="https://pixelarity.com/" target="_blank">Pixelarity (Faction)</a>
  </div>
</footer>
{% endhighlight %}

This worked very well for a long time, but when I started playing around with Eleventy 3, the code broke. On an Eleventy 3.x site, building the site with that code in place generates the following error:

```text
[11ty] Problem writing Eleventy templates:
[11ty] Package subpath './package.json' is not defined by "exports" in D:\dev\11ty\site-name\node_modules\@11ty\eleventy\package.json
[11ty]
[11ty] Original error stack trace: Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './package.json' is not defined by "exports" in D:\dev\11ty\site-name\node_modules\@11ty\eleventy\package.json
[11ty]     at exportsNotFound (node:internal/modules/esm/resolve:314:10)
[11ty]     at packageExportsResolve (node:internal/modules/esm/resolve:662:9)
[11ty]     at resolveExports (node:internal/modules/cjs/loader:640:36)
[11ty]     at Function._findPath (node:internal/modules/cjs/loader:748:31)
[11ty]     at Function._resolveFilename (node:internal/modules/cjs/loader:1235:27)
[11ty]     at Function._load (node:internal/modules/cjs/loader:1075:27)
[11ty]     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
[11ty]     at wrapModuleLoad (node:internal/modules/cjs/loader:219:24)
[11ty]     at Module.require (node:internal/modules/cjs/loader:1340:12)
[11ty]     at require (node:internal/modules/helpers:138:16)
[11ty] Wrote 0 files in 0.21 seconds (v3.0.0)
ERROR: "build:eleventy" exited with 1.
```

A quick online [search](https://www.google.com/search?q=eleventy+%22Package+subpath+%27.%2Fpackage.json%27+is+not+defined+by+%22exports%22%22&oq=eleventy+%22Package+subpath+%27.%2Fpackage.json%27+is+not+defined+by+%22exports%22%22&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgcIARAhGI8CMgcIAhAhGI8C0gEIMzE1OWowajmoAgCwAgE&sourceid=chrome&ie=UTF-8){target="_blank"} took me to the following Google AI generated message:

> The error message "Package subpath './package.json' is not defined by 'exports'" in Eleventy means that you're trying to import a file directly from your project's package.json file, but your package.json file is configured to only export specific modules through the "exports" field, and the root directory (where package.json resides) is not explicitly included in those exports

I'm not an expert, but I generally understand what the error is telling me and since I won't be able to modify the source package file, I had to look for other solutions.

## Fix for Eleventy 3

I didn't spend a lot of time researching the best solution, I just leveraged my existing JavaScript capabilities and came up with this, changing the name of the file from `eleventyinfo.js` to `eleventyinfo.mjs`:

```js
import fs from 'fs';

export default function () {
  const packageJson = JSON.parse(fs.readFileSync('./node_modules/@11ty/eleventy/package.json', 'utf8'));
  return { generatorStr: `${packageJson.name} v${packageJson.version}` }
}
```

Instead of loading the package through `require`, the code just reads the `package.json` file directly from the Eleventy package folder `./node_modules/@11ty/eleventy/package.json` then uses `JSON.parse` method to convert it to a JavaScript object.

That's it, it works great. Its a hack and I'm not that proud of it, but it works. 

## Alternative Option

My existing approach return a string, and that supports my use case very well. If I needed the package properties as separate values, I could use:

```js
import fs from 'fs';

export default function () {
  const packageJson = JSON.parse(fs.readFileSync('./node_modules/@11ty/eleventy/package.json', 'utf8'));
  return { 
    packageName: packageJson.name, 
    packageVersion: packageJson.version 
  }
}
```

Then, in the site content, reference the individual properties like this:

{% highlight liquid %}
<p class="copyright">Powered by <a href="https://www.11ty.dev/" target="_blank" >{{ eleventyinfo.packageName}} {{eleventyinfo.packageVersion}}</a>.</p>
{% endhighlight %}
