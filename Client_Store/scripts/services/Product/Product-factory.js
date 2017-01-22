app.factory('ProductFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        getAllProducts: function () {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/products',
                withCredentials: true
            })
        },
        getProductByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/product/' + id,
                withCredentials: true
            })
        },
        getImageByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/product/attachment/download/' + id,
                withCredentials: true
            })
        },
        getProductsByCategoryID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/category/products/' + id,
                withCredentials: true
            })
        },
        executeOrder: function (data) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/execute/order/' + data.orderId + "/" + data.payerId,
                withCredentials: true
            })
        },
        buyProduct: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/buy/product',
                withCredentials: true,
                data: data
            })
        }

    }


}]);