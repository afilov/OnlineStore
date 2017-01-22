"use strict";

app.factory('OrderFactory', ['$rootScope', '$http', function ($rootScope, $http) {
    return {
        getAll: function () {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/orders',
                withCredentials: true
            })
        },

        getOrderByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/order/' + id,
                withCredentials: true
            })

        }
    }

}]);