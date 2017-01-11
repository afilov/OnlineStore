app.controller('CategoryListCtrl', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

    $scope.Categories = {};

    $scope.goToDetails = function (category) {
        $state.go('Category_Details', {id: category.ID});
    };

    $scope.CreateNew = function () {
        $state.go("Category_New");

    };

}]);