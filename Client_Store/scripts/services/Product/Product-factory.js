app.factory('ProductFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        getAllProducts: function () {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/products',
                withCredentials: true
            })
        },
        createProduct: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/create/product',
                withCredentials: true,
                data: data
            })
        },
        updateProduct: function (data) {
            return $http({
                method: 'PUT',
                url: $rootScope.serverUrl + '/update/product',
                withCredentials: true,
                data: data
            })
        },
        deleteProduct: function (id) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/delete/product',
                withCredentials: true,
                data: {_id: id}
            })
        },
        getProductByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/product/'+ id,
                withCredentials: true
            })
        },
        getImageByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/product/attachment/download/'+ id,
                withCredentials: true
            })
        },
        getProductsByCategoryID: function(id){
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/category/products/'+ id,
                withCredentials: true
            })
        }

    }


}]);