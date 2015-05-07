jsonViewRoutes.$inject = ['$routeProvider'];
function jsonViewRoutes($routeProvider) {
  $routeProvider
    .when('/app', {
      templateUrl: require('./show.jade'),
      controller: 'ShowJsonController',
      controllerAs: 'vm'
    });
}

export default jsonViewRoutes;
