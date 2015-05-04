Toolbar.$inject = ['$timeout'];
function Toolbar($timeout) {
  var toolbar = this;
  var toolbarPromise = null;
  toolbar.cancelShow = cancelShow;
  toolbar.show = show;
  // toolbar images
  toolbar.arrowImg = require('../images/arrow.svg')
  toolbar.doubleArrowImg = require('../images/double_arrow.svg')
  toolbar.checkmarkImg = require('../images/checkmark.svg');
  toolbar.editImg = require('../images/edit.svg');
  return;

  function cancelShow() {
    if (toolbarPromise) {
      $timeout.cancel(toolbarPromise);
    }
  }

  function show() {
    if (toolbar.visibleOnPage) {
      toolbarPromise = $timeout(function() {
        toolbar.visible = true;
      }, 800);
    }
  }
}

export default Toolbar;
