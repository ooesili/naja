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
  this.goNext = goNext;
  this.goPrev = goPrev;
  this.can = {};
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
    if (this.can.goLeft) {
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
    if (this.can.goUp) {
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
    if (this.can.goDown) {
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
    if (this.can.goRight) {
      var stateObject = this.selectedStateObject;
      stateObject.selected = false;
      var firstKey = _.keys(stateObject.tree)[0];
      var firstChild = stateObject.tree[firstKey];
      firstChild.selected = true;
      this.selectedStateObject = firstChild;
      refreshNavigation();
    }
  }

  function goNext() {
    if (this.can.goNext) {
      var stateObject = this.selectedStateObject;
      stateObject.selected = false;
      var stateListIndex = stateObject.stateListIndex;
      var nextStateObject = this.stateList[stateListIndex + 1];
      nextStateObject.selected = true;
      this.selectedStateObject = nextStateObject;
      refreshNavigation();
    }
  }

  function goPrev() {
    if (this.can.goPrev) {
      var stateObject = this.selectedStateObject;
      stateObject.selected = false;
      var stateListIndex = stateObject.stateListIndex;
      var nextStateObject = this.stateList[stateListIndex - 1];
      nextStateObject.selected = true;
      this.selectedStateObject = nextStateObject;
      refreshNavigation();
    }
  }

  function refreshNavigation() {
    json.can.goLeft = json.selectedStateObject.zipper.length > 0;
    json.can.goRight = !!json.selectedStateObject.tree;
    json.can.goUp = json.selectedStateObject.prevKey !== undefined;
    json.can.goDown = json.selectedStateObject.nextKey !== undefined;
    var stateListIndex = json.selectedStateObject.stateListIndex;
    json.can.goPrev = stateListIndex > 0;
    json.can.goNext = stateListIndex < json.stateList.length - 1;
  }
};

export default JsonData;
