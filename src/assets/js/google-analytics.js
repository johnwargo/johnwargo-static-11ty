/**
 * Google Analytics Client Side Library
 * Added July, 2023
 * 
 * This library loads on the statistics page only and calls the Netlify
 * `getanalytics` function to get the latest metrics from Google Analytics.
 * Once it receives data from the function, it creates a table and displays
 * it on the page.
 */

const analyticsEndpoint = '/.netlify/functions/getanalytics';

(async function () {
  let analyticsContent = document.getElementById('analyticsData');
  const response = await fetch(analyticsEndpoint, { mode: 'cors' });
  const res = await response.json();

  let content = '<p>No data available or service unavailable</p><br />';
  if (res.metrics) {
    content = '<table style="width:350px"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
    content += res.metrics.map(function (metric) {
      return '<tr><td><strong>' + metric.name + '</strong></td><td>' + metric.value + '</td></tr>';
    }).join('');
    content += '</tbody></table>';
  }
  analyticsContent.innerHTML = content;
})();
