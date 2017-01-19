"use strict";

app.controller("RegisterCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'User',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, User) {

        $scope.User = new User();
        $scope.confirmed = null;
        $scope.ErrorMsg = null;

        $scope.registerUser = function () {
            var promise = $scope.User.Register();
            promise.then(function (data) {
                $scope.ErrorMsg = null;
                $localStorage.UserData = data.data;
                $rootScope.User = data.data;
            },function (err) {
                $scope.ErrorMsg = err.err;
            })
        };

    }]);