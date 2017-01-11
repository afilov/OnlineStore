"use strict";


app.controller('ProductListCtrl', ['$rootScope', 'Product', '$scope', '$state',
    function ($rootScope, Product, $scope, $state) {
        var ProductInstance = new Product();
        $scope.Products = {};
        $scope.IsNew = false;


        $scope.CreateNew = function () {
            $state.go('Product_New');
        };

        $scope.getAll = function () {
            var promise = ProductInstance.GetAllProducts();
            promise.then(function (data) {
                $scope.Products = data.data;
            }, function (err) {
                console.log(err)
            });
        };
        $scope.getAll();


        $scope.goToDetails = function (product) {
            $state.go('Product_Details', {id: product._id});
        };

    }]);