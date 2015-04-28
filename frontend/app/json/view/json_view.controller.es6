JsonViewController.$inject = ['jsonData'];
function JsonViewController(jsonData) {
  var vm = this;
  vm.json = jsonData;
  vm.json.selectedStateObject = null;
  return;
}

export default JsonViewController;
