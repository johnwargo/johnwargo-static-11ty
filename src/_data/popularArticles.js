'use strict'

// https://fjolt.com/article/javascript-ga-api-most-popular-posts
// https://github.com/googleapis/google-cloud-node
// https://www.npmjs.com/package/@google-analytics/data

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

module.exports = async function () {

  let propertyId = '304078452';
  // Number of items we want to return
  let topRows = 20;
  // The part off the front of the page title we want to remove, usually the domain 
  let pageTitle = 'John M. Wargo: ';
  // The URLs we want to target.
  let blogUrl = '/posts/';

  // // Creates a client.
  const analyticsDataClient = new BetaAnalyticsDataClient({ keyFile: './ga-key.json' });
  
  // Get the day 31 days ago
  let today = new Date().getTime() - (60 * 60 * 24 * 31 * 1000);
  // Get the day, month and year
  let day = new Date(today).getDate();
  let month = new Date(today).getMonth() + 1;
  let year = new Date(today).getFullYear();
  // Put it in Google's date format
  let dayFormat = `${year}-${month}-${day}`;

  const [response] = await analyticsDataClient.runReport({
    property: 'properties/' + propertyId,
    dateRanges: [{ startDate: dayFormat, endDate: 'today' }],
    dimensions: [
      { name: 'pagePathPlusQueryString' },
      { name: 'pageTitle' }
    ],
    metrics: [{ name: 'activeUsers' }],
  });

  // newObj contains the views, url and title for all of our pages.
  let newObj = [];
  response.rows.forEach(row => {
    // dimensionValues[0] contains 'pagePathPlusQueryString', and dimensionsValues[1] contains 'pageTitle'
    // We will remove and percentages from the end of URLs to clean them up. You may have to adjust this
    // If you make use of percentages normally in your URLs.
    if (typeof row.dimensionValues[0].value.split('%')[1] !== "undefined") {
      row.dimensionValues[0].value = row.dimensionValues[0].value.split('%')[0];
    }
    // We will remove the domain title from the start of the pageTitle from dimensionValues[1], to only give
    // us the page title. Again, you may have to change 'Fjolt -' to something else, or remove this entirely.
    if (typeof row.dimensionValues[1].value.split(pageTitle)[1] !== "undefined") {
      row.dimensionValues[1].value = row.dimensionValues[1].value.split(pageTitle)[1];
    }
    // We only want articles that have URLs starting with /article/
    if (typeof row.dimensionValues[0].value.split(blogUrl)[1] !== "undefined") {
      // This function will push an object with the url, views and title for any /article/ page. 
      // If the article already exists in 'newObj', we will update it and add the views onto the old one
      // So we have one entry only for each article.
      if (typeof row.dimensionValues[0].value.split('?')[1] !== "undefined") {
        let findEl = newObj.find(el => el.url == row.dimensionValues[0].value.split('?')[0]);
        if (typeof findEl == "undefined") {
          newObj.push({
            url: row.dimensionValues[0].value.split('?')[0],
            views: row.metricValues[0].value,
            title: row.dimensionValues[1].value
          });
        } else {
          findEl.views = `${parseFloat(findEl.views) + parseFloat(row.metricValues[0].value)}`;
        }
      } else {
        newObj.push({
          url: row.dimensionValues[0].value,
          views: row.metricValues[0].value,
          title: row.dimensionValues[1].value
        });
      }
    }
  });
  // We will order the articles by their view count using sort()
  // This will give us a list of articles from highest to lowest view count.
  newObj.sort((a, b) => (parseFloat(a.views) < parseFloat(b.views)) ? 1 : ((parseFloat(b.views) > parseFloat(a.views)) ? -1 : 0))
  // I only want the top 7 articles, so I'm splicing that off the top.
  newObj.splice(topRows, newObj.length);
  return newObj;
}




