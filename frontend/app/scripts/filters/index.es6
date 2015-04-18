import 'angular';

var name = 'filters';
export default name;

angular.module(name, [])
  .filter('zipper', require('./zipper'));
