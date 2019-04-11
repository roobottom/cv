const { src, dest, parallel, watch } = require('gulp')
const nunjucks = require('gulp-nunjucks-render')
const connect = require('gulp-connect')

function server(cb) {
  connect.server({
    root: './docs'
  })
  cb()
}

function html() {
  return src('src/index.njk')
    .pipe(nunjucks({
      path: ['src/'],
    }))
    .pipe(dest('./docs'))
}

exports.html = html
exports.server = server

exports.default = parallel(server, html)

watch(['src/**/*.njk'], parallel(html))