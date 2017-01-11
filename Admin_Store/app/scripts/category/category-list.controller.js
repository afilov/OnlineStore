"use strict";


app.controller('CategoryListCtrl', ['$rootScope', 'Category', '$scope', '$state',
    function ($rootScope, Category, $scope, $state) {
        var CategoryInstance = new Category();
        $scope.Categories = {};
        $scope.IsNew = false;


        $scope.CreateNew = function () {
            $state.go('Category_New');
        };

        $scope.getAll = function () {
            var promise = CategoryInstance.GetAllCategories();
            promise.then(function (data) {
                $scope.Categories = data.data;
            }, function (err) {
                console.log(err)
            });
        };
        $scope.getAll();


        $scope.goToDetails = function (category) {
            $state.go('Category_Details', {id: category._id});
        };

    }]);