Toolbar.$inject = ['$timeout'];
function Toolbar($timeout) {
  var toolbar = this;
  var toolbarPromise = null;
  toolbar.cancelShow = cancelShow;
  toolbar.show = show;
  // toolbar images
  toolbar.arrowImg = require('./toolbar_icons/arrow.svg')
  toolbar.doubleArrowImg = require('./toolbar_icons/double_arrow.svg')
  toolbar.checkmarkImg = require('./toolbar_icons/checkmark.svg');
  toolbar.editImg = require('./toolbar_icons/edit.svg');
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
