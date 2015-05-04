import _ from 'lodash';
import $ from 'jquery';
import 'angular';

// returns the directive definition object
jsonView.$inject = ['$compile', 'treeWalker', 'jsonData'];
function jsonView($compile, treeWalker, jsonData) {
  var ddo = {
    restrict: 'E',
    link: link,
    controller: require('./json_view.controller'),
    controllerAs: 'vm',
    bindToController: true
  };

  function link(scope, element, attrs, vm) {
    var lines;
    // parse the JSON object
    [lines, jsonData.stateTree, jsonData.stateList] = treeWalker(jsonData.obj);
    // compile and insert the element into the DOM
    var newElement = angular.element(
      `<div class="json-view">${lines.join('')}</div>`
    );
    // set event hander
    var previousHovered;
    newElement.on('mousedown mouseover mouseout',  '.json-obj', dispatch);
    // store elements in the state tree and list
    newElement.find('.json-obj').each(function(index) {
      jsonData.stateList[index].elem = $(this);
    });
    element.append(newElement);
    return;

    function dispatch(e) {
      e.stopPropagation();
      var elem = $(this);
      var stateObject = jsonData.stateList[elem.data('state-index')];
      if (e.type === 'mousedown') {
        jsonData.select(stateObject);
        scope.$apply();
      } else if (e.type === 'mouseover') {
        elem.addClass('hovered');
        previousHovered = elem;
      } else /* mouseout */ {
        previousHovered.removeClass('hovered');
      }
    }
  }

  return ddo;
}

export default jsonView;
