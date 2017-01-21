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

        $scope.addToWishList = function (product) {

        };
        $scope.addToShoppingCart = function (product) {
            product.Wish = true;
        };
        $scope.removeFromShoppingCart = function (product) {
            var index = $scope.cartProducts.indexOf(product);
            $scope.cartProducts.splice(index, 1);
        };
        $scope.removeFromWishlist = function (product) {
            var index = $scope.cartProducts.indexOf(product);
            $scope.cartProducts.splice(index, 1);
        };

        $scope.checkout = function () {

        }

    }]);