JsonViewController.$inject = ['jsonData'];
function JsonViewController(jsonData) {
  var vm = this;
  vm.select = select;
  vm.hover = hover;
  vm.data = jsonData;
  vm.data.selectedStateObjects = [];
  return;

  // select an object via view interaction
  function select(stateListIndex, $event) {
    $event.stopPropagation();
    // TODO: optimize
    // deselect previously selected state objects
    _.each(vm.data.selectedStateObjects, obj => obj.selected = false);
    vm.data.selectedStateObjects = [];
    // select vm object
    var stateObject = vm.data.stateList[stateListIndex];
    stateObject.selected = true;
    vm.data.selectedStateObjects.push(stateObject)
  }

  // hover over an object
  function hover(stateListIndex, $event) {
    $event.stopPropagation();
    var stateObject = vm.data.stateList[stateListIndex];
    // mouse over
    if ($event.type === 'mouseover') { stateObject.hovered = true; }
    else                             { stateObject.hovered = false; }
  };
}

export default JsonViewController;
