//@ts-check
// ==============================================
// Category Header Image(s)
// ==============================================

var path = require("path");

module.exports = function (eleventyConfig, options = {}) {

  const moduleName = "eleventy.config.headerimage";

  const useDefaultImage = false;
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

  /**
   * 
   * @param {*} categoryData 
   * @param {string[]} categories 
   * @param {boolean} useDefaultImage 
   * @returns 
   */
  function _getCategoryImage(categoryData, categories, useDefaultImage) {
    // Initialize to default of no image properties
    const res = {
      imageFilePath: '',
      imageAltText: '',
      imageAttribution: ''
    }
    // Do we have any category metadata?
    if (categoryData && categoryData.length < 1) {
      // No, then we know what to return (because we won't have any image 
      // properties to pull from)
      if (useDefaultImage) {
        res.imageFilePath = defaultImagePath;
        res.imageAltText = defaultImageAltText;
        res.imageAttribution = defaultImageAttribution;
      }
      return res;
    }

    // find the first category of categories that has an imageFilePath 
    // property populated
    for (var idx in categories) {
      var cat = categoryData.find((category) => {
        categories[idx] === category.category;
      });
      if (cat && cat.imageFilePath && cat.imageFilePath.length > 0) {
        res.imageFilePath = cat.imageFilePath;
        res.imageAltText = cat.imageAltText;
        res.imageAttribution = cat.imageAttribution;
        break;
      }
    }
    // did we get one?
    if (res.imageFilePath.length < 1 && useDefaultImage) {
      res.imageFilePath = defaultImagePath;
      res.imageAltText = defaultImageAltText;
      res.imageAttribution = defaultImageAttribution;
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

    _logIt("CategoryImage", categories.length > 0 ? categories[0] : "No categories");
    let res = _getCategoryImage(this.ctx.environments[categoryData], categories, useDefaultImage);
    return buildImageTag(res.imageFilePath, res.imageAltText);
  });

  eleventyConfig.addShortcode("CategoryImageAttribution", function (categories) {
    _logIt("CategoryAttribution", categories.length > 0 ? categories[0] : "No categories");
    let res = _getCategoryImage(this.ctx.environments[categoryData], categories, useDefaultImage);
    return res.imageAttribution.length > 0 ? `<p>${res.imageAttribution}</p>` : '';
  });

}

// "imageFilePath": "",
// "imageAltText": "",
// "imageAttribution": ""