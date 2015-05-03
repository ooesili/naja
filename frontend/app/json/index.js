import 'angular';

var name = 'app.json';
export default name;

angular.module(name, [
  require('./view'),
  require('./nav'),
  require('./val')
])
  .config(require('./json.routes'))
  .factory('jsonEsc', require('./json_esc.service'))
  .controller('ShowJsonController', require('./show_json.controller'))
  .service('jsonData', require('./json_data.service'))
  .service('toolbar', require('./toolbar.service'))
  ;
