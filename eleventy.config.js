const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const generateCategoryPages = require('eleventy-generate-category-pages');
const fileList = require('eleventy-plugin-file-list');
const githubRepos = require('eleventy-plugin-github-repos');
// https://github.com/11ty/eleventy/issues/2301
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const pluginDate = require('eleventy-plugin-date');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const pluginStats = require('eleventy-plugin-post-stats');

// local plugins
const pluginImages = require("./eleventy.config.images.js");
const pluginImageHeaders = require("./eleventy.config.headerimage.js");

// Transforms
// https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output
const htmlMinTransform = require('./src/transforms/html-min.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

const categoryDataFile = 'categoryData.json';

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(embedYouTube);
	eleventyConfig.addPlugin(fileList, { targetFolder: 'src/files' });

	const apiKey = process.env.GITHUB_API_KEY;
	eleventyConfig.addPlugin(githubRepos, { userAccount: 'johnwargo', apiKey });

	eleventyConfig.addPlugin(pluginDate);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginImageHeaders, { dataFileName: categoryDataFile, imageClass: 'image fit' });
	eleventyConfig.addPlugin(pluginImages, { debugMode: false });
	eleventyConfig.addPlugin(pluginStats);

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

	var firstRun = true;
	eleventyConfig.on('eleventy.before', async ({ dir, runMode, outputMode }) => {
		if (firstRun) {
			firstRun = false;
			generateCategoryPages({
				dataFileName: categoryDataFile,
				imageProperties: true,
				quitOnError: true,
				debugMode: false
			});
		}
	});

	eleventyConfig.addCollection("projects", function (collectionAPI) {
		// grab all the markdown files in the specified directory
		return collectionAPI.getFilteredByGlob("./src/projects/*.md");
	});

	eleventyConfig.addShortcode("GetKeywords", function (categories) {
		return categories.join(", ");
	});

	// From ray camden's blog, first paragraph as excerpt
	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

	async function extractExcerpt(post) {

		const noContent = '<p>No page content found.</p>'

		// No page content?
		if (!post.templateContent) return noContent;
		let pageContent = post.templateContent;

		// https://www.martingunnarsson.com/posts/eleventy-excerpts/
		// Strip HTML from the paragraph
		//  pageContent = pageContent.replace(/(<([^>]+)>)/gi, "");
		// https://cheerio.js.org/docs/intro

		// remove headings (H1, H2, etc.)
		pageContent = pageContent.replace(/<(h[2-4])>((?:(?!<h\d+\b).)+?)<\/\1>/gm, '');
		// remove picture tags
		pageContent = pageContent.replace(/<picture[^>]*>(.*?)<\/picture>/gm, '');
		// remove standalone IMG tags (just in case)
		pageContent = pageContent.replace(/<img[^>]*>/gm, '');
		// remove empty paragraph tags
		pageContent = pageContent.replace(/<p>\s<\/p>/g, '');
		pageContent = pageContent.replace(/<p><\/p>/g, '');

		if (pageContent.indexOf('</p>') > 0) {
			let start = pageContent.indexOf('<p>');
			let end = pageContent.indexOf('</p>');
			let theExcerpt = pageContent.substr(start, end + 4);
			return theExcerpt;
		}
		return noContent;
	}

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

	eleventyConfig.addFilter("commaize", function (num, locale = "en-us") {
		return num.toLocaleString(locale);
	});

	eleventyConfig.addFilter("dateOnly", function (dateVal, locale = "en-us") {
		var theDate = new Date(dateVal);
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return theDate.toLocaleDateString(locale, options);
	});

	eleventyConfig.addFilter("readableTimestamp", function (dateVal, locale = "en-us") {
		var theDate = new Date(dateVal);
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
		return theDate.toLocaleString(locale, options);
	});

	eleventyConfig.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	eleventyConfig.addFilter("truncate", function (num) {
		return Math.trunc(num);
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
		"src/files/*",
		// Images folders
		"src/images/*",
		"src/images/headers/*",
		"src/images/avatar/*",
		"src/images/common/*",
		"src/images/covers/*",
		"src/images/sites/*"
	].forEach((path) => {
		eleventyConfig.addPassthroughCopy(path);
	});

	// Assumes cascading folders per year
	// let thisYear = new Date().getFullYear();
	// for (let i = 2009; i <= thisYear; i++) {
	// 	eleventyConfig.addPassthroughCopy(`src/images/${i}/*`);
	// }

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
			data: "_data"
		}
	}

};