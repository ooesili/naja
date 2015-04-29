require.include('./index.jade');
import 'angular';
import 'angular-animate';
import 'angular-route';
import './styles';

angular.module('app', [
  'ngAnimate',
  'ngRoute',
  require('./json'),
  require('./layout')
])
  .config(require('./app.routes'))
  ;
