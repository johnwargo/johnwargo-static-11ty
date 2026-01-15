/**********************************************************
 * packageList.js
 * 
 * Fetches all packages from the npm registry for a 
 * given author.
 **********************************************************/

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md

import Fetch from "@11ty/eleventy-fetch";

const author = 'johnwargo';
const exitOnError = true;

function _compareFunction(a, b) {
  if (a.package.name < b.package.name) return -1;
  if (a.package.name > b.package.name) return 1;
  return 0;
}

export default async function () {
  console.log(`[packageList] Fetching npm packages for "${author}"`);  
  try {
    var data = await Fetch(`https://registry.npmjs.com/-/v1/search?text=author:${author}`, {
      duration: '1d',
      type: 'json'
    });
    var packages = data.objects;
    packages.sort(_compareFunction);
    return packages;
  } catch (error) {
    console.error(`Error fetching packages: ${error}`);
    if (exitOnError) process.exit(1);
    return [];
  }
}