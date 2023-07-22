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

const keyFile = {
  "type": "service_account",
  "project_id": "jmw-static-site",
  "private_key_id": "fe022b199e49dc238771f8d07336bf55d07ad2df",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnE5D4W59dBQAg\nM0ebhFcRbTwePbRxzGw2OvDdWIF9nCEHeR5N7JDNk0+npZCkybJfXMq5Y9LgifS2\nkooP7yjmEjXWvs4cI8nzYtmv6dI8Yt7eEfqJVc0lUp1doLRCxmiygq0l5l6f7cgU\nTZl+bdZWa2gR8Fg5cdCqmYhJdzLnMHCmiTNTBHUOdD5TKDHOMiKDuoR6cXvdbpXv\nfpZRqr31TskNHbuzId+5vAAlv//NBQY/8/8IuzZym8SVG/LUNfSdeRvcIeEyBcyl\n06yAq1VVkYNNSginq1PFlmzqBIvK0/+Al7GHh53V6u2QofqxuJ770t7SWHMxQTwq\nd72WSFvtAgMBAAECggEABDXEl6mGtsCXQU3MKQxOPbDCYiMHvr1aCwofAyja3Hgt\nxziDWGR/Z/AQGAdJQYnD6PjCMqaOtrHrPMWCXUaXbH1le2jj8dwUrOwe/vqLSGfC\nZMH7DZu1TL02nMMdqmLBr8vbV+2PPARGdX0uGBGQTthWhJXel0CkXi7PuxrZ6W7p\n34k0YXKmvLuioWUei1dUhX79BVibG2D5/In3+2fDZOasGkQ6aIyVUozygBYLLjqf\nfrIImEJ1dIyrJnXvVh0ee7G3G8POM7BrKbajWHHrmSFIF0VQdbYVke6AJWF1imY1\nfqdqhEICD+idja1/RUrX+w1kd1gwThXC71YUmP1d2QKBgQDPPDSbX/d6+HvRNBU/\nIx8duKGZG1kOsAjIdF+UWw7sPTnW3ID387D9Bzo6Bex/r6h3q/ZCzpLIaQYaH0Ts\n3ygwY5dQmepTWYMrfmnaO5BaO+D9Gg0yAm6KbnEbqxK55xPqivOEDiaVkIw8C5qE\nYf7UTlC+0kqQ+gTy8hZTOYtZSQKBgQDOZDVEVQRysfbsTy5yf/+mWXeiD3yZ+uMx\n1w3SvbEZykKma9RtilkzVnl/lfTQW+qE5ElJn4TM6E0Sx9Tbz36a2iqHOLj5SYns\n5hP/IoipoWAJEPr4uD8HhrMbwdDGPxhRE4Wjbdonypf3ODWttiLt6/zLGpO+pfXD\nMRECimwxhQKBgEjeHpFTmS2AGelhqubcbqCAvzGa0CG9/Bif8suziPfAP4oxVpfY\n9C7ET9D/LD1pgo8xxBGRmUMmyqJ8xDuV7Ae3vQj2VdKg8uJkPMwjjYps65uTgXhI\nKp46X0MfUCJWAkbCPQX+A8srXGPwoJBT9MqqDvJJ9zYq83qJbRgub7UhAoGBAKXt\nSiW1c+4BxVIWFnFXFmDWbKeNa88fNKhNDH/woQDq6sqAxjeKkkwDqYo5NKiOPOy5\n23GlHU7fM5d1sFtHZbF409gCcjN4O7qI/mqPiO9XHa4sSJjNB181m6klGINJFnOY\nDkhleI2lAqduOTl+xHYi0wk2RLFxGzPhrpssTe9BAoGBAM4ZMYIfaOb6jzlUOgch\nBEirczLkWZA75mmxpV5xLWx/O2JUltAdlKQyYNUM2X0WRKitivnBjzU4yoXs6QaG\nJwI3zp0Kycm31quCBY60sj3/bsVWlAkFToOGv4RJKlT7TtOtcb9YeSWQJJz9GRDB\noi6sbKT0eKEa1hDQeBiFpTiE\n-----END PRIVATE KEY-----\n",
  "client_email": "jmw-static-google-analytics@jmw-static-site.iam.gserviceaccount.com",
  "client_id": "112733793556854150589",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/jmw-static-google-analytics%40jmw-static-site.iam.gserviceaccount.com"
}

// const analyticsDataClient = new BetaAnalyticsDataClient({
//   keyFile: './jmw-static-site-fe022b199e49.json'
// });


const analyticsDataClient = new BetaAnalyticsDataClient({ keyFile: JSON.stringify(keyFile) });

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

  console.dir(response, { depth: null });
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