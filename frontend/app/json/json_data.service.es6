import _ from 'lodash';

function JsonData() {
  // TODO: rename this
  var json = this;
  this.select = select;
  this.hover = hover;
  this.selectedStateObject = null;
  this.goLeft = goLeft;
  this.goUp = goUp;
  this.goDown = goDown;
  this.goRight = goRight;
  return;

  // select an object via view interaction
  function select(stateListIndex, $event) {
    $event.stopPropagation();
    // TODO: optimize
    // deselect previously selected state object
    if (this.selectedStateObject) {
      this.selectedStateObject.selected = false;
    }
    // select vm object
    var stateObject = this.stateList[stateListIndex];
    stateObject.selected = true;
    this.selectedStateObject = stateObject;
    refreshNavigation();
  }

  // hover over an object
  function hover(stateListIndex, $event) {
    $event.stopPropagation();
    var stateObject = this.stateList[stateListIndex];
    // mouse over
    if ($event.type === 'mouseover') { stateObject.hovered = true; }
    else                             { stateObject.hovered = false; }
  }

  function goLeft() {
    if (this.canGoLeft) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      stateObject.selected = false;
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      parent.selected = true;
      this.selectedStateObject = parent;
      refreshNavigation();
    }
  }

  function goUp() {
    if (this.canGoUp) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      stateObject.selected = false;
      var nextStateObject = parent.tree[stateObject.prevKey];
      nextStateObject.selected = true;
      this.selectedStateObject = nextStateObject;
      refreshNavigation();
    }
  }

  function goDown() {
    if (this.canGoDown) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      stateObject.selected = false;
      var nextStateObject = parent.tree[stateObject.nextKey];
      nextStateObject.selected = true;
      this.selectedStateObject = nextStateObject;
      refreshNavigation();
    }
  }

  function goRight() {
    if (this.canGoRight) {
      var stateObject = this.selectedStateObject;
      stateObject.selected = false;
      var firstKey = _.keys(stateObject.tree)[0];
      var firstChild = stateObject.tree[firstKey];
      firstChild.selected = true;
      this.selectedStateObject = firstChild;
      refreshNavigation();
    }
  }

  function refreshNavigation() {
    json.canGoLeft = json.selectedStateObject.zipper.length > 0;
    json.canGoRight = !!json.selectedStateObject.tree;
    json.canGoUp = json.selectedStateObject.isNotFirst;
    json.canGoDown = !!json.selectedStateObject.isNotLast;
  }
};

export default JsonData;
