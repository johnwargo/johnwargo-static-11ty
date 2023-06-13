(async function () {
  console.log('goodreads.js loaded');
  let bookDiv = document.getElementById('readingList');
  bookDiv.innerHTML = '<p>Loading Goodreads feed...</p>';

  const response = await fetch("https://goodreads-5bfb4vi5ia-ue.a.run.app/", { mode: 'cors' });
  const res = await response.json();
  console.dir(res);

  let content='';
  if (res.readingList.length > -1) {
    content = "<p>Books I'm currently reading (according to <a href=\"https://www.goodreads.com/user/show/51500942-john-wargo\" target=\"_blank\">Goodreads</a>):</p>";
    content += "<ul class=\"posts\">";
    res.readingList.forEach(function (book) {
      content += "<li>";
      content += `<a href="${book.link}" target="_blank"><img src="${book.images.medium}" alt="${book.title}" /></a><br />`;
      content += `<a href="${book.link}" target="_blank">${book.title}</a><br /> by ${book.author}`
      content += "</li>";      
    });
    content += "</ul>";
  } else {
    content = "<p>Goodreads feed not available (or empty).</p>";
  }  
  bookDiv.innerHTML = content;

})();