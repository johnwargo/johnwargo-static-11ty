// newObj will contain the views, url and title for all of our pages. You may have to adjust this for your own needs.
let topRows = 7; // Number of items we want to return
let pageTitle = 'Fjolt - '; // The part off the front of the page title we want to remove, usually the domain name
let blogUrl = '/article/'; // The URLs we want to target.
let newObj = [];
response.rows.forEach(row => {
    // dimensionValues[0] contains 'pagePathPlusQueryString', and dimensionsValues[1] contains 'pageTitle'
    // We will remove and percentages from the end of URLs to clean them up. You may have to adjust this
    // If you make use of percentages normally in your URLs.
    if(typeof row.dimensionValues[0].value.split('%')[1] !== "undefined") {
        row.dimensionValues[0].value = row.dimensionValues[0].value.split('%')[0];   
    }
    // We will remove the domain title from the start of the pageTitle from dimensionValues[1], to only give
    // us the page title. Again, you may have to change 'Fjolt -' to something else, or remove this entirely.
    if(typeof row.dimensionValues[1].value.split(pageTitle)[1] !== "undefined") {
        row.dimensionValues[1].value = row.dimensionValues[1].value.split(pageTitle)[1];
    }
    // We only want articles that have URLs starting with /article/
    if(typeof row.dimensionValues[0].value.split(blogUrl)[1] !== "undefined") {
        // This function will push an object with the url, views and title for any /article/ page. 
        // If the article already exists in 'newObj', we will update it and add the views onto the old one
        // So we have one entry only for each article.
        if(typeof row.dimensionValues[0].value.split('?')[1] !== "undefined") {
            let findEl = newObj.find(el => el.url == row.dimensionValues[0].value.split('?')[0]);
            if(typeof findEl == "undefined") {
                newObj.push({
                    url: row.dimensionValues[0].value.split('?')[0],
                    views: row.metricValues[0].value,
                    title: row.dimensionValues[1].value
                });
            } else {
                findEl.views = `${parseFloat(findEl.views) + parseFloat(row.metricValues[0].value)}`;
            }
        } else {
            newObj.push({
                url: row.dimensionValues[0].value,
                views: row.metricValues[0].value,
                title: row.dimensionValues[1].value
            });
        }
    }
});
// We will order the articles by their view count using sort()
// This will give us a list of articles from highest to lowest view count.
newObj.sort((a,b) => (parseFloat(a.views) < parseFloat(b.views)) ? 1 : ((parseFloat(b.views) > parseFloat(a.views)) ? -1 : 0))
// I only want the top 7 articles, so I'm splicing that off the top.
newObj.splice(topRows, newObj.length);