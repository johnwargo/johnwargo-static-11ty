// https://docs.netlify.com/functions/create/?fn-language=js
// {
//   "path": "Path parameter (original URL encoding)",
//   "httpMethod": "Incoming request’s method name",
//   "headers": {Incoming request headers},
//   "queryStringParameters": {Query string parameters},
//   "body": "A JSON string of the request payload",
//   "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encoded"
// }

const Parser = require('rss-parser');

const feedUrl = 'https://www.goodreads.com/review/list_rss/51500942?key=KI70WeEND9_TEAzKvLbP2en8NxNZrbkYppI699pLS0dJDBFz&shelf=%23ALL%23';

const headers = { 'Access-Control-Allow-Origin': '*' };

let parser = new Parser({
  customFields: {
    item: [
      'book_image_url',
      'book_small_image_url',
      'book_medium_image_url',
      'book_large_image_url',
      'book_description',
      'book',
      'author_name',
      'isbn',
      'book_published',
      'user_read_at',
      'user_review',
      'user_rating',
      'user_shelves']
  }
});

exports.handler = async function (event, context) {
  let readingList = [];
  try {
    let feed = await parser.parseURL(feedUrl);
    readingList = feed.items.filter(f => f.user_shelves === 'currently-reading').map(i => {
      return {
        title: i.title,
        images: {
          url: i.book_image_url,
          small: i.book_small_image_url,
          medium: i.book_medium_image_url,
          large: i.book_large_image_url
        },
        description: i.description,
        numPages: i.book.num_pages[0],
        author: i.author_name,
        link: i.guid,
        review: i.user_review,
        rating: i.user_rating,
        read_at: i.user_read_at !== '' ? new Date(i.user_read_at) : ''
      }
    });
  } catch (err) {
    readingList = [];
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ readingList: readingList }),
  };

};
