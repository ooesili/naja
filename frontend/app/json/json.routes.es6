jsonViewRoutes.$inject = ['$routeProvider'];
function jsonViewRoutes($routeProvider) {
  $routeProvider
    .when('/new', {
      templateUrl: require('./new.jade'),
      controller: 'NewJsonController',
      controllerAs: 'vm'
    })
    .when('/show', {
      templateUrl: require('./show.jade'),
      controller: 'ShowJsonController',
      controllerAs: 'vm'
    });
}

export default jsonViewRoutes;
