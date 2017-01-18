"use strict";

app.controller('UserLoginCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$localStorage', 'User',
    function ($scope, $state, $stateParams, $rootScope, $localStorage, User) {
        $rootScope.PageTitle = "Login";
        $scope.User = new User();


        $scope.InvalidAuthentication = false;


        $scope.Login = function () {
            if ($scope.User.Password != null && $scope.User.Username != null) {
                var promise = $scope.User.Authenticate();
                promise.then(function (data) {
                    $localStorage.Data = data.data;
                    $rootScope.User = data.data;
                    $state.go("Home");
                }, function (err) {
                    $scope.InvalidAuthentication = true;
                });
            }
        };
    }
]);
