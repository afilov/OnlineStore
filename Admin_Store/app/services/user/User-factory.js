app.factory('UserFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        Authenticate: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/admin/user/authenticate',
                withCredentials: false,
                data: data
            })
        },
        Update : function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/admin/user/update',
                withCredentials: true,
                data: data
            })
        },
    }


}]);