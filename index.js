const postcss = require('postcss')
const fs = require('fs')

//https://github.com/postcss/postcss#js-api
const processCSS = (file) => {
  fs.readFile(file, (err, css) => {
    postcss()
    .process(css, { from: './styles.css', to: './styles-processed.css' })
    .then(result => {
      fs.writeFile('./styles-processed.css', result.css, () => true)
    })
  })
}