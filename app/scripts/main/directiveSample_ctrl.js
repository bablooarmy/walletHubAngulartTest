define(['app','ngload!main/dataServices'], function (app) {
  'use strict';
  app.controller('DirectiveSampleController', function ($scope, ShareDataService) {
        $scope.someTextUpdated = ShareDataService.getSomeText();
    });
});
