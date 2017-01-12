"use strict";


app.controller('ProductListCtrl', ['$rootScope', 'Product', '$scope', '$state', 'Category',
    function ($rootScope, Product, $scope, $state, Category) {
        var ProductInstance = new Product();
        var CategoryInstance = new Category();
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
            var promise2 = CategoryInstance.GetAllCategories();
            promise2.then(function (data) {
                $scope.Categories = data.data;
            })
        };
        $scope.getAll();


        $scope.goToDetails = function (product) {
            $state.go('Product_Details', {id: product._id});
        };

    }]);