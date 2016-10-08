  // Ionic FOrum App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('forum', ['ionic', 'forum.controllers' , 'forum.controllers2' ,  'forum.services' , 'ngSanitize' , 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.speakers', {
      url: '/speakers',
      views: {
        'menuContent': {
          templateUrl: 'templates/speakers.html',
          controller : 'SpeakersCtrl'
        }
      }
    })
    .state('app.singlespeaker', {
      url: '/speakers/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/singlespeaker.html',
          controller : 'SpeakerCtrl'
        }
      }
    })
    .state('app.exposants', {
      url: '/exposants',
      views: {
        'menuContent': {
          templateUrl: 'templates/exposants.html',
          controller : 'ExposantsCtrl'
        }
      }
    })
    .state('app.singleexposant', {
      url: '/exposants/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/exposant.html',
          controller : 'ExposantCtrl'
        }
      }
    })

    .state('app.nouveautes', {
      url: '/nouveautes',
      views: {
        'menuContent': {
          templateUrl: 'templates/nouveautes.html',
        }
      }
    })
    .state('app.nouvsingle', {
      url: '/nouveautes/:type',
      views: {
        'menuContent': {
          templateUrl: 'templates/singlenouveaute.html',
          controller: 'NouvCtrl'
        }
      }
    })
    .state('app.infos', {
      url: '/infos',
      views: {
        'menuContent': {
          templateUrl: 'templates/infos.html',
        }
      }
    })
    .state('app.infosingle', {
      url: '/infos/:type',
      views: {
        'menuContent': {
          templateUrl: 'templates/singleinfo.html',
          controller: 'InfoCtrl'
        }
      }
    })

    .state('app.program', {
      url: '/program',
      views: {
        'menuContent': {
          templateUrl: 'templates/program.html',
          controller: 'ProgramCtrl'
        }
      }
    })
    .state('app.conference', {
      url: '/program/:type/:jour',
      views: {
        'menuContent': {
          templateUrl: 'templates/conference.html',
          controller: 'ConferenceCtrl'
        }
      }
    })
    .state('app.conf', {
      url: '/conf/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/conf.html',
          controller: 'ConfCtrl'
        }
      }
    })
    .state('app.forum', {
      url: '/forum',
      views: {
        'menuContent': {
          templateUrl: 'templates/forum.html',
          controller: 'ForumCtrl'
        }
      }
    })
    .state('app.exposition', {
      url: '/exposition',
      views: {
        'menuContent': {
          templateUrl: 'templates/exposition.html',
          controller: 'ExpoCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
