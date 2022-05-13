module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("source/*.css");
	eleventyConfig.addPassthroughCopy("source/Images/*");
	
	return {
		dir: {
			input: "source",
    	}
  	};
};