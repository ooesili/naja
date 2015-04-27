function jsonNav() {
  var ddo = {
    restrict: 'A',
    templateUrl: require('./json_nav.jade'),
    controller: require('./json_nav.controller'),
    scope: {},
    controllerAs: 'vm',
    bindToController: true
  }
  return ddo;
}

export default jsonNav;
