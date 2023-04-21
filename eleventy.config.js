const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
// https://github.com/11ty/eleventy/issues/2301
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const pluginDate = require("eleventy-plugin-date");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");

// Transforms
// https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output
const htmlMinTransform = require('./src/transforms/html-min.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(embedYouTube);
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
		return num.toLocaleString("us-en");
	});

	// Copy the data files
	eleventyConfig.addPassthroughCopy("src/_data/*");
	// https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/
	// Copy the favicon files to the root folder
	eleventyConfig.addPassthroughCopy({ 'src/favicon/*': '/' });
	["src/assets/css/", "src/assets/js/", "src/assets/sass/", "src/assets/webfonts/"].forEach((path) => {
		eleventyConfig.addPassthroughCopy(path);
	});

	// Images folders
	eleventyConfig.addPassthroughCopy("src/images/*");
	eleventyConfig.addPassthroughCopy("src/images/avatar/*");
	eleventyConfig.addPassthroughCopy("src/images/common/*");
	eleventyConfig.addPassthroughCopy("src/images/covers/*");
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