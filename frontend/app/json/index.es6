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
  .controller('NewJsonController', require('./new_json.controller'))
  .controller('ShowJsonController', require('./show_json.controller'))
  .value('jsonData', require('./json_data.service'))
  ;
