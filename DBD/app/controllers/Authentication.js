(function() {
    PPTGenerator.controller('Authentication', ['$scope', '$cookies', '$location', 'SessionService', 'Alertify', 'isLoggedIn',
        function($scope, $cookies, $location, SessionService, Alertify, isLoggedIn) {
            //console.log(isLoggedIn);
            $scope.UserName = "";
            $scope.Password = "";
            $scope.isLoggedIn = isLoggedIn;
            if (isLoggedIn) {
                $location.path('/Home');
            }

            $scope.loading = true;
            $scope.logIn = function() {

                var data = {
                    UserName: $scope.UserName,
                    Password: $scope.Password
                };
                if ($scope.UserName === '' && $scope.Password === '') {
                    Alertify.error('Username/Password requried!');
                } else if ($scope.UserName === '') {
                    Alertify.error('Username requried!');
                } else if ($scope.Password === '')
                    Alertify.error('Password requried!');
                else {
                    $scope.loading = false;
                    SessionService.validateAccount(data).then(
                        function(response) {
                            console.log(response);
                            if (typeof response === "boolean") {

                                if (response) {
                                    Alertify.success('You successfuly logged in!');
                                    $location.path('/Home');
                                } else {
                                    $scope.loading = true;
                                    Alertify.error('Invalid Username/Password!');
                                    $scope.Password = "";
                                }
                            } else {
                                $scope.loading = true;
                            }
                        }
                    );

                }


            };
        }
    ]);
}());