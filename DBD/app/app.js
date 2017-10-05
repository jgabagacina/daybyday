PPTGenerator = angular.module('PPTGenerator', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'Alertify',
    // 'ui.router',
    'multiStepForm'
]);
__backendLink = "http://localhost/__backEnd/";
// (function() {

//     PPTGenerator.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//         var permission = function(SessionService, $cookies, $location) {

//             SessionService.sessionCheck({ Token: $cookies.get('__token') }).then(
//                 function(check) {


//                 },
//                 function(checmultiStepForm   k){
//                  console.log(check);
//                     if (check!= true) {
//                         $location.path('/');
//                     }
//                 }

//             );


//         }
//         $stateProvider

//          .state('logIn',{
//              url:'/',
//              controller: 'Authentication',
//                 templateUrl: 'app/views/login.html',
//                 resolve: {
//                     permission: function(SessionService, $location) {
//                         if (SessionService.loggedIn())
//                             return $location.path('/Home');

//                     }
//                 }

//          })
//          .state('home',{
//              url:'/Home',
//              controller: 'Main',
//                 templateUrl: 'app/views/home.html',
//                 resolve: {
//                     permission: permission
//                 }

//          })
//              .state('songs',{
//              url:'/Songs',
//              controller: 'Songs',
//                 templateUrl: 'app/views/songs.html',
//                 resolve: {
//                     permission: permission
//                 }
//          })
//              .state('logOut',{
//              url:'/LogOut',
//              resolve: {
//                     permission: function(SessionService, $cookies) {
//                         return SessionService.logOut();
//                     }
//                 }
//          });

//             //.otherwise('/');
//     }]);
// }());




(function() {

    PPTGenerator.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            var permission = ['SessionService', 'Alertify', '$cookies', '$location',
                function(SessionService, Alertify, $cookies, $location) {
                    return SessionService.sessionCheck({ Token: $cookies.get('__token') }).then(
                        function(check) {
                            return check;
                        },
                        function(err) {
                            Alertify.error('Error! Something went wrong with the server!');
                            return err;
                        }

                    );


                }
            ];

            $routeProvider
                .when('/', {
                    controller: 'Authentication',
                    templateUrl: 'app/views/login.html',
                    cache: false,
                    resolve: {
                        isLoggedIn: function(SessionService) {
                            return SessionService.loggedIn();

                        }
                    }

                })
                .when('/Home', {
                    controller: 'Main',
                    templateUrl: 'app/views/home.html',
                    cache: false,
                    resolve: {
                        permission: permission
                    }

                })
                .when('/Songs', {
                    controller: 'Songs',
                    templateUrl: 'app/views/songs.html',
                    cache: false,
                    resolve: {
                        permission: permission
                    }

                })
                .when('/Songs/:id', {
                    controller: 'Songs',
                    templateUrl: 'app/views/view-songs.html',
                    cache: false,
                    resolve: {
                        permission: permission
                    }

                })
                .when('/LogOut', {
                    resolve: {
                        permission: function(SessionService, $location) {
                            SessionService.logOut();
                            $location.path('/');
                        }
                    }
                })
                .when('/LineUp',{
                    controller: 'Songs',
                    templateUrl: 'app/views/lineup.html',
                    cache: false,
                    resolve: {
                        permission: permission
                    }
                })
                .otherwise('/');
        }
    ]);
}());