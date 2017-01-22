"use strict";


app.controller('PaypalCtrl', ['$rootScope', '$scope', 'Order', '$state', '$stateParams', function ($rootScope, $scope, Order, $state, $stateParams) {

    $scope.Orders = [];
    var orderInstance = new Order();

    $scope.getAllOrders = function () {
        var promise = orderInstance.GetAll();
        promise.then(function (data) {
            $scope.Orders = data.data;
        }, function (err) {
            console.log(err);
        });
    };
    $scope.getAllOrders();

    $scope.goToDetails = function (order) {
        $state.go("Order_Details", {orderid: order._id});
    };

    $scope.currentOrder = null;

    if ($stateParams.orderid != "" && $stateParams.orderid != undefined) {
        var currentID = $stateParams.orderid;
        var promise = orderInstance.GetOrderByID(currentID);
        promise.then(function (category) {
            $scope.currentOrder = category;
            $scope.currentOrder.CreatedOn = new Date($scope.currentOrder.CreatedOn);
        });
    }

}]);