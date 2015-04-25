import _ from 'lodash';
import 'angular';

// returns the directive definition object
jsonView.$inject = ['$compile', 'treeWalker'];
function jsonView($compile, treeWalker) {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function(scope, element, attrs) {
      var lines, stateTree;
      // parse the JSON object
      [lines, stateTree, scope.stateList] = treeWalker(scope.obj);
      // compile and insert the element into the DOM
      var newElement = angular.element(`<pre>${lines.join('')}</pre>`);
      $compile(newElement)(scope);
      element.replaceWith(newElement);
      // set up scope callbacks
      // select an object via view interaction
      scope.select = function(stateListIndex, $event) {
        $event.stopPropagation();
        // deselect previously selected state objects
        _.each(scope.selectedStateObjects, obj => obj.selected = false);
        scope.selectedStateObjects = [];
        // select this object
        var stateObject = scope.stateList[stateListIndex];
        stateObject.selected = true;
        scope.selectedStateObjects.push(stateObject)
      };
      // hover over an object
      scope.hover = function(stateListIndex, $event) {
        $event.stopPropagation();
        var stateObject = scope.stateList[stateListIndex];
        // mouse over
        if ($event.type === 'mouseover') { stateObject.hovered = true; }
        else                             { stateObject.hovered = false; }
      };
    }
  };
  // initialize scope state
  scope.selectedStateObjects = [];
}

export default jsonView;
