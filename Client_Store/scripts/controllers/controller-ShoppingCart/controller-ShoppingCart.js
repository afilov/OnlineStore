"use strict";

app.controller("ShopCartCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$mdSidenav', 'Category', 'CategoryFactory', 'Product',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $mdSidenav, Category, CategoryFactory, Product) {


        $scope.continueShop = function(){
            $state.go('Products');
        }

    }]);