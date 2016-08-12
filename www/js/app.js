// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.push']);

app.run(function($http, $ionicPlatform) {
    $ionicPlatform.ready(function() {

        // var callback = function(token) {
        //   alert('Registered token:', token.token);
        //   push.saveToken(token, {'ignore_user': true});
        // }

        // push.register(callback);

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
        .state('app.favorite', {
            url: '/favorite',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favorite.html',
                    controller: 'FavoriteCtrl'
                }
            }
        })
        .state('app.shops', {
            url: '/shops',
            views: {
                'menuContent': {
                    templateUrl: 'templates/shops.html',
                    controller: 'shopsCtrl'
                }
            }
        })

    .state('app.shop-detail-view', {
            url: '/shops/:shopId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/shop.html',
                    controller: 'shopDetailViewCtrl'
                }
            }
        })
        .state('app.histories', {
            url: '/histories',
            views: {
                'menuContent': {
                    templateUrl: 'templates/histories.html',
                    controller: 'HistoriesCtrl'
                }
            }
        })
        .state('app.calendar', {
            url: '/calendar',
            views: {
                'menuContent': {
                    templateUrl: 'templates/calendar.html',
                    controller: 'CalendarCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/shops');
});