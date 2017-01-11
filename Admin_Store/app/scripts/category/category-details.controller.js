"use strict";


app.controller('CategoryDetailsCtrl', ['$rootScope', 'Category', '$scope', '$state', '$stateParams', function ($rootScope, Category, $scope, $state, $stateParams) {
    var CategoryInstance = new Category();
    $scope.currentCategory = null;
    $scope.CurrentID = null;
    $scope.IsNew = true;

    if ($stateParams.id != "" && $stateParams.id != undefined && $stateParams.id != "new") {
        $scope.IsNew = false;
        $scope.CurrentID = $stateParams.id;
        var promise = CategoryInstance.GetCategoryByID($scope.CurrentID);
        promise.then(function (category) {
            $scope.currentCategory = category;
            $scope.currentCategory.CreatedOn = new Date($scope.currentCategory.CreatedOn);
        });
    }
    else {
        $scope.currentCategory = new Category();
    }

    $scope.DeleteCategory = function () {
        var promise = $scope.currentCategory.DeleteCategory();
        promise.then(function (data) {
            $state.go('Category_List');
        });
    };
    $scope.CreateCategory = function () {
        var promise = $scope.currentCategory.CreateCategory();
        promise.then(function (res) {
            $rootScope.showActionToast('Category Saved');
            $state.go('Category_List');
        });
    };

    $scope.UpdateCategory = function () {
        var promise = $scope.currentCategory.UpdateCategory();
        promise.then(function (res) {
            $rootScope.showActionToast("Category updated");
        });
    }

}]);