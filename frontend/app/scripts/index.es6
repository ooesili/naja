import 'angular';

// create the main application module
angular.module('app', [
  require('./controllers'),
  require('./directives'),
  require('./filters'),
  require('./services')
]);
