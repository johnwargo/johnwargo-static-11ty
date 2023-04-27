const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const Image = require('@11ty/eleventy-img');
const path = require('path');
// https://github.com/11ty/eleventy/issues/2301
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const outdent = require('outdent');
const pluginDate = require('eleventy-plugin-date');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const embedYouTube = require('eleventy-plugin-youtube-embed');

// Transforms
// https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output
const htmlMinTransform = require('./src/transforms/html-min.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(embedYouTube); ``
	eleventyConfig.addPlugin(pluginDate);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);

	// https://github.com/11ty/eleventy/issues/2301
	const mdOptions = {
		html: true,
		breaks: true,
		linkify: true,
	};
	const markdownLib = markdownIt(mdOptions)
		.use(markdownItAttrs)
		.disable("code");

	eleventyConfig.setLibrary("md", markdownLib);

	eleventyConfig.addShortcode("getKeywords", function (categories) {
		let returnString = "";
		for (let category in categories) {
			returnString += categories[category] + ", ";
		}
		// Remove the last comma
		return returnString.slice(0, -2);
	});

	// From ray camden's blog, first paragraph as excerpt
	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));
	function extractExcerpt(post) {
		// No page content?
		if (!post.templateContent) return '';
		if (post.templateContent.indexOf('<h1>') == 0) return '';
		if (post.templateContent.indexOf('<h2>') == 0) return '';
		if (post.templateContent.indexOf('<p><img') == 0) return '';
		if (post.templateContent.indexOf('</p>') > 0) {
			let start = post.templateContent.indexOf('<p>');
			let end = post.templateContent.indexOf('</p>');
			return post.templateContent.substr(start, end + 4);
		}
		return post.templateContent;
	}

	// ==============================================
	// Image Shortcode
	// ==============================================
	// https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/

	/** Maps a config of attribute-value pairs to an HTML string
 * representing those same attribute-value pairs.
 */
	const stringifyAttributes = (attributeMap) => {
		return Object.entries(attributeMap)
			.map(([attribute, value]) => {
				if (typeof value === 'undefined') return '';
				return `${attribute}="${value}"`;
			})
			.join(' ');
	};

	const imageShortcode = async (
		src,
		alt,
		className = undefined,
		widths = [400, 800, 1280],
		formats = ['webp', 'jpeg'],
		sizes = '100vw'
	) => {
		const imageMetadata = await Image(src, {
			widths: [...widths, null],
			formats: [...formats, null],
			outputDir: '_site/img',
			urlPath: '/img',
		});

		const sourceHtmlString = Object.values(imageMetadata)
			// Map each format to the source HTML markup
			.map((images) => {
				// The first entry is representative of all the others
				// since they each have the same shape
				const { sourceType } = images[0];
				// Use our util from earlier to make our lives easier
				const sourceAttributes = stringifyAttributes({
					type: sourceType,
					// srcset needs to be a comma-separated attribute
					srcset: images.map((image) => image.srcset).join(', '),
					sizes,
				});
				// Return one <source> per format
				return `<source ${sourceAttributes}>`;
			})
			.join('\n');

		const getLargestImage = (format) => {
			const images = imageMetadata[format];
			return images[images.length - 1];
		}

		const largestUnoptimizedImg = getLargestImage(formats[0]);

		const imgAttributes = stringifyAttributes({
			src: largestUnoptimizedImg.url,
			// Added classname here because the scott.css file needs it on the img tag
			class: className,
			width: largestUnoptimizedImg.width,
			// removed because it was messing with the aspect ratio
			// height: largestUnoptimizedImg.height,
			alt,
			loading: 'lazy',
			decoding: 'async',
		});

		const imgHtmlString = `<img ${imgAttributes}>`;

		const pictureAttributes = stringifyAttributes({
			class: className,
		});
		
		const picture = `<picture ${pictureAttributes}> ${sourceHtmlString} ${imgHtmlString}</picture>`;

		return outdent`${picture}`;
	};
	eleventyConfig.addShortcode('image', imageShortcode);
	// ==============================================

	eleventyConfig.addCollection("categories", function (collectionApi) {
		let categories = new Set();
		let posts = collectionApi.getFilteredByTag('post');
		posts.forEach(p => {
			let cats = p.data.categories;
			cats.forEach(c => categories.add(c));
		});
		return Array.from(categories);
	});


	eleventyConfig.addCollection("topten", function (collectionApi) {
		return [];
	});

	// https://www.raymondcamden.com/2020/06/24/adding-algolia-search-to-eleventy-and-netlify
	// Remove <code>.*</code>, remove HTML, then with plain text, limit to 5k chars
	eleventyConfig.addFilter('algExcerpt', function (text) {
		//first remove code
		text = text.replace(/<code class="language-.*?">.*?<\/code>/sg, '');
		//now remove html tags
		text = text.replace(/<.*?>/g, '');
		//now limit to 5k
		return text.substring(0, 5000);
	});

	eleventyConfig.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	eleventyConfig.addFilter("commaize", function (num) {
		return num.toLocaleString("en-us");
	});

	// https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/
	// Copy the favicon files to the root folder
	eleventyConfig.addPassthroughCopy({ 'src/favicon/*': '/' });
	// copy the rest of the files
	[
		// Data files
		"src/_data/*",
		// Template files
		"src/assets/css/",
		"src/assets/js/",
		"src/assets/sass/",
		"src/assets/webfonts/",
		// Images folders
		"src/images/*",
		"src/images/avatar/*",
		"src/images/common/*",
		"src/images/covers/*",
		"src/images/sites/*"
	].forEach((path) => {
		eleventyConfig.addPassthroughCopy(path);
	});

	// Assumes cascading folders per year
	let thisYear = new Date().getFullYear();
	for (let i = 2009; i <= thisYear; i++) {
		eleventyConfig.addPassthroughCopy(`src/images/${i}/*`);
	}

	// Only minify HTML if we are in production because it slows builds
	if (isProduction) {
		eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	}

	return {
		dir: {
			input: 'src',
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
		}
	}

};