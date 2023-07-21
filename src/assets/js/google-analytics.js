// const analyticsEndpoint = 'https://johnwargo.com/.netlify/functions/getanalytics';
const analyticsEndpoint = '/.netlify/functions/getanalytics';

(async function () {
  let analyticsContent = document.getElementById('analyticsData');
  const response = await fetch(analyticsEndpoint, { mode: 'cors' });
  const res = await response.json();
console.dir(res);

  let content = res.data.body.content;
  
  analyticsContent.innerHTML = content;
})();