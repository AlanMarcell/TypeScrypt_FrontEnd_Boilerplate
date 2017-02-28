var gulp = require('gulp')
var plumber = require('gulp-plumber')
var args = require('yargs').argv
var ts = require('gulp-typescript')
var config = require('./gulp.config')()
var del = require('del')
var $ = require('gulp-load-plugins')({
  lazy: 'true'
})

// --> Tasks
// -->Analyzing source with ESLint && TSLint
gulp.task('vet', ['vet_ts', 'vet_js'], function () {
  log('Analyzing source with ESHint && TSLint')
})

gulp.task('vet_js', function () {
  log('Analyzing source with ESLint')
  return gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.eslint())
    .pipe($.eslint.format())
  // .pipe($.eslint.failAfterError());
})

gulp.task('vet_ts', function () {
  log('Analyzing source with TSLint')
  return gulp.src(config.allts)
    .pipe(plumber())
    .pipe($.tslint({
      formatter: 'verbose'
    }))
    .pipe($.tslint.report())
})

gulp.task('js', function () {
  var tsProject = ts.createProject('tsconfig.json')

  return tsProject.src()
    .pipe(plumber())
    .pipe(tsProject())
    .pipe($.babel())
    .pipe(gulp.dest('.temp/js'))
})

gulp.task('css', ['clean-styles'], function () {
  log('Compile SASS --> CSS')
  return gulp
    .src(config.compass)
    .pipe(plumber())
    .pipe($.compass({
      config_file: './config.rb',
      css: config.css,
      sass: config.sass
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 version', '> 5%']
    }))
    .pipe(gulp.dest(config.css))
})

gulp.task('clean-styles', function () {
  var files = config.css
  clean(files)
})

gulp.task('clean-scripts', function () {
  var files = config.js
  clean(files)
})

gulp.task('css-w', ['css'], function () {
  gulp.watch([config.compass], ['css'])
})

// --> Functions
function clean (path) {
  log('Cleaning ' + $.util.colors.blue(path))
  del(path)
}

function log (msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.orange(msg[item]))
      }
    }
  } else {
    $.util.log($.util.colors.green(msg))
  }
}
