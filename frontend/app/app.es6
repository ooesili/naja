require.include('./index.jade');
import 'angular';
import 'angular-route';
import './styles';

angular.module('app', [
  'ngRoute',
  require('./json_nav'),
  require('./layout')
]).config(require('./app.routes'));
