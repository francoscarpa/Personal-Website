const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("source/images/*")
   eleventyConfig.addPlugin(eleventySass);
   return { dir: { input: "source", output: "_site" } };
};
