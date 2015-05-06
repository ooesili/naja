import 'angular';

var name = 'app.home';
export default name;

angular.module(name, [])
  .controller('HomeController', require('./home.controller'))
  .config(require('./home.routes'))
  ;
