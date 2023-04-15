---
title: Android HTTP POST Request Using OKHTTP
description: 
date: 2016-04-17
headerImage: 
categories: [Mobile Development]
tags: post
---

I'm not much of a Java developer. I've poked and prodded at it when I worked for BlackBerry and wrote my BlackBerry development book, but I've not done much serious Java development in my career. I've been working on a Particle Photon-based garage door controller and I built a web app and an Apache Cordova version of the app to interact with the controller. I also wanted a native Android app for this, so I got to work learning Android development. I picked up a copy of the Big Nerd Ranch guide to Android Development ([https://amzn.to/22D68vF](https://amzn.to/22D68vF){target="_blank"}) and got to work.

As I learned new skills working through the guide, I'd finish a chapter then go back to my garage door controller app and implement it there as well. I reached a point where I had everything setup on the photon and the Particle cloud with the app well tested using the web and Cordova versions of the controller app. At this point, I needed to be able to do an HTTP POST from the Android app. I got an example of it working with the standard Android HTTP libraries, but I was looking for a simpler implementation. I stumbled upon the OKHTTP library and tried to figure out how to make it work for me.

I needed to send an HTTP POST to the Particle Cloud and I couldn't find a single example that showed me how to do it using OKHTTP. There were a lot of REST examples, with parameters passed on the URL, but for this project I needed to populate the request body with some parameters. I couldn't find a complete example, so I had to post this one here.

Initialize OKHTTP using:

```java
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
private OkHttpClient client;
```

To create the POST body, use:

```java
//Create the HTTP request body and populate it   
RequestBody body = new FormBody.Builder()
  .add("access_token", Config.ACCESS_TOKEN)
  .add("params", mCode.toString())
  .build();
```

Each request parameter is added to the body using .add().

To call the REST service, use:

```java
//Call the Particle service   
Request request = new Request.Builder()
  .url(THE_URL)   .post(body)
  .build();`
```

The code is executed in a runnable (so that it will run on a background thread) and success and failure processing are done within the runnable:

```java
client.newCall(request).enqueue(new Callback() { 
  @Override
  public void onResponse(Call call, Response response) throws IOException {
    Headers responseHeaders = response.headers();
    for (int i = 0; i < responseHeaders.size(); i++) {
      Log.i(TAG, "Header: " + responseHeaders.name(i) + ": " + responseHeaders.value(i));
    }
    Log.i(TAG, "Response body: " + response.body().string());
    Log.i(TAG, "Message: " + response.message());
    if (response.isSuccessful()) {
      SetCodeRunnable runnable = new SetCodeRunnable(openURL);
      runOnUiThread(runnable);
    } else {
      throw new IOException("Unexpected code " + response);
    }
  } 
  
  @Override   
  public void onFailure(Call call, IOException e) {
    Log.e(TAG, "Exception: " + e.getMessage());
    RunnableDialog runnable = new RunnableDialog(e.getMessage());
    runOnUiThread(runnable);   
  }
});
```

You can find the full code posted as a Gist on GitHub at [https://gist.github.com/johnwargo/9a4bf307287b5d808b089e5e2932c091](https://gist.github.com/johnwargo/9a4bf307287b5d808b089e5e2932c091){target="_blank"}. The code is for a menu item in the app that allows the app user to create a single use code that allows others to open the garage door (once). It generates the code then sends it to the Particle device through the Particle Cloud. Override mode is set based on the phone number for the device. If it's my phone or my wife, this menu item will appear in the app. For my kids, the menu's empty (we don't want them sending a single use code to anyone).