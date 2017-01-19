"use strict";

app.controller("ProductCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav) {

        $scope.browseBy = function(){
            $state.go('Categories');
        }
    }]);