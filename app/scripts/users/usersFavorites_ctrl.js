define(['app','main/state_name'], function (app) {
  'use strict';
  app.controller('UsersFavoritesController', function ($scope) {
    $scope.person = $scope.users[0];
  });
});
