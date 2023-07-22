// const analyticsEndpoint = 'https://johnwargo.com/.netlify/functions/getanalytics';
const analyticsEndpoint = '/.netlify/functions/getanalytics';

(async function () {
  let analyticsContent = document.getElementById('analyticsData');
  const response = await fetch(analyticsEndpoint, { mode: 'cors' });
  const res = await response.json();

  let content = res.content;

  // Convert the JSON we got into page content
  

  analyticsContent.innerHTML = content;
})();