import 'angular';

var name = 'app.json.val';
export default name;

angular.module(name, [])
  .directive('jsonVal', require('./json_val.directive'))
  ;
