import { $ } from 'execa';

const $$ = $({stdio: 'inherit'}); // Setup default output for the script
const algoliaPrefix = 'JMW_';

var theArgs = process.argv.slice(2);
var updatePackage = false;
var updateIndex = false;

console.log('\nStarting project publish...');
console.log('-----------------------------');

// Check the command line arguments to see if we should increment the version
let idx = theArgs.indexOf('-i');
if (idx > -1) {
  updatePackage = true;
  // remove the -i argument from the array
  theArgs.splice(idx, 1);
} else {
  console.log('Skipping package version increment');
}

// Check the command line arguments to see if we should update the Algolia index
idx = theArgs.indexOf('-a');
if (idx > -1) {
  updateIndex = true;
  // remove the -a argument from the array
  theArgs.splice(idx, 1);
} else {
  console.log('Skipping Algolia index update');
}

// Do we have a commit message?
if (theArgs.length === 0) {
  console.log('\nMissing commit message on command line (in quotes)');
  process.exit(0);
}

// Do we have too many command line arguments?
if (theArgs.length > 1) {
  console.log('\nToo many command line arguments, make sure the commit message is in quotes');
  process.exit(0);
}

// throw in a blank line on the console
console.log();
console.log('Generating build info');
await $$`gen-build-info src/_data`;
console.log('Generating category pages');
await $$`11ty-cat-pages`;
console.log('\nBuilding site');
await $$`eleventy`;

if (updateIndex) {
  console.log('\nUpdating Algolia Index');
  await $$`npx algolia-idxup _site/algolia.json ${algoliaPrefix}`;
}

await $$`git add -A`;
await $$`git commit -m ${theArgs[0]}`;


if (updatePackage) {
  console.log('\nIncrementing package version');
  await $$`npm version patch`;
}

await $$`git push`;
