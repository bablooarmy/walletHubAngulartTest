define(['app'], function (app) {

  app.controller('BindingSampleController', function ($scope) {
        $scope.field1 = 100;
        $scope.field2 = 100;
        $scope.field3 = 100;

        $scope.$watchGroup(['field1','field2','field3'], function (newValues, oldValues) {
            if (newValues) {
              $scope.total = parseInt(newValues[0]) + parseInt(newValues[1]) + parseInt(newValues[2]);
            }
        });

        $scope.editTotal = function(){
          var oldValue = parseInt($scope.field1) + parseInt($scope.field2) + parseInt($scope.field3);
          $scope.field1 = (parseInt($scope.total)/oldValue)*parseInt($scope.field1);
          $scope.field2 = (parseInt($scope.total)/oldValue)*parseInt($scope.field2);
          $scope.field3 = (parseInt($scope.total)/oldValue)*parseInt($scope.field3);
        };

        $scope.tabInputs = [1,2,3];

        $scope.tabInputKeyup = function(e){
          var elementIndex = parseInt(e.target.id.substr(e.target.id.lastIndexOf('_')+1));
          var focusedIndex;
          if(e.target.value.length === 5 &&  elementIndex >= 0 && elementIndex < $scope.tabInputs.length-1 ){
            console.log("next");
            focusedIndex = elementIndex + 1;
            angular.element(document.getElementById('tabInputField_'+focusedIndex))[0].focus();
          }
          else if (e.target.value.length === 0 && e.which === 8 &&  elementIndex > 0 && elementIndex <= $scope.tabInputs.length-1) {
            console.log("prev");
            focusedIndex = elementIndex - 1;
            angular.element(document.getElementById('tabInputField_'+focusedIndex))[0].focus();;
          }
        };
    });

});
