define(['main/state_name'], function () {
  'use strict';
  return ['$scope', function ($scope) {
    $scope.message = 'Comprehensive User List';
    $scope.users = [{ id:0, name: "Jacob" }, { id:1, name: "Nicole" }, { id:2, name: "Jerry" }];
  }];
});
