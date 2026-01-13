---
title: Added Eleventy-Fetch to the Site
description: The article discusses how the Eleventy Fetch plugin can be used to
  cache API requests in al 11ty site. By making a few changes
  to the code, the plugin handles data processing automatically. This simplifies the code and
  reduces the need for manual data conversion. Additionally, the plugin supports
  custom headers and options for more complex API calls. Overall, implementing
  the Eleventy Fetch plugin can improve performance and reduce the risk of rate
  limiting when making repeated API requests on a website.
date: 2026-01-13
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Eleventy
timestamp: 2026-01-13T12:13:16.979Z
generatedDescription: true
---

A while back, I found an article from [Raymond Camden](https://www.raymondcamden.com/2025/04/30/a-test-of-eleventy-fetch){target="_blank"} demonstrating how the [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/){target="_blank"} plugin works. 

Several sections of this site make API calls to get the content ([Github Repositories](/sightings/repositories/){target="_blank"}, [npm packages](/sightings/packages/){target="_blank"}, and [Popular Posts](/popular/){target="_blank"}) and I know that when I'm testing something new on the site, repeated requests could get me rate limited. I decided I wanted to use the eleventy-fetch plugin to cache those requests and finally got around to implement it yesterday. 

You won't notice the difference, but I do. Anyway, I made the change and it was really simple.

For example, the site generates the npm packages list using a simple REST API; the code to do this is in the site's [`_data/packageList.js](https://github.com/johnwargo/johnwargo-static-11ty/blob/main/src/_data/packageList.js){target="_blank"} file. Before implementing the eleventy-fetch plugin, the code looked like this:

```js
const author = 'johnwargo';
const exitOnError = true;

function _compareFunction(a, b) {
  if (a.package.name < b.package.name) return -1;
  if (a.package.name > b.package.name) return 1;
  return 0;
}

export default async function () {
  console.log(`[packageList] Fetching npm packages for "${author}"`);  
  try {
    var response = await fetch(`https://registry.npmjs.com/-/v1/search?text=author:${author}`);
    var data = await response.json();
    var packages = data.objects;
    packages.sort(_compareFunction);
    return packages;
  } catch (error) {
    console.error(error);
    if (exitOnError) process.exit(1);
    return [];
  }
}
```

With it, it looks like this:

```js
import Fetch from "@11ty/eleventy-fetch";

const author = 'johnwargo';
const exitOnError = true;

function _compareFunction(a, b) {
  if (a.package.name < b.package.name) return -1;
  if (a.package.name > b.package.name) return 1;
  return 0;
}

export default async function () {
  console.log(`[packageList] Fetching npm packages for "${author}"`);  
  try {
    var data = await Fetch(`https://registry.npmjs.com/-/v1/search?text=author:${author}`, {
      duration: '1d',
      type: 'json'
    });
    var packages = data.objects;
    packages.sort(_compareFunction);
    return packages;
  } catch (error) {
    console.error(error);
    if (exitOnError) process.exit(1);
    return [];
  }
}
```

The new code replaces the call to the JavaScript `fetch` method with a call to the plugin's `Fetch` method (a simple change in capitalization in the method name). 

Next, I had to add a new object to the request that tells `Fetch` how to work:

```js
{
  duration: '1d',
  type: 'json'
}
```

The `duration` property tells the plugin how long to cache the data. 

The `type` property tells the plugin how to pre-process the data returned by the Fetch operation. In this case, since I'm telling it the request returns JSON data, the plugin automatically executes the `data = await response.json();` from the original version for me. I no longer have to worry about converting my data, the plugin takes care of it for me. 

When the Fetch operation completes, `data` contains the JSON array returned by the API.

The plugin supports a [`returnType](https://www.11ty.dev/docs/plugins/fetch/#return-type){target="_blank"} `type` that returns the standard HTTP response object so you can continue to do all your normal processing if you want. I find that letting the plugin handle the JSON data processing is just simpler.

If your remote procedure call requires special headers or additional options, you can add them to the request through the addition of a `fetchOptions` type in the `Fetch` request. 

Here's an example from the [eleventy-plugin-github-repos](https://github.com/johnwargo/eleventy-plugin-github-repos){target="_blank"} plugin:

```ts
var options: any = {};
var requestOptions: any = {};

if (config.apiKey) requestOptions.headers = { 'Authorization': `Bearer ${config.apiKey}` };
options.fetchOptions = { requestOptions };
if (config.cacheRequests) {
  options.duration = config.cacheDuration;
  options.type = "json";
}

var data = await Fetch(repoURL, options);
```
