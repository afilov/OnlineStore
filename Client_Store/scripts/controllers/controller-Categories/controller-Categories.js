"use strict";

app.controller("ProductManagementCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'Category', 'CategoryFactory', 'Product',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, Category, CategoryFactory, Product) {

        var CategoryInstance = new Category();

        var ProductInstance = new Product();
        $scope.Products = [];
        $scope.Categories = [];
        $scope.selectedCategory;

        $scope.browseBy = function () {
            $state.go('Categories');
        };

        $scope.addToCart = function (product) {

        };
        $scope.addToWishlist = function (product) {

        };

        $scope.getAllProducts = function () {
            var promise = ProductInstance.GetAllProducts();
            promise.then(function (data) {
                $scope.Products = data.data;
            }, function (err) {
                console.log(err)
            });
        };
        $scope.getAllProducts();

        $scope.loginUser = function () {

        };

        $scope.getAllCategories = function () {
            var promise = CategoryInstance.GetAllCategories();
            promise.then(function (data) {
                $scope.Categories = data.data;
                $scope.selectedCategory = $scope.Categories[0]._id;
            }, function (err) {
                console.log(err)
            });
        };
        $scope.getAllCategories();

        $scope.renderProductsByCategory = function (category) {
            var promise = ProductInstance.GetProductByCategoryID(category._id);
            promise.then(function (data) {
                $scope.Products = data;
            }, function (err) {
                console.log(err)
            });
        }

    }]);