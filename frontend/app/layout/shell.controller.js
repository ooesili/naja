ShellController.$inject = ['jsonData', 'toolbar'];
function ShellController(jsonData, toolbar) {
  var vm = this;
  // toolbar images
  vm.arrowImg = require('../images/arrow.svg')
  vm.doubleArrowImg = require('../images/double_arrow.svg')
  vm.checkmarkImg = require('../images/checkmark.svg');
  vm.editImg = require('../images/edit.svg');
  // shared data
  vm.toolbar = toolbar;
  vm.json = jsonData;
  // functions
  vm.keyDown = keyDown;
  vm.clearObj = clearObj;
  vm.parse = parse;

  function keyDown(e) {
    if (jsonData.obj !== undefined) {
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
    delete jsonData.obj;
    jsonData.can = {};
    delete jsonData.selectedStateObject;
  }

  function parse() {
    var parsed;
    // try to parse the input
    try {
      parsed = JSON.parse(vm.json.unparsed);
    } catch (e) {
      console.log("An error occured while parsing your input");
      return;
    }
    // set data and redirect
    jsonData.obj = parsed;
  }
}

export default ShellController;
