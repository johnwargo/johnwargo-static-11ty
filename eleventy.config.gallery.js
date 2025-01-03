// https://www.bash.lk/posts/tech/1-elventy-image-gallery/
// https://photoswipe.com/getting-started/
const sharp = require('sharp');
const Image = require('@11ty/eleventy-img');

const GALLERY_IMAGE_WIDTH = 256;
const LANDSCAPE_LIGHTBOX_IMAGE_WIDTH = 1280;
const PORTRAIT_LIGHTBOX_IMAGE_WIDTH = 1024;

async function galleryImageShortcode(src, alt) {
    let lightboxImageWidth = LANDSCAPE_LIGHTBOX_IMAGE_WIDTH;

    const metadata = await sharp(src).metadata();

    // console.log(`[galleryImageShortcode] ${src}`);

    if (metadata.height > metadata.width) {
        lightboxImageWidth = PORTRAIT_LIGHTBOX_IMAGE_WIDTH;
    }

    const options = {
        formats: ['jpeg'],
        widths: [GALLERY_IMAGE_WIDTH, lightboxImageWidth],
        urlPath: "/gen/",
        outputDir: './_site/gen/'
    }

    const genMetadata = await Image(src, options);

    return `
        <a href="${genMetadata.jpeg[1].url}" 
        data-pswp-width="${genMetadata.jpeg[1].width}" 
        data-pswp-height="${genMetadata.jpeg[1].height}" 
        target="_blank">
            <img src="${genMetadata.jpeg[0].url}" alt="${alt}" />
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");;
}

function galleryShortcode(content, name) {
    // console.log(`[galleryShortcode] "${name}"`);
    return `
      <div>
          <div class="gallery" id="gallery-${name}">
              ${content}
          </div>
          <script type="module">
              import PhotoSwipeLightbox from '/assets/js/photoswipe-lightbox.esm.min.js';
              import PhotoSwipe from '/assets/js/photoswipe.esm.min.js';
              const lightbox = new PhotoSwipeLightbox({
                  gallery: '#gallery-${name}',
                  children: 'a',
                  pswpModule: PhotoSwipe
                });
              lightbox.init();
          </script>
      </div>
  `.replace(/(\r\n|\n|\r)/gm, "");
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPairedLiquidShortcode('gallery', galleryShortcode)
    eleventyConfig.addLiquidShortcode('galleryImage', galleryImageShortcode)
}
