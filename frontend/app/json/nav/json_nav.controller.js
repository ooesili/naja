import _ from 'lodash';

JsonNavController.$inject = ['$scope', 'jsonData'];
function JsonNavController($scope, jsonData) {
  var vm = this;
  vm.data = jsonData;
  $scope.$watch('vm.data.selectedStateObject', function() {
    if (jsonData.selectedStateObject) {
      var zipper = jsonData.selectedStateObject.zipper;
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
