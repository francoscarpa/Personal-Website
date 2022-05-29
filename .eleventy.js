const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("source/Images/*");
   eleventyConfig.addPassthroughCopy("source/*.ico");
   eleventyConfig.addPassthroughCopy("source/*.png");
   eleventyConfig.addPassthroughCopy("source/*.svg");
   eleventyConfig.addPassthroughCopy("source/*.webmanifest");
   eleventyConfig.addPassthroughCopy("source/*.xml");
   eleventyConfig.addPassthroughCopy("source/Documents/*");
   eleventyConfig.addPlugin(eleventySass);
   return { dir: { input: "source", output: "_site" } };
};
