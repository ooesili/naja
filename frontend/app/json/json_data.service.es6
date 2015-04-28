import _ from 'lodash';

function JsonData() {
  this.select = select;
  this.hover = hover;
  this.selectedStateObject = null;
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
    // navigation flags
    this.canGoLeft = stateObject.zipper.length > 0;
    this.canGoRight = !!stateObject.tree;
    this.canGoUp = stateObject.isNotFirst;
    this.canGoDown = !!stateObject.isNotLast;
  }

  // hover over an object
  function hover(stateListIndex, $event) {
    $event.stopPropagation();
    var stateObject = this.stateList[stateListIndex];
    // mouse over
    if ($event.type === 'mouseover') { stateObject.hovered = true; }
    else                             { stateObject.hovered = false; }
  }
};

export default JsonData;
