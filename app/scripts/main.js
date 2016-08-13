require.config({
  baseUrl: 'scripts/',

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': 'ext/angular',
    'angular-ui-router': 'ext/angular-ui-router',
    'angular-animate': 'ext/angular-animate.min',
    'angularAMD': 'ext/angularAMD',
    'async': 'ext/async',
    'ngload': 'ext/ngload',
    'ui-bootstrap': 'ext/ui-bootstrap-tpls',

    'HomeController': 'main/home_ctrl',
    'BindingSampleController': 'main/bindingSample_ctrl',
    'DirectiveSampleController': 'main/directiveSample_ctrl',
    'UsersFavoritesController': 'users/usersFavorites_ctrl',
    'UsersDetailsController': 'users/usersDetail_ctrl'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angularAMD': [ 'angular' ],
    'angular-ui-router': [ 'angular' ],
    'angular-animate': ['angular']
  },

  // kick start application
  deps: ['app']
});
