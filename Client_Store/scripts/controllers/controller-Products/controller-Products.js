"use strict";

app.controller("ProductCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'Product',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, Product) {

        var ProductInstance = new Product();
        $scope.Products = {};

        $scope.browseBy = function () {
            $state.go('Categories');
        };

        $scope.addToCart = function(product){

        };
        $scope.addToWishlist = function(product){

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
    }]);