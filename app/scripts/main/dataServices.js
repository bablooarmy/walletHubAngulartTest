define(['angularAMD'], function (angularAMD) {
  'use strict';
  angular.module("dataServices", [])
  .service("ShareDataService", function () {
      var someText;
      this.setSomeText = function(val){
        someText = val;
      }
      this.getSomeText = function () {
          return someText;
      }
  });
});
