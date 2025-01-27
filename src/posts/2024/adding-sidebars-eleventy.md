---
title: Adding Sidebars to an Eleventy Site
description: 
date: 2024-11-03
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Eleventy
timestamp: 2024-11-03T19:43:49.564Z
---

I decided recently that one of the things missing from this site was the ability to have call-outs in the content. My buddy Scott Good was here this weekend working on something in my workshop, so, while we waited for some glue to dry, I asked him to add some call-out CSS to the site. After he left, I added some code to the site to make it all work.

This site uses [Markdown](https://daringfireball.net/projects/markdown/){target="_blank"} files for posts and Markdown already supports Blockquotes:

> The [blockquote](https://w3.org/TR/2011/WD-html5-author-20110809/the-blockquote-element.html){target="_blank"} element represents a section that is quoted from another source. Content inside a blockquote must be quoted from another source, whose address, if it has one, may be cited in the cite attribute. If the cite attribute is present, it must be a valid URL potentially surrounded by spaces.

This allows me to create indented text, but it doesn't feel like a call-out or sidebar.

What I wanted to be able to do is take content from the article and generate something like the following from it:

```html
<div>
  <h3>Sidebar Title</h3>
  <p>Brisket meatball shoulder prosciutto pork loin shank ham. Capicola short loin ground round pork chop, jowl filet mignon spare ribs pork belly tri-tip kielbasa sausage t-bone drumstick cupim. Landjaeger ham biltong, prosciutto corned beef meatball pork belly pig porchetta turducken. Shank pork chop jowl tail.</p>
</div>
```

Then, with the appropriate styling, it will look something like this:

{% sidebar "Sidebar Title" %}
Brisket meatball shoulder prosciutto pork loin shank ham. Capicola short loin ground round pork chop, jowl filet mignon spare ribs pork belly tri-tip kielbasa sausage t-bone drumstick cupim. Landjaeger ham biltong, prosciutto corned beef meatball pork belly pig porchetta turducken. Shank pork chop jowl tail.
{% endsidebar %}

## Implementing Sidebars As Shown

Scott added some CSS styling to the site:

```css
div.wim {
  padding: 1.5rem 1.5rem 1.8rem 1.5rem;
  margin: 1.5rem 4rem 1.6rem 1.5rem;
  background: #f5f5f5;
  border: 2pt solid #ccc;
  box-shadow: 5px 5px 5px #eee;
}

div.wim h3 {
  margin: 0 0 0.6rem;
}

div.wim p {
  margin: 0;
}
```

I originally wanted this sidebar thingie to be a sort of What it Means (WIM) block on the page, so that's why the styles have `wim` in them.

Next, I added a paired shortcode to the site:

```javascript
eleventyConfig.addPairedShortcode("sidebar", function (content, title = "What it Means") {
  // What it means (WIM) block
  var paragraphs = content.split(/(?:\r?\n)+/);
  var rc = '<div class="wim">';
  c += `<h3>${title}</h3>`;
  paragraphs.forEach(paragraph => {
    if (paragraph.trim() === '') return;
    rc += `<p>${paragraph}</p>`;
  });
  rc += '</div>';
  return rc;
});
```

The code generates the HTML block shown at the top of the article with the required `wim` class assignment.

```html
<div class'wim'>
  <h3>Sidebar Title</h3>
  <p>Brisket meatball shoulder prosciutto pork loin shank ham. Capicola short loin ground round pork chop, jowl filet mignon spare ribs pork belly tri-tip kielbasa sausage t-bone drumstick cupim. Landjaeger ham biltong, prosciutto corned beef meatball pork belly pig porchetta turducken. Shank pork chop jowl tail.</p>
</div>
```

The code accepts a sidebar title, but if I omit one, it uses "What It Means" instead.

Then, to use it in an article, I simply do this:

{% highlight liquid %}
{% sidebar "Sidebar Title" %}
Brisket meatball shoulder prosciutto pork loin shank ham. Capicola short loin ground round pork chop, jowl filet mignon spare ribs pork belly tri-tip kielbasa sausage t-bone drumstick cupim. Landjaeger ham biltong, prosciutto corned beef meatball pork belly pig porchetta turducken. Shank pork chop jowl tail.
{% endsidebar %}
{% endhighlight %}

Which generates the side bar shown at the end of the previous section.
