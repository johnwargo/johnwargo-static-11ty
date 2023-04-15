---
title: PyMongo & Google Charts Data Tables
description: 
date: 2016-07-21
headerImage: 
categories: [Miscellaneous]
tags: post
---

I'm working on a project that involves graphing data from a MongoDB collection using Google Charts. For this particular project, I'm collecting weather data (temperature, humidity, and barometric pressure) data on a Raspberry Pi, storing it in a MongoDB collection and delivering a web interface for viewing and graphing the data. I'm built the web interface using Flask ([https://flask.pocoo.org/](https://flask.pocoo.org/){target="_blank"}), so there's some flaskness in the sample code.

As I worked on the part of the web app that graphs the weather data, I decided to use Google Charts as the client-side rendering library. I'd not worked with it before, so this seemed like a good way to learn it. As I poked and prodded at the Charts documentation, I learned that I had to deliver my data in a specific format for Google Charts to be able to make use of it, and the data coming out of the Python Mongo driver (pymongo) wasn't giving me what I needed, or at least, wasn't giving it to me in a usable format. I had find working, so I was able to get the data I needed from the collection, but it had to be reformatted before sending it to Google Charts.

Here's a complete Python snippet that shows how to do it:

```python
from bson.json_util import dumps
```

Let's tear apart the code…

To query the Mongo collection, you use pymongo's `find()` method:

```python
cursor = mongo.db.measurements.find(search_criteria, field_list).sort(sort_criteria)
```

In this case, I pass in a Python object describing the search criteria, {} to get all documents for example, which fields I want returned and a specific sort order. I'm not going to describe each of those as the Pymongo documentation describes them pretty well.

The call to find() returns a cursor, basically a pointer to a result set. To process the results, you can iterate through the cursor, which I'll show you in a minute, or you can simply return the data in the default JSON format using:

```python
return dumps(cursor)
```

In my use case, I needed the data as an array of arrays (the Google Charts Data Table format), so I'll have to iterate through the results and build my array of arrays as I go:

```python
if cursor:
```

The first thing the code does is checks to see if there's even a cursor; just in case the call to find() failed for some reason. Once the app knows it has data, it loops through the data and creates an array containing the measurement values then appends the new array to an existing array of results data.

Where the call to dumps(cursor) would return something like the following:

```json
[{"pressure": 25.77, "temp_f": 82.9, "timestamp": "July 21, 2016 @ 08:50 AM", "humidity": 80.0}, {"pressure": 28.2, "temp_f": 80.1, "timestamp": "July 21, 2016 @ 08:40 AM", "humidity": 10.0}, {"pressure": 25.55, "temp_f": 72.1, "timestamp": "July 21, 2016 @ 08:30 AM", "humidity": 70.0}, {"pressure": 25.97, "temp_f": 71.2, "timestamp": "July 21, 2016 @ 08:20 AM", "humidity": 40.0}]
```

This code returns something like the following:

```json
[[1469105400679, 82.9, 80.0, 25.77], [1469104800002, 80.1, 10.0, 28.2], ...
```

Although I am taking a little liberty with the time format, the examples are just examples of format, not real data.

Now, if you know anything about Google Charts Data Table format, you were probably wondering why I didn't include any column information in the results returned from the server app. That's because this app accommodates mobile devices and, since the column data never changes, I chose not to send it repeatedly over the wireless app. Instead, I added the code to setup the data table on the client application in the following JavaScript code:

```js
$.getJSON(chart_url, function () {
```

I'm still working on the project, so the code's not complete, but you will be able to find the complete project source code at [https://github.com/johnwargo/pi\_weather\_monitor](https://github.com/johnwargo/pi_weather_monitor){target="_blank"} once I complete the project.