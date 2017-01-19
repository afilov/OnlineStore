"use strict";
app.controller("LoginCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'User',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, User) {

        $scope.User = new User();
        $scope.ErrorMsg = null;

        $scope.loginUser = function () {
            var promise = $scope.User.Authenticate();
            promise.then(function (data) {
                $scope.ErrorMsg = null;
                $localStorage.UserData = data.data;
                $rootScope.User = data.data;
                $state.go("Home");
            }, function (err) {
                $scope.ErrorMsg = err.err;

            })
        };

    }]);