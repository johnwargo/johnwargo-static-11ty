'use strict'

// https://fjolt.com/article/javascript-ga-api-most-popular-posts
// https://github.com/googleapis/google-cloud-node
// https://www.npmjs.com/package/@google-analytics/data

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

module.exports = async function () {

  let propertyId = '304078452';

  // // Creates a client.
  const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFile: './jmw-static-site-fe022b199e49.json'
  });

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
    dateRanges: [
      {
        // Run from today to 31 days ago
        startDate: dayFormat,
        endDate: 'today',
      }
    ],
    dimensions: [
      {
        // Get the page path
        name: 'pagePathPlusQueryString',
      },
      {
        // And also get the page title
        name: 'pageTitle'
      }
    ],
    metrics: [
      {
        // And tell me how many active users there were for each of those
        name: 'activeUsers',
      },
    ],
  });

  return response;

}




