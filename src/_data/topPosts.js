(async function () {

  const feedURL = 'https://us-east1-jmw-static-site.cloudfunctions.net/getTopPosts';

  const response = await fetch(feedURL, { mode: 'cors' });
  if (response.status == 200) {
    const data = await response.json();
    console.dir(data.articles);
    return data.articles;
  } else {
    console.dir(response);
    console.error(`popularArticles Error: ${response.status} - ${response.statusText}`);
    process.exit(1);
  }
})();
