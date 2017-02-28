module.exports = {
  entry: './dist/src/app.js',
  output: {
    path: __dirname + '/dist/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}
