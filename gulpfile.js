var gulp = require('gulp')
var plumber = require('gulp-plumber')
var args = require('yargs').argv
var ts = require('gulp-typescript')
var config = require('./gulp.config')()
var del = require('del')
var $ = require('gulp-load-plugins')({
  lazy: 'true'
})

// ==> Tasks
// --> Analyzing source with ESLint && TSLint
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

// --> Transpiling
gulp.task('js', ['webpack', 'babel', 'tsc'])

// TSC
gulp.task('tsc', ['clean-tsc'], function () {
  var tsProject = ts.createProject('tsconfig.json')

  return tsProject
    .src()
    .pipe(plumber())
    .pipe(tsProject())
    .pipe(gulp.dest(config.es6_folder))
})
// Babel
gulp.task('babel', ['clean-babel'], function () {
  return gulp.src(config.es6_files)
    .pipe(plumber())
    .pipe($.babel())
    .pipe(gulp.dest(config.es5_folder))
})
// Webpack
gulp.task('webpack', ['clean-webpack'], function () {
  return gulp
    .src(config.es5_files)
    .pipe(plumber())
    .pipe($.webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(config.webpack_folder))
})
// SASS
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

// --> Cleaning target folders
gulp.task('clean-tsc', function () {
  var files = config.temp_js
  clean(files)
})

gulp.task('clean-babel', function () {
  var files = config.es5_folder
  clean(files)
})

gulp.task('clean-webpack', function () {
  var files = config.webpack_files
  clean(files)
})

gulp.task('clean-css', function () {
  var files = config.css
  clean(files)
})

gulp.task('css-w', ['css'], function () {
  gulp.watch([config.compass], ['css'])
})

// --> Functions
function clean(path) {
  log('Cleaning ' + $.util.colors.blue(path))
  del(path)
}

function log(msg) {
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
