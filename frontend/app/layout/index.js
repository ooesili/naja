import 'angular';

var name = 'layout';
export default name;

angular.module(name, [])
  .controller('ShellController', require('./shell.controller'));
