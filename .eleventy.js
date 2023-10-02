module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("source/Style/*");
   eleventyConfig.addPassthroughCopy("source/Images/*");
   eleventyConfig.addPassthroughCopy("source/*.ico");
   eleventyConfig.addPassthroughCopy("source/*.png");
   eleventyConfig.addPassthroughCopy("source/*.svg");
   eleventyConfig.addPassthroughCopy("source/*.webmanifest");
   eleventyConfig.addPassthroughCopy("source/*.xml");
   eleventyConfig.addPassthroughCopy("source/Documents/*");
   eleventyConfig.setLayoutResolution(false);

   return { dir: { input: "source", output: "_site" } };
};