// ==============================================
// Category Header Image(s)
// ==============================================

module.exports = function (eleventyConfig) {

	const useDefaultImage = true;
	const defaultImagePath = "/assets/images/headers/default.jpg";
	const defaultImageAltText = "Alt text here!";
	const defaultImageAttribution = "Photo credit here!";

	function _logIt(shortCodeName, msg) {
		console.log(`[${shortCodeName}] ${msg}`);
	}

	function _getCategoryImage(categories) {
		// Loop through all of the categories in order
		// and find the first one that has an image property

		// If no image property is found, return the default image

	}

	eleventyConfig.addShortcode("CategoryImage", function (categories) {
		_logIt("CategoryImage", categories ? categories[0] : "No categories");
		if (categories.length < 1) {
			// no categories, do we use the default image? 
			return useDefaultImage ? `<img src="${defaultImagePath}" alt="${defaultImageAltText}" />` : '';
		}
		res = _getCategoryImage(categories);
		return res.imageFilePath ? `<img src="${res.imageFilePath}" alt="${res.imageAltText}" />` : '';
	});

	eleventyConfig.addShortcode("CategoryImageAttribution", function (categories) {
		_logIt("CategoryAttribution", categories ? categories[0] : "No categories");
		if (categories.length < 1) {
			// no categories, do we use the default attribution? 
			// default image may not have an attribution, so check that too
			return useDefaultImage & defaultImageAttribution ? `<p>${defaultImageAttribution}</p>` : '';
		}
		res = _getCategoryImage(categories);
		return res.imageAttribution ? `<p>${res.imageAttribution}</p>` : '';
	});

}

// "imageFilePath": "",
// "imageAltText": "",
// "imageAttribution": ""