//@ts-check
// ==============================================
// Category Header Image(s)
// ==============================================

var path = require("path");

module.exports = function (eleventyConfig, options = {}) {

  const moduleName = "eleventy.config.headerimage";
  const useDefaultImage = true;
  const defaultImagePath = "/images/headers/default.jpg";
  const defaultImageAltText = "Default Header Image Alt Text";
  const defaultImageAttribution = "Photo Courtesy of John M. Wargo";

  if (useDefaultImage && defaultImagePath.length < 1) {
    _logIt(moduleName, "ERROR: Default image enabled, but defaultImagePath is undefined");
  }

  // parse the options passed to the module
  const categoryData = options.dataFileName ? path.parse(options.dataFileName).name : 'categoryData';
  _logIt(moduleName, `Category data: ${categoryData}`);
  const imageClass = options.imageClass ? options.imageClass : '';
  if (imageClass.length > 0) _logIt(moduleName, `Image Class: ${imageClass}`);

  function _logIt(shortCodeName, msg) {
    console.log(`[${shortCodeName}] ${msg}`);
  }

  function _getCategoryImage(categoryData, categories) {
    const res = {
      imageFilePath: '',
      imageAltText: '',
      imageAttribution: ''
    }

    // we should never get here without there being at least one category in the array
    // but I'm checking anyway...    
    if (categoryData.length < 1) {
      // no category data, return the empty object
      return res;
    }

    // find the first category of categories that has an imageFilePath 
    // property populated

    // loop through the categories array
    // find in categorydata if they have an imageFilePath property
    
    // let cat = categories.find((category, idx, cats) => {
    //   console.dir(cats[idx]);
    //   cats[idx].imageFilePath.length > 0;
    // });

    if (cat) {
      res.imageFilePath = cat.imageFilePath;
      res.imageAltText = cat.imageAltText;
      res.imageAttribution = cat.imageAttribution;
    } else {
      if (useDefaultImage) {
        // If no image property is found, return the default image
        res.imageFilePath = defaultImagePath;
        res.imageAltText = defaultImageAltText;
        res.imageAttribution = defaultImageAttribution;
      }
    }
    return res
  }

  eleventyConfig.addShortcode("CategoryImage", function (categories) {

    function buildImageTag(imagePath, imageAltText) {
      if (imagePath) {
        return imageClass.length > 0
          ? `<img src="${imagePath}" alt="${imageAltText}" class="${imageClass}" />`
          : `<img src="${imagePath}" alt="${imageAltText}" />`;
      } else {
        return '';
      }
    }

    _logIt("CategoryImage", categories ? categories[0] : "No categories");
    if (categories.length < 1) {
      // no categories, do we use the default image? 
      return useDefaultImage ? buildImageTag(defaultImagePath, defaultImageAltText) : '';
    }
    let res = _getCategoryImage(this.ctx.environments[categoryData], categories);
    return buildImageTag(res.imageFilePath, res.imageAltText);
  });

  eleventyConfig.addShortcode("CategoryImageAttribution", function (categories) {

    function buildAttributionTag(attribution) {
      return attribution.length > 0 ? `<p>${attribution}</p>` : '';
    }

    _logIt("CategoryAttribution", categories ? categories[0] : "No categories");
    if (categories.length < 1) {
      // no categories, do we use the default attribution? 
      // default image may not have an attribution, so check that too
      return useDefaultImage ? buildAttributionTag(defaultImageAttribution) : '';
    }
    let res = _getCategoryImage(this.ctx.environments[categoryData], categories);
    return buildAttributionTag(res.imageAttribution);
  });

}

// "imageFilePath": "",
// "imageAltText": "",
// "imageAttribution": ""