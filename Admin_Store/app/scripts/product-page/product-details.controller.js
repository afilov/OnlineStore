"use strict";


app.controller('ProductDetailsCtrl', ['$rootScope', 'Product', '$scope', '$state', '$stateParams', 'Category', 'Upload',
    function ($rootScope, Product, $scope, $state, $stateParams, Category, Upload) {
        var ProductInstance = new Product();
        var CategoryInstance = new Category();
        $scope.currentProduct = null;
        $scope.CurrentID = null;
        $scope.IsNew = true;
        var fileId = null;

        if ($stateParams.id != "" && $stateParams.id != undefined && $stateParams.id != "new") {
            $scope.IsNew = false;
            $scope.CurrentID = $stateParams.id;
            var promise = ProductInstance.GetProductByID($scope.CurrentID);
            promise.then(function (product) {
                $scope.currentProduct = product;
                fileId = product.FileId;
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
            $scope.uploadFile(function () {
                var promise = $scope.currentProduct.CreateProduct();
                promise.then(function (res) {
                    $rootScope.showActionToast('Product Saved');
                    $state.go('Product_List');
                });
            });
        };

        $scope.UpdateProduct = function () {
            $scope.uploadFile(function () {
                var promise = $scope.currentProduct.UpdateProduct();
                promise.then(function (res) {
                    $rootScope.showActionToast("Product updated");
                });
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
            $scope.file = file;
        };

        $scope.uploadFile = function (callBack) {
            if (fileId === $scope.currentProduct.FileId){
                callBack();
            }
            else {   var fileId = null;
                var data = {};
                data.file = $scope.file;
                if (angular.isDefined($scope.currentProduct.FileId) == true && $scope.currentProduct.FileId != null) {
                    fileId = $scope.currentProduct.FileId;
                    data.fileId = fileId;
                }
                Upload.upload({
                    url: $rootScope.serverUrl + "/product/attachment",
                    data: data
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
                    $scope.currentProduct.ImageURL = $rootScope.serverUrl + "/product/attachment/download/" + resp.data._id;
                    callBack();
                    $scope.currentProduct.FileId = resp.data._id;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });}

        };

    }]);