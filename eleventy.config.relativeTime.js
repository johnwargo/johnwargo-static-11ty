/** 
 * Using Intl.RelativeTimeFormat for Localized Relative Timings
 * by Raymond Camden
 * 
 * https://www.raymondcamden.com/2024/03/07/using-intlrelativetimeformat-for-localized-relative-timings
 * 
*/

// Set of constants that represent how many ms per unit
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
// yeah, this is probably not perfect
const MONTH = 4 * WEEK;
const YEAR = MONTH * 12;

// given a value of x, how many of unit is it?
function toUnit(x, unit) {
  if (unit === 'minute') return Math.round(x / MINUTE);
  if (unit === 'hour') return Math.round(x / HOUR);
  if (unit === 'day') return Math.round(x / DAY);
  if (unit === 'week') return Math.round(x / WEEK);
  if (unit === 'month') return Math.round(x / MONTH);
  if (unit === 'year') return Math.round(x / YEAR);
}

function determineUnit(x) {
  x = Math.abs(x);
  if (x < MINUTE) return 'second';
  if (x < HOUR) return 'minute';
  if (x < DAY) return 'hour';
  if (x < WEEK) return 'day';
  if (x < MONTH) return 'week';
  if (x < YEAR) return 'month';
  return 'year';
}

export default function (eleventyConfig, options = {}) {

  eleventyConfig.addFilter('relativeTime', function (dateVal, locale = 'en-us') {
    let date = new Date(dateVal);
    let now = new Date();

    let diff = date - now;
    let unit = determineUnit(diff);
    let inUnit = toUnit(diff, unit);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    return rtf.format(inUnit, unit);

  });

};