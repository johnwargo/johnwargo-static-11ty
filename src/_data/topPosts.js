'use strict'

module.exports = async function () {
  const feedURL = 'https://us-east1-jmw-static-site.cloudfunctions.net/getTopPosts';
  const postFix = ':: John M. Wargo';
  const propertyId = '304078452';

  const response = await fetch(feedURL + `?propertyId=${propertyId}`, { mode: 'cors' });
  if (response.status == 200) {
    const data = await response.json();
    // strip the ':: John M. Wargo' from the titles
    data.articles.forEach(article => {
      article.title = article.title.replace(postFix, '');
    });
    return data.articles;
  } else {
    console.dir(response);
    console.error(`popularArticles Error: ${response.status} - ${response.statusText}`);
    process.exit(1);
  }
}
