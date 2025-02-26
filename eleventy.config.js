const yaml = require("js-yaml");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets/js/*.js");
  eleventyConfig.addPassthroughCopy("src/assets/images");

  eleventyConfig.addDataExtension("yaml", contents => {
    let c = yaml.load(contents);
    return c;
  });

  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }));

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: '_includes',
    },
    templateFormats : ["md", "njk"],
    htmlTemplateEngine : "njk",
  };

};
