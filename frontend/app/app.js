require.include('./index.jade');
import 'jquery';
import 'angular';
import 'angular-route';
import './styles';

angular.module('app', [
  'ngRoute',
  require('./json'),
  require('./layout')
])
  .config(require('./app.routes'))
  ;
