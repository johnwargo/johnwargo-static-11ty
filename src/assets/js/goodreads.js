/**
 * Called by the site's home page to update the page with the current list of
 * books I'm reading. This code calls the Netlify cloud function to get the list 
 * of books and converts it to HTML to display on the page.
 */

// https://www.raymondcamden.com/2023/06/08/using-goodreads-data-in-eleventy-update
// const feedURL = 'https://johnwargo.com/.netlify/functions/getfeed';
const feedURL = '/.netlify/functions/getfeed';

(async function () {
  let bookDiv = document.getElementById('readingList');
  const response = await fetch(feedURL, { mode: 'cors' });
  const res = await response.json();
  let content = '<p>';
  if (res.readingList.length > 0) {
    content = (res.readingList.length < 2) ? "The book" : "Books";
    content += " I'm currently reading (<a href=\"https://www.goodreads.com/user/show/51500942-john-wargo\" target=\"_blank\">according to Goodreads</a>):</p>";
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