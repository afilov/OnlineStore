app.factory('CategoryFactory', ['$rootScope', '$http', function ($rootScope, $http) {
    return {
        getAllCategories: function () {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/categories',
                withCredentials: true
            })
        },
        createCategory: function (data) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/create/category',
                withCredentials: true,
                data: data
            })
        },
        updateCategory: function (data) {
            return $http({
                method: 'PUT',
                url: $rootScope.serverUrl + '/update/category',
                withCredentials: true,
                data: data
            })
        },
        deleteCategory: function (id) {
            return $http({
                method: 'POST',
                url: $rootScope.serverUrl + '/delete/category',
                withCredentials: true,
                data: {_id: id}
            })
        },
        getCategoryByID: function (id) {
            return $http({
                method: 'GET',
                url: $rootScope.serverUrl + '/get/category/' + id,
                withCredentials: true
            })

        }
    }

}]);