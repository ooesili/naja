import 'angular';

var name = 'directives';
export default name;

angular.module(name, [])
  .directive('jsonView', require('./json_view'));
