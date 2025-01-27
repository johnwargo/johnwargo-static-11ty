/**
 * Called by the site's home page to update the page with the current list of
 * books I'm reading. This code calls the Netlify cloud function to get the list 
 * of books and converts it to HTML to display on the page.
 */

const feedURL = 'https://us-east1-jmw-static-site.cloudfunctions.net/getReadingList';

(async function () {
  let bookDiv = document.getElementById('readingList');
  const response = await fetch(feedURL, { mode: 'cors' });
  const res = await response.json();
  let content = '<p>';
  if (res.readingList.length > 0) {
    content = (res.readingList.length < 2) ? "The book" : "Books";
    content += " I'm currently reading (<a href=\"https://goodreads.com/user/show/51500942-john-wargo\" target=\"_blank\">according to Goodreads</a>):</p>";
    content += "<ul class=\"posts\">";
    content += res.readingList.map(book => {
      let tmpContent = "<li>";
      tmpContent += `<a href="${book.link}" target="_blank"><img src="${book.images.medium}" alt="${book.title}" /></a><br />`;
      tmpContent += `<a href="${book.link}" target="_blank">${book.title}</a><br /> by ${book.author}`
      tmpContent += "</li>";
      return tmpContent;
    }).join('');
    content += "</ul>";
  } else {
    content = "<p>Goodreads feed not available (or empty).</p>";
  }
  bookDiv.innerHTML = content;
})();