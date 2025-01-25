---
title: Coding Google Functions Using TypeScript
description: Describes how to code Google Cloud Platform Functions using TypeScript.
date: 2024-01-07
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Cloud Development
  - JavaScript  
  - Node.js
---

As I mentioned in my [previous post](/posts/2024/google-cloud-support-notice/){target="_blank"}, I migrated some functionality from this site to Google Cloud Functions due to some security issues related to how I implemented the code. Moving the code from the public repo for this site to a private repo containing Google Cloud Functions allows me to do what I need to do without exposing secrets.

I know everyone doesn't agree with me on this, but I code in TypeScript when I can. I understand why Microsoft created TypeScript and I understand the value of what it offers. I also get tremendous benefit from coding in TypeScript over JavaScript and I have yet to run into any long build processes due to my use of TypeScript.

Sadly, when you search the Internet for documentation on how to configure Google Cloud Functions using TypeScript, no official documentation from Google appears. That's not necessarily surprising as it's not that hard to setup, but interesting that Google Firebase (through the Firebase CLI) will setup a functions project for you automatically for you. Sadly, when I googled "google functions typescript", most of the articles that appeared in the results talked about Firebase. Sigh.

When I started coding my functions last week, I found few article that describes the process; the one I used was: [Cloud Functions with TypeScript](https://duff.blog/cloud-functions-with-typescript){target="_blank"}. I mention that article because there were some topics not described very well in the article, and I wanted to do a better job here. It was also written several years ago, so things have likely changed since then.

## Configuring The Project

Alright, as far as I can tell, there's no way to create a Google Cloud Function (I'm going to call it GCF from here on) on your local system then publish or deploy it to the cloud. So, to get started:

1. Create the JavaScript/Node function you want in GCF
2. Download the function's zip file from GCF to your local development environment
3. Extract the downloaded files to a folder on your hard drive.

**Note:** In my next post, I'll demonstrate how to put multiple functions in a single project.

The new Function project has two files in it:

* `index.js` - This contains the JavaScript code for your function. In our new TypeScript project, we're going to compile the TypeScript code into this JavaScript file for deployment to GCF.
* `package.json` - The node.js configuration file for the function project.

At this point, the project's `package.json` file looks like this:

```json
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  }
}
```

Create a new folder in the root of the project and call it `src`. This folder holds the TypeScript source code for the project. Create a file called `index.ts` in the folder and populate it with the following code:

```typescript
import { HttpFunction } from '@google-cloud/functions-framework';

export const myFunctionName: HttpFunction = (request, response) => {
  response.status(200).send('Hello World!');
}
```

Open a terminal window or command prompt and navigate to the folder with the extracted function files. I use the terminal in Visual Studio Code for this because I'm going to work in the editor after I'm done, so there's no need to open a dedicated terminal window for these simple steps. In the terminal window, execute the following command:

```shell
npm install typescript
```

When you're done, the file `package.json` file will look something like this:

```json
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "typescript": "^5.3.3"
  }
}
```

Next, in the terminal window, execute the following command:

```shell
npx tsc --init
```

I have TypeScript installed globally on my system, so I accomplished the same thing using:

```shell
tsc --init
```

This adds a `tsconfig.json` file to the project that looks something like this:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
    }
}
```

Modify the `tsconfig.json` file so it looks like this:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "src",
    "moduleResolution": "node",
    "outDir": "./",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "./src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

The most important changes are these:

* `"rootDir": "src"` - This tells the TypeScript compiler where to find the source files for the project.
* `"outDir": "./"` - Tells the TypeScript compiler where to output the compiled files. A GCF project expects to fine the project's `index.js` file in the root of the project folder.
* `"include": ["./src/**/*.ts"],` - This tells the TypeScript compiler which files to compile.
* `"exclude": ["node_modules"]` - This tells the TypeScript compiler to ignore any TypeScript files in the `node_modules` folder. This probably isn't needed, but I put it in there anyway.

Finally, we need to add the following scripts to the project's `package.json` file (I'll explain them in a minute):

```json
"scripts": {
  "build": "tsc",
  "deploy": "gcloud functions deploy myFunctionName --gen2 --region=us-east1 --runtime=nodejs20 --trigger-http --allow-unauthenticated",
  "dev": "npm run build && npx @google-cloud/functions-framework --target=myFunctionName",
  "gcp-build": "npm run build"
},
```

The complete `package.json` file should look like this:

```json
{
  "scripts": {
    "build": "tsc",
    "deploy": "gcloud functions deploy myFunctionName --gen2 --region=us-east1 --runtime=nodejs20 --trigger-http --allow-unauthenticated",
    "dev": "npm run build && npx @google-cloud/functions-framework --target=myFunctionName",
    "gcp-build": "npm run build"
  },
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "typescript": "^5.3.3"
  }
}
```

Here's some details regarding the scripts:

**Script Details**
| Script      | Description |
| ----------- | ----------- |
| `build`     | The `tsc` command is the TypeScript compiler you'll use to compile the function's TypeScript code to JavaScript. I have TypeScript installed locally, so I can just type the tsc command in a project terminal window to compile the code. If you don't have that setup, and you probably shouldn't for some good reasons, compile your project's code by executing `npm run build` in a project terminal window. This compiles the TypeScript in `src/index.ts` to `/index.js` |
| `deploy`    | Deploying the function to GCF requires a complicated command that I can never remember the syntax of. Instead, I added it as a `build` script, so any time I want to deploy the function, I simply execute `npm run deploy` in a project terminal window. I describe this script in a later section of the article. |
| `dev`       | The Google Cloud CLI offers developers a mechanism for testing their function locally; to do this, execute `npm run dev` in a project terminal window. I show how this works in a later section of the article. |
| `gcp-build` | Even though you may compile your project before deploying it, the `gcloud` CLI automatically executes a build during the deployment process. Since it doesn't know what you call the build script in your project, it requires that your project has a `gcp-build` script that performs the build. During deployment, the `gcloud` command executes that script. |

**Regarding the `gcp-build` script:** When I first saw that script in the referenced article (above), I didn't understand it and the author didn't describe it. Even more perplexing was that it simply called another sketch. My initial thought was why not just put the `tsc` command in the `gcp-build` script and be done with it? Well, if you have a more complicated build process, and I imagine many of you will, doing that requires that you copy everything in the `build` script to the `gcp-build` script. That's just inefficient and error prone, so instead you just call the `build` script when you need it.

## Testing the Function

The Google Cloud CLI offers a mechanism for testing your functions locally before deploying them. To take advantage of this, open a terminal window in your function project folder and execute the following command:

```shell
npm run dev
```

The `dev` script will compile the project and open a little local web server you can use to test it out:

```shell
> dev
> npm run build && npx @google-cloud/functions-framework --target=myFunctionName


> build
> tsc

Serving function...
Function: myFunctionName
Signature type: http
URL: http://localhost:8080/
```

Simply open a browser to the listed URL and you'll see "Hello World!" on the page. You can use that URL in any locally running apps that call the function to test the apps as well. 

## Deploying the Function

When your Google Cloud Function is ready to run in the cloud, just run the `deploy` script in a terminal window. The script calls the `gcloud` CLI with a bunch of parameters. Here's the example from above:

```shell
gcloud functions deploy myFunctionName --gen2 --region=us-east1 --runtime=nodejs20 --trigger-http --allow-unauthenticated
```

For my case, here's the parameters I used:

| Parameter               | Description |
| ----------------------- | ----------- |
| `functions`             | Tells the CLI we're working with a function. |
| `deploy`                | Tells the CLI we're deploying the function. |
| `--gen2`                | Tells the CLI we're deploying a Generation 2 function. |
| `region`                | Defines the region where we're deploying the function. |
| `runtime`               | Defines the Node.js runtime the function requires to operate. For example, the JavaScript `fetch` command isn't available in older versions of node.js, so you'd want to set the version that supports all the JavaScript features your function  uses. |
| `trigger`               | Defines what action triggers the function. In this case, I wanted it to be an HTTP triggered function. |
| `allow-unauthenticated` | Tells Functions I want the function publicly available with no login/auth. |

You can find the complete list of supported parameters in [gcloud functions deploy](https://cloud.google.com/sdk/gcloud/reference/functions/deploy){target="_blank"}. Tweak and tune the script as needed for your project.

## Conclusion

That's it, that's everything I had to do to deploy my TypeScript coded functions to Google Cloud Functions. In my next post, I'll show how to manage multiple GCF functions in a single project and replicate the awesome function deployment capabilities the Firebase CLI offers.
