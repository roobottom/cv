const markdownIt = require("markdown-it")
const markdownItAttrs = require("markdown-it-attrs")
const markdownItDiv = require("markdown-it-div")
const { DateTime } = require("luxon")


module.exports = function (config) {

  //markdown-it config
  let mdOptions = {
    typographer: true,
    quotes: '“”‘’',
    html: true
  }
  let md =  markdownIt(mdOptions)
            .use(markdownItAttrs)
            .use(markdownItDiv)

  //11ty md config
  config.setLibrary("md", md)
  config.addPairedShortcode("markdown", function(content) {
    return md.render(content)
  })
  

  config.addFilter("date", (dateObj, format = 'LLLL kkkk') => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  })


  //passthough
  config.addPassthroughCopy("_source/assets")
  config.addPassthroughCopy("_source/CNAME")


  return {
    dir: {
      input: "_source",
      includes: "_includes",
      layouts: "_layouts",
      dataTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      templateFormats: ["html", "njk"]
    }
  }
  
}