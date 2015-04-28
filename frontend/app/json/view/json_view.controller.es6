JsonViewController.$inject = ['jsonData'];
function JsonViewController(jsonData) {
  var vm = this;
  vm.select = select;
  vm.hover = hover;
  vm.json = jsonData;
  vm.json.selectedStateObject = null;
  return;

  // select an object via view interaction
  function select(stateListIndex, $event) {
    $event.stopPropagation();
    // TODO: optimize
    // deselect previously selected state object
    if (vm.json.selectedStateObject) {
      vm.json.selectedStateObject.selected = false;
    }
    // select vm object
    var stateObject = vm.json.stateList[stateListIndex];
    stateObject.selected = true;
    vm.json.selectedStateObject = stateObject;
  }

  // hover over an object
  function hover(stateListIndex, $event) {
    $event.stopPropagation();
    var stateObject = vm.json.stateList[stateListIndex];
    // mouse over
    if ($event.type === 'mouseover') { stateObject.hovered = true; }
    else                             { stateObject.hovered = false; }
  };
}

export default JsonViewController;
