"use strict";

app.controller("ProductDetailsCtrl",
    ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'Category', 'CategoryFactory', 'Product', 'CartProduct',
        function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, Category, CategoryFactory, Product, CartProduct) {

            var currentID = $stateParams.id;
            var ProductInstance = new Product();
            $scope.currentProduct = null;

            $scope.Quantity = 1;

            if (angular.isDefined($stateParams.orderId)){
                var promise = ProductInstance.ExecuteOrder({orderId:$rootScope.getParameterByName("paymentId"),payerId:$rootScope.getParameterByName("PayerID")});
                promise.then(function (data) {
                    $rootScope.showActionToast("Order Completed");
                },function (err) {
                    $rootScope.showActionToast("Something went wrong");
                })
            }

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
                var promise = $scope.currentProduct.Buy($scope.Quantity);
                promise.then(function (data) {
                    $scope.orderURL = data.data.href;
                    window.location.href = $scope.orderURL;
                }, function (err) {
                    console.log(err);
                })
            };


            $scope.Back = function () {
                $state.go($state.current.parent);
            }

        }]);