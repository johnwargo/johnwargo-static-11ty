'use strict'

module.exports = async function () {
  const response = await fetch('https://aworldwithoutapps.com/wwa-latest.json');
  return await response.json();
}