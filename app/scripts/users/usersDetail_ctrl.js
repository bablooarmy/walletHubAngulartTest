define(['app','main/state_name'], function (app) {
  'use strict';
  app.controller('UsersDetailsController', function ($scope, $stateParams) {
    $scope.person = $scope.users[$stateParams.user_id];
  });
});
