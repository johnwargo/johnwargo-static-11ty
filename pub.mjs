#!/usr/bin/env zx

async function gitUpdate(msg) {
  await $`git add -A`;
  await $`git commit -m ${msg}`;
  await $`git push`;
}

// With ZX the first three commands are the node executable, the zx executable, and the script name
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\john\\AppData\\Roaming\\npm\\node_modules\\zx\\build\\cli.js',
//   'pub.mjs'
// ]
var theArgs = process.argv.slice(3);

console.log('\nStarting project publish...');

// Check the command line arguments to see if we should increment the version
let idx = theArgs.indexOf('-i');
if (idx > -1) {
  theArgs = theArgs.splice(idx, 1);   // remove the -i argument from the array
  console.log('\nIncrementing package version');
  await gitUpdate('Incrementing package version');
  await $`npm version patch`;
} else {
  console.log('Skipping package version increment');
}

// Check the command line arguments to see if we should update the Algolia index
idx = theArgs.indexOf('-a');
if (idx > -1) {
  theArgs = theArgs.splice(idx, 1); // remove the -a argument from the array
  console.log('\nUpdating Algolia Index');
  await $`algolia-idxup`;
} else {
  console.log('Skipping Algolia index update');
}

// Do we have a commit message?
if (theArgs.length === 0) {
  console.log('\nMissing commit message on command line');
  process.exit(0);
}

// Do we have too many command line arguments?
if (theArgs.length > 1) {
  console.log('\nToo many command line arguments, make sure the commit message is in quotes');
  process.exit(0);
}

// throw in a blank line on the console
console.log();  
await $`gen-build-info src/_data`;
await $`11ty-cat-pages`;
console.log('\nBuilding site');
await $`eleventy`;

gitUpdate(theArgs[0]);
