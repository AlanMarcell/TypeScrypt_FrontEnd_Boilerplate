module.exports = () => {
  var src = './src/'
  var temp = './.temp/'

  var config = {
    src: './src/',
    temp: temp,
    alljs: [
      src + '/**/*.js',
      './*.js',
      '!node_modules/**'
    ],
    allts: [
      src + 'scripts/**.ts'
    ],
    compass: src + '/**/*.scss',
    css: temp + 'css',
    sass: './src/sass/'
  }
  return config
}
