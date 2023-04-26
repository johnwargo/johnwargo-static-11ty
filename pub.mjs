#!/usr/bin/env zx

async function gitUpdate(msg){
  await $`git add -A`;
  await $`git commit -m "{msg}"`;
  await $`git push`;
}

console.log('\nStarting project publish...');

// Check the command line arguments to see if we should increment the version
if (process.argv.includes('-i')) {
  console.log('\nIncrementing package version');
  await gitUpdate('Incrementing package version');
  await $`npm version patch`;
} else {
  console.log('Skipping package version increment');
}

// Check the command line arguments to see if we should update the Algolia index
if (process.argv.includes('-a')) {
  console.log('\nUpdating Algolia Index');
  await $`algolia-idxup`;
} else {
  console.log('Skipping Algolia index update');
}

console.log();  // throw in a blank line on the console
await $`gen-build-info src/_data`;
await $`11ty-cat-pages`;
console.log('\nBuilding site');
await $`eleventy`;

gitUpdate('Publishing site');
