/***************************************************************************
 * Get Google Analytics Metrics
 * Added July 22, 2023
 * 
 * The site's Statistics page displays a few metrics from Google Analytics
 * and this is the function that pulls them from GA and passes them to the
 * statistics page. It's the `src/assets/js/google-analytics.js` file that
 * calls this function and updates the stats page in real time.
 ***************************************************************************/

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
// const analyticsDataClient = new BetaAnalyticsDataClient({ keyFile: 'ga-key.json'});
const analyticsDataClient = new BetaAnalyticsDataClient();

function commaize(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

  // console.dir(response, { depth: null });
  let metrics = [];
  response.metricHeaders.forEach(function (value, i) {
    metrics.push({ name: value.name, value: commaize(response.rows[0].metricValues[i].value) });
  });
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ metrics })
  };
};


  // {
  //   dimensionHeaders: [],
  //   metricHeaders: [
  //     { name: 'activeUsers', type: 'TYPE_INTEGER' },
  //     { name: 'active7DayUsers', type: 'TYPE_INTEGER' },
  //     { name: 'active28DayUsers', type: 'TYPE_INTEGER' }
  //   ],
  //   rows: [
  //     {
  //       dimensionValues: [],
  //       metricValues: [
  //         { value: '221', oneValue: 'value' },
  //         { value: '238', oneValue: 'value' },
  //         { value: '369', oneValue: 'value' }
  //       ]
  //     }
  //   ],
  //   totals: [],
  //   maximums: [],
  //   minimums: [],
  //   rowCount: 1,
  //   metadata: {
  //     dataLossFromOtherRow: false,
  //     currencyCode: 'USD',
  //     _currencyCode: 'currencyCode',
  //     timeZone: 'America/New_York',
  //     _timeZone: 'timeZone'
  //   },
  //   propertyQuota: null,
  //   kind: 'analyticsData#runReport'
  // }