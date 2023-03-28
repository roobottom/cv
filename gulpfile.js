const { src, dest, watch, series } = require('gulp')
const less = require('gulp-less')
const prince = require('prince')
const util = require('util')
const cp = require('child_process')
const babel = require('gulp-babel')

const css = () => {
  return src(['./_source/_less/styles.less', './_source/_less/pdf-styles.less'])
    .pipe(less())
    .pipe(dest('./_site/assets'))
}

const eleventyLocal = (callback) => {
  return cp.spawn("npx", ["eleventy", '--serve'], { stdio: "inherit" })
  callback()
}
const eleventy = (callback) => {
  return cp.spawn("npx", ["eleventy"], { stdio: "inherit" })
  callback()
}

const pdf = (callback) => {
  prince()
    .inputs('./_site/index.html')
    .output('./_site/jon-roobottom-cv.pdf')
    .option('style', './_site/assets/pdf-styles.css')
    .execute()
    .then(function () {
      console.log('PDF generated OK')
    }, function() {
        console.log('PDF generation failed', util.inspect(error))
    })
  callback()
}

const js = (callback) => {
  return src('./_source/app.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('./_site'))
}

exports.default = function(callback) {
  eleventyLocal()
  watch(['./_site/index.html', './_source/_less/**/*.less', './_source/app.js'], 
    { ignoreInitial: false }, 
    series(css, js, pdf))
  callback()
}
exports.build = series(eleventy, js, css, pdf)