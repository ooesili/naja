appRoutes.$inject = ['$routeProvider'];
function appRoutes($routeProvider) {
  $routeProvider
    .otherwise('/new');
}

export default appRoutes;
