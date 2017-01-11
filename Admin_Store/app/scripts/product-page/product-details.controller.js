"use strict";


app.controller('ProductDetailsCtrl', ['$rootScope', 'Product', '$scope', '$state', '$stateParams', function ($rootScope, Product, $scope, $state, $stateParams) {
    var ProductInstance = new Product();
    $scope.currentProduct = null;
    $scope.CurrentID = null;
    $scope.IsNew = true;

    if ($stateParams.id != "" && $stateParams.id != undefined && $stateParams.id != "new") {
        $scope.IsNew = false;
        $scope.CurrentID = $stateParams.id;
        var promise = ProductInstance.GetProductByID($scope.CurrentID);
        promise.then(function (product) {
            $scope.currentProduct = product;
            $scope.currentProduct.CreatedOn = new Date($scope.currentProduct.CreatedOn);
        });
    }
    else {
        $scope.currentProduct = new Product();
    }

    $scope.DeleteProduct = function () {
        var promise = $scope.currentProduct.DeleteProduct();
        promise.then(function (data) {
            $state.go('Product_List');
        });
    };
    $scope.CreateProduct = function () {
        var promise = $scope.currentProduct.CreateProduct();
        promise.then(function (res) {
            $rootScope.showActionToast('Product Saved');
            $state.go('Category_List');
        });
    };

    $scope.UpdateProduct = function () {
        var promise = $scope.currentProduct.UpdateProduct();
        promise.then(function (res) {
            $rootScope.showActionToast("Product updated");
        });
    }

}]);