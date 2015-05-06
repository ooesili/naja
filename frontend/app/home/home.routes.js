homeRoutes.$inject = ['$routeProvider'];
function homeRoutes($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: require('./home.jade'),
      controller: 'HomeController',
      controllerAs: 'vm',
    });
}

export default homeRoutes;
