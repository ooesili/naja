import $ from 'jquery';
import _ from 'lodash';

HomeController.$inject = ['$scope'];
function HomeController($scope) {
  var vm = this;
  // screenshots
  vm.editImg = require('./screenshots/edit.png');
  vm.enterImg = require('./screenshots/enter.png');
  vm.hoverImg = require('./screenshots/hover.png');
  vm.keyboardImg = require('./screenshots/keyboard.png');
  vm.toolbarImg = require('./screenshots/toolbar.png');
  // initialize scrolling
  var scrollPoints = {
    navigation: $('.home-panel-hover'),
    intro: $('.home-panel-enter'),
  };
  vm.scrollOn = null;
  // scroll event handler
  var container = $('.home-scroll-base');
  console.log(container);
  container.on('scroll', function() {
    var currentScroll = container.scrollTop();
    // figure out where we are
    _.any(scrollPoints, function(elem, name) {
      return elem.position().top < currentScroll && (vm.scrollOn = name);
    }) || (vm.scrollOn = null);
    $scope.$apply();
  });
  // "anchor" scrolling
  vm.scrollTo = scrollTo;
  return;

  function scrollTo(name) {
    var position;
    if (name === 'top') {
      position = 0;
    } else {
      var position = scrollPoints[name].position().top + 5;
    }
    // find the current scroll point
    container.animate({
      scrollTop: position
    }, 250);
  }
}

export default HomeController;
