import 'angular';

var name = 'services';
export default name;

angular.module(name, [])
  .factory('jsonEsc', require('./json_esc'));
