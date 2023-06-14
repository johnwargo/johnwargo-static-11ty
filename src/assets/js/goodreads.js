// https://www.raymondcamden.com/2023/06/08/using-goodreads-data-in-eleventy-update
(async function () {
  let bookDiv = document.getElementById('readingList');
  const response = await fetch("https://goodreads-5bfb4vi5ia-ue.a.run.app/", { mode: 'cors' });
  const res = await response.json();
  let content = '<p>';
  if (res.readingList.length > 0) {
    content = (res.readingList.length < 2) ? "The book" : "Books";
    content += " I'm currently reading <a href=\"https://www.goodreads.com/user/show/51500942-john-wargo\" target=\"_blank\">according to Goodreads</a>:</p>";
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