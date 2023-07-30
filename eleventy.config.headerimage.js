// ==============================================
// Category Header Image(s)
// ==============================================

var path = require("path");

module.exports = function (eleventyConfig, options = {}) {

  const useDefaultImage = true;
  const defaultImagePath = "/assets/images/headers/default.jpg";
  const defaultImageAltText = "Alt text here!";
  const defaultImageAttribution = "Photo credit here!";

  // parse the options passed to the module
  const categoryDataFile = options.dataFileName ? path.parse(options.dataFileName).name : 'categoryData';
  console.log(`[eleventy.config.headerimage] Data file: ${categoryDataFile}`);

  function _logIt(shortCodeName, msg) {
    console.log(`[${shortCodeName}] ${msg}`);
  }

  function _getCategoryImage(categories) {
    // Loop through all of the categories in order
    // and find the first one that has an image property

    // If no image property is found, return the default image

    return {
      imageFilePath: '',
      imageAltText: '',
      imageAttribution: ''
    }
  }

  eleventyConfig.addShortcode("CategoryImage", function (categories) {

    function buildImageTag(imagePath, imageAltText) {
      if (imagePath) {
        return options.imageClass
          ? `<img src="${imagePath}" alt="${imageAltText}" class="${options.imageClass}" />`
          : `<img src="${imagePath}" alt="${imageAltText}" />`;
      } else {
        return '';
      }
    }

    _logIt("CategoryImage", categories ? categories[0] : "No categories");

    console.dir(this.ctx.environments[categoryDataFile]);
    // process.exit(0);


    if (categories.length < 1) {
      // no categories, do we use the default image? 
      return useDefaultImage ? buildImageTag(defaultImagePath, defaultImageAltText) : '';
    }
    res = _getCategoryImage(categories);
    return buildImageTag(res.imageFilePath, res.imageAltText);
  });

  eleventyConfig.addShortcode("CategoryImageAttribution", function (categories) {

    function buildAttributionTag(attribution) {
      return attribution ? `<p>${attribution}</p>` : '';
    }

    _logIt("CategoryAttribution", categories ? categories[0] : "No categories");
    console.dir(this.ctx.categories);
    if (categories.length < 1) {
      // no categories, do we use the default attribution? 
      // default image may not have an attribution, so check that too
      return useDefaultImage ? buildAttributionTag(defaultImageAttribution) : '';
    }
    res = _getCategoryImage(categories);
    return buildAttributionTag(res.imageAttribution);
  });

}

// "imageFilePath": "",
// "imageAltText": "",
// "imageAttribution": ""