---
title: Google Functions Deploy Module
description: Describes a node.js based CLI I created to make it easier to deploy multiple Google Cloud Functions with a single terminal command.
date: 2024-07-11
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
timestamp: 2024-07-11T22:41:18.433Z
---

A while back, I published an article called [Google Cloud Multiple Functions in a Project](https://johnwargo.com/posts/2024/google-cloud-multiple-functions/){target="_blank"} demonstrating some code I wrote to help Google Cloud Functions developers more easily deploy multiple functions with a single terminal command. 

The code works great for me, since I only really have a single Google Cloud Functions project I work with regularly. If I worked with multiple functions projects, I'd have to copy that custom code from project to project and that just seems silly. 

That stared me thinking about building that code into a node.js package I could install globally, then use it in multiple Google Cloud Functions projects without having to copy code around. I had some extra time the other night, so I created a new node.js project then migrated the existing code into a simple CLI.

The package is [Google Functions Deploy](https://www.npmjs.com/package/google-functions-deploy){target="_blank"} (on npm) and you can find the source at [github.com/johnwargo/google-functions-deploy](https://github.com/johnwargo/google-functions-deploy){target="_blank"}.

The idea here is that you can group multiple Google Cloud functions into a folder with a separate subfolder for each function (functions project). With that in place, any code that deploys the functions merely needs to loop through the separate functions folders and execute the appropriate `gcloud functions deploy` command (with additional parameters determined by the developer based on their project) in each folder sequentially.

## Configuration

To accommodate a project folder with more than just function project subfolders in it, the package uses a configuration file property called `functionFolders` to define the array of subfolders that contain functions projects. Google's `gcloud functions deploy` command also accepts a plethora of command-line options and rather than building support for all of them as configuration options, the package uses another configuration property `flags` to define the array of required command-line parameters needed to successfully deploy the functions projects.

Here's a sample configuration:

```json
{
  "functionFolders": [
    "getMetrics",
    "getList",
    "getPosts"
  ],
  "flags": [
    "--region=us-east1",
    "--runtime=nodejs20",
    "--trigger-http",
    "--allow-unauthenticated"
  ]
}
```

When you execute the package's CLI command the first time in a project folder, it offers you an opportunity to automatically generate the configuration file and even select the project folders names to use to populate the `functionFolders` array.

## Execution

Executing the deploy command is easy, just open a terminal to the project folder and execute the following command:

```shell
gfdeploy
```

That's it. It loops through all of the folders and deploys each of the functions in sequence.

Please let me know if you find this helpful.
