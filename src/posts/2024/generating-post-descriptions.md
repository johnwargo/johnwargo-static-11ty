---
title: Generating Eleventy Post Descriptions Using Generative AI
description: Using Generative AI to automatically populate post descriptions on
  a website has been a game-changer for me. By adding a description field to the
  site's post template and modifying the home page and articles page to display
  these descriptions, I've streamlined the process of providing context for each
  post. Additionally, the Visual Studio Code extension called Describer GenAI
  has been a valuable tool in generating descriptions for article files being
  edited in Visual Studio Code. With just a ChatGPT API key and YAML front
  matter in the article file, the extension does the heavy lifting of creating
  concise summaries. Installation and configuration are straightforward, and
  using the extension to generate descriptions is a breeze. The prompt used for
  generating descriptions has been effective, but I'm open to suggestions for
  improvement. Overall, leveraging Generative AI for post descriptions has been
  a time-saving and efficient solution for my website.
date: 2024-03-18
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Artificial Intelligence
generatedDescription: true
---

When I migrated this site from Joomla to Eleventy, I added a description field to the site's standard post template:

```yaml
---
title: Generating Post Descriptions Using Generative AI
description: 
date: 2024-03-18
showCoffee: true
headerImage: 
headerImageAltText: 
headerImageAttribution: 
categories:
  - Artificial Intelligence
---
```

With that in place, I modified the home page and the [Articles](/articles/){target="_blank"} page to display the contents of the post's `description` field if it was populated. If it's not populated, the site pulls the first paragraph of the article using some highly modified code I pulled from [Raymond Camden](https://www.raymondcamden.com/){target="_blank"}'s site.

I've been working in the Generative AI (GenAI) space for a few months now, and one of the things I wanted to do was use GenAI to populate post descriptions for me. I thought about building something that generated descriptions for the site's posts during the build process, but sometimes the first paragraph was good enough, so there's a lot of posts in this site that don't have a description populated. Yes, I know, I could build something that only generated descriptions for newer posts, but that wouldn't work for me for the same reason: I don't assign descriptions to all posts on this site.

If you remember back to last year, I published an article called [Visual Studio Code Progress Cancelled by Async Task](/posts/2023/vscode-extension-progress/) where I showed how to do something I thought was cool in a Visual Studio Code extension. I wrote that because I always wanted to publish a Visual Studio Code extension, and I'd started playing around with doing so. The end result is that I created a new Visual Studio Code extension called [Describer GenAI](https://github.com/johnwargo/vscode-describer-genai){target="_blank"} that I published to the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=john-wargo.describer-genai){target="_blank"} a few weeks back.

The extension uses ChatGPT to generate a description of an article/post file being edited in Visual Studio Code.

To use the extension, the only requirements are:

1. You must have a ChatGPT API key
2. The article/post file being edited must have YAML front matter as shown at the beginning of the article.

When you invoke the extension's `generate` command, the extension:

1. Validates that the extension was configured with a ChatGPT API key.
2. Checks to make sure the file being edited has YAML front matter.
3. Grabs the article content (excluding the front matter) and sends it to ChatGPT with a prompt that asks it to generate a brief description of the article.
4. When the response comes back from the ChatGPT API, the extension adds the description to the post's front matter `description` property (configurable, see below).

Now, I'm not an expert in GenAI prompt Engineering, but I was able to get good enough results using the following prompt:

> With the article content delimited with triple double quote marks """${genText}""", generate a concise summary of the article using first-person perspective as if I am summarizing it myself

In this case, `genText` contains the content of the article (again, minus the front matter).

**Note:** If someone wants to suggest a better version of this, please let me know.

## Installation

The extension installs just like any other Visual Studio Code extension, simply search for it using 'describer' and you should be able to find it easily.

## Configuration

You must configure the extension before you can use it. To open the extension's configuration settings, open the Visual Studio Code Command Palette and select **Open Describer Settings** as shown in the figure below:

{% image "src/images/2024/describer-genai-01.png", "Visual Studio Code Command Palette", "image-full" %}

Visual Studio Code will open the settings panel for the extension as shown in the figure below:

{% image "src/images/2024/describer-genai-02.png", "Describer GenAI Settings in Visual Studio Code", "image-full" %}

The following table describes each of the configuration options.

| Name                  | Description |
| --------------------- | ----------- |
| API Key               | A valid ChatGPT API key. |
| Enable Generated Flag | When enabled, adds a `generatedDescription` property to the file's front matter and sets the value to `true`. I used this to display different content in the site when I'm showing a generated description instead of one I wrote myself. In this site's case, it adds 'AI generated' before the description. |
| Target Property       | By default, the extension saves the generated description to the file's `description` front matter property. If you would like the extension to save the generated description to a different front matter property, enter the name of the property in this field. |

## Usage

Once you configured the extension with an API key, to generate a description of an article, right click in the article content and select **Generate Description** as shown in the following figure:

{% image "src/images/2024/describer-genai-03.png", "Invoking the generator", "image-full" %}

The extension will spin for a few seconds, then update the front matter with a description as shown in the following example:

```yaml
---
title: Generating Eleventy Post Descriptions Using Generative AI
description: Using Generative AI to automatically populate post descriptions on
  a website has been a game-changer for me. By adding a description field to the
  site's post template and modifying the home page and articles page to display
  these descriptions, I've streamlined the process of providing context for each
  post. Additionally, the Visual Studio Code extension called Describer GenAI
  has been a valuable tool in generating descriptions for article files being
  edited in Visual Studio Code. With just a ChatGPT API key and YAML front
  matter in the article file, the extension does the heavy lifting of creating
  concise summaries. Installation and configuration are straightforward, and
  using the extension to generate descriptions is a breeze. The prompt used for
  generating descriptions has been effective, but I'm open to suggestions for
  improvement. Overall, leveraging Generative AI for post descriptions has been
  a time-saving and efficient solution for my website.
date: 2024-03-18
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Artificial Intelligence
generatedDescription: true
---
```

That's all there is to it and it works pretty well. Sometimes ChatGPT forgets that I want the description generated from a first person perspective as shown in the example above. To get a better description, just run the generation process again and you'll get something different:

```yaml
---
title: Generating Eleventy Post Descriptions Using Generative AI
description: Using Generative AI to automatically populate post descriptions on
  a website has been a game-changer for me. By adding a description field to the
  site's post template and modifying the home page and articles page to display
  these descriptions, I've streamlined the process of providing context for each
  post. Additionally, the Visual Studio Code extension called Describer GenAI
  has been a valuable tool in generating descriptions for article files being
  edited in Visual Studio Code. With just a ChatGPT API key and YAML front
  matter in the article file, the extension does the heavy lifting of creating
  concise summaries. Installation and configuration are straightforward, and
  using the extension to generate descriptions is a breeze. The prompt used for
  generating descriptions has been effective, but I'm open to suggestions for
  improvement. Overall, leveraging Generative AI for post descriptions has been
  a time-saving and efficient solution for my website.
date: 2024-03-18
showCoffee: true
headerImage: null
headerImageAltText: null
headerImageAttribution: null
categories:
  - Artificial Intelligence
generatedDescription: true
---
```

## Using `generatedDescription`

Notice the `generatedDescription` property. With that in place, I show a text pill in article lists that says 'AI Generated' using the following code:

{% highlight liquid %}
<p>{%- if post.data.generatedDescription %}
  <span class="generated">
  <a href="https://github.com/johnwargo/vscode-describer-genai"
      target="_blank">
      AI Generated
    </a>
  </span>&nbsp;
  {%- endif %}
  {{ post.data.description }}
</p>
{% endhighlight %}
