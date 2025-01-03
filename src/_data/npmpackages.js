/**********************************************************
 * Fetches all packages from the npm registry for a 
 * given author.
 **********************************************************/

// https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md

function _compareFunction(a, b) {
  if (a.package.name < b.package.name) return -1;
  if (a.package.name > b.package.name) return 1;
  return 0;
}

module.exports = async function () {
  const author = 'johnwargo';
   
  var response = await fetch(`https://registry.npmjs.com/-/v1/search?text=author:${author}`);
  var data = await response.json();
  var packages = data.objects;
  packages.sort(_compareFunction);
  return packages;
}