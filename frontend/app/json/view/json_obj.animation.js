import $ from 'jquery';

function jsonObjAnimation() {
  return {
    addClass: addClass
  };

  function addClass(elem, className) {
    // TODO: cancel previous animation
    // stop if we aren't selecting
    if (className !== 'selected') { return; }
    // find the container's position
    var viewContainer = $('.json-view').parent();
    var viewTop = viewContainer.scrollTop();
    var viewHeight = viewContainer.height();
    var viewBottom = viewTop + viewContainer.height();
    // find the element's position
    var elemTop = elem.position().top;
    var elemHeight = elem.height();
    var elemBottom = elemTop + elem.height();
    // for animation
    var duration = 250;
    // the top of the selection is out of view, or it's simply too big
    if (elemTop < viewTop || elemHeight > viewHeight) {
      viewContainer.animate({
        scrollTop: elemTop + 1
      }, duration);
    // bottom of selection is out of view
    } else if (elemBottom > viewBottom) {
      viewContainer.animate({
        scrollTop: viewTop + (elemBottom - viewBottom)
      }, duration);
    }
  }
}

export default jsonObjAnimation;
