import 'angular';

var name = 'controllers';
export default name;

angular.module(name, [])
  .controller('MainCtrl', require('./main_ctrl'));
