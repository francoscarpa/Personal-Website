const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Uso la proprietà order nei front matter delle pagine principali per mostrarle
  // in un certo ordine all’interno del menu di navigazione
  eleventyConfig.addCollection("mainMenuPages", function (collectionApi) {
    var x = collectionApi.getFilteredByTag("mainMenuPage");
    var y = x.sort((a, b) => {
      return a.data.order - b.data.order;
    });
    return y;
  });

  return {
    dir: {
      input: "source",
    },
    templateFormats: ["html", "liquid", "njk", "css", "png", "jpg", "jpeg", "xml", "ico", "txt", "gif", "svg", "webmanifest", "js", "ttf", "json", "pdf"],
  };
};
