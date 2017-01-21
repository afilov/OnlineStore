"use strict";

app.controller("ProductDetailsCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'Category', 'CategoryFactory', 'Product', 'CartProduct',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, Category, CategoryFactory, Product, CartProduct) {

        var currentID = $stateParams.id;
        var ProductInstance = new Product();
        $scope.currentProduct = null;

        $scope.Quantity = 1;

        var promise = ProductInstance.GetProductByID(currentID);
        promise.then(function (data) {
            $scope.currentProduct = data;
        });

        $scope.addToCart = function () {
            var tmpCartProduct = new CartProduct();
            tmpCartProduct.ProductId = $scope.currentProduct._id;
            tmpCartProduct.Wish = false;
            tmpCartProduct.Quantity = $scope.Quantity;
            $scope.updateCartProduct(tmpCartProduct);
            $rootScope.showActionToast('Added to ShoppingCart');
        };

        $scope.addToWishlist = function () {
            var tmpCartProduct = new CartProduct();
            tmpCartProduct.ProductId = $scope.currentProduct._id;
            tmpCartProduct.Quantity = $scope.Quantity;
            tmpCartProduct.Wish = true;
            $scope.updateCartProduct(tmpCartProduct);
            $rootScope.showActionToast('Added to WishList');
        };

        $scope.updateCartProduct = function (cartProduct) {
            var promise = cartProduct.Create();
            promise.then(function (data) {
            }, function (err) {
                console.log(err);
            })
        };

        $scope.checkout = function () {

        };


        $scope.Back = function () {
            $state.go($state.current.parent);
        }

    }]);