"use strict";

app.controller("ProductDetailsCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'Category', 'CategoryFactory', 'Product',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, Category, CategoryFactory, Product) {

        var currentID = $stateParams.id;
        var ProductInstance = new Product();
        $scope.currentProduct = null;

        var promise = ProductInstance.GetProductByID(currentID);
        promise.then(function (data) {
            $scope.currentProduct = data;
        });

        $scope.Back = function () {
            $state.go($state.current.parent);
        }

    }]);