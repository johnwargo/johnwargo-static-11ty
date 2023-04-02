const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
// https://github.com/11ty/eleventy/issues/2301
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Transforms
// https://learneleventyfromscratch.com/lesson/31.html#minifying-html-output
const htmlMinTransform = require('./src/transforms/html-min.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';


module.exports = eleventyConfig => {

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
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
		if (!post.templateContent) return '';
		if (post.templateContent.indexOf('</p>') > 0) {
			let end = post.templateContent.indexOf('</p>');
			return post.templateContent.substr(0, end + 4);
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

	eleventyConfig.addFilter("filterByCategory", function (posts, cat) {
		// case matters, so let's lowercase the desired category, cat	and we will 
		// lowercase our posts categories as well
		cat = cat.toLowerCase();
		let result = posts.filter(p => {
			let cats = p.data.categories.map(s => s.toLowerCase());
			return cats.includes(cat);
		});
		return result;
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

	const english = new Intl.DateTimeFormat("en");
	eleventyConfig.addFilter("niceDate", function (d) {
		return english.format(d);
	});

	eleventyConfig.addFilter("commaize", function (num) {
		return num.toLocaleString("us-en");
	});

	// Copy the favicon files to the root folder
	eleventyConfig.addPassthroughCopy({ 'src/favicon/*': '/' });
	// Copy the data files
	eleventyConfig.addPassthroughCopy("src/_data/*");
	// https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/
	["src/assets/css/", "src/assets/js/", "src/assets/sass/", "src/assets/webfonts/"].forEach((path) => {
		eleventyConfig.addPassthroughCopy(path);
	});
	
	
	// Images folders, assumes cascading folders per year
	// TODO: Do this image file copy in a loop of years
	// eleventyConfig.addPassthroughCopy("src/images/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2009/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2010/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2011/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2012/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2013/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2014/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2015/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2016/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2017/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2018/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2019/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2020/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2021/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2022/*");	
	// eleventyConfig.addPassthroughCopy("src/images/2023/*");	


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