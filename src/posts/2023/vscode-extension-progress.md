---
title: Visual Studio Code Progress Cancelled by Async Task
description: 
date: 2023-11-26
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Developer Tools
---

I'm working on my first Visual Studio Code extension and as part of the extension's work, it calls a long-running external API that could take 30 seconds or more to complete. I started looking for way to display a progress dialog and discovered the [vscode.window.withProgress](https://code.visualstudio.com/api/references/vscode-api#StatusBarItem){target="_blank"}. As I looked through the different examples I found out there, they all showed how the code that displays and manages the progress item decides when to close the window.

For my project, I had a separate process deciding when to close the progress window and it took me some time to sort out how to make everything work. You can find the complete Visual Studio Code extension code in [Visual Studio Extension Progress Demo](https://github.com/johnwargo/vscode-progress-demo){target="_blank"}.

## Asynchronous Task

I didn't want to pull over the complete code from my other extension project, so I created a dummy asynchronous task that basically sits for a specific number of seconds (in this case 10), then cancels the progress window; I'll explain the `customCancellationToken` object later.

```typescript
const delayValue = 10;	// seconds

// this `taskRunner` executes for delayValue seconds to simulate a long running task
async function taskRunner(customCancellationToken: vscode.CancellationTokenSource) {
  setTimeout(function () {
    console.log('taskRunner completed');
    // tell the progress bar to stop
    customCancellationToken.cancel();
  }, delayValue * 1000);
}
```

Change the value in the `delayValue` constant to modify how long the progress window appears before closing.

## Progress Window

To create a progress window, use the following code as a framework:

```typescript
vscode.window.withProgress({
  title: extensionTitle,
  location: vscode.ProgressLocation.Notification,
  cancellable: false
},
  async (progress, token) => {
    return new Promise((async (resolve) => {
      
      // The code you put here manages the lifecycle of the progress window

    }));
  });
```

Notice that the progress window is `cancellable`; to trigger cancellation, you need a `CancellationTokenSource`:

```typescript
var customCancellationToken: vscode.CancellationTokenSource | null = new vscode.CancellationTokenSource();
```

It's the `cancel()` method on the `customCancellationToken` object that the asynchronous task calls when it's done waiting.

Next, you create an event handler for the cancellation event:

```typescript
customCancellationToken.token.onCancellationRequested(() => {

  // do other stuff you need to do here

  customCancellationToken?.dispose();
  customCancellationToken = null;
  resolve(null);
  return;
});
```

The code essentially destroys the cancellation token and resolves the promise keeping everything running up to this point.  

Next, you need something to update the progress window periodically so the user can tell that something's happening. The following code uses a JavaScript interval to upgrade the progress window every second. In this example, the code adds a period to the end of the status message, resetting after 5 periods.

```typescript
var loopCounter = 0;
interval = setInterval(() => {
  console.log('Waiting');
  loopCounter++;
  if (loopCounter > 5) { loopCounter = 1; }	// reset the loop counter
  progress.report({ message: 'working' + '.'.repeat(loopCounter) });
}, 1000);
```

Putting this all together, here's the complete progress window code:

```typescript
vscode.window.withProgress({
  title: extensionTitle,
  location: vscode.ProgressLocation.Notification,
  cancellable: false
},
  async (progress, token) => {
    return new Promise((async (resolve) => {
      var interval: any;
      // setup a process to handle progress bar cancellation					
      var customCancellationToken: vscode.CancellationTokenSource | null = new vscode.CancellationTokenSource();
      customCancellationToken.token.onCancellationRequested(() => {
        console.log('Clearing progress bar');
        interval = clearInterval(interval);
        customCancellationToken?.dispose();
        customCancellationToken = null;
        resolve(null);
        return;
      });
      taskRunner(customCancellationToken);
      var loopCounter = 0;
      interval = setInterval(() => {
        console.log('Waiting');
        loopCounter++;
        if (loopCounter > 5) { loopCounter = 1; }	// reset the loop counter
        progress.report({ message: 'working' + '.'.repeat(loopCounter) });
      }, 1000);
    }));
  });
```

The code:

1. Creates the cancellation handler 
2. Starts the `taskRunner` task
3. Kicks off `setInterval` to loop infinitely until the task runner tells it to cancel.

Unlike the other examples I found online, this example cancels the progress window from an external task.

## Full Code

Here's the complete code for the extension. 

```typescript
import * as vscode from 'vscode';

const extensionTitle = 'Progress Demo';
const delayValue = 10;	// seconds

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension activated');
	let disposable = vscode.commands.registerCommand('progress-demo.go', () => {

		// this `taskRunner` executes for delayValue seconds to simulate a long running task
		async function taskRunner(customCancellationToken: vscode.CancellationTokenSource) {
			setTimeout(function () {
				console.log('taskRunner completed');
				// tell the progress bar to stop
				customCancellationToken.cancel();
			}, delayValue * 1000);
		}

		// creates a progress bar that runs until the `taskRunner` tells it to stop
		vscode.window.withProgress({
			title: extensionTitle,
			location: vscode.ProgressLocation.Notification,
			cancellable: false
		},
			async (progress, token) => {
				return new Promise((async (resolve) => {
					var interval: any;
					// setup a process to handle progress bar cancellation					
					var customCancellationToken: vscode.CancellationTokenSource | null = new vscode.CancellationTokenSource();
					customCancellationToken.token.onCancellationRequested(() => {
						console.log('Clearing progress bar');
						interval = clearInterval(interval);
						customCancellationToken?.dispose();
						customCancellationToken = null;
						resolve(null);
						return;
					});
					taskRunner(customCancellationToken);
					var loopCounter = 0;
					interval = setInterval(() => {
						console.log('Waiting');
						loopCounter++;
						if (loopCounter > 5) { loopCounter = 1; }	// reset the loop counter
						progress.report({ message: 'working' + '.'.repeat(loopCounter) });
					}, 1000);
				}));
			});

	});
	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('Extension deactivated');
}
```

To run this code in Visual Studio Code:

1. Clone the [Visual Studio Extension Progress Demo](https://github.com/johnwargo/vscode-progress-demo){target="_blank"} repository.
2. Open the cloned project in Visual Studio Code
3. In a vscode terminal window, execute `npm install`
4. Press the F5 key to start debugging the extension.
5. In the new Visual Studio Code window that opens, open the Command Palette and type select the Progress Demo option.
