const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("source/Images/*")
   eleventyConfig.addPlugin(eleventySass);
   return { dir: { input: "source", output: "_site" } };
};
