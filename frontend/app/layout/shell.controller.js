ShellController.$inject = ['jsonData', 'toolbar'];
function ShellController(jsonData, toolbar) {
  var vm = this;
  vm.arrowImg = require('../images/arrow.svg')
  vm.doubleArrowImg = require('../images/double_arrow.svg')
  vm.toolbar = toolbar;
  vm.json = jsonData;
  vm.keyDown = keyDown;
  vm.clearObj = clearObj;
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

  function keyDown(e) {
    if (jsonData.active) {
      switch (e.key) {
        case 'h':
        case 'ArrowLeft':
          jsonData.goLeft();
          e.preventDefault();
          break;
        case 'j':
        case 'J':
        case 'ArrowDown':
          if (e.shiftKey) { jsonData.goNext(); }
          else            { jsonData.goDown(); }
          e.preventDefault();
          break;
        case 'k':
        case 'K':
        case 'ArrowUp':
          if (e.shiftKey) { jsonData.goPrev(); }
          else            { jsonData.goUp(); }
          e.preventDefault();
          break;
        case 'l':
        case 'ArrowRight':
          jsonData.goRight();
          e.preventDefault();
          break;
      }
    }
  }

  function clearObj() {
    jsonData.obj = null
    jsonData.unparsed = null;
  }
}

export default ShellController;
