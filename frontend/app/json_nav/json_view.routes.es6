jsonViewRoutes.$inject = ['$routeProvider'];
function jsonViewRoutes($routeProvider) {
  $routeProvider
    .when('/show', {
      templateUrl: require('./show.jade')
    });
}

export default jsonViewRoutes;
