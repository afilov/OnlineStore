"use strict";

app.controller("MainCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav) {

        $scope.goToRegister = function(){
            $state.go('Register') ;
        };
        $scope.goToLogin = function(){
            $state.go('Login');
        };

        $scope.images = [

        ]

    }]);