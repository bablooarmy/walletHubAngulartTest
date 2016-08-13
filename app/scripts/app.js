define(['common'], function (angularAMD) {
  'use strict';
  var app = angular.module('angularTest', ['ui.router','ngAnimate']);

  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', angularAMD.route({
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }))
      .state('directiveSample', angularAMD.route({
        url: '/directiveSample',
        templateUrl: 'views/directiveSample.html',
        controller: 'DirectiveSampleController'
      }))
      .state('bindingSample', angularAMD.route({
        url: '/bindingSample',
        templateUrl: 'views/bindingSample.html',
        controller: 'BindingSampleController'
      }))
      .state('users', angularAMD.route({
        url: '/users',
        abstract: true,
        controllerUrl: 'users/usersList_ctrl',
        templateUrl: 'views/users.html'
      }))
      .state('users.list', {
        url: '/list',
        templateUrl: 'views/users/list.html'
      })
      .state('users.favorites', {
          url: '/favorites',
          views: {
              'details@users': {
                  controller: 'UsersFavoritesController',
                  resolve: {
                    controllerLoaded: function($q, $rootScope){
                      var defer = $q.defer();
                      require(['UsersFavoritesController'], function (ctrl) {
                          defer.resolve(ctrl);
                          $rootScope.$apply();
                      });
                      return defer.promise;
                    }
                  },
                  templateUrl: 'views/users/favorites.html'
              }
          }
      })
      .state('users.detail', {
          url: '/{user_id:[0-9]+}',
          views: {
              'details@users': {
                  controller: 'UsersDetailsController',
                  resolve:{
                    controllerLoaded: function($q, $rootScope){
                        var defer = $q.defer();
                        require(['UsersDetailsController'], function (ctrl) {
                            defer.resolve(ctrl);
                            $rootScope.$apply();
                        });
                        return defer.promise;
                      }
                  },
                  templateUrl: 'views/users/details.html'
              }
          }
      });

    // Else
    $urlRouterProvider
      .otherwise('/home');


  }]);

  // to support (541) 754-3010
    app.directive('telephoneLink', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
              // Specify how UI should be updated
              ngModel.$render = function() {
                element[0].value = ngModel.$viewValue || '';
              };

              // Listen for change events to enable binding
              element.on('blur keypress change', function(e) {
                if(parseInt(e.key) >= 0 && parseInt(e.key) <= 9){
                  scope.$evalAsync(formatTelephone);
                }
                else{
                  e.preventDefault();
                }
              });
              formatTelephone(); // initialize

              // Write data to the model
              function formatTelephone() {
                var formattedTelephoneValue;

                if (ngModel.$viewValue){
                  var inputNumbers = ngModel.$viewValue.replace( /[^0-9]/g, '');
                  console.log('inputNumbers = ' + inputNumbers);
                  if(inputNumbers.length === 3) {
                    formattedTelephoneValue = '('+inputNumbers.substr(0,3)+')';
                  }
                  else if(inputNumbers.length === 4){
                    formattedTelephoneValue = '('+inputNumbers.substr(0,3)+') ' + inputNumbers.substr(3);
                  }
                  else if(inputNumbers.length >= 7){
                    formattedTelephoneValue = '('+inputNumbers.substr(0,3)+') ' + inputNumbers.substr(3,3) + '-' + inputNumbers.substr(6);
                  }
                  else{
                    formattedTelephoneValue = ngModel.$viewValue;
                  }
                }
                console.log('formattedTelephoneValue = ' + formattedTelephoneValue);
                ngModel.$setViewValue(formattedTelephoneValue);
                ngModel.$rollbackViewValue();
              }

            }
        };

    });

    // to support $1,234
    app.directive('currencyLink', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
              // Specify how UI should be updated
              ngModel.$render = function() {
                element[0].value = ngModel.$viewValue || '';
              };

              // Listen for change events to enable binding
              element.on('blur keypress change', function(e) {
                if(parseInt(e.key) >= 0 && parseInt(e.key) <= 9){
                  scope.$evalAsync(formatTelephone);
                }
                else{
                  e.preventDefault();
                }
              });
              formatTelephone(); // initialize

              // Write data to the model
              function formatTelephone() {
                var formattedCurrencyValue;

                if (ngModel.$viewValue){
                  var inputNumbers = ngModel.$viewValue.replace( /[^0-9]/g, '');
                  var currencySymbol = '$';
                  var currencySeperator = ',';
                  var currencyDecimal = 3;
                  var i;
                  console.log('inputCurrency = ' + inputNumbers);
                  if(inputNumbers.length % currencyDecimal === 0) {
                    formattedCurrencyValue = '$' + inputNumbers.substr(0,currencyDecimal);
                    var currencyParts = (inputNumbers.length/currencyDecimal)-1;
                    i = currencyDecimal;
                    while (currencyParts>0) {
                      formattedCurrencyValue = formattedCurrencyValue + currencySeperator + inputNumbers.substr(i,currencyDecimal);
                      i = i + currencyDecimal;
                      currencyParts--;
                    }
                  }
                  else if(inputNumbers.length > currencyDecimal){
                    var firstPart = inputNumbers.length % currencyDecimal;
                    var currencyParts = (inputNumbers.length-(inputNumbers.length % currencyDecimal))/currencyDecimal;
                    formattedCurrencyValue = '$' + inputNumbers.substr(0,inputNumbers.length % currencyDecimal);
                    i = firstPart;
                    while (currencyParts>0) {
                      formattedCurrencyValue = formattedCurrencyValue + currencySeperator + inputNumbers.substr(i,currencyDecimal);
                      i = i + currencyDecimal;
                      currencyParts--;
                    }
                  }
                  else{
                    formattedCurrencyValue = '$' + inputNumbers.substr(0);
                  }
                }
                console.log('formattedCurrencyValue = ' + formattedCurrencyValue);
                ngModel.$setViewValue(formattedCurrencyValue);
                ngModel.$rollbackViewValue();
              }

            }
        };

    });

    // to support $1,234
    app.directive('restrictMaxChar', function () {
        return {
            restrict: 'A',
            scope: {
              maxChar: '@restrictMaxChar'
            },
            link: function (scope, element, attrs) {
              element.on('keydown',function(e){
                if(e.target.value.length >= parseInt(scope.maxChar) && e.which !== 8){
                  e.preventDefault();
                }
              });
            }
          }
        });

  return angularAMD.bootstrap(app);
});
