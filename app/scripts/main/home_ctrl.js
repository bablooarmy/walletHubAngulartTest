define(['app','ngload!main/dataServices'], function (app) {
  'use strict';
  app.controller('HomeController', function ($scope, ShareDataService) {
        $scope.employees = [{id:'1', name:'Carl', age:'32'},
                            {id:'2', name:'Joe', age:'33'},
                            {id:'3', name:'George', age:'26'},
                            {id:'4', name:'Fernandas', age:'36'},
                            {id:'5', name:'Nicklas', age:'40'},
                            {id:'6', name:'Mittal', age:'28'}];

        $scope.propertyName = 'age';
        $scope.reverse = false;

        $scope.sortEmployee = function(e,id){
          if($scope.propertyName === id){
            $scope.reverse = !$scope.reverse;
          }
          else{
            $scope.propertyName = id;
            $scope.reverse = false;
          }
        };

        $scope.someTextUpdated = function(e){
          ShareDataService.setSomeText($scope.someText);
        };
    });
});
