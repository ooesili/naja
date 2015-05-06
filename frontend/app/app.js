require.include('./index.jade');
import 'jquery';
import 'angular';
import 'angular-route';
import 'angular-animate';
import './styles';

angular.module('app', [
  'ngRoute',
  'ngAnimate',
  require('./json'),
  require('./layout'),
  require('./home')
])
  .config(require('./app.routes'))
  ;
