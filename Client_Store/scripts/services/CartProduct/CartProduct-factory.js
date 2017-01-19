app.factory('CartProductFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        GetAll: function (data) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/user/cartproducts',
                withCredentials: true
            })
        },
        GetByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/user/cartproduct/'+id,
                withCredentials: true
            })
        },
        Create : function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/cartproduct',
                withCredentials: true,
                data: data
            })
        },
        Update : function (data) {
            return $http({
                method: 'PUT',
                url: $rootScope.serverUrl + '/user/cartproduct',
                withCredentials: true,
                data: data
            })
        }
    }


}]);