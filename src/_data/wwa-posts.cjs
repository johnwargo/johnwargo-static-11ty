'use strict'

module.exports = async function () {
  const response = await fetch('https://aworldwithoutapps.com/feed.json');
  const data = await response.json();
  return data.items;
}
