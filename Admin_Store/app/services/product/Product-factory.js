app.factory('ProductFactory', ['$rootScope', '$http', '$timeout', '$q', function ($rootScope, $http, $timeout, $q) {
    return {
        getAllProducts: function () {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/products',
                withCredentials: true,
                data: data
            })
        },
        createProduct: function () {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/create',
                withCredentials: true,
                data: data
            })
        },
        getProductByID: function (id) {
            //return $http({
            //    method: 'GET',
            //    url: $rootScope.serverUrl + '/product/:id',
            //    withCredentials: true,
            //    data: data
            //})
            var deferred = $q.defer();
            var promise = deferred.promise;
            $timeout(function () {
                deferred.resolve({
                    Name: "Test",
                    Price: 150
                });
            }, 1000);
            return promise;
        }
    }


}]);