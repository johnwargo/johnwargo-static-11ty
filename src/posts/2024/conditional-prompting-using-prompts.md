---
title: Conditional Prompting Using Prompts
description: 
date: 2024-11-10
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Node.js
timestamp: 2024-11-10T17:18:40.346Z
---

Over the years, I published a variety of Node.js modules and CLIs; the CLIs because I wanted to automate some operation I needed to make easily repeatable. For my CLIs, I started building them using command-line arguments, but I quickly forgot the arguments and order. Next I used configuration files, but then that tied me into a specific file or set of files for different operations. Eventually I started using an npm module called [prompts](https://www.npmjs.com/package/prompts){target="_blank"} that allows me to prompt for all of the configuration options either as the only input into the program or for writing the settings to a default configuration file. Yesterday I spent some time figuring out how to do conditional prompts, so that's the topic of this post.

{% sidebar "My Node Code" %}
You can find all (most?) of my node.js modules on [https://johnwargo.io/node](https://johnwargo.io/node){target="_blank"}.
{% endsidebar %}

Prompts is pretty cool and very easy to use. The documentation is very helpful, but it could be a little more comprehensive. 

To use it, you create an array of prompts like this:

```typescript
const prompt1: PromptObject[] = [
  {
    type: 'text',
    name: 'siteUrl',
    message: 'Target site URL',
    initial: DEFAULT_URL
  }, {
    type: 'number',
    name: 'concurrentRequests',
    message: 'Number of concurrent requests',
    initial: DEFAULT_CONCURRENT_REQUESTS
  }, {
    type: 'number',
    name: 'timeoutValue',
    message: 'Timeout value (in milliseconds)',
    initial: DEFAULT_TIMEOUT
  }, {
    type: 'confirm',
    name: 'saveToFile',
    message: 'Save output to file?',
    initial: true
  }
];
```

Next, you call the `prompts()` function like this:

```typescript
var config = await prompts(prompt1, { onCancel: onCancelPrompt });
```

When that code finishes, the `config` object returned contains properties for all of the prompts using the value in the prompt object's `name` for the property name. Here's an example from the previous code:

```json
{
  "siteUrl": "http://localhost:8080",
  "concurrentRequests": 100,
  "timeoutValue": 10000,
  "saveToFile": true, 
}
```

For my particular use case, I wanted to prompt the user to specify a file format and output file name but only if the user selects yes for the `saveToFile` prompt. Prompts doesn't support conditional prompts (that I could discern anyway) so I had to come up with my own mechanism. 

There's nothing keeping me from doing as many prompts as I wanted, loading in different prompt object arrays as necessary. What I didn't want was a clunky way of maintaining all of the configuration values. I came up with a simple and elegant approach (I think anyway) that worked first time.

To do this, I created two prompt arrays. The main one (`prompt1`) that executes every time the CLI runs and a second one (`prompt2`) that I execute only if the user selects `Y` for the `saveToFile` prompt.

```typescript
// *****************************************
// Prompt arrays
// *****************************************

const prompt1: PromptObject[] = [
  {
    type: 'text',
    name: 'siteUrl',
    message: 'Target site URL',
    initial: DEFAULT_URL
  }, {
    type: 'number',
    name: 'concurrentRequests',
    message: 'Number of concurrent requests',
    initial: DEFAULT_CONCURRENT_REQUESTS
  }, {
    type: 'number',
    name: 'timeoutValue',
    message: 'Timeout value (in milliseconds)',
    initial: DEFAULT_TIMEOUT
  }, {
    type: 'confirm',
    name: 'saveToFile',
    message: 'Save output to file?',
    initial: true
  }
];

const prompt2: PromptObject[] = [
  {
    type: 'select',
    name: 'outputExtension',
    message: 'Output format',
    initial: 1,
    choices: [
      { title: 'JSON (.json)', value: '.json' },
      { title: 'Markdown (.md)', value: '.md' },
      { title: 'Text (.txt)', value: '.txt' },
    ]
  }, {
    type: 'text',
    name: 'outputFile',
    message: 'Output file root filename (no extension)',
    initial: DEFAULT_OUTPUT_FILE_ROOT,
  }
];
```

The following code highlights how I executed the two prompts in series:

```typescript
// prompt for the configuration options
var config = await prompts(prompt1);
// did the user want to save the output to a file?
if (config.saveToFile) {
  // then do another prompt
  const configAlt = await prompts(prompt2);
  config = { ...config, ...configAlt };
}
```

When the first call to `prompts()` completes, the `config` object contains all of the user's responses/selections from the prompt. All I have to do is check `config.saveToFile` for true (`y`) or false (`n`) and act accordingly. 

Rather than tracking two different configuration variables (`config` and `configAlt`), I simply used the following code to merge the properties of both into the `config` object:

```typescript
config = { ...config, ...configAlt };
```

And here's the merged `config` object with the results of both prompts:

```json
{
  "siteUrl": "http://localhost:8080",
  "concurrentRequests": 100,
  "timeoutValue": 10000,
  "saveToFile": true,
  "outputExtension": ".md",
  "outputFile": "link-checker-results"
}
```
