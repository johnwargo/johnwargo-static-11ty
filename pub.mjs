#!/usr/bin/env zx

async function gitUpdate(msg) {
  await $`git add -A`;
  await $`git commit -m ${msg}`;
  await $`git push`;
}

var theArgs = process.argv.slice(2);

console.log('\nStarting project publish...');

// Check the command line arguments to see if we should increment the version
let idx = theArgs.indexOf('-i');
if (idx > -1) {
  // remove the -i argument from the array
  theArgs = theArgs.splice(idx, 1);
  console.log('\nIncrementing package version');

  await gitUpdate('Incrementing package version');
  await $`npm version patch`;
} else {
  console.log('Skipping package version increment');
}

// Check the command line arguments to see if we should update the Algolia index
idx = theArgs.indexOf('-a');
if (idx > -1) {
  // remove the -a argument from the array
  theArgs = theArgs.splice(idx, 1);
  console.log('\nUpdating Algolia Index');
  await $`algolia-idxup`;
} else {
  console.log('Skipping Algolia index update');
}

console.dir(theArgs);

if (theArgs.length === 0) {
  console.log('Missing commit message on command line');
  process.exit(0);
}

process.exit(0);

console.log();  // throw in a blank line on the console
await $`gen-build-info src/_data`;
await $`11ty-cat-pages`;
console.log('\nBuilding site');
await $`eleventy`;

gitUpdate(`Update ${new Date().toLocaleString()}`);
