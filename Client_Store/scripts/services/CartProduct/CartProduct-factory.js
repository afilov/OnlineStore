app.factory('CartProductFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        GetAll: function (data) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/user/cart/products',
                withCredentials: true
            })
        },
        GetByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/user/cart/product/' + id,
                withCredentials: true
            })
        },
        Create: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/create/cart/product',
                withCredentials: true,
                data: data
            })
        },
        Update: function (data) {
            return $http({
                method: 'PUT',
                url: $rootScope.serverUrl + '/user/cart/product',
                withCredentials: true,
                data: data
            })
        },
        deleteCartProduct: function (id) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/user/delete/cart/product',
                withCredentials: true,
                data: {_id: id}
            })
        },
        checkoutCart: function (data) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/user/checkout/cart/products',
                withCredentials: true
            })
        }
    }


}]);