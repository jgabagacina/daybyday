(function() {
    PPTGenerator.controller('Main', ['$scope', '$location', 'permission', function($scope, $location, permission) {
        if(!permission){
        	$location.path('/');
        }
     

         console.log("Main");

    }]);
}());