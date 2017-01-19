"use strict";
app.controller("LoginCtrl", ['$scope', '$rootScope', '$localStorage', '$state', '$mdSidenav', 'User', 'Facebook',
    function ($scope, $rootScope, $localStorage, $state, $mdSidenav, User, Facebook) {

        $scope.User = new User();
        $scope.ErrorMsg = null;
        $scope.ErrClass = "errBox-hide";

        $scope.toggleErrorMsg = function () {
            if ($scope.ErrClass == "errBox-hide") {
                $scope.ErrClass = "errBox-show";
            }
            else {
                $scope.ErrClass = "errBox-hide";
            }
        };

        $scope.loginUser = function () {
            var promise = $scope.User.Authenticate();
            promise.then(function (data) {
                $scope.ErrorMsg = null;
                if ($scope.ErrClass == "errBox-show") {
                    $scope.toggleErrorMsg();
                }
                $localStorage.UserData = data.data;
                $rootScope.User = data.data;
                $state.go("Home");
            }, function (err) {
                if ($scope.ErrClass == "errBox-hide") {
                    $scope.toggleErrorMsg();
                }
                $scope.ErrorMsg = err.err.data;

            })
        };

        $scope.FBLogin = function () {
            Facebook.login(function (response) {
                Facebook.api('me',{fields:'email,first_name,last_name'}, function (userResp) {
                    $scope.LoginViaFacebook(response.authResponse);
                });
                // $scope.LoginViaFacebook(response.authResponse);
            },{scope:'email'});
        };


        $scope.LoginViaFacebook = function (result) {
            var promise = $scope.User.FBAuthenticate(result);
            promise.then(function (data) {
                $scope.ErrorMsg = null;
                if ($scope.ErrClass == "errBox-show") {
                    $scope.toggleErrorMsg();
                }
                $localStorage.UserData = data.data;
                $rootScope.User = data.data;
                $state.go("Home");
            }, function (err) {
                if ($scope.ErrClass == "errBox-hide") {
                    $scope.toggleErrorMsg();
                }
                $scope.ErrorMsg = err.err.data;

            })
        };

    }]);