const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

gulp.task('sass', () => {
  gulp.src('./src/scss/style.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']}),
      cssnano()
    ]))
    .pipe(rename((path) => path.basename += '.min'))
    .pipe(gulp.dest('./out/css'))

  gulp.src('./src/scss/style.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']})
    ]))
    .pipe(gulp.dest('./out/css'))
})

gulp.task('js', () =>
  browserify({
    entries: [
      './src/js/app.js'
    ],
    extensions: ['*.js'],
    debug: false
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./out/js'))
)

gulp.task('watch', () => {
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  gulp.watch('./src/js/**/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch'])
