const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const htmlmin = require("html-minifier");
const sass = require("sass");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("source/Style/Fonts");
   eleventyConfig.addPassthroughCopy("source/*.ico");
   eleventyConfig.addPassthroughCopy("source/*.png");
   eleventyConfig.addPassthroughCopy("source/*.svg");
   eleventyConfig.addPassthroughCopy("source/*.webmanifest");
   eleventyConfig.addPassthroughCopy("source/*.xml");
   eleventyConfig.addPassthroughCopy("source/Documents/*");
   eleventyConfig.setLayoutResolution(false);

   // Enable inclusive language (seems to not be working).
   eleventyConfig.addPlugin(inclusiveLangPlugin, {
      templateFormats: ["md", "html"],
      words: "simply,obviously,basically,of course,clearly,everyone knows,however,easy"
   });

   // Minify HTML.
   eleventyConfig.addTransform("htmlmin", function (content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
         let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
         });
         return minified;
      }

      return content;
   });

   // Enable SASS.
   eleventyConfig.addTemplateFormats("scss");
   eleventyConfig.addExtension("scss", {
      outputFileExtension: "css",
      compile: async function (inputContent) {
         let result = sass.compileString(inputContent);
         return async (data) => {
            return result.css;
         };
      }
   });

   // Get my age.
   eleventyConfig.addShortcode("MyAge", function getAge() {
      var today = new Date();
      var birthDate = new Date("1992-11-13");
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }

      return age;
   });

   // Use the order in main pages’ front matters to sort them.
   eleventyConfig.addCollection("MainNavPages", function (collectionApi) {
      var x = collectionApi.getFilteredByTag("MainNavPages");
      var y = x.sort((a, b) => {
         return a.data.order - b.data.order;
      });
      return y;
   });

   // Get the current year.
   eleventyConfig.addShortcode("CurrentYear", () => new Date().getFullYear());

   // Produce responsive images.
   eleventyConfig.addShortcode("image", async function (src, alt, sizes = "100vw") {
      let metadata = await Image(src, {
         widths: [300, 600, 900, 1200, 1400, 1600, 1800, 2000, "auto"],
         formats: ["avif", "webp", "auto"],
         outputDir: '_site/Images',
         urlPath: '/Images'
      });

      let imageAttributes = {
         alt,
         sizes,
         loading: "lazy",
         decoding: "async",
      };

      return Image.generateHTML(metadata, imageAttributes);
   });

   return { dir: { input: "source", output: "_site" } };
};