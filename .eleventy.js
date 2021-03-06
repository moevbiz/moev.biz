
module.exports = function(config) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // use a filter for simple css minification
  config.addFilter("cssmin", require("./src/utils/minify-css.js"));

  // js minify
  config.addNunjucksAsyncFilter("jsmin", require("./src/utils/minify-js.js"));

  config.setPugOptions({debug:true})


  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats : ["njk"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
