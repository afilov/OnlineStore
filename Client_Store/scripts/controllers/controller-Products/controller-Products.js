"use strict";

app.controller("ProductManagementCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'Category', 'CategoryFactory', 'Product', 'CartProduct',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, Category, CategoryFactory, Product, CartProduct) {

        var CategoryInstance = new Category();
        var ProductInstance = new Product();

        $scope.Products = [];
        $scope.Categories = [];
        $scope.selectedCategory;

        $scope.goToDetails = function (product) {
            $state.go('Product_Details', {id: product._id});
        };

        $scope.addToCart = function (product) {
            var tmpCartProduct = new CartProduct();
            tmpCartProduct.ProductId = product._id;
            tmpCartProduct.Wish = false;
            $scope.updateCartProduct(tmpCartProduct);
            $rootScope.showActionToast('Added to ShoppingCart');

        };

        $scope.updateCartProduct = function (cartProduct) {
            var promise = cartProduct.Create();
            promise.then(function (data) {
            }, function (err) {
                console.log(err);
            })
        };
        $scope.addToWishlist = function (product) {
            var tmpCartProduct = new CartProduct();
            tmpCartProduct.ProductId = product._id;
            tmpCartProduct.Wish = true;
            $scope.updateCartProduct(tmpCartProduct);
            $rootScope.showActionToast('Added to WishList');

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