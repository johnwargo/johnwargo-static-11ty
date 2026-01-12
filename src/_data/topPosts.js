'use strict'

// https://developers.google.com/identity/sign-in/web/devconsole-project

import Fetch from "@11ty/eleventy-fetch";

const feedURL = 'https://us-east1-jmw-static-site.cloudfunctions.net/getTopPosts';
const postFix = ': John M. Wargo';
const propertyId = '304078452';
const postCount = 20;

export default async function () {

  console.log(`[topPosts] Fetching top ${postCount} posts for property ID ${propertyId}`);
  let data = await Fetch(
    `${feedURL}?propertyId=${propertyId}&count=${postCount}`,
    { duration: "1d", type: "json", fetchOptions: { mode: 'cors' } }
  );
  if (data) {
    data.articles.forEach(article => {
      article.title = article.title.replace(postFix, '');
    });
    return data.articles;
  } else {
    console.error(`[topPosts] Error fetching top posts`);
    return [];
  }
}

// const response = await fetch(feedURL + `?propertyId=${propertyId}&count=${postCount}`, { mode: 'cors' });
//  let response = await Fetch(
//     `${feedURL}?propertyId=${propertyId}&count=${postCount}`,
//     { duration: "1d", type: "json", fetchOptions: { mode: 'cors' } }
//   );
//   console.dir(response);

//   if (response.status == 200) {
//     var data = await response.json();
//     data.articles.forEach(article => {
//       article.title = article.title.replace(postFix, '');
//     });
//     return data.articles;
//   } else {
//     console.dir(response);
//     console.error(`popularArticles Error: ${response.status} - ${response.statusText}`);
//     process.exit(1);
//   }