var path = require('path'),
    webpack = require('webpack');
    BowerWebpackPlugin = require('bower-webpack-plugin');

// main configuration object
var config = {
  context: path.resolve(__dirname, 'app'),
  entry: '.',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  resolve: {
    extensions: ['', '.es6', '.js', '.css']
  },
  module: {
    loaders: [
      {test: /\.es6$/, loader: 'babel-loader'},
      {test: /\.jade$/, loader: 'file?name=[path][name].html!jade-html'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /concise\.js$/, loader: 'imports?jQuery=jquery'}
    ],
  },
  plugins: [
    new BowerWebpackPlugin()
  ]
};

// production configuration
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
  // these will be provided by CDNs (see index.jade)
  config.externals = {
    'angular': 'angular',
    'jquery': 'jQuery',
    'lodash': '_'
  };
}

module.exports = config;
