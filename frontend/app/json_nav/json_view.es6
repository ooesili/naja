import _ from 'lodash';
import 'angular';

// returns the directive definition object
//jsonView.$inject = ['$compile', 'treeWalker', 'JsonViewController'];
//function jsonView($compile, treeWalker, JsonViewController) {
jsonView.$inject = ['$compile', 'treeWalker', 'jsonData'];
function jsonView($compile, treeWalker, jsonData) {
  var ddo = {
    template: '<div></div>',
    restrict: 'E',
    link: link,
    controller: require('./json_view_controller'),
    controllerAs: 'vm',
    bindToController: true,
    scope: {obj: '='}
  };

  function link(scope, element, attrs, vm) {
    var lines;
    // parse the JSON object
    [lines, jsonData.stateTree, jsonData.stateList] = treeWalker(vm.obj);
    // compile and insert the element into the DOM
    var newElement = angular.element(`<pre>${lines.join('')}</pre>`);
    $compile(newElement)(scope);
    element.replaceWith(newElement);
  }

  return ddo;
}

export default jsonView;
