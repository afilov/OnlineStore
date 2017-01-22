"use strict";

app.controller("ShopCartCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'CartProduct',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, CartProduct) {


        var cartProductInstance = new CartProduct();

        $scope.cartProducts = [];

        $scope.getAllCartProducts = function () {
            var promise = cartProductInstance.GetAll();
            promise.then(function (data) {
                $scope.cartProducts = data.data;
            }, function (err) {
                console.log(err);
            })
        };
        $scope.getAllCartProducts();

        $scope.continueShop = function () {
            $state.go('Products');
        };

        $scope.removeFromList = function (product) {
            //var promise = cartProductInstance.Delete();
            //promise
        };

        $scope.updateCartProduct = function (product) {
            var promise = product.Update();
            promise.then(function (data) {
            }, function (err) {
                console.log(err);
            });
        };
        $scope.deleteCartProduct = function (product) {
            var promise = product.Delete();
            promise.then(function (data) {
            }, function (err) {
                console.log(err);
            });
            $scope.getAllCartProducts();

        };
        $scope.addToWishList = function (product) {
            product.Wish = true;
            $scope.updateCartProduct(product);
        };
        $scope.addToShoppingCart = function (product) {
            product.Wish = false;
            $scope.updateCartProduct(product);
        };
        $scope.removeFromShoppingCart = function (product) {
            $scope.deleteCartProduct(product);
        };
        $scope.removeFromWishlist = function (product) {
            $scope.deleteCartProduct(product);
        };

        $scope.checkout = function () {

        };

    }]);