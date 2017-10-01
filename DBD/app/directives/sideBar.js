(function() {


    PPTGenerator.directive('sideBar', function() {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', '$cookies', 'SessionService', function($scope, $cookies, SessionService) {
                
                $scope.loggedIn = SessionService.loggedIn();
                $scope.$watch('loggedIn', function() {
                    $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
                        $scope.loggedIn = SessionService.loggedIn();
                        $scope.username = $cookies.get('__username');
                    });
                 
                });
                console.log("SIdeBAR");

            }],
            bindToController: true,
            templateUrl: 'app/views/sidebar.html'
        };
        scope.$watch("$viewContentLoaded");
    });
}());