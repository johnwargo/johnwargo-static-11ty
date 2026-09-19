---
title: Eleventy Adding Google Maps with Markers
description: Shows how to add Google Maps to an Eleventy site page with a set of markers showing specific locations.
date: 2026-09-19
timestamp: 2026-09-19T17:16:27.477Z
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
---

When I started building out the [Breakfast Quest](https://thebreakfastquest.com/){target="_blank"} site, one of the features I wanted on the site was a map showing all of the reviewed breakfast locations; this post shows how I did it. You can see the resulting map on the Breakfast Quest site's [locations](https://thebreakfastquest.com/locations/){target="_blank"} page.

![Breakfast Quest Locations Page](/images/2026/breakfast-quest-locations.png)

The first thing I did was look at Google Maps as an option, I wanted to use something free and something that would work in any the browser. Google offers developers a [Maps Platform](https://developers.google.com/maps){target="_blank"} that delivers a variety of options. In my case, I wanted to be able to display markers (one for each restaurant reviewed on the site), so I selected the API-based approach. 

{% sidebar "Google Maps API Key Required" %}
To use this API, you must first create a Google Cloud API key you'll embed in your app. For security purposes, you can limit map API access to a specific source domain; this keeps others from using your API key for their maps (and running up API charges in your Google Cloud account). 
{% endsidebar %}

## Embedding the Map on the Page

Embedding the map on the site's Locations page was easy, all I had to do was create a `<div>` on the page with a specific dimensions for the rendered map:

```html
<div id="map" style="height: 640px; width: 100%;"></div>
```

Next, I loaded the Maps JavaScript API:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUKy-E5t6hf9e-3Lh1t3vP6kCHE-cxewI&libraries=maps&loading=async&callback=initMap" async defer></script>
```

And, finally, I loaded the JavaScript code I wrote to initialize the map and display the markers (described in the following sections):

```html
<script src="/assets/js/maps.js"></script>
```

Here's the complete content from the site's [locations](https://github.com/johnwargo/the-breakfast-quest-11ty/blob/main/src/locations.liquid){target="_blank"} page:

```markdown
---
layout: generic
title: Locations
eleventyNavigation:
  key: Locations
  order: 3
idxIgnore: true
---

Use the map to find a breakfast restaurant by location; click on a pin/marker to view details for the selected restaurant.
<div id="map" style="height: 640px; width: 100%;"></div>
<script src="/assets/js/maps.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUKy-E5t6hf9e-3Lh1t3vP6kCHE-cxewI&libraries=maps&loading=async&callback=initMap" async defer></script>
```

## Initializing the Map

Initializing the map is easy; I created a JavaScript file called `maps.js` and added it to the project's `src/assets/js/` folder. In the file, I created created an `initMap` function that creates a `map` object and points it to the `div` with the `id` of `map` I already added to the locations page.

```js
function initMap() {
	console.log('Initialized maps');

	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: { lat: 41.0812, lng: -81.5188 },
	});
}
```

I didn't want to use the map's default position and zoom level, so when the code initializes the map, it sets the zoom level I wanted then centered the map on the middle of the United States (recognizing that most locations I review on the site will be in the US).

How is the `initMap` function executed? When I loaded the Maps JavaScript library, I passed a `callback` parameter that identified the function to call after the library successfully loads: `callback=initMap`.

## Generating the Markers File

The Google Maps API supports a variety of options for loading markers onto a map. I could have hard-coded a data file in the app or I could have built the marker list using JavaScript code. Since I was working with an Eleventy site and Eleventy is so good with working with data files, I decided to generate the marker list dynamically during the build process. 

To do this, I started by adding `longitude` and `latitude` properties to the frontmatter of my restaurant review posts. This allowed me to keep all restaurant review data together in one place and kept me from having to maintain a separate data file for just the location data. Here's an example:

```yaml
---
title: Michael's AM
description: My go to breakfast place in my home town. This is probably where I was introduced to Country Fried Steak.
date: 2024-01-02
timestamp: 2024-01-02T12:00:50.976Z
author: John
isLocation: true
visitDate: 2024-01-02
rating: 
website: https://michaelsam.net/
menu: https://michaelsam.net/menu/
address: 1562 Akron Peninsula Rd, Akron, OH 44313
city: Akron
state: Ohio
latitude: 41.1373697
longitude: -81.54848129999999
categories: 
---
```

Now that I had a database of location data (longitude and latitude values), all I had to do was get that data into a format that the Google Maps API could load. One of the available options is the [GeoJSON](http://geojson.org/){target="_blank"} file format.  

The GeoJSON file defines a collection of `Features` and each feature defines a geometry type. For my purposes, I use it to define points.  I'm not going to go into the details for how to represent the data, instead here's an example from the site.

```json
{
  "type": "FeatureCollection",
  "features": [    
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.72928069999999,
          35.1256891
        ]
      },
      "properties": {
        "name": "East 74 Family Restaurant",
        "description": "I like East 74 Family Restaurant because it’s a reliable, comfortable spot for simple breakfast food. The restaurant has a steady mix of regulars, police officers, workers, and other locals, and it has a welcoming, neighborhood feel. The food is consistently good and reasonably priced, with my go-to being the country fried steak.  Overall, it’s a dependable breakfast place that I keep coming back to.",
        "url": "/posts/2025/east-74/"
      }
    },    
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -81.54848129999999,
          41.1373697
        ]
      },
      "properties": {
        "name": "Michael's AM",
        "description": "My go to breakfast place in my home town. This is probably where I was introduced to Country Fried Steak.",
        "url": "/posts/2024/michael-am/"
      }
    }
  ]
}
```

To make this work, what I had to do was generate this file and store it somewhere so the locations page could retrieve it and load it in the map. 

Now, you're probably thinking that the solution is to create an Eleventy Global data file for this, but for a variety of reasons this wasn't possible. The most important one is that if I made a JavaScript global data file, it wouldn't be able to process the posts in the site. Now, I could have brute force scanned the file system for posts, which I'd done for my [Eleventy Post Statistics](https://github.com/johnwargo/eleventy-plugin-post-stats){target="_blank"} plugin, but I didn't want to do that here. 

Instead, I created an Eleventy plugin that generated the data file (writing it manually to the site's files) under the covers of an empty/hidden collection. By creating a collection, my code has access to the `collection` API and can access anything in the site during the build process. Once it writes the file, the plugin returns an empty collection which is not used anywhere in the site. 

I'm not going to spend any time showing and describing the plugin code, this post is long enough already. You can study the code yourself [here](https://github.com/johnwargo/the-breakfast-quest-11ty/blob/main/.eleventy.locations.js){target="_blank"}. Just trust me that the plugin, when executed, creates a GeoJSON file like the example shown above in the site's `/api/locations.json` file (which is not in the repository, but generated every time the site builds).

## Loading the Markers in the Map

Alright, now that I had the `locations.json` file, all I had to do was load it into the map at runtime. To do this, I had to make a few changes to the `initMap` function I showed you earlier.

The first thing to do is load the data from the file I just generated; that's pretty easy, here's the code:

```js
const locationData = '/api/locations.json';

console.log('Fetching location data from:', locationData);
map.data.loadGeoJson(locationData);
```

This loads the data from the file and adds markers to the map for every point described in the file. So easy!

Now, if that's all I wanted to do with the markers, I'd be done. But, of course, I wanted to do more. 

I wanted to extend the map to show all the markers on the map. To do that, I added the following listener to the `initMap` function:

```js
var bounds = new google.maps.LatLngBounds();
map.data.addListener('addfeature', function (evt) {
  if (evt.feature.getGeometry().getType() == 'Point') {
    bounds.extend(evt.feature.getGeometry().get());
    map.fitBounds(bounds);
  }
})
```

Every time `loadGeoJson` loads a feature, the map adjusts to include it in the view. This probably isn't very efficient, but it works.

Since I wanted visitors to be able to hover over a marker to view information about the location, I first had to define an info window that appears when they hover:

```js
var infowindow = new google.maps.InfoWindow({
  pixelOffset: new google.maps.Size(0, -40)
});
```

Then add the event listener that creates the info window and populates it with content about the location when the user hovers:

```js
map.data.addListener('mouseover', function (evt) {
  const featureName = evt.feature.getProperty('name');
  const description = evt.feature.getProperty('description');
  if (description) {
    infowindow.setContent(`<div style="padding:5px;"><strong>${featureName}</strong><br>${description}</div>`);
  } else {
    infowindow.setContent(`<div style="padding:5px;"><strong>${featureName}</strong></div>`);
  }
  infowindow.setPosition(evt.feature.getGeometry().get());
  infowindow.open(map);
});
```

Finally, I wanted users to be able to open the review when clicking on a marker, so I added a `click` listener that opens the related page when the user clicks on a marker:

```js
map.data.addListener('click', function (event) {
  const url = event.feature.getProperty('url');
  if (url) {	// this should always be true
    // open the website in a new tab
    window.open(url, '_blank');
  }
});
```

You can view the complete source code for this in the site's [`maps.js`](https://github.com/johnwargo/the-breakfast-quest-11ty/blob/main/src/assets/js/maps.js){target="_blank"} file.
