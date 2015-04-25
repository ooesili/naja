import 'angular';

var name = 'app.json';
export default name;

angular.module(name, [])
  .config(require('./json.routes'))
  .factory('jsonEsc', require('./json_esc.service'))
  .factory('treeWalker', require('./tree_walker.service'))
  .filter('zipper', require('./zipper.filter'))
  .directive('jsonView', require('./json_view.directive'))
  .controller('NewJsonController', require('./new_json.controller'))
  .controller('ShowJsonController', require('./show_json.controller'))
  .value('jsonData', require('./json_data.service'))
  ;
