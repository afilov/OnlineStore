"use strict";

app.controller("ShopCartCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'CartProduct', 'Product',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, CartProduct, Product) {


        var cartProductInstance = new CartProduct();
        var productInstance = new Product();

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

        $scope.calculateTotal = function () {
            var total = 0;
            if (angular.isDefined($scope.cartProducts)) {
                for (var i = 0; i < $scope.cartProducts.length; i++) {
                    if ($scope.cartProducts[i].Wish == false) {
                        total += $scope.cartProducts[i].Total;
                    }
                }

            }
            return total;
        };

        $scope.continueShop = function () {
            $state.go('Products');
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

        if (angular.isDefined($stateParams.orderid)) {
            var promise = productInstance.ExecuteOrder({
                orderId: $rootScope.getParameterByName("paymentId"),
                payerId: $rootScope.getParameterByName("PayerID")
            });
            promise.then(function (data) {
                $rootScope.showActionToast("Order Completed");
            }, function (err) {
                $rootScope.showActionToast("Something went wrong");
            })
        }

        $scope.checkout = function () {
            var promise = cartProductInstance.Checkout();
            promise.then(function (data) {
                var orderURL = data.data.href;
                window.location.href = orderURL;
            }, function (err) {
                console.log(err);
            });
        };

    }]);