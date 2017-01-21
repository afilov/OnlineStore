"use strict";

app.controller("MainCtrl", ['$scope', '$rootScope', '$localStorage', '$state',
    function ($scope, $rootScope, $localStorage, $state) {

        $scope.goToLogin = function () {
            $state.go('Login');
        };
        $scope.goToRegister = function () {
            $state.go('Register');
        }

    }]);