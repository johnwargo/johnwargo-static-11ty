/**
 * Google Analytics Client Side Library
 * Added July, 2023
 * 
 * This library loads on the statistics page only and calls the Netlify
 * `getanalytics` function to get the latest metrics from Google Analytics.
 * Once it receives data from the function, it creates a table and displays
 * it on the page.
 */

const endpoint = 'https://us-east1-jmw-static-site.cloudfunctions.net/getAnalyticsMetrics';

(async function () {
  var analyticsContent = document.getElementById('analyticsData');
  var content = '<p>No data available or service unavailable</p>';

  try {
    const response = await fetch(endpoint, { 'Content-Type': 'application/json', mode: 'cors' });
    if (response.status == 200) {
      const res = await response.json();
      if (res.metrics) {
        content = '<table style="width:350px"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>';
        content += res.metrics.map(function (metric) {
          return '<tr><td><strong>' + metric.name + '</strong></td><td>' + metric.value + '</td></tr>';
        }).join('');
        content += '</tbody></table>';
      }
    } else {
      var msg = `Error: ${response.status} ${response.statusText}`;
      console.error(msg);
      content += `<p>(${msg})</p>`;
    }
  } catch (e) {
    console.error(e);
    content += `<p>(${e})</p>`;
  }
  analyticsContent.innerHTML = content;
})();
