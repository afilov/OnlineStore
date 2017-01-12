"use strict";


app.controller('ProductDetailsCtrl', ['$rootScope', 'Product', '$scope', '$state', '$stateParams', 'Category', 'Upload',
    function ($rootScope, Product, $scope, $state, $stateParams, Category, Upload) {
        var ProductInstance = new Product();
        var CategoryInstance = new Category();
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

        var CategoriesPromise = CategoryInstance.GetAllCategories();
        CategoriesPromise.then(function (data) {
            $scope.Categories = data.data;
        });

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
        };


        // upload later on form submit or something similar
        $scope.submit = function () {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: $rootScope.serverUrl + "/product/attachment",
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

    }]);