import _ from 'lodash';

JsonNavController.$inject = ['$scope', 'jsonData'];
function JsonNavController($scope, jsonData) {
  var vm = this;
  vm.data = jsonData;
  $scope.$watch('vm.data.selectedStateObjects', function() {
    if (jsonData.selectedStateObjects[0]) {
      var zipper = jsonData.selectedStateObjects[0].zipper;
      vm.code = _.reduce(zipper, function(accum, key) {
        return accum + `[${JSON.stringify(key)}]`;
      }, 'data');
    }
    else {
      vm.code = "Please select something";
    }
  });
}

export default JsonNavController;
