app.factory('UserFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        Authenticate: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/authenticate',
                withCredentials: false,
                data: data
            })
        },
        FBAuthenticate: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/fb/authenticate',
                withCredentials: false,
                data: data
            })
        },
        Update : function (data) {
            return $http({
                method: 'PUT',
                url: $rootScope.serverUrl + '/user/update',
                withCredentials: true,
                data: data
            })
        },
        Register : function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/register',
                withCredentials: true,
                data: data
            })
        }
    }


}]);