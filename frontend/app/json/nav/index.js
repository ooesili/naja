import 'angular';

var name = 'app.json.nav';
export default name;

angular.module(name, [])
  .directive('jsonNav', require('./json_nav.directive'))
  ;
