import 'angular';

var name = 'app.json_nav';
export default name;

angular.module(name, [])
  .controller('MainCtrl', require('./main_ctrl'))
  .factory('jsonEsc', require('./json_esc'))
  .filter('zipper', require('./zipper'))
  .factory('treeWalker', require('./tree_walker'))
  .controller('JsonViewController', require('./json_view_controller'))
  .value('jsonData', require('./json_data.service'))
  .directive('jsonView', require('./json_view'));
