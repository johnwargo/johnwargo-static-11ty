'use strict'

export default async function () {
  const feedURL = 'https://us-east1-jmw-static-site.cloudfunctions.net/getTopPosts';
  const postFix = ': John M. Wargo';
  const propertyId = '304078452';
  const postCount = 20;

  return [];
  // const response = await fetch(feedURL + `?propertyId=${propertyId}&count=${postCount}`, { mode: 'cors' });
  // if (response.status == 200) {
  //   const data = await response.json();
  //   data.articles.forEach(article => {
  //     article.title = article.title.replace(postFix, '');
  //   });
  //   return data.articles;
  // } else {
  //   console.dir(response);
  //   console.error(`popularArticles Error: ${response.status} - ${response.statusText}`);
  //   process.exit(1);
  // }
}
