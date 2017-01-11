app.controller('ProductListCtrl', ['$rootScope', 'Product', '$scope', '$state', function ($rootScope, Product, $scope, $state) {
    var ProductInstance = new Product();

    $scope.Products = {};

    $scope.IsNew = false;

    $scope.CreateNew = function () {

    };


    var promise = ProductInstance.GetProductByID(2);
    promise.then(function (data) {
        console.log(data);
    }, function (err) {
        console.log(err);
    });


    $scope.goToDetails = function (product) {
        $state.go('Product_Details', {id: product.ID});
    };

}]);