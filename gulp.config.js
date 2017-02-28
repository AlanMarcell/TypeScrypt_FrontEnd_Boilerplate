module.exports = () => {
  var src = 'src/'
  var temp = '.temp/'
  var dist = 'dist/'

  var config = {

    // Path Folders
    src: './src/',
    temp: temp,
    dist: dist,

    // JS Files
    alljs: [
      src + '/**/*.js',
      './*.js',
      '!node_modules/**'
    ],

    // TS Files
    allts: [
      src + 'scripts/**.ts'
    ],
    // Transpiling
    // TSC
    es6_files: temp + 'js/app.js',
    es6_folder: temp + 'js/',
    // Babel
    es5_folder: dist + 'src/',
    es5_files: dist + 'src/app.js',
    // Webpack
    webpack_folder: dist + 'public/',
    webpack_files: dist + 'public/bundle.js',
    // CSS Files
    compass: src + '/**/*.scss',
    css: temp + 'css',
    sass: './src/sass/'
  }
  return config
}

    // // Final Folders
    // temp_js: temp + 'js/app.js',
    // dist_public_js: dist + 'public/',
    // dist_src_js: dist + 'src/',
