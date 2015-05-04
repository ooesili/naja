import $ from 'jquery'
import _ from 'lodash';

function JsonData() {
  // TODO: rename this
  var json = this;
  this.select = select;
  this.selectedStateObject = null;
  this.goLeft = goLeft;
  this.goUp = goUp;
  this.goDown = goDown;
  this.goRight = goRight;
  this.goNext = goNext;
  this.goPrev = goPrev;
  this.can = {};
  this.clearObj = clearObj;
  this.parse = parse;
  return;

  function clearObj() {
    delete json.obj;
    json.can = {};
    delete json.selectedStateObject;
  }

  function parse() {
    var parsed;
    // try to parse the input
    try {
      parsed = JSON.parse(json.unparsed);
    } catch (e) {
      console.log("An error occured while parsing your input");
      return;
    }
    // set data and redirect
    json.obj = parsed;
  }

  function animate(elem) {
    // find the container's position
    var viewContainer = $('.json-view-container');
    var viewTop = viewContainer.scrollTop();
    var viewHeight = viewContainer.height();
    var viewBottom = viewTop + viewContainer.height();
    // find the element's position
    var elemTop = elem.position().top;
    var elemHeight = elem.height();
    var elemBottom = elemTop + elem.height();
    // for animation
    var duration = 250;
    // cancel previous animation
    viewContainer.stop();
    // the top of the selection is out of view, or it's simply too big
    if (elemTop < viewTop || elemHeight > viewHeight) {
      viewContainer.animate({
        scrollTop: elemTop + 1
      }, duration);
    // bottom of selection is out of view
    } else if (elemBottom > viewBottom) {
      viewContainer.animate({
        scrollTop: viewTop + (elemBottom - viewBottom)
      }, duration);
    }
  }

  function select(stateObject) {
    // select this object and deselect the previous one
    if (json.selectedStateObject) {
      json.selectedStateObject.elem.removeClass('selected');
    }
    // select this one and remember it for next time
    json.selectedStateObject = stateObject;
    stateObject.elem.addClass('selected');
    // run animation
    animate(stateObject.elem);
    // update the rest of the program
    refreshNavigation();
  }

  function goLeft() {
    if (this.can.goLeft) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      this.select(parent);
    }
  }

  function goUp() {
    if (this.can.goUp) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      var nextStateObject = parent.tree[stateObject.prevKey];
      this.select(nextStateObject);
    }
  }

  function goDown() {
    if (this.can.goDown) {
      var stateObject = this.selectedStateObject;
      var parentZipper = stateObject.zipper.slice(0, -1);
      var parent = _.reduce(parentZipper, function(accum, key) {
        return accum.tree[key];
      }, this.stateTree);
      var nextStateObject = parent.tree[stateObject.nextKey];
      this.select(nextStateObject);
    }
  }

  function goRight() {
    if (this.can.goRight) {
      var stateObject = this.selectedStateObject;
      var firstKey = _.keys(stateObject.tree)[0];
      var firstChild = stateObject.tree[firstKey];
      this.select(firstChild);
    }
  }

  function goNext() {
    if (this.can.goNext) {
      var stateObject = this.selectedStateObject;
      var stateListIndex = stateObject.stateListIndex;
      var nextStateObject = this.stateList[stateListIndex + 1];
      this.select(nextStateObject);
    }
  }

  function goPrev() {
    if (this.can.goPrev) {
      var stateObject = this.selectedStateObject;
      var stateListIndex = stateObject.stateListIndex;
      var nextStateObject = this.stateList[stateListIndex - 1];
      this.select(nextStateObject);
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
