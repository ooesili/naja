import 'angular';

var name = 'app.json';
export default name;

angular.module(name, [])
  .value('jsonData', require('./json_data.service'))
  .factory('jsonEsc', require('./json_esc.service'))
  .directive('jsonView', require('./json_view.directive'))
  .config(require('./json.routes'))
  .factory('treeWalker', require('./tree_walker.service'))
  .filter('zipper', require('./zipper.filter'))
  ;
