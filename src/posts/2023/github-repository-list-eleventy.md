---
title: Adding a GitHub Repository List to an Eleventy Site
description: I decided to add a list of GitHub repositories to this site; not because the site needs it, but because I wanted to learn how to do it. I built a quick and easy approach (with limitations) and this post describes how I did it.
date: 2023-12-22
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

While working out at the gym the other day, I decided to add a list of all of my public GitHub repositories to this site; not because the site needs it, but because I wanted to learn how to do it. 

I quickly found a really easy way to do it, GitHub has a REST API I can access directly (without having to provide any authentication or API key) by invoking this URL: [https://api.github.com/users/<<github-user-account>>/repos](https://api.github.com/users/johnwargo/repos){target="_blank"}. Replacing, of course, the <<github-user-account>> with the user's account - which in my case is `johnwargo`:

```text
https://api.github.com/users/johnwargo/repos
```

The API returns only 30 repositories with that API call, so, for larger repository lists, you must update the API call to tell it how many repositories you want returned using a `per_page` parameter:

```text
https://api.github.com/users/johnwargo/repos?per_page=100
```

**Note:** The most you can return with a single API call is 100 repositories.

When there's more than 100 public repositories in the account, you must retrieve each page manually:

```text
https://api.github.com/users/johnwargo/repos?per_page=100&page=2
```

Repeating the process until the API returns an empty data set.

This is unauthorized access, so no login required; it only retrieves the public repositories which is exactly what I wanted for the site.

**Note:** GitHub rate limits Unauthorized API access to 60 requests per hour. That limit doesn't exist for authenticated requests; you can read about that here: [Adding a GitHub Repository List to an Eleventy Site (part 2)](/posts/2023/github-repository-list-eleventy-2/).

To access the repository list using Eleventy, I created a file called `repos.js` and placed it in the site's `_data` folder (`/src/_data/repos.js`). Inside the file, I added the following code:

```js
const githubAccount = 'johnwargo';

module.exports = async function () {
  var currentPage = 0;
  var done = false;
  var repoURL = '';
  var result = [];

  console.log(`Fetching GitHub repositories for ${githubAccount}`);
  while (!done) {
    currentPage += 1;
    repoURL = `https://api.github.com/users/${githubAccount}/repos?per_page=100&page=${currentPage}`;
    console.log(`Fetching ${repoURL}`);
    var response = await fetch(repoURL);
    var tempRes = await response.json();
    if (response.status == 200) {
      if (tempRes.length === 0) {
        done = true;
      } else {
        console.log(`Found ${tempRes.length} repos`);
        result = result.concat(tempRes);
      }
    } else {
      console.error(`\nError: ${response.status} - ${response.statusText}\n`);
      if (tempRes.message) console.log(tempRes.message, tempRes.documentation_url);
      process.exit(1);
    }
  }
  return result;
}
```

The code essentially calls the API repeatedly until it has all of the repositories then returns that to Eleventy so you can use the data in any of your site's pages. This creates a data source called `repos` that contains an array of repository entries; here's an example of how I use the data to render a [Repositories](/sightings/repositories/){target="_blank"} page on this site.

{% highlight liquid %}
<p>This page displays all of the repositories in my personal GitHub account <a href="https://github.com/johnwargo?tab=repositories" target="_blank">@johnwargo</a>. Click the link to open the repository.</p>

{% if repos.length > 0 %}
  <p>Number of Repositories: {{ repos.length }}</p>
  <table>
    {% tablerow repo in repos cols:2 %}
      <a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>
      {% if repo.description.length > 0 %}
        {{ repo.description }}
      {% endif %}       
    {% endtablerow %}
  </table>  
{% else %}
    <p>No repository data to display</p>
{% endif %} 
{% endhighlight %}

I created a simple Eleventy site to demonstrate this at [Eleventy Display GitHub Repositories (no auth)](https://github.com/johnwargo/github-repos-sample-unauthorized){target="_blank"}. This version displays the repositories as an unordered list on the sample page.
