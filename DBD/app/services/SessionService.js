(function() {
    PPTGenerator.factory('SessionService', ['$http', '$cookies', '$location', 'Alertify',
        function($http, $cookies, $location, Alertify) {

            var logOut = function() {
                return $http.get(__backendLink + 'Authentication/LogOut').then(
                    function(res) {
                        var cookies = $cookies.getAll();
                        angular.forEach(cookies, function(v, k) {
                            $cookies.remove(k);
                        });
                        //return $location.path('/');
                    },
                    function(err) {
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );
            };
            return {
                validateAccount: function(data) {
                    
                    return $http.post(__backendLink + 'Authentication/logInAuthentication', data).then(function(res) {
                            var val = res.data;
                            if (val.result) {
                                $cookies.put('__token', val.Token);
                                $cookies.put('__username', val.UserName);
                                return true;
                            } else {
                               return false;
                                
                            }

                        },
                        function(error) {
                            Alertify.error('Error! Something went wrong with the server!');
                           
                        });;
                },
                sessionCheck: function(data) {
                    return $http.post(__backendLink + 'Authentication/sessionCheck', data).then(
                        function(res) {
                            if (res.data.result) {
                                return true;
                            } else {

                                logOut();
                                return false;
                            }
                        },
                        function(err) {
                            return false;
                        }
                    );



                },
                loggedIn: function() {
                    if (typeof $cookies.get('__token') != 'undefined') {
                        return true;
                    } else {
                        return false;
                    }
                },
                logOut: logOut
            };
        }
    ]);
}());