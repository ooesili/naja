function jsonVal() {
  var ddo = {
    restrict: 'A',
    templateUrl: require('./json_val.jade'),
    controller: require('./json_val.controller'),
    controllerAs: 'vm',
    scope: {}
  }
  return ddo;
}

export default jsonVal;
