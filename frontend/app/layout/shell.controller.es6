ShellController.$inject = ['jsonData', 'toolbar'];
function ShellController(jsonData, toolbar) {
  var vm = this;
  vm.arrowImg = require('../images/arrow.svg')
  vm.toolbar = toolbar;
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
}

export default ShellController;
