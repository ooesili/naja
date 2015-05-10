var path = require('path');
var webpack = require('webpack');

// main configuration object
var config = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    app: './app',
  },
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
      {test: /\/app\/index\.jade$/, loader: 'file?name=index.html!jade-html'},
      {
        test: /\.jade$/,
        exclude: /\/app\/index\.jade$/,
        loader: 'file?name=[hash].html!jade-html'
      },
      {test: /\.css$/, loader: 'style!css'},
      {
        test: /\.(svg|png|eot|woff2?|ttf)$/,
        loader: 'file'
      },
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
    'lodash': '_',
    'angular-route': 'null',
    'angular-animate': 'null',
  };
}
// development configuration
else {
  // split vendor libs into a seperate chunk
  config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  );
  config.entry.vendor = [
    'jquery',
    'lodash',
    'angular',
    'angular-route',
    'angular-animate',
  ]
}

module.exports = config;
