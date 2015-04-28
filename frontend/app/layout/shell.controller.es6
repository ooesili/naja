ShellController.$inject = ['jsonData', '$timeout', 'toolbarData'];
function ShellController(jsonData, $timeout, toolbarData) {
  var vm = this;
  var toolbarPromise = null;
  vm.toolbar = toolbarData;
  vm.cancelToolbarPromise = cancelToolbarPromise;
  vm.showToolbar = showToolbar;
  vm.json = jsonData;
  vm.obj = {
    string: "Hello world!",
    array: [
      'Hello',
      'world!',
      {
        arrayObject: {
          arrObjArr: {
            oh: 'yeah'
          }
        }
      }
    ],
    subObj: {
      'Hello': 'World!',
      'Quote': '"Test"',
      'Backslash': '\\Back\\slash\\'
    },
    nestedArrays: [
      [1,2,3,4],
      [5,6,7,8],
      [[9],[10]]
    ],
    '<em>injected</em>': '<strong>strong</strong>'
  };

  function cancelToolbarPromise() {
    if (toolbarPromise) {
      $timeout.cancel(toolbarPromise);
    }
  }

  function showToolbar() {
    if (vm.toolbar.showOnPage) {
      toolbarPromise = $timeout(function() {
        vm.toolbar.show = true;
      }, 800);
    }
  }
}

export default ShellController;
