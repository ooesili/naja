import _ from 'lodash';

// walk the object and return the data structures we need
treeWalker.$inject = ['jsonEsc'];
function treeWalker(jsonEsc) {
  return main;

  function main(topObject) {
    var lines = [],
        stateList = [],
        stateListIndex;
    function go(zipper, isLast, upperKey) {
      // prepend a upperKey to a string if upperKey is given
      function maybePrependKey(string) {
        if (upperKey) { return `${jsonEsc(upperKey)}: ${string}`; }
        else          { return string; }
      }
      // append a comma to a string if isLast is true
      function maybeAddComma(string) {
        if (isLast) { return string; }
        else        { return string + ','; }
      }
      // opening div for this object, with event and class bindings
      function prependDiv(string) {
        return `<div ng-class="{hovered: vm.data.stateList[${stateListIndex}].hovered, selected: vm.data.stateList[${stateListIndex}].selected}" ng-mousedown="vm.select(${stateListIndex}, $event)" ng-mouseover="vm.hover(${stateListIndex}, $event)" ng-mouseout="vm.hover(${stateListIndex}, $event)">${string}`;
      }
      // used for indetation and is passed into the tree structure
      var depth = zipper.length;
      // create this part of the state tree
      var thisStateObject = {
        hovered: false,
        selected: false,
        zipper: zipper
      };
      // push the state object to the flat list
      stateListIndex = stateList.push(thisStateObject) - 1;
      // indentation, and a method to indent a string
      var indentation = _.repeat('  ', depth);
      function indent(string) { return indentation + string; }
      // unzip object from tree
      var thisObject = _.reduce(zipper, (obj, key) => obj[key], topObject);
      // figure out the type
      var isObject = _.isObject(thisObject);
      var isArray = _.isArray(thisObject);
      // object or array
      if (isObject && !_.isEmpty(thisObject)) {
        // before recursion
        var startLine, endLine, keys;
        if (isArray) {
          startLine = '[';
          keys = _.times(thisObject.length);
          thisStateObject.tree = [];
        }
        else {
          startLine = '{';
          keys = _.keys(thisObject);
          thisStateObject.tree = {};
        }
        lines.push(prependDiv(indent(maybePrependKey(startLine))));
        // recursion
        let lastIndex = keys.length - 1;
        _.each(keys, function(key, index) {
          // create a new zipper
          var newZipper = _.clone(zipper);
          newZipper.push(key);
          if (isArray) {
            let returnedStateObject = go(newZipper, indent == lastIndex);
            thisStateObject.tree.push(returnedStateObject);
          }
          else {
            let returnedStateObject = go(newZipper, indent == lastIndex, key);
            thisStateObject.tree[key] = returnedStateObject;
          }
        });
        // after recursion
        if (isArray) { endLine = ']'; }
        else         { endLine = '['; }
        let formattedEndLine = indent(maybeAddComma(endLine));
        lines.push(`${formattedEndLine}</div>`);
      }
      // scalar or empty object
      else {
        let line = indent(maybePrependKey(maybeAddComma(jsonEsc(thisObject))));
        lines.push(prependDiv(`${line}</div>`));
      }
      return thisStateObject;
    }
    var stateTree = go([], true);
    return [lines, stateTree, stateList];
  }
}

export default treeWalker;
