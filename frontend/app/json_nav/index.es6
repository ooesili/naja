import 'angular';

var name = 'app.json_nav';
export default name;

angular.module(name, [])
  .factory('jsonEsc', require('./json_esc'))
  .filter('zipper', require('./zipper'))
  .factory('treeWalker', require('./tree_walker'))
  .controller('JsonViewController', require('./json_view_controller'))
  .value('jsonData', require('./json_data.service'))
  .config(require('./json_view.routes'))
  .directive('jsonView', require('./json_view'));
