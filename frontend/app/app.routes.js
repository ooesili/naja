appRoutes.$inject = ['$routeProvider'];
function appRoutes($routeProvider) {
  $routeProvider
    .otherwise('/show');
}

export default appRoutes;
