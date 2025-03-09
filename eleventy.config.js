const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const pluginDate = require('eleventy-plugin-date');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const embedYouTube = require('eleventy-plugin-youtube-embed');
// my plugins
const fileList = require('eleventy-plugin-file-list');
const generateCategoryPages = require('eleventy-generate-category-pages');
const githubRepos = require('eleventy-plugin-github-repos');
const pluginStats = require('eleventy-plugin-post-stats');
// local plugins
const pluginImages = require('./eleventy.config.images.js');
const pluginGallery = require("./eleventy.config.gallery.js");
const pluginImageHeaders = require('./eleventy.config.headerimage.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min.js');

const isProduction = process.env.NODE_ENV === 'production';
const categoryDataFile = 'categoryData.json';

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(embedYouTube);
	eleventyConfig.addPlugin(fileList, { targetFolder: 'src/files' });
	eleventyConfig.addPlugin(pluginDate);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);

	const apiKey = process.env.GITHUB_API_KEY;
	eleventyConfig.addPlugin(githubRepos, { userAccount: 'johnwargo', apiKey });
	eleventyConfig.addPlugin(pluginGallery);
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
		.disable('code');

	eleventyConfig.setLibrary('md', markdownLib);

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

	eleventyConfig.addCollection('projects', collectionAPI => {
		// grab all the markdown files in the specified directory
		return collectionAPI.getFilteredByGlob('./src/projects/*.md');
	});

	eleventyConfig.addCollection('articlesByTimestamp', collectionAPI => {
		return collectionAPI.getFilteredByTag('post').sort((a, b) => {
			// use the timestamp if we have it, otherwise date
			var aDate = a.data.timestamp ? new Date(a.data.timestamp) : new Date(a.date);
			var bDate = b.data.timestamp ? new Date(b.data.timestamp) : new Date(b.date);
			return aDate - bDate;
		});
	});

	eleventyConfig.addShortcode('GetKeywords', categories => {
		return categories.join(', ');
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

	eleventyConfig.addPairedShortcode('sidebar', function (content, title = 'What It Means') {
		// What it means (WIM) block
		var paragraphs = content.split(/(?:\r?\n)+/);
		var rc = '<div class="wim">';
		rc += `<h3>${title}</h3>`;
		paragraphs.forEach(paragraph => {
			if (paragraph.trim() === '') return;
			rc += `<p>${paragraph}</p>`;
		});
		rc += '</div>';
		return rc;
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

	eleventyConfig.addFilter('commaize', function (num, locale = 'en-us') {
		if (isNaN(num)) {
			return `Error: ${num} is not a number`;
		} else {
			return num.toLocaleString(locale);
		}
	});

	eleventyConfig.addFilter('dateOnly', function (dateVal, locale = 'en-us') {
		// Used to display human readable date on the stats page and other pages
		var theDate = new Date(dateVal);
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return theDate.toLocaleDateString(locale, options);
	});

	eleventyConfig.addFilter('readableTimestamp', function (dateVal, locale = 'en-us') {
		// Used by home, articles, & post pages to render timestamp as human readable
		var theDate = new Date(dateVal);
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour12: true,
			hour: '2-digit',
			minute: '2-digit'
		};
		return theDate.toLocaleString(locale, options);
	});

	eleventyConfig.addFilter('jsonify', function (variable) {
		return JSON.stringify(variable);
	});

	eleventyConfig.addFilter('truncate', function (num) {
		return Math.trunc(num);
	});

	// https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/
	// Copy the favicon files to the root folder
	eleventyConfig.addPassthroughCopy({ 'src/favicon/*': '/' });
	// copy the rest of the files
	[
		'src/_data/*',
		'src/assets/css/',
		'src/assets/js/',
		'src/assets/sass/',
		'src/assets/webfonts/',
		'src/files/*',
		'src/images/*',
		'src/images/headers/*',
		'src/images/avatar/*',
		'src/images/common/*',
		'src/images/covers/*',
		'src/images/sites/*'
	].forEach((path) => {
		eleventyConfig.addPassthroughCopy(path);
	});

	// instead of the 'src/images/*', above, you can use the following to copy images by year
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
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data'
		}
	}

};