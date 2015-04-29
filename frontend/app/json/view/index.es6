import 'angular';

var name = 'app.json.view';
export default name;

angular.module(name, [])
  .factory('treeWalker', require('./tree_walker.service'))
  .directive('jsonView', require('./json_view.directive'))
  .animation('.json-obj', require('./json_obj.animation'))
  ;
