// const analyticsEndpoint = 'https://johnwargo.com/.netlify/functions/getanalytics';
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
  // console.dir(content);
  analyticsContent.innerHTML = content;
})();
