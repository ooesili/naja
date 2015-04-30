var path = require('path');
var webpack = require('webpack');

// main configuration object
var config = {
  context: path.resolve(__dirname, 'app'),
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  resolve: {
    extensions: ['', '.js', '.css', '.jade']
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /\/node_modules\//, loader: 'babel-loader'},
      {test: /\.jade$/, loader: 'file?name=[path][name].html!jade-html'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.svg$/, loader: 'file'},
      {test: require.resolve('jquery'), loader: 'expose?jQuery'}
    ],
  },
  plugins: []
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
// development configuration
else {
  config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
    })
  );
}

module.exports = config;
