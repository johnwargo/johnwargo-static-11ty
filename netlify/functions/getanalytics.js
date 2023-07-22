// https://docs.netlify.com/functions/create/?fn-language=js
// {
//   "path": "Path parameter (original URL encoding)",
//   "httpMethod": "Incoming request’s method name",
//   "headers": {Incoming request headers},
//   "queryStringParameters": {Query string parameters},
//   "body": "A JSON string of the request payload",
//   "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encoded"
// }

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const headers = { 'Access-Control-Allow-Origin': '*' };
const propertyId = '304078452';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFile: './jmw-static-site-fe022b199e49.json'
});

exports.handler = async function (event, context) {
  // Get the date 31 days ago
  let today = new Date().getTime() - (60 * 60 * 24 * 31 * 1000);
  // Get the day, month and year
  let day = new Date(today).getDate();
  let month = new Date(today).getMonth() + 1;
  let year = new Date(today).getFullYear();
  // Put it in Google's date format
  let dayFormat = `${year}-${month}-${day}`;

  const [response] = await analyticsDataClient.runReport({
    property: 'properties/' + propertyId,
    // Run from today to 31 days ago
    dateRanges: [
      {
        startDate: dayFormat,
        endDate: 'today',
      }
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'active7DayUsers' },
      { name: 'active28DayUsers' }
    ],
  });

  console.dir(response, { depth: null });

  let content = '<p>Nothing to see here, move along.</p>';

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ content: content })
  };

};
