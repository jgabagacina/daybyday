(function() {
    PPTGenerator.factory('SongsService', ['$http', function($http) {
        return {
            getSongs: function(data = '') {
                return $http.get(__backendLink+'Songs/getSongs/'+data);
            },
            getParts: function(){
            	return $http.get(__backendLink+'Songs/getParts');
            },
            addSong: function(data) {
                return $http.post(__backendLink+'Songs/addSong', data);
            },
            editSong: function(data) {
                return $http.post(__backendLink+'Songs/editSong', data); 
            }
        };
    }])
}());